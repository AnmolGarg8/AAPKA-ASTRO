"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AstrologerStateStore } from "@/lib/store/astrologerStore";
import { ClientAccountStore } from "@/lib/store/clientAccountStore";
import { PLACEHOLDER_ASTROLOGER, ADMIN_CONFIGURABLE_PRICING } from "@/config/placeholderContent";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import {
  User,
  Wallet,
  PhoneCall,
  Sparkles,
  FileText,
  Clock,
  PlusCircle,
  Gem,
  ArrowRight,
  ShieldCheck,
  Star,
  CheckCircle2,
} from "lucide-react";

export default function ClientAccountDashboard() {
  const [wallet, setWallet] = useState(250);
  const profile = ClientAccountStore.getProfile();
  const savedKundlis = ClientAccountStore.getSavedKundlis();
  const consultations = ClientAccountStore.getConsultationHistory();
  const astrologerStatus = AstrologerStateStore.getStatus();

  useEffect(() => {
    setWallet(AstrologerStateStore.getWalletBalance());
    const sync = () => setWallet(AstrologerStateStore.getWalletBalance());
    window.addEventListener("astro_state_changed", sync);
    return () => window.removeEventListener("astro_state_changed", sync);
  }, []);

  return (
    <div className="bg-[#FBF3E7] text-[#3B2A1E] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top Profile Banner */}
        <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7B2D26] text-[#E8A33D] font-temple text-2xl font-bold shadow-md">
              {profile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-temple text-2xl font-bold text-[#7B2D26]">
                  Namaste, {profile.name}
                </h1>
                <span className="rounded-full bg-[#6B8E5A]/15 border border-[#6B8E5A]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#2A4720] flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Verified Seeker
                </span>
              </div>
              <p className="text-xs text-[#6E5545] mt-1">
                {profile.phone} • Member since {profile.joinedDate}
              </p>
            </div>
          </div>

          {/* Quick Wallet Box */}
          <div className="flex items-center gap-4 w-full md:w-auto bg-[#FBF3E7] p-4 rounded-2xl border border-[#E8D8C3]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6E5545] block">
                Available Wallet Balance
              </span>
              <div className="font-mono text-2xl font-black text-[#7B2D26]">
                ₹{wallet}
              </div>
              <span className="text-[10px] text-[#6B8E5A] font-semibold">
                ~{Math.floor(wallet / ADMIN_CONFIGURABLE_PRICING.chat.ratePerMinute)} mins talktime
              </span>
            </div>

            <Link
              href="/account/wallet"
              className="rounded-xl bg-[#E8A33D] px-4 py-2.5 text-xs font-bold text-[#3B2A1E] hover:bg-[#F6CF86] transition-all shadow-sm shrink-0"
            >
              + Recharge
            </Link>
          </div>
        </div>

        {/* Quick Actions Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link
            href="/account/consult"
            className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm hover:border-[#7B2D26] hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B2D26]/10 text-[#7B2D26]">
                <PhoneCall className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#6B8E5A]">
                <span className="h-2 w-2 rounded-full bg-[#6B8E5A] animate-pulse" />
                <span>{astrologerStatus}</span>
              </div>
            </div>
            <div>
              <h3 className="font-temple text-sm font-bold text-[#7B2D26] group-hover:text-[#C1662F]">
                Start Consultation
              </h3>
              <p className="text-[11px] text-[#6E5545] mt-0.5">Chat, Audio or Video</p>
            </div>
          </Link>

          <Link
            href="/account/kundli"
            className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm hover:border-[#7B2D26] hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C1662F]/10 text-[#C1662F]">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-[#7B2D26]">
                {savedKundlis.length} Charts
              </span>
            </div>
            <div>
              <h3 className="font-temple text-sm font-bold text-[#7B2D26] group-hover:text-[#C1662F]">
                Saved Kundlis
              </h3>
              <p className="text-[11px] text-[#6E5545] mt-0.5">Manage family profiles</p>
            </div>
          </Link>

          <Link
            href="/account/history"
            className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm hover:border-[#7B2D26] hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8A33D]/15 text-[#C1662F]">
                <Clock className="h-5 w-5" />
              </div>
              <span className="text-[11px] font-bold text-[#7B2D26]">
                {consultations.length} Sessions
              </span>
            </div>
            <div>
              <h3 className="font-temple text-sm font-bold text-[#7B2D26] group-hover:text-[#C1662F]">
                Remedies &amp; History
              </h3>
              <p className="text-[11px] text-[#6E5545] mt-0.5">Session summaries</p>
            </div>
          </Link>

          <Link
            href="/account/reviews"
            className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm hover:border-[#7B2D26] hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7B2D26]/10 text-[#E8A33D]">
                <Star className="h-5 w-5 fill-[#E8A33D]" />
              </div>
              <span className="text-[10px] font-bold text-[#6B8E5A]">Rate Session</span>
            </div>
            <div>
              <h3 className="font-temple text-sm font-bold text-[#7B2D26] group-hover:text-[#C1662F]">
                Submit Review
              </h3>
              <p className="text-[11px] text-[#6E5545] mt-0.5">Share your experience</p>
            </div>
          </Link>
        </div>

        {/* Two Columns: Saved Kundlis Quick Card + Recent Consultation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Saved Kundlis */}
          <div className="lg:col-span-6 rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-temple text-xl font-bold text-[#7B2D26]">
                Your Saved Janam Kundlis
              </h3>
              <Link
                href="/account/kundli"
                className="text-xs font-bold text-[#C1662F] hover:underline"
              >
                View All ({savedKundlis.length}) &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {savedKundlis.slice(0, 2).map((knd) => (
                <div
                  key={knd.id}
                  className="rounded-2xl border border-[#E8D8C3] bg-[#FBF3E7] p-4 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-temple text-sm font-bold text-[#7B2D26]">
                      {knd.name}
                    </h4>
                    <p className="text-[11px] text-[#6E5545]">
                      {knd.birthDate} • {knd.birthPlace}
                    </p>
                    <div className="mt-1 flex gap-2 text-[10px] font-semibold text-[#7B2D26]">
                      <span>Lagna: {knd.lagna}</span>
                      <span>•</span>
                      <span>Rashi: {knd.rashi}</span>
                    </div>
                  </div>

                  <Link
                    href="/kundli"
                    className="rounded-lg bg-[#FFFDF9] border border-[#E8D8C3] px-3 py-1.5 text-xs font-bold text-[#7B2D26] hover:bg-[#7B2D26] hover:text-white transition-all shadow-sm"
                  >
                    Open Chart
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Consultation Notes & Remedies */}
          <div className="lg:col-span-6 rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-temple text-xl font-bold text-[#7B2D26]">
                Recent Astrological Remedy
              </h3>
              <Link
                href="/account/history"
                className="text-xs font-bold text-[#C1662F] hover:underline"
              >
                Full History &rarr;
              </Link>
            </div>

            {consultations.length > 0 ? (
              <div className="rounded-2xl border border-[#E8A33D]/30 bg-[#FBF3E7] p-5">
                <div className="flex items-center justify-between text-xs text-[#6E5545] mb-2">
                  <span>{consultations[0].date} • {consultations[0].mode}</span>
                  <span className="font-bold text-[#7B2D26]">{consultations[0].id}</span>
                </div>
                <h4 className="font-temple text-sm font-bold text-[#7B2D26]">
                  {consultations[0].topic}
                </h4>
                <div className="mt-3 rounded-xl bg-[#FFFDF9] p-3 border border-[#E8D8C3] text-xs text-[#3B2A1E]">
                  <strong className="text-[#C1662F] block mb-1">Prescribed Vedic Remedy:</strong>
                  {consultations[0].remedy}
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#6E5545]">No consultation records found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
