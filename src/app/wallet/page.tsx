"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AstrologerStateStore } from "@/lib/store/astrologerStore";
import {
  Wallet,
  ShieldCheck,
  PhoneCall,
  Clock,
  QrCode,
  FileDown,
} from "lucide-react";
import { PLACEHOLDER_ASTROLOGER, ADMIN_CONFIGURABLE_PRICING } from "@/config/placeholderContent";

export const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState(250);
  const [selectedPack, setSelectedPack] = useState<number>(499);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

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
    <div className="bg-[#FBF3E7] py-8 lg:py-16 min-h-screen text-[#3B2A1E]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8D8C3] bg-[#FFFDF9] px-3.5 py-1 text-xs font-semibold text-[#7B2D26] shadow-sm mb-3 font-temple">
            <Wallet className="h-3.5 w-3.5 text-[#C1662F]" />
            <span>SECURE VEDIC CONSULTATION WALLET</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-temple text-[#7B2D26] tracking-tight">
            Consultation Balance &amp; Recharge
          </h1>
          <p className="mt-2 text-[#7D6B5D] text-xs sm:text-sm font-body">
            Top up your balance using UPI or Cards. Deductions occur second-by-second only during active consultations.
          </p>
        </div>

        {/* Current Balance Card */}
        <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-8 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7D6B5D] block font-temple">
                Available Wallet Balance
              </span>
              <div className="text-4xl sm:text-5xl font-bold font-temple text-[#7B2D26] mt-1">
                ₹{balance.toLocaleString("en-IN")}
              </div>
              {/* PLACEHOLDER: replace with real content */}
              <div className="text-xs text-[#6B5A4E] mt-2 flex items-center gap-2 font-body">
                <Clock className="h-4 w-4 text-[#6B8E5A]" />
                <span>
                  Valid for ~<strong>{Math.floor(balance / ADMIN_CONFIGURABLE_PRICING.chat.ratePerMinute)} Minutes</strong> of Live Consultation (@ ₹{ADMIN_CONFIGURABLE_PRICING.chat.ratePerMinute}/min)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/api/wallet/statement"
                download
                className="shrink-0 rounded-2xl border border-[#D4C3B3] bg-[#FAF5EE] px-4 py-3.5 text-xs font-bold text-[#3B2A1E] hover:bg-[#F3E7D3] shadow-sm flex items-center gap-2 transition-all"
              >
                <FileDown className="h-4 w-4 text-[#7B2D26]" />
                <span>Download Statement (CSV)</span>
              </a>

              <Link
                href="/consult"
                className="shrink-0 rounded-2xl bg-[#7B2D26] px-6 py-3.5 text-xs font-bold text-white hover:bg-[#64231D] shadow-md flex items-center gap-2 transition-all"
              >
                <PhoneCall className="h-4 w-4 text-[#E8A33D]" />
                <span>Use Balance &amp; Consult Now</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recharge Packs */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-temple text-[#7B2D26]">Select Recharge Pack</h3>
            <span className="rounded-full bg-[#6B8E5A]/15 px-3 py-0.5 text-xs font-bold text-[#6B8E5A] border border-[#6B8E5A]/30">
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
                  className={`cursor-pointer rounded-2xl border p-6 flex flex-col justify-between transition-all relative overflow-hidden ${
                    isSelected
                      ? "border-2 border-[#7B2D26] bg-[#FFFDF9] shadow-md ring-2 ring-[#7B2D26]/10"
                      : "border-[#E8D8C3] bg-[#FFFDF9] hover:border-[#D4C3B3] shadow-sm"
                  }`}
                >
                  {pack.popular && (
                    <div className="absolute top-0 right-0 bg-[#E8A33D] px-3 py-0.5 text-[10px] font-bold text-[#3B2A1E] rounded-bl-lg font-temple">
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    <span className="rounded bg-[#FAF1E4] px-2 py-0.5 text-[10px] font-bold text-[#7B2D26] border border-[#E8D8C3]">
                      {pack.tag}
                    </span>

                    <div className="text-3xl font-bold font-temple text-[#3B2A1E] mt-3">
                      ₹{pack.amount}
                    </div>

                    <div className="text-xs text-[#C1662F] font-bold mt-1">
                      Get ₹{pack.totalCredits} Balance
                    </div>

                    <div className="text-[11px] text-[#7D6B5D] mt-0.5 font-body">
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
                        ? "bg-[#7B2D26] text-white hover:bg-[#64231D] shadow-sm"
                        : "border border-[#D4C3B3] bg-[#FAF5EE] text-[#3B2A1E] hover:bg-[#F3E7D3]"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3B2A1E]/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 text-center shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#E8D8C3] pb-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7B2D26] font-temple">
                  Instant UPI Payment
                </span>
                <button
                  type="button"
                  onClick={() => setShowQRModal(false)}
                  className="text-[#7D6B5D] hover:text-[#3B2A1E] text-lg font-bold"
                >
                  &times;
                </button>
              </div>

              <div className="rounded-2xl border border-[#D4C3B3] bg-white p-4 mx-auto w-48 h-48 flex items-center justify-center mb-4 shadow-sm">
                <div className="flex flex-col items-center justify-center text-[#3B2A1E]">
                  <QrCode className="h-32 w-32 text-[#7B2D26]" />
                  <span className="text-[10px] font-mono font-bold mt-1 text-[#7D6B5D]">Scan via GPay / PhonePe / Paytm</span>
                </div>
              </div>

              <div className="text-sm font-bold font-temple text-[#3B2A1E] mb-1">
                Paying: ₹{selectedPack} (Total Credits: ₹{packs.find(p => p.amount === selectedPack)?.totalCredits})
              </div>
              <div className="text-xs text-[#7D6B5D] mb-6 font-body">UPI ID: aapkaastro@icici (Verified Merchant)</div>

              <button
                type="button"
                disabled={isProcessing}
                onClick={() => {
                  const p = packs.find(pk => pk.amount === selectedPack)!;
                  handleRecharge(p);
                }}
                className="w-full rounded-xl bg-[#7B2D26] py-3 text-xs font-bold text-white hover:bg-[#64231D] transition-all flex items-center justify-center gap-2 shadow-sm"
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
        <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 text-xs text-[#6B5A4E] shadow-sm">
          <div className="flex items-center gap-2 font-bold font-temple text-[#7B2D26] mb-2">
            <ShieldCheck className="h-4 w-4 text-[#6B8E5A]" />
            <span>Aapka Astro Consumer Trust Guarantee</span>
          </div>
          <ul className="space-y-1.5 text-[#7D6B5D] list-disc list-inside font-body">
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
