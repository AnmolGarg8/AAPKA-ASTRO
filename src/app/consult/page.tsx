"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  AstrologerStateStore,
  AstrologerStatus,
  QueueItem,
  ActiveSession,
  ConsultationMessage,
  INITIAL_ASTROLOGER,
} from "@/lib/store/astrologerStore";
import {
  PhoneCall,
  Video,
  MessageSquare,
  Clock,
  Wallet,
  Sparkles,
  Send,
  PhoneOff,
  Mic,
  MicOff,
  VideoOff,
  Calendar,
  Star,
  AlertTriangle,
  WifiOff,
  RefreshCw,
} from "lucide-react";
import {
  PLACEHOLDER_ASTROLOGER,
  ADMIN_CONFIGURABLE_PRICING,
  FIRST_CONSULTATION_OFFER,
} from "@/config/placeholderContent";
import {
  ConsultationBillingEngine,
  BillingState,
} from "@/lib/services/consultationBilling";
import { useCurrentUserRole } from "@/lib/auth/roleContext";

export default function ConsultPage() {
  const { isAstrologer } = useCurrentUserRole();
  // Live State
  const [status, setStatus] = useState<AstrologerStatus>("AVAILABLE");
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [walletBalance, setWalletBalance] = useState(250);

  // Client Consultation Form State
  const [userName, setUserName] = useState("Aarav Sharma");
  const [userPhone, setUserPhone] = useState("+91 98765 43210");
  const [consultType, setConsultType] = useState<"chat" | "voice" | "video">("chat");
  const [birthDate, setBirthDate] = useState("1995-10-24");
  const [birthTime, setBirthTime] = useState("14:35");
  const [birthPlace, setBirthPlace] = useState("New Delhi, Delhi");
  const [concern, setConcern] = useState("Seeking career guidance and timing for job switch");

  // In-Queue state for current user
  const [myQueueItem, setMyQueueItem] = useState<QueueItem | null>(null);

  // Consultation Billing Engine & Disconnect Resilience
  const billingEngineRef = useRef<ConsultationBillingEngine | null>(null);
  const [billingState, setBillingState] = useState<BillingState | null>(null);

  // Active Chat / Call State
  const [messages, setMessages] = useState<ConsultationMessage[]>([]);
  const [inputMsg, setInputMsg] = useState("");
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  // Appointment Booking Modal
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("2026-09-22");
  const [scheduledSlot, setScheduledSlot] = useState("11:00 AM - 11:30 AM");
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activePricing = ADMIN_CONFIGURABLE_PRICING[consultType];
  const ratePerMinute = activePricing.effectiveFirstTimeRate; // 50% discount auto-applied

  const syncAll = () => {
    const currentStatus = AstrologerStateStore.getStatus();
    const currentQueue = AstrologerStateStore.getQueue();
    const currentSession = AstrologerStateStore.getActiveSession();
    const currentWallet = AstrologerStateStore.getWalletBalance();

    setStatus(currentStatus);
    setQueue(currentQueue);
    setActiveSession(currentSession);
    setWalletBalance(currentWallet);

    if (currentSession) {
      setMessages(AstrologerStateStore.getMessages(currentSession.id));
    }
  };

  useEffect(() => {
    syncAll();
    window.addEventListener("astro_state_changed", syncAll);
    const interval = setInterval(syncAll, 2000);
    return () => {
      window.removeEventListener("astro_state_changed", syncAll);
      clearInterval(interval);
    };
  }, []);

  // Initialize Billing Engine when active session is established
  useEffect(() => {
    if (activeSession) {
      const engine = new ConsultationBillingEngine(
        activeSession.id,
        activeSession.ratePerMin || ratePerMinute,
        walletBalance
      );
      billingEngineRef.current = engine;
      setBillingState(engine.getState());

      const handleOnline = () => {
        billingEngineRef.current?.notifyReconnect();
        setBillingState(billingEngineRef.current?.getState() || null);
      };

      const handleOffline = () => {
        billingEngineRef.current?.notifyDisconnect();
        setBillingState(billingEngineRef.current?.getState() || null);
      };

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      const timer = setInterval(() => {
        if (!billingEngineRef.current) return;
        const nextState = billingEngineRef.current.tick();
        setBillingState(nextState);
        setSessionSeconds(nextState.sessionSeconds);
        setWalletBalance(nextState.walletBalance);
        AstrologerStateStore.setWalletBalance(nextState.walletBalance);

        if (nextState.isTerminated) {
          if (nextState.terminationReason === "zero_balance") {
            alert(
              "⚠️ Session Ended Gracefully: Your wallet balance reached ₹0. Please recharge your wallet to initiate another consultation."
            );
          } else if (nextState.terminationReason === "grace_expired") {
            alert(
              "⚠️ Session Disconnected: Network reconnect grace window (60s) has expired without restoration. Billing paused and session finalized."
            );
          }
          handleEndSession();
        }
      }, 1000);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
        clearInterval(timer);
      };
    } else {
      billingEngineRef.current = null;
      setBillingState(null);
      setSessionSeconds(0);
    }
  }, [activeSession]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Joining Queue or Direct Start
  const handleStartConsultation = (e: React.FormEvent) => {
    e.preventDefault();

    const minRequired = ratePerMinute * 2;
    if (walletBalance < minRequired) {
      alert(`Minimum wallet balance of ₹${minRequired} (2 minutes) is required to start consultation. Please recharge your wallet.`);
      return;
    }

    if (status === "AVAILABLE" && queue.length === 0) {
      const sess = AstrologerStateStore.startDirectSession({
        userName,
        userPhone,
        type: consultType,
        ratePerMin: ratePerMinute,
        birthDetails: {
          name: userName,
          birthDate,
          birthTime,
          birthPlace,
          gender: "male",
          latitude: 28.6139,
          longitude: 77.209,
          timezone: 5.5,
        },
        concern,
      });
      setActiveSession(sess);
    } else {
      const qItem = AstrologerStateStore.joinQueue({
        userName,
        userPhone,
        consultationType: consultType,
        birthDetails: {
          name: userName,
          birthDate,
          birthTime,
          birthPlace,
          gender: "male",
          latitude: 28.6139,
          longitude: 77.209,
          timezone: 5.5,
        },
        concern,
      });
      setMyQueueItem(qItem);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeSession) return;

    AstrologerStateStore.sendMessage(activeSession.id, "client", inputMsg.trim());
    setInputMsg("");
  };

  const handleEndSession = () => {
    if (activeSession) {
      AstrologerStateStore.endSession();
      setActiveSession(null);
      setSessionSeconds(0);
    }
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setScheduleSuccess(true);
    setTimeout(() => {
      setShowScheduleModal(false);
      setScheduleSuccess(false);
      alert(`Appointment confirmed for ${scheduledDate} at ${scheduledSlot}! Confirmation sent to ${userPhone}.`);
    }, 1500);
  };

  const myQueuePosition = myQueueItem
    ? queue.findIndex((q) => q.id === myQueueItem.id) + 1
    : queue.length + 1;
  const estimatedWaitMins = myQueuePosition * 7;

  return (
    <div className="bg-[#FBF3E7] py-8 lg:py-12 min-h-screen text-[#3B2A1E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            STATE 1: ACTIVE LIVE CONSULTATION SESSION (SPLIT CHAT / CALL SCREEN)
        ========================================================================= */}
        {activeSession ? (
          <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] shadow-xl overflow-hidden">
            {/* Session Top Bar: Live Billing Timer & Astrologer Details */}
            <div className="flex flex-wrap items-center justify-between border-b border-[#E8D8C3] bg-[#FAF5EE] px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={PLACEHOLDER_ASTROLOGER.avatarUrl}
                    alt={PLACEHOLDER_ASTROLOGER.displayName}
                    className="h-11 w-11 rounded-full object-cover border-2 border-[#E8A33D]"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#6B8E5A] ring-2 ring-white" />
                </div>
                <div>
                  {/* PLACEHOLDER: replace with real content */}
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#3B2A1E] font-temple text-base">
                      {PLACEHOLDER_ASTROLOGER.displayName}
                    </h3>
                    <span className="rounded bg-[#6B8E5A]/20 px-2 py-0.5 text-[10px] font-bold text-[#6B8E5A] border border-[#6B8E5A]/30 font-temple">
                      LIVE CONSULTATION
                    </span>
                  </div>
                  <div className="text-xs text-[#7D6B5D] font-body">
                    Vedic Jyotish &bull; Client: {activeSession.userName} ({activeSession.type.toUpperCase()})
                  </div>
                </div>
              </div>

              {/* Billing HUD */}
              {/* PLACEHOLDER: replace with real content */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 rounded-xl border border-[#E8A33D]/50 bg-[#FAF1E4] px-3.5 py-1.5 font-mono text-xs text-[#7B2D26]">
                  <Clock className="h-4 w-4 animate-pulse text-[#C1662F]" />
                  <span className="font-bold">
                    {Math.floor(sessionSeconds / 60).toString().padStart(2, "0")}:
                    {(sessionSeconds % 60).toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-[#7D6B5D]">
                    (@ ₹{activeSession.ratePerMin || ratePerMinute}/min • 50% Off)
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-[#D4C3B3] bg-[#FFFDF9] px-3 py-1.5 text-xs">
                  <Wallet className="h-4 w-4 text-[#6B8E5A]" />
                  <span className="font-bold text-[#3B2A1E]">Wallet: ₹{walletBalance}</span>
                </div>

                <button
                  type="button"
                  onClick={handleEndSession}
                  className="rounded-xl bg-[#7B2D26] px-4 py-2 text-xs font-bold text-white hover:bg-[#64231D] transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <PhoneOff className="h-4 w-4" />
                  <span>End Session</span>
                </button>
              </div>
            </div>

            {/* Low-Balance Warning Alert Banner (< 60 seconds remaining) */}
            {billingState?.isLowBalance && !billingState.isGracePeriod && (
              <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-[#7B2D26] text-white px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs shadow-inner animate-pulse">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-200" />
                  <span className="font-bold">
                    Low Balance Warning: Less than 1 minute ({billingState.secondsRemaining}s) remaining!
                  </span>
                  <span className="opacity-90 hidden sm:inline">
                    Recharge now to prevent mid-conversation auto-termination.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      billingEngineRef.current?.addFunds(100);
                      AstrologerStateStore.addWallet(100);
                      setBillingState(billingEngineRef.current?.getState() || null);
                      setWalletBalance((prev) => prev + 100);
                    }}
                    className="rounded-lg bg-white px-3 py-1 text-xs font-black text-[#7B2D26] hover:bg-amber-100 transition-all shadow"
                  >
                    Quick Add +₹100
                  </button>
                  <Link
                    href="/account/wallet"
                    target="_blank"
                    className="underline text-amber-100 hover:text-white font-medium text-xs"
                  >
                    Open Wallet &rarr;
                  </Link>
                </div>
              </div>
            )}

            {/* Disconnect Grace Period Banner (60s Reconnect Window) */}
            {billingState?.isGracePeriod && (
              <div className="bg-rose-900 border-b-2 border-rose-500 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md">
                <div className="flex items-center gap-2.5">
                  <WifiOff className="h-5 w-5 shrink-0 text-rose-300 animate-bounce" />
                  <div>
                    <div className="font-bold text-sm flex items-center gap-2">
                      <span>Connection Dropped &bull; Billing Paused</span>
                      <span className="rounded bg-rose-700 px-2 py-0.5 text-xs font-mono text-white">
                        {billingState.graceSecondsRemaining}s grace window
                      </span>
                    </div>
                    <p className="text-rose-200 text-[11px] mt-0.5">
                      We detected a network interruption. Your consultation billing has stopped. Reconnect before the timer expires to resume automatically.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      billingEngineRef.current?.notifyReconnect();
                      setBillingState(billingEngineRef.current?.getState() || null);
                    }}
                    className="rounded-xl bg-[#6B8E5A] px-4 py-2 text-xs font-bold text-white hover:bg-[#58754a] transition-all shadow flex items-center gap-1.5"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reconnect Now</span>
                  </button>
                </div>
              </div>
            )}

            {/* Disconnect Testing & Resilience Bar (For verification and simulation) */}
            <div className="bg-[#FAF1E4] border-b border-[#E8D8C3] px-6 py-1.5 flex items-center justify-between text-[11px] text-[#7D6B5D]">
              <span>Resilience Diagnostics:</span>
              <div className="flex items-center gap-3">
                {!billingState?.isGracePeriod ? (
                  <button
                    type="button"
                    onClick={() => {
                      billingEngineRef.current?.notifyDisconnect();
                      setBillingState(billingEngineRef.current?.getState() || null);
                    }}
                    className="text-xs text-rose-700 hover:underline flex items-center gap-1"
                  >
                    <WifiOff className="h-3 w-3" />
                    <span>Test Network Drop (Pause Billing)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      billingEngineRef.current?.notifyReconnect();
                      setBillingState(billingEngineRef.current?.getState() || null);
                    }}
                    className="text-xs text-[#6B8E5A] font-bold hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>Test Network Restoration (Resume Billing)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Main Consultation Room Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
              {/* Left Column: Live Audio/Video & Client Kundli Summary */}
              <div className="lg:col-span-4 border-r border-[#E8D8C3] p-6 flex flex-col justify-between bg-[#FAF5EE]">
                <div>
                  <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-4 mb-5 text-xs space-y-2 shadow-sm">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7B2D26] font-temple block">
                      Consultation Context
                    </span>
                    <div className="flex justify-between text-[#6B5A4E]">
                      <span>Client:</span>
                      <strong className="text-[#3B2A1E]">{activeSession.userName}</strong>
                    </div>
                    <div className="flex justify-between text-[#6B5A4E]">
                      <span>Birth Time:</span>
                      <span>{activeSession.birthDetails.birthDate} ({activeSession.birthDetails.birthTime})</span>
                    </div>
                    <div className="flex justify-between text-[#6B5A4E]">
                      <span>Place:</span>
                      <span>{activeSession.birthDetails.birthPlace}</span>
                    </div>
                    <div className="border-t border-[#E8D8C3] pt-2 text-[#6B5A4E]">
                      <span className="text-[#7D6B5D] block mb-1">Primary Concern:</span>
                      <span className="text-[#7B2D26] italic">&ldquo;{activeSession.concern}&rdquo;</span>
                    </div>
                  </div>

                  {/* Audio/Video Call Control Panel */}
                  <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-4 text-center shadow-sm">
                    <div className="relative mx-auto mb-3 h-24 w-24 rounded-full border-2 border-[#E8A33D] p-1">
                      <img
                        src={PLACEHOLDER_ASTROLOGER.avatarUrl}
                        alt="Acharya Ji"
                        className="h-full w-full rounded-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-[#6B8E5A] ring-2 ring-white" />
                    </div>
                    <div className="text-xs font-bold text-[#3B2A1E] font-temple">Encrypted Vedic Bridge</div>
                    <div className="text-[11px] text-[#7D6B5D]">High-Definition Peer-to-Peer Connection</div>

                    <div className="mt-4 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className={`rounded-xl p-3 text-xs transition-all ${
                          isMuted
                            ? "bg-rose-600 text-white"
                            : "border border-[#D4C3B3] bg-[#FAF5EE] text-[#3B2A1E] hover:bg-[#F3E7D3]"
                        }`}
                      >
                        {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4 text-[#7B2D26]" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={`rounded-xl p-3 text-xs transition-all ${
                          isVideoOff
                            ? "bg-rose-600 text-white"
                            : "border border-[#D4C3B3] bg-[#FAF5EE] text-[#3B2A1E] hover:bg-[#F3E7D3]"
                        }`}
                      >
                        {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4 text-[#7B2D26]" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="text-center text-[11px] text-[#7D6B5D] mt-4 font-body">
                  Privacy Guaranteed &bull; 100% Confidential
                </div>
              </div>

              {/* Right Column: Live Interactive Chat Stream */}
              <div className="lg:col-span-8 p-6 flex flex-col justify-between bg-[#FFFDF9]">
                <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2">
                  <div className="text-center">
                    <span className="rounded-full bg-[#FAF1E4] border border-[#E8D8C3] px-3 py-1 text-[10px] font-semibold text-[#7D6B5D]">
                      Live Session Established &bull; Billed at ₹{activeSession.ratePerMin || ratePerMinute}/min (50% Off First Session)
                    </span>
                  </div>

                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex flex-col ${m.sender === "client" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-md rounded-2xl p-3.5 text-xs shadow-sm ${
                          m.sender === "client"
                            ? "bg-[#7B2D26] text-white rounded-br-none"
                            : "bg-[#FAF5EE] border border-[#E8D8C3] text-[#3B2A1E] rounded-bl-none"
                        }`}
                      >
                        <div className="text-[10px] opacity-75 font-semibold mb-1">
                          {m.sender === "client" ? "You" : PLACEHOLDER_ASTROLOGER.displayName} &bull; {m.timestamp}
                        </div>
                        <p className="leading-relaxed font-body">{m.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <form onSubmit={handleSendMessage} className="mt-4 flex gap-2 border-t border-[#E8D8C3] pt-4">
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    placeholder="Ask Acharya Ji anything regarding your chart, career, marriage..."
                    className="flex-1 rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-4 py-3 text-xs text-[#3B2A1E] placeholder-[#7D6B5D] focus:border-[#7B2D26] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#7B2D26] p-3 text-white hover:bg-[#64231D] transition-all font-bold shrink-0 shadow-sm"
                  >
                    <Send className="h-4 w-4 text-[#E8A33D]" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : myQueueItem ? (
          /* =========================================================================
             STATE 2: CURRENT USER IS WAITING IN LIVE QUEUE
          ========================================================================= */
          <div className="mx-auto max-w-2xl rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-8 text-center shadow-lg">
            <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#FAF1E4] text-[#7B2D26] border border-[#E8D8C3]">
              <Clock className="h-10 w-10 animate-spin text-[#C1662F]" />
            </div>

            <span className="rounded-full bg-[#FAF1E4] px-3 py-1 text-xs font-bold text-[#7B2D26] border border-[#E8D8C3] font-temple">
              YOU ARE IN THE LIVE CONSULTATION QUEUE
            </span>

            <h2 className="text-3xl font-bold font-temple text-[#3B2A1E] mt-4">
              Your Position: <span className="text-[#7B2D26] font-mono">#{myQueuePosition} in Line</span>
            </h2>

            <p className="mt-2 text-sm text-[#6B5A4E] font-body">
              Estimated wait time: <strong className="text-[#7B2D26]">~{estimatedWaitMins} Minutes</strong>
            </p>

            <div className="mt-6 rounded-2xl border border-[#E8D8C3] bg-[#FAF5EE] p-5 text-xs text-[#6B5A4E] space-y-2 text-left max-w-lg mx-auto">
              <div className="flex justify-between">
                <span className="text-[#7D6B5D]">Client Name:</span>
                <span className="font-bold text-[#3B2A1E]">{myQueueItem.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7D6B5D]">Consultation Mode:</span>
                <span className="font-bold uppercase text-[#7B2D26]">{myQueueItem.consultationType}</span>
              </div>
              {/* PLACEHOLDER: replace with real content */}
              <div className="flex justify-between">
                <span className="text-[#7D6B5D]">Applied Rate (50% Off First):</span>
                <span className="font-bold text-[#6B8E5A]">₹{ratePerMinute} / Minute</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7D6B5D]">Wallet Balance:</span>
                <span className="font-bold text-[#3B2A1E]">₹{walletBalance}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  AstrologerStateStore.removeFromQueue(myQueueItem.id);
                  setMyQueueItem(null);
                }}
                className="rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-5 py-2.5 text-xs font-semibold text-[#3B2A1E] hover:bg-[#F3E7D3]"
              >
                Leave Queue
              </button>

              {isAstrologer && (
                <Link
                  href="/astrologer"
                  className="rounded-xl bg-[#7B2D26] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#64231D] shadow-md transition-all"
                >
                  Open Astrologer Cockpit (Simulate Accept)
                </Link>
              )}
            </div>

            <p className="mt-6 text-[11px] text-[#7D6B5D]">
              Keep this tab open. A chime sound will alert you when Acharya Ji accepts your session.
            </p>
          </div>
        ) : (
          /* =========================================================================
             STATE 3: GENERAL CONSULTATION LANDING & INTAKE FORM
          ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Astrologer Real-Time Status & Value Proposition */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-sm">
                {/* Real-time Status Card */}
                {/* PLACEHOLDER: replace with real content */}
                <div className="flex items-center justify-between border-b border-[#E8D8C3] pb-5">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={PLACEHOLDER_ASTROLOGER.avatarUrl}
                        alt={PLACEHOLDER_ASTROLOGER.displayName}
                        className="h-14 w-14 rounded-2xl object-cover border-2 border-[#E8A33D]"
                      />
                      {status === "AVAILABLE" && (
                        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#6B8E5A] ring-2 ring-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold font-temple text-[#3B2A1E] text-base">
                        {PLACEHOLDER_ASTROLOGER.displayName}
                      </h3>
                      <div className="text-xs text-[#C1662F] font-semibold">
                        {PLACEHOLDER_ASTROLOGER.experienceText}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#7D6B5D] mt-0.5 font-body">
                        <Star className="h-3 w-3 fill-[#E8A33D] text-[#E8A33D]" />
                        <span className="font-bold text-[#3B2A1E]">4.98</span>
                        <span>({PLACEHOLDER_ASTROLOGER.followersCount} Followers)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Callout Pill */}
                <div className="mt-5 rounded-2xl border border-[#E8D8C3] bg-[#FAF5EE] p-4">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-[#7D6B5D] uppercase tracking-wider text-[10px]">Real-Time Status</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        status === "AVAILABLE"
                          ? "bg-[#6B8E5A]/20 text-[#6B8E5A] border border-[#6B8E5A]/30"
                          : status === "BUSY"
                          ? "bg-[#E8A33D]/20 text-[#C1662F] border border-[#E8A33D]/30"
                          : "bg-slate-200 text-[#7D6B5D]"
                      }`}
                    >
                      {status === "AVAILABLE" ? "ONLINE (AVAILABLE)" : status === "BUSY" ? "IN CONSULTATION" : status}
                    </span>
                  </div>

                  <p className="text-xs text-[#6B5A4E] leading-relaxed font-body">
                    {status === "AVAILABLE" && `${PLACEHOLDER_ASTROLOGER.displayName} is at his desk and ready to connect right now.`}
                    {status === "BUSY" && `${PLACEHOLDER_ASTROLOGER.displayName} is currently reading a client chart. ${queue.length} in queue. Estimated wait: ~${(queue.length + 1) * 7} mins.`}
                    {status === "BREAK" && "Acharya Ji is on a brief tea/sadhana break. Resuming live sessions shortly."}
                    {status === "OFFLINE" && "Acharya Ji is offline. Pre-book an appointment slot below for tomorrow."}
                  </p>
                </div>

                {/* Pricing & Transparency (Admin-Editable Sample Pricing) */}
                {/* PLACEHOLDER: replace with real content */}
                <div className="mt-5 space-y-3 text-xs">
                  <div className="rounded-xl border border-[#E8A33D]/40 bg-[#FAF1E4] p-3 text-xs">
                    <div className="font-bold text-[#7B2D26] flex items-center gap-1.5 font-temple">
                      <Sparkles className="h-3.5 w-3.5 text-[#E8A33D]" />
                      <span>{FIRST_CONSULTATION_OFFER.description}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#E8D8C3]/80 pb-2 font-body">
                    <span className="text-[#7D6B5D]">Live Chat Rate:</span>
                    <span className="font-bold text-[#3B2A1E]">
                      ₹{ADMIN_CONFIGURABLE_PRICING.chat.ratePerMinute}/min{" "}
                      <span className="text-[#6B8E5A] font-bold">
                        (First: ₹{ADMIN_CONFIGURABLE_PRICING.chat.effectiveFirstTimeRate}/min)
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#E8D8C3]/80 pb-2 font-body">
                    <span className="text-[#7D6B5D]">Voice Call Rate:</span>
                    <span className="font-bold text-[#3B2A1E]">
                      ₹{ADMIN_CONFIGURABLE_PRICING.voice.ratePerMinute}/min{" "}
                      <span className="text-[#6B8E5A] font-bold">
                        (First: ₹{ADMIN_CONFIGURABLE_PRICING.voice.effectiveFirstTimeRate}/min)
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-[#E8D8C3]/80 pb-2 font-body">
                    <span className="text-[#7D6B5D]">Video Call Rate:</span>
                    <span className="font-bold text-[#3B2A1E]">
                      ₹{ADMIN_CONFIGURABLE_PRICING.video.ratePerMinute}/min{" "}
                      <span className="text-[#6B8E5A] font-bold">
                        (First: ₹{ADMIN_CONFIGURABLE_PRICING.video.effectiveFirstTimeRate}/min)
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between font-body">
                    <span className="text-[#7D6B5D]">Current Wallet:</span>
                    <span className="font-bold text-[#7B2D26]">₹{walletBalance}</span>
                  </div>
                </div>

                {/* Pre-book Appointment Option */}
                <div className="mt-6 border-t border-[#E8D8C3] pt-5">
                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] py-3 text-xs font-bold text-[#3B2A1E] hover:bg-[#F3E7D3] transition-all shadow-sm"
                  >
                    <Calendar className="h-4 w-4 text-[#C1662F]" />
                    <span>Prefer a Scheduled Time? Book 30m Slot</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Intake Form to Join Queue / Enter Room */}
            <div className="lg:col-span-7 rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B2D26] text-white font-bold">
                  <PhoneCall className="h-5 w-5 text-[#E8A33D]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-temple text-[#7B2D26]">Start 1-on-1 Consultation</h3>
                  <p className="text-xs text-[#7D6B5D] font-body">
                    Direct access to {PLACEHOLDER_ASTROLOGER.displayName}. No third-party advisors.
                  </p>
                </div>
              </div>

              <form onSubmit={handleStartConsultation} className="space-y-4">
                {/* Consultation Channel Selection (Chat, Voice, Video) */}
                {/* PLACEHOLDER: replace with real content */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#3B2A1E] mb-2 font-temple">
                    Select Consultation Mode &amp; Pricing
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setConsultType("chat")}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                        consultType === "chat"
                          ? "border-[#7B2D26] bg-[#FAF1E4] text-[#7B2D26] ring-1 ring-[#7B2D26]/30 shadow-sm"
                          : "border-[#D4C3B3] bg-[#FAF5EE] text-[#7D6B5D] hover:bg-[#F3E7D3]"
                      }`}
                    >
                      <MessageSquare className="h-4 w-4 mb-1" />
                      <span className="text-xs font-bold">Live Chat</span>
                      <span className="text-[11px] font-mono mt-0.5 font-bold text-[#7B2D26]">
                        ₹{ADMIN_CONFIGURABLE_PRICING.chat.ratePerMinute}/m
                      </span>
                      <span className="text-[9px] text-[#6B8E5A] font-bold">First: ₹{ADMIN_CONFIGURABLE_PRICING.chat.effectiveFirstTimeRate}/m</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setConsultType("voice")}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                        consultType === "voice"
                          ? "border-[#7B2D26] bg-[#FAF1E4] text-[#7B2D26] ring-1 ring-[#7B2D26]/30 shadow-sm"
                          : "border-[#D4C3B3] bg-[#FAF5EE] text-[#7D6B5D] hover:bg-[#F3E7D3]"
                      }`}
                    >
                      <PhoneCall className="h-4 w-4 mb-1" />
                      <span className="text-xs font-bold">Voice Call</span>
                      <span className="text-[11px] font-mono mt-0.5 font-bold text-[#7B2D26]">
                        ₹{ADMIN_CONFIGURABLE_PRICING.voice.ratePerMinute}/m
                      </span>
                      <span className="text-[9px] text-[#6B8E5A] font-bold">First: ₹{ADMIN_CONFIGURABLE_PRICING.voice.effectiveFirstTimeRate}/m</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setConsultType("video")}
                      className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all ${
                        consultType === "video"
                          ? "border-[#7B2D26] bg-[#FAF1E4] text-[#7B2D26] ring-1 ring-[#7B2D26]/30 shadow-sm"
                          : "border-[#D4C3B3] bg-[#FAF5EE] text-[#7D6B5D] hover:bg-[#F3E7D3]"
                      }`}
                    >
                      <Video className="h-4 w-4 mb-1" />
                      <span className="text-xs font-bold">Video Call</span>
                      <span className="text-[11px] font-mono mt-0.5 font-bold text-[#7B2D26]">
                        ₹{ADMIN_CONFIGURABLE_PRICING.video.ratePerMinute}/m
                      </span>
                      <span className="text-[9px] text-[#6B8E5A] font-bold">First: ₹{ADMIN_CONFIGURABLE_PRICING.video.effectiveFirstTimeRate}/m</span>
                    </button>
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3.5 py-2.5 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Mobile (for SMS alert)</label>
                    <input
                      type="tel"
                      required
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3.5 py-2.5 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Birth Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Birth Date</label>
                    <input
                      type="date"
                      required
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Birth Time</label>
                    <input
                      type="time"
                      required
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">Birth City</label>
                    <input
                      type="text"
                      required
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3 py-2 text-xs text-[#3B2A1E] focus:border-[#7B2D26] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Primary Concern */}
                <div>
                  <label className="block text-xs font-semibold text-[#3B2A1E] mb-1">
                    What would you like to ask Acharya Ji?
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}
                    placeholder="e.g. Career dilemma, job change timing, marital compatibility, financial difficulties..."
                    className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] px-3.5 py-2.5 text-xs text-[#3B2A1E] placeholder-[#7D6B5D] focus:border-[#7B2D26] focus:outline-none leading-relaxed font-body"
                  />
                </div>

                {/* Wallet Balance Warning / Quick Top-up Link */}
                {walletBalance < ratePerMinute * 2 ? (
                  <div className="rounded-xl border border-[#C1662F]/40 bg-[#FAF1E4] p-3 flex items-center justify-between text-xs">
                    <span className="text-[#C1662F] font-semibold">
                      Wallet balance low (₹{walletBalance}). Minimum ₹{ratePerMinute * 2} required for 2 mins.
                    </span>
                    <Link
                      href="/wallet"
                      className="font-bold text-[#7B2D26] hover:underline"
                    >
                      Recharge Wallet &rarr;
                    </Link>
                  </div>
                ) : (
                  <div className="text-[11px] text-[#7D6B5D] font-body">
                    Wallet Balance: <strong className="text-[#6B8E5A]">₹{walletBalance}</strong> (Available talktime ~{Math.floor(walletBalance / ratePerMinute)} mins at ₹{ratePerMinute}/min).
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#7B2D26] py-4 font-bold text-white shadow-md hover:bg-[#64231D] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <PhoneCall className="h-4 w-4 text-[#E8A33D]" />
                  <span>
                    {status === "AVAILABLE" && queue.length === 0
                      ? `Connect Now (@ ₹${ratePerMinute}/min • 50% Off)`
                      : `Join Live Queue (Position #${queue.length + 1})`}
                  </span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Schedule Appointment Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3B2A1E]/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#E8D8C3] pb-4 mb-4">
                <h3 className="font-bold font-temple text-[#7B2D26] text-base">Schedule 30-Minute Consultation</h3>
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="text-[#7D6B5D] hover:text-[#3B2A1E] text-lg font-bold"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleBookAppointment} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#3B2A1E] font-semibold mb-1">Select Date</label>
                  <input
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] p-2.5 text-[#3B2A1E]"
                  />
                </div>

                <div>
                  <label className="block text-[#3B2A1E] font-semibold mb-1">Available 30m Slot</label>
                  <select
                    value={scheduledSlot}
                    onChange={(e) => setScheduledSlot(e.target.value)}
                    className="w-full rounded-xl border border-[#D4C3B3] bg-[#FAF5EE] p-2.5 text-[#3B2A1E]"
                  >
                    <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM IST</option>
                    <option value="03:00 PM - 03:30 PM">03:00 PM - 03:30 PM IST</option>
                    <option value="05:30 PM - 06:00 PM">05:30 PM - 06:00 PM IST</option>
                    <option value="07:30 PM - 08:00 PM">07:30 PM - 08:00 PM IST</option>
                  </select>
                </div>

                <div className="rounded-xl border border-[#E8D8C3] bg-[#FAF5EE] p-3">
                  <div className="flex justify-between text-[#6B5A4E] mb-1">
                    <span>Dedicated 30m In-depth Fee:</span>
                    <strong className="text-[#7B2D26] font-bold">₹499</strong>
                  </div>
                  <span className="text-[10px] text-[#7D6B5D]">Includes full horoscope PDF and audio recording.</span>
                </div>

                <button
                  type="submit"
                  disabled={scheduleSuccess}
                  className="w-full rounded-xl bg-[#7B2D26] py-3 font-bold text-white hover:bg-[#64231D] transition-all shadow-sm"
                >
                  {scheduleSuccess ? "Booking Confirmed..." : "Confirm & Pay via UPI / Card"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
