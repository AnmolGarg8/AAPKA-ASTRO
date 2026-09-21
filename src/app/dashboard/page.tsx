"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AstrologerStateStore } from "@/lib/store/astrologerStore";
import {
  User,
  PhoneCall,
  Sparkles,
  FileText,
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
    <div className="bg-[#FBF3E7] py-8 lg:py-16 min-h-screen text-[#3B2A1E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* User Top Profile Ribbon */}
        <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 md:p-8 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAF1E4] text-[#7B2D26] font-bold border border-[#E8D8C3] font-temple text-2xl">
                AS
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold font-temple text-[#7B2D26]">Aarav Sharma</h1>
                  <span className="rounded-full bg-[#6B8E5A]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#6B8E5A] border border-[#6B8E5A]/30">
                    VERIFIED CLIENT
                  </span>
                </div>
                <div className="text-xs text-[#7D6B5D] mt-1 font-body">
                  +91 98765 43210 &bull; Member since March 2025
                </div>
              </div>
            </div>

            {/* Wallet & Quick Action */}
            <div className="flex items-center gap-4">
              <div className="rounded-2xl border border-[#E8D8C3] bg-[#FAF5EE] p-4 text-right">
                <span className="text-[10px] uppercase font-bold text-[#7D6B5D] block font-temple">
                  Wallet Balance
                </span>
                <span className="text-2xl font-bold font-temple text-[#7B2D26]">
                  ₹{wallet}
                </span>
              </div>

              <Link
                href="/wallet"
                className="rounded-xl bg-[#7B2D26] px-5 py-3 text-xs font-bold text-white hover:bg-[#64231D] transition-all shadow-sm"
              >
                + Add Money
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Saved Birth Profiles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E8D8C3] pb-4 mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#7B2D26] font-temple flex items-center gap-2">
                  <User className="h-4 w-4 text-[#E8A33D]" />
                  <span>Saved Janam Kundlis</span>
                </h3>
                <Link
                  href="/kundli"
                  className="flex items-center gap-1 text-xs font-semibold text-[#C1662F] hover:text-[#7B2D26]"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>New Chart</span>
                </Link>
              </div>

              <div className="space-y-3">
                {savedProfiles.map((p, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-[#E8D8C3] bg-[#FAF5EE] p-4 hover:border-[#D4C3B3] transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold font-temple text-[#3B2A1E] text-sm">{p.name}</span>
                      <Link
                        href="/kundli"
                        className="text-[11px] font-bold text-[#7B2D26] hover:underline"
                      >
                        Open Chart &rarr;
                      </Link>
                    </div>
                    <div className="text-[11px] text-[#7D6B5D] font-body">
                      Born: {p.birthDate} at {p.birthTime} ({p.birthPlace})
                    </div>
                    <div className="mt-2 flex gap-2 text-[10px] font-mono text-[#6B5A4E]">
                      <span className="rounded bg-[#FFFDF9] border border-[#E8D8C3] px-2 py-0.5">Lagna: {p.lagna}</span>
                      <span className="rounded bg-[#FFFDF9] border border-[#E8D8C3] px-2 py-0.5">Moon: {p.rashi}</span>
                      <span className="rounded bg-[#FFFDF9] border border-[#E8D8C3] px-2 py-0.5">Nakshatra: {p.nakshatra}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Live Consult Prompt */}
            <div className="rounded-2xl border border-[#E8D8C3] bg-[#FAF1E4] p-6 shadow-sm">
              <h4 className="text-sm font-bold font-temple text-[#7B2D26] mb-1">Speak with Acharya Rajesh Sharma</h4>
              <p className="text-xs text-[#6B5A4E] leading-relaxed mb-4 font-body">
                Acharya Ji is currently available. Have questions about an upcoming decision?
              </p>
              <Link
                href="/consult"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#7B2D26] py-3 text-xs font-bold text-white hover:bg-[#64231D] shadow-sm transition-all"
              >
                <PhoneCall className="h-4 w-4 text-[#E8A33D]" />
                <span>Join Live Consultation Queue</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Past Consultations & Prescribed Remedies */}
          <div className="lg:col-span-7 space-y-6">
            {/* Consultation History */}
            <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-sm">
              <div className="border-b border-[#E8D8C3] pb-4 mb-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#7B2D26] font-temple flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#E8A33D]" />
                  <span>Consultation History &amp; Official Remedies</span>
                </h3>
              </div>

              <div className="space-y-4">
                {pastConsultations.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-2xl border border-[#E8D8C3] bg-[#FAF5EE] p-5 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E8D8C3] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-temple text-[#3B2A1E] text-sm">{c.topic}</span>
                          <span className="rounded bg-[#FFFDF9] border border-[#E8D8C3] px-2 py-0.5 text-[10px] font-mono text-[#7D6B5D]">
                            {c.mode}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#7D6B5D] mt-0.5 font-body">
                          {c.date} &bull; {c.duration} &bull; Billed: {c.amount}
                        </div>
                      </div>
                      <span className="rounded-full bg-[#6B8E5A]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#6B8E5A] border border-[#6B8E5A]/30">
                        COMPLETED
                      </span>
                    </div>

                    {/* Prescribed Remedy Card */}
                    <div className="rounded-xl border border-[#E8A33D]/50 bg-[#FFFDF9] p-3.5 shadow-sm">
                      <div className="flex items-center gap-1.5 text-xs font-bold font-temple text-[#7B2D26] mb-1">
                        <Sparkles className="h-3.5 w-3.5 text-[#E8A33D]" />
                        <span>Acharya Ji&apos;s Prescribed Remedy:</span>
                      </div>
                      <p className="text-xs text-[#6B5A4E] leading-relaxed italic font-body">
                        &ldquo;{c.remedy}&rdquo;
                      </p>
                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#E8D8C3] text-[11px]">
                        <span className="text-[#7D6B5D] font-body">Prescribed by {c.astrologer}</span>
                        <Link
                          href="/gemstones"
                          className="font-bold text-[#7B2D26] hover:text-[#C1662F] flex items-center gap-1 font-body"
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
