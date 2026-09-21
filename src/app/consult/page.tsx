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
import { INDIAN_CITIES } from "@/lib/astrology/indianCities";
import {
  PhoneCall,
  Video,
  MessageSquare,
  Clock,
  Wallet,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  User,
  Send,
  PhoneOff,
  Mic,
  MicOff,
  VideoOff,
  CheckCircle,
  ArrowRight,
  FileText,
  Calendar,
  Star,
  RefreshCw
} from "lucide-react";

export default function ConsultPage() {
  // Live State
  const [status, setStatus] = useState<AstrologerStatus>("AVAILABLE");
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);
  const [walletBalance, setWalletBalance] = useState(250);

  // Client Consultation Form State
  const [userName, setUserName] = useState("Aarav Sharma");
  const [userPhone, setUserPhone] = useState("+91 98765 43210");
  const [consultType, setConsultType] = useState<"chat" | "call">("chat");
  const [birthDate, setBirthDate] = useState("1995-10-24");
  const [birthTime, setBirthTime] = useState("14:35");
  const [birthPlace, setBirthPlace] = useState("New Delhi, Delhi");
  const [concern, setConcern] = useState("Seeking career guidance and timing for job switch");

  // In-Queue state for current user
  const [myQueueItem, setMyQueueItem] = useState<QueueItem | null>(null);

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

  // Timer effect when session is active
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeSession) {
      timer = setInterval(() => {
        setSessionSeconds((prev) => {
          const nextSec = prev + 1;
          // Deduct 1 min from wallet every 60s
          if (nextSec % 60 === 0) {
            AstrologerStateStore.deductWalletBalance(19);
          }
          return nextSec;
        });
      }, 1000);
    } else {
      setSessionSeconds(0);
    }
    return () => clearInterval(timer);
  }, [activeSession]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Join Live Queue or Start Instant Session
  const handleStartConsultation = (e: React.FormEvent) => {
    e.preventDefault();

    if (walletBalance < 38) {
      alert("Please maintain a minimum wallet balance of ₹38 (for 2 mins talktime). Please recharge below.");
      return;
    }

    const cityObj = INDIAN_CITIES.find((c) => birthPlace.includes(c.name)) || INDIAN_CITIES[0];

    const newItem = AstrologerStateStore.addToQueue({
      userId: `user-${Date.now()}`,
      userName,
      userPhone,
      consultationType: consultType,
      birthDetails: {
        name: userName,
        gender: "male",
        birthDate,
        birthTime,
        birthPlace,
        latitude: cityObj.latitude,
        longitude: cityObj.longitude,
        timezone: cityObj.timezone,
      },
      concern,
    });

    setMyQueueItem(newItem);

    // If astrologer is immediately available, auto-connect after a simulated handshake
    if (status === "AVAILABLE" && queue.length === 0) {
      setTimeout(() => {
        const session = AstrologerStateStore.startSessionFromQueue(newItem.id);
        setActiveSession(session);
        setMyQueueItem(null);
      }, 1200);
    }
  };

  // Send Message in Active Chat
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeSession) return;

    const userMessage = AstrologerStateStore.sendMessage(activeSession.id, "user", inputMsg.trim());
    setMessages((prev) => [...prev, userMessage]);
    setInputMsg("");

    // Simulate Astrologer reply after 2 seconds
    setTimeout(() => {
      const replies = [
        "Aapki kundli me Brihaspati (Jupiter) ka dasha chal raha hai. Yeh parivartan ka shubh yog bana raha hai.",
        "Aapke 10th house (Karma Bhava) par Shani ki drishti hai. Job switch me thoda dhyan rakhein, October ke baad naya offer swikaar karein.",
        "Career me sthirta ke liye Vishnu Sahasranama ka paath karein ya Guruvar ko chane ki daal daan karein.",
        "Aapka Lagna Lord balwan hai. Confident rahein, aane wala samay aapke anukool hai."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const astroMsg = AstrologerStateStore.sendMessage(activeSession.id, "astrologer", randomReply);
      setMessages((prev) => [...prev, astroMsg]);
    }, 2200);
  };

  // End Session
  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this consultation session?")) {
      AstrologerStateStore.endSession();
      setActiveSession(null);
      setMyQueueItem(null);
      alert("Consultation completed. Your session summary and remedies have been saved to your account!");
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
    <div className="bg-[#0B0F19] py-8 lg:py-12 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            STATE 1: ACTIVE LIVE CONSULTATION SESSION (SPLIT CHAT / CALL SCREEN)
        ========================================================================= */}
        {activeSession ? (
          <div className="rounded-3xl border-2 border-amber-500/40 bg-slate-900/90 shadow-2xl backdrop-blur-2xl overflow-hidden">
            {/* Session Top Bar: Live Billing Timer & Astrologer Details */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={INITIAL_ASTROLOGER.avatarUrl}
                    alt="Acharya Rajesh Sharma"
                    className="h-11 w-11 rounded-full object-cover border-2 border-amber-500"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">Acharya Rajesh Sharma</h3>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                      LIVE CONSULTATION
                    </span>
                  </div>
                  <div className="text-xs text-amber-300/80">
                    Vedic Jyotish &bull; Client: {activeSession.userName}
                  </div>
                </div>
              </div>

              {/* Billing HUD */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 font-mono text-xs text-amber-300">
                  <Clock className="h-4 w-4 animate-pulse text-amber-400" />
                  <span className="font-bold">
                    {Math.floor(sessionSeconds / 60).toString().padStart(2, "0")}:
                    {(sessionSeconds % 60).toString().padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-slate-400">(@ ₹19/min)</span>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs">
                  <Wallet className="h-4 w-4 text-emerald-400" />
                  <span className="font-bold text-white">Wallet: ₹{walletBalance}</span>
                </div>

                <button
                  type="button"
                  onClick={handleEndSession}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-500 transition-all flex items-center gap-1.5 shadow-lg shadow-rose-600/20"
                >
                  <PhoneOff className="h-4 w-4" />
                  <span>End Session</span>
                </button>
              </div>
            </div>

            {/* Main Consultation Room Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
              {/* Left Column: Live Audio/Video & Client Kundli Summary */}
              <div className="lg:col-span-4 border-r border-slate-800 p-6 flex flex-col justify-between bg-slate-950/40">
                <div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 mb-5 text-xs space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                      Consultation Context
                    </span>
                    <div className="flex justify-between text-slate-300">
                      <span>Client:</span>
                      <strong className="text-white">{activeSession.userName}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Birth Time:</span>
                      <span>{activeSession.birthDetails.birthDate} ({activeSession.birthDetails.birthTime})</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Place:</span>
                      <span>{activeSession.birthDetails.birthPlace}</span>
                    </div>
                    <div className="border-t border-slate-800 pt-2 text-slate-300">
                      <span className="text-slate-400 block mb-1">Primary Concern:</span>
                      <span className="text-amber-200/90 italic">&ldquo;{activeSession.concern}&rdquo;</span>
                    </div>
                  </div>

                  {/* Audio/Video Call Control Panel */}
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-center">
                    <div className="relative mx-auto mb-3 h-24 w-24 rounded-full border-2 border-amber-500/60 p-1">
                      <img
                        src={INITIAL_ASTROLOGER.avatarUrl}
                        alt="Astrologer"
                        className="h-full w-full rounded-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white">Audio Link Active</div>
                    <div className="text-[11px] text-emerald-400 font-medium">Encrypted WebRTC P2P Stream</div>

                    <div className="mt-4 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsMuted(!isMuted)}
                        className={`rounded-xl p-2.5 text-xs font-semibold transition-all ${
                          isMuted ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                        }`}
                        title={isMuted ? "Unmute" : "Mute Microphone"}
                      >
                        {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={`rounded-xl p-2.5 text-xs font-semibold transition-all ${
                          isVideoOff ? "bg-rose-600 text-white" : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                        }`}
                        title={isVideoOff ? "Start Video" : "Stop Video"}
                      >
                        {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-3 text-[11px] text-slate-400 text-center mt-4">
                  100% Private &amp; Confidential. Session notes and remedies will be accessible under &ldquo;My Account&rdquo;.
                </div>
              </div>

              {/* Right Column: Live Chat Messenger */}
              <div className="lg:col-span-8 flex flex-col justify-between bg-slate-900/50">
                {/* Message Log */}
                <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[460px]">
                  {messages.map((m) => {
                    const isMe = m.sender === "user";
                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-md rounded-2xl p-4 text-xs leading-relaxed shadow-lg ${
                            isMe
                              ? "bg-amber-500 text-slate-950 font-medium rounded-br-none"
                              : "bg-slate-800 text-slate-100 border border-slate-700/80 rounded-bl-none"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-4 mb-1 text-[10px] opacity-75 font-semibold">
                            <span>{isMe ? "You" : "Acharya Rajesh Sharma"}</span>
                            <span>{m.timestamp}</span>
                          </div>
                          <p>{m.text}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input Bar */}
                <form
                  onSubmit={handleSendMessage}
                  className="border-t border-slate-800 bg-slate-950/80 p-4 flex items-center gap-3"
                >
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    placeholder="Ask Acharya Ji anything regarding your chart, career, marriage..."
                    className="flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-xs text-white placeholder-slate-400 focus:border-amber-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-amber-500 p-3 text-slate-950 hover:bg-amber-400 transition-all font-bold shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : myQueueItem ? (
          /* =========================================================================
             STATE 2: CURRENT USER IS WAITING IN LIVE QUEUE
          ========================================================================= */
          <div className="mx-auto max-w-2xl rounded-3xl border border-amber-500/40 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-8 text-center backdrop-blur-2xl shadow-2xl">
            <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Clock className="h-10 w-10 animate-spin" />
            </div>

            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
              YOU ARE IN THE LIVE CONSULTATION QUEUE
            </span>

            <h2 className="text-3xl font-extrabold text-white mt-4">
              Your Position: <span className="text-amber-400 font-mono">#{myQueuePosition} in Line</span>
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              Estimated wait time: <strong className="text-amber-300">~{estimatedWaitMins} Minutes</strong>
            </p>

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 text-xs text-slate-300 space-y-2 text-left max-w-lg mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Client Name:</span>
                <span className="font-bold text-white">{myQueueItem.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Consultation Mode:</span>
                <span className="font-bold uppercase text-amber-400">{myQueueItem.consultationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Introductory Rate:</span>
                <span className="font-bold text-emerald-400">₹19 / Minute</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Wallet Balance:</span>
                <span className="font-bold text-white">₹{walletBalance}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  AstrologerStateStore.removeFromQueue(myQueueItem.id);
                  setMyQueueItem(null);
                }}
                className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Leave Queue
              </button>

              <Link
                href="/astrologer"
                className="rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20"
              >
                Open Astrologer Cockpit (Simulate Accept)
              </Link>
            </div>

            <p className="mt-6 text-[11px] text-slate-500">
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
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
                {/* Real-time Status Card */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={INITIAL_ASTROLOGER.avatarUrl}
                        alt="Acharya Rajesh Sharma"
                        className="h-14 w-14 rounded-2xl object-cover border-2 border-amber-500/60"
                      />
                      {status === "AVAILABLE" && (
                        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">Acharya Rajesh Sharma</h3>
                      <div className="text-xs text-amber-400 font-medium">
                        18+ Years Exp &bull; Varanasi Gold Medalist
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-200">4.98</span>
                        <span>(12,850+ Consultations)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Callout Pill */}
                <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px]">Real-Time Status</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] ${
                        status === "AVAILABLE"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : status === "BUSY"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          : "bg-slate-700 text-slate-300"
                      }`}
                    >
                      {status === "AVAILABLE" ? "ONLINE (AVAILABLE)" : status === "BUSY" ? "IN CONSULTATION" : status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {status === "AVAILABLE" && "Acharya Ji is at his desk and ready to connect right now."}
                    {status === "BUSY" && `Acharya Ji is currently reading a client chart. ${queue.length} in queue. Estimated wait: ~${(queue.length + 1) * 7} mins.`}
                    {status === "BREAK" && "Acharya Ji is on a brief tea/sadhana break. Resuming live sessions shortly."}
                    {status === "OFFLINE" && "Acharya Ji is offline. Pre-book an appointment slot below for tomorrow."}
                  </p>
                </div>

                {/* Pricing & Transparency */}
                <div className="mt-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Introductory Rate:</span>
                    <span className="font-bold text-emerald-400">₹19 / minute (First Session)</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Standard Rate:</span>
                    <span className="font-medium text-slate-300">₹35 / minute</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Current Wallet:</span>
                    <span className="font-bold text-amber-300">₹{walletBalance}</span>
                  </div>
                </div>

                {/* Pre-book Appointment Option */}
                <div className="mt-6 border-t border-slate-800 pt-5">
                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-all"
                  >
                    <Calendar className="h-4 w-4 text-amber-400" />
                    <span>Prefer a Scheduled Time? Book 30m Slot</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Intake Form to Join Queue / Enter Room */}
            <div className="lg:col-span-7 rounded-3xl border border-amber-500/30 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-slate-950 font-black">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Start 1-on-1 Consultation</h3>
                  <p className="text-xs text-amber-200/70">
                    Direct access to Acharya Rajesh Sharma. No third-party advisors.
                  </p>
                </div>
              </div>

              <form onSubmit={handleStartConsultation} className="space-y-4">
                {/* Consultation Channel Selection */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Select Consultation Mode
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setConsultType("chat")}
                      className={`flex items-center justify-center gap-2.5 rounded-xl border p-3.5 text-xs font-bold transition-all ${
                        consultType === "chat"
                          ? "border-amber-500 bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30"
                          : "border-slate-800 bg-slate-800/60 text-slate-400 hover:text-white"
                      }`}
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Live Chat Consultation</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setConsultType("call")}
                      className={`flex items-center justify-center gap-2.5 rounded-xl border p-3.5 text-xs font-bold transition-all ${
                        consultType === "call"
                          ? "border-amber-500 bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/30"
                          : "border-slate-800 bg-slate-800/60 text-slate-400 hover:text-white"
                      }`}
                    >
                      <PhoneCall className="h-4 w-4" />
                      <span>Audio / Video Call</span>
                    </button>
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Mobile (for SMS alert)</label>
                    <input
                      type="tel"
                      required
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Birth Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Birth Date</label>
                    <input
                      type="date"
                      required
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Birth Time</label>
                    <input
                      type="time"
                      required
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Birth City</label>
                    <input
                      type="text"
                      required
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-white focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Primary Concern */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    What would you like to ask Acharya Ji?
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={concern}
                    onChange={(e) => setConcern(e.target.value)}
                    placeholder="e.g. Career dilemma, job change timing, marital compatibility, financial difficulties..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Wallet Balance Warning / Quick Top-up Link */}
                {walletBalance < 38 ? (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 flex items-center justify-between text-xs">
                    <span className="text-rose-300">
                      Wallet balance low (₹{walletBalance}). Minimum ₹38 required.
                    </span>
                    <Link
                      href="/wallet"
                      className="font-bold text-amber-400 hover:underline"
                    >
                      Recharge Wallet &rarr;
                    </Link>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400">
                    Wallet Balance: <strong className="text-emerald-400">₹{walletBalance}</strong> (Available talktime ~{Math.floor(walletBalance / 19)} mins).
                  </div>
                )}

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 py-4 font-bold text-slate-950 shadow-xl shadow-amber-500/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>
                    {status === "AVAILABLE" && queue.length === 0
                      ? "Connect Now (Direct Live Session)"
                      : `Join Live Queue (Position #${queue.length + 1})`}
                  </span>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Schedule Appointment Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
            <div className="w-full max-w-md rounded-3xl border border-amber-500/40 bg-slate-900 p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <h3 className="font-bold text-white text-base">Schedule 30-Minute Consultation</h3>
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleBookAppointment} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Select Date</label>
                  <input
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Available 30m Slot</label>
                  <select
                    value={scheduledSlot}
                    onChange={(e) => setScheduledSlot(e.target.value)}
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-white"
                  >
                    <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM IST</option>
                    <option value="03:00 PM - 03:30 PM">03:00 PM - 03:30 PM IST</option>
                    <option value="05:30 PM - 06:00 PM">05:30 PM - 06:00 PM IST</option>
                    <option value="07:30 PM - 08:00 PM">07:30 PM - 08:00 PM IST</option>
                  </select>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Dedicated 30m In-depth Fee:</span>
                    <strong className="text-amber-400">₹999</strong>
                  </div>
                  <span className="text-[10px] text-slate-500">Includes full horoscope PDF and audio recording.</span>
                </div>

                <button
                  type="submit"
                  disabled={scheduleSuccess}
                  className="w-full rounded-xl bg-amber-500 py-3 font-bold text-slate-950 hover:bg-amber-400 transition-all"
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
