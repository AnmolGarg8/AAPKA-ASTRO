"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AstrologerStateStore } from "@/lib/store/astrologerStore";
import {
  Wallet,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Clock,
  ArrowRight,
  CreditCard,
  QrCode,
  Tag,
} from "lucide-react";

export const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState(250);
  const [selectedPack, setSelectedPack] = useState<number>(499);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [promoApplied, setPromoApplied] = useState(true);

  const packs = [
    {
      amount: 199,
      talktime: "~10 Mins",
      bonus: 0,
      totalCredits: 199,
      tag: "Starter",
      popular: false,
    },
    {
      amount: 499,
      talktime: "~28 Mins",
      bonus: 50,
      totalCredits: 549,
      tag: "Best Value",
      popular: true,
    },
    {
      amount: 999,
      talktime: "~60 Mins",
      bonus: 200,
      totalCredits: 1199,
      tag: "+₹200 Free",
      popular: false,
    },
    {
      amount: 2499,
      talktime: "~160 Mins",
      bonus: 600,
      totalCredits: 3099,
      tag: "+₹600 Free",
      popular: false,
    },
  ];

  const sync = () => {
    setBalance(AstrologerStateStore.getWalletBalance());
  };

  useEffect(() => {
    sync();
    window.addEventListener("astro_state_changed", sync);
    return () => window.removeEventListener("astro_state_changed", sync);
  }, []);

  const handleRecharge = (pack: (typeof packs)[0]) => {
    setIsProcessing(true);
    setTimeout(() => {
      AstrologerStateStore.addWalletBalance(pack.totalCredits);
      setIsProcessing(false);
      setShowQRModal(false);
      alert(`₹${pack.totalCredits} successfully credited to your Aapka Astro Wallet! You have ~${Math.floor((balance + pack.totalCredits) / 19)} mins of talktime.`);
    }, 1200);
  };

  return (
    <div className="bg-[#0B0F19] py-8 lg:py-16 min-h-screen text-slate-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 mb-3">
            <Wallet className="h-3.5 w-3.5" />
            <span>SECURE VEDIC CONSULTATION WALLET</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Consultation Balance &amp; Recharge
          </h1>
          <p className="mt-2 text-slate-400 text-xs sm:text-sm">
            Top up your balance using UPI or Cards. Deductions occur second-by-second only during active consultations.
          </p>
        </div>

        {/* Current Balance Card */}
        <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-r from-slate-900/90 via-[#1E1B4B]/80 to-slate-900/90 p-8 shadow-2xl backdrop-blur-2xl mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Available Wallet Balance
              </span>
              <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono mt-1">
                ₹{balance.toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-slate-300 mt-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span>
                  Valid for ~<strong>{Math.floor(balance / 19)} Minutes</strong> of Live Consultation with Acharya Ji (@ ₹19/min)
                </span>
              </div>
            </div>

            <Link
              href="/consult"
              className="shrink-0 rounded-2xl bg-amber-500 px-6 py-3.5 text-xs font-extrabold text-slate-950 hover:bg-amber-400 shadow-xl shadow-amber-500/20 flex items-center gap-2"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Use Balance &amp; Consult Now</span>
            </Link>
          </div>
        </div>

        {/* Recharge Packs */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Select Recharge Pack</h3>
            <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
              Special Intro Offer: Up to ₹600 Free Talktime
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packs.map((pack) => {
              const isSelected = selectedPack === pack.amount;
              return (
                <div
                  key={pack.amount}
                  onClick={() => setSelectedPack(pack.amount)}
                  className={`cursor-pointer rounded-2xl border p-6 flex flex-col justify-between transition-all backdrop-blur-xl relative overflow-hidden ${
                    isSelected
                      ? "border-amber-500 bg-slate-900/95 shadow-2xl shadow-amber-500/20 ring-2 ring-amber-500/40"
                      : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute top-0 right-0 bg-amber-500 px-3 py-0.5 text-[10px] font-extrabold text-slate-950 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                      {pack.tag}
                    </span>

                    <div className="text-3xl font-black text-white font-mono mt-3">
                      ₹{pack.amount}
                    </div>

                    <div className="text-xs text-amber-300 font-semibold mt-1">
                      Get ₹{pack.totalCredits} Balance
                    </div>

                    <div className="text-[11px] text-slate-400 mt-0.5">
                      Talktime: {pack.talktime}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowQRModal(true);
                    }}
                    className={`mt-6 w-full rounded-xl py-2.5 text-xs font-bold transition-all ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                        : "bg-slate-800 text-slate-200 hover:text-white"
                    }`}
                  >
                    Recharge ₹{pack.amount}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* UPI Payment Flow Simulation Modal */}
        {showQRModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
            <div className="w-full max-w-sm rounded-3xl border border-amber-500/40 bg-slate-900 p-6 text-center shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Instant UPI Payment
                </span>
                <button
                  type="button"
                  onClick={() => setShowQRModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  &times;
                </button>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-white p-4 mx-auto w-48 h-48 flex items-center justify-center mb-4 shadow-inner">
                <div className="flex flex-col items-center justify-center text-slate-950">
                  <QrCode className="h-32 w-32" />
                  <span className="text-[10px] font-mono font-bold mt-1">Scan via GPay / PhonePe / Paytm</span>
                </div>
              </div>

              <div className="text-sm font-bold text-white mb-1">
                Paying: ₹{selectedPack} (Total Credits: ₹{packs.find(p => p.amount === selectedPack)?.totalCredits})
              </div>
              <div className="text-xs text-slate-400 mb-6">UPI ID: aapkaastro@icici (Verified Merchant)</div>

              <button
                type="button"
                disabled={isProcessing}
                onClick={() => {
                  const p = packs.find(pk => pk.amount === selectedPack)!;
                  handleRecharge(p);
                }}
                className="w-full rounded-xl bg-amber-500 py-3 text-xs font-extrabold text-slate-950 hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Verifying UPI Transaction...</span>
                ) : (
                  <span>Simulate Successful Payment (Instant Credit)</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Trust & Guarantee Notes */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-xs text-slate-300">
          <div className="flex items-center gap-2 font-bold text-white mb-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Aapka Astro Consumer Trust Guarantee</span>
          </div>
          <ul className="space-y-1.5 text-slate-400 list-disc list-inside">
            <li>Unused wallet balance carries lifetime validity with zero expiry date.</li>
            <li>If a call drops prematurely or cannot connect, 100% of your credits are immediately restored.</li>
            <li>Instant 1-click refunds available upon request through our Varanasi desk.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
