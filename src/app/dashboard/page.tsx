"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AstrologerStateStore } from "@/lib/store/astrologerStore";
import {
  User,
  Wallet,
  PhoneCall,
  Clock,
  Sparkles,
  FileText,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
  Gem,
} from "lucide-react";

export default function DashboardPage() {
  const [wallet, setWallet] = useState(250);

  useEffect(() => {
    setWallet(AstrologerStateStore.getWalletBalance());
    const sync = () => setWallet(AstrologerStateStore.getWalletBalance());
    window.addEventListener("astro_state_changed", sync);
    return () => window.removeEventListener("astro_state_changed", sync);
  }, []);

  const savedProfiles = [
    {
      name: "Aarav Sharma (Self)",
      birthDate: "24 Oct 1995",
      birthTime: "14:35",
      birthPlace: "New Delhi",
      lagna: "Capricorn",
      rashi: "Libra",
      nakshatra: "Swati",
    },
    {
      name: "Meera Kapoor (Spouse / Partner)",
      birthDate: "12 Apr 1997",
      birthTime: "09:15",
      birthPlace: "Jaipur",
      lagna: "Gemini",
      rashi: "Taurus",
      nakshatra: "Rohini",
    },
  ];

  const pastConsultations = [
    {
      id: "CON-8842",
      date: "18 Sep 2026",
      duration: "14 Minutes",
      mode: "Audio Call",
      amount: "₹266",
      astrologer: "Acharya Rajesh Sharma",
      topic: "Career Promotion & Foreign Relocation Dasha",
      remedy: "Chant Brihaspati Beej Mantra 108 times on Thursdays. Wear 6.25 Ratti Yellow Sapphire.",
    },
    {
      id: "CON-7104",
      date: "04 Aug 2026",
      duration: "21 Minutes",
      mode: "Live Chat",
      amount: "₹399",
      astrologer: "Acharya Rajesh Sharma",
      topic: "Kundli Milan & Manglik dosha balancing",
      remedy: "Gauri Shankar Rudraksha recommendation. Perform Sunday Aditya Hridaya Stotra.",
    },
  ];

  return (
    <div className="bg-[#0B0F19] py-8 lg:py-16 min-h-screen text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* User Top Profile Ribbon */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 md:p-8 backdrop-blur-2xl shadow-2xl mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30 text-2xl">
                AS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">Aarav Sharma</h1>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                    VERIFIED CLIENT
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  +91 98765 43210 &bull; Member since March 2025
                </div>
              </div>
            </div>

            {/* Wallet & Quick Action */}
            <div className="flex items-center gap-4">
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Wallet Balance
                </span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  ₹{wallet}
                </span>
              </div>

              <Link
                href="/wallet"
                className="rounded-xl bg-amber-500 px-5 py-3 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
              >
                + Add Money
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Saved Birth Profiles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Saved Janam Kundlis</span>
                </h3>
                <Link
                  href="/kundli"
                  className="flex items-center gap-1 text-xs font-semibold text-amber-300 hover:text-white"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>New Chart</span>
                </Link>
              </div>

              <div className="space-y-3">
                {savedProfiles.map((p, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white text-sm">{p.name}</span>
                      <Link
                        href="/kundli"
                        className="text-[11px] font-bold text-amber-400 hover:underline"
                      >
                        Open Chart &rarr;
                      </Link>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Born: {p.birthDate} at {p.birthTime} ({p.birthPlace})
                    </div>
                    <div className="mt-2 flex gap-2 text-[10px] font-mono text-slate-300">
                      <span className="rounded bg-slate-800 px-2 py-0.5">Lagna: {p.lagna}</span>
                      <span className="rounded bg-slate-800 px-2 py-0.5">Moon: {p.rashi}</span>
                      <span className="rounded bg-slate-800 px-2 py-0.5">Nakshatra: {p.nakshatra}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Live Consult Prompt */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-[#1E1B4B]/30 to-slate-900 p-6">
              <h4 className="text-sm font-bold text-white mb-1">Speak with Acharya Rajesh Sharma</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Acharya Ji is currently available. Have questions about an upcoming decision?
              </p>
              <Link
                href="/consult"
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-slate-950 hover:bg-amber-400"
              >
                <PhoneCall className="h-4 w-4" />
                <span>Join Live Consultation Queue</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Past Consultations & Prescribed Remedies */}
          <div className="lg:col-span-7 space-y-6">
            {/* Consultation History */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              <div className="border-b border-slate-800 pb-4 mb-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Consultation History &amp; Official Remedies</span>
                </h3>
              </div>

              <div className="space-y-4">
                {pastConsultations.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{c.topic}</span>
                          <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-300">
                            {c.mode}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {c.date} &bull; {c.duration} &bull; Billed: {c.amount}
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                        COMPLETED
                      </span>
                    </div>

                    {/* Prescribed Remedy Card */}
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 mb-1">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Acharya Ji&apos;s Prescribed Remedy:</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        &ldquo;{c.remedy}&rdquo;
                      </p>
                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-amber-500/20 text-[11px]">
                        <span className="text-slate-400">Prescribed by {c.astrologer}</span>
                        <Link
                          href="/gemstones"
                          className="font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                        >
                          <Gem className="h-3 w-3" />
                          <span>View Prescribed Gemstone</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
