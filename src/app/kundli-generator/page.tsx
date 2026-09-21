"use client";

import React, { useState } from "react";
import Link from "next/link";
import { KundliForm } from "@/components/kundli/KundliForm";
import { NorthIndianChart } from "@/components/kundli/NorthIndianChart";
import { SouthIndianChart } from "@/components/kundli/SouthIndianChart";
import { PlanetaryTable } from "@/components/kundli/PlanetaryTable";
import { DashaTimeline } from "@/components/kundli/DashaTimeline";
import { DoshaAnalysis } from "@/components/kundli/DoshaAnalysis";
import { calculateKundli } from "@/lib/astrology/chartCalculations";
import { KundliData } from "@/lib/astrology/types";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import {
  Sparkles,
  Download,
  BookmarkPlus,
  PhoneCall,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";

export default function KundliGeneratorPage() {
  const [kundli, setKundli] = useState<KundliData>(() =>
    calculateKundli({
      name: "Seeker",
      gender: "male",
      birthDate: "1998-06-15",
      birthTime: "11:20",
      birthPlace: "New Delhi, Delhi",
      latitude: 28.6139,
      longitude: 77.209,
      timezone: 5.5,
    })
  );

  const [chartType, setChartType] = useState<"north" | "south">("north");
  const [activeTab, setActiveTab] = useState<"chart" | "planets" | "dasha" | "dosha">("chart");
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  return (
    <div className="bg-[#FBF3E7] text-[#3B2A1E]">
      {/* 1. Header Banner */}
      <section className="border-b border-[#E8D8C3] bg-[#7B2D26] py-16 sm:py-20 text-[#FBF3E7]">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8A33D]/30 bg-[#64221C] px-4 py-1 text-xs font-bold text-[#E8A33D] mb-4">
            <DiyaIcon size={14} />
            <span>FREE VEDIC LEAD-GEN CALCULATOR</span>
          </div>

          <h1 className="font-temple text-3xl sm:text-5xl font-bold tracking-tight text-[#FBF3E7]">
            Free Online Janam Kundli Generator
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#FBF3E7]/80 max-w-2xl mx-auto font-body">
            Calculate your authentic Vedic birth chart, planetary degrees, Vimshottari Dasha, and Manglik status instantly without mandatory signup.
          </p>
        </div>
      </section>

      {/* 2. Generator Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C1662F] mb-2">
                  <Sparkles className="h-4 w-4 text-[#E8A33D]" />
                  <span>Enter Exact Birth Coordinates</span>
                </div>
                <h3 className="font-temple text-xl font-bold text-[#7B2D26] mb-6">
                  Birth Details Form
                </h3>
                <KundliForm onCalculated={setKundli} />
              </div>
            </div>

            {/* Chart Output Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 sm:p-8 shadow-sm">
                {/* Result header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E8D8C3]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C1662F]">
                      Vedic Horoscopic Synthesis
                    </span>
                    <h2 className="font-temple text-2xl font-bold text-[#7B2D26]">
                      {kundli.name}&apos;s Lagna Kundli
                    </h2>
                    <p className="text-xs text-[#6E5545]">
                      Born on {kundli.birthDate} at {kundli.birthTime} • {kundli.birthPlace}
                    </p>
                  </div>

                  {/* Format Toggle */}
                  <div className="flex rounded-xl bg-[#FBF3E7] p-1 border border-[#E8D8C3]">
                    <button
                      type="button"
                      onClick={() => setChartType("north")}
                      className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                        chartType === "north"
                          ? "bg-[#7B2D26] text-[#FBF3E7] shadow-sm"
                          : "text-[#6E5545] hover:text-[#3B2A1E]"
                      }`}
                    >
                      North Indian
                    </button>
                    <button
                      type="button"
                      onClick={() => setChartType("south")}
                      className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                        chartType === "south"
                          ? "bg-[#7B2D26] text-[#FBF3E7] shadow-sm"
                          : "text-[#6E5545] hover:text-[#3B2A1E]"
                      }`}
                    >
                      South Indian
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#E8D8C3] gap-2 pt-4">
                  {[
                    { id: "chart", label: "Lagna Chakra" },
                    { id: "planets", label: "Planetary Degrees" },
                    { id: "dasha", label: "Vimshottari Dasha" },
                    { id: "dosha", label: "Dosha Diagnosis" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as typeof activeTab)}
                      className={`pb-2.5 px-3 text-xs font-bold transition-all border-b-2 ${
                        activeTab === tab.id
                          ? "border-[#7B2D26] text-[#7B2D26]"
                          : "border-transparent text-[#6E5545] hover:text-[#3B2A1E]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="pt-4">
                  {activeTab === "chart" && (
                    <div className="flex justify-center py-4">
                      {chartType === "north" ? (
                        <NorthIndianChart kundli={kundli} size={360} />
                      ) : (
                        <SouthIndianChart kundli={kundli} size={360} />
                      )}
                    </div>
                  )}

                  {activeTab === "planets" && <PlanetaryTable kundli={kundli} />}
                  {activeTab === "dasha" && <DashaTimeline dashas={kundli.dashas} />}
                  {activeTab === "dosha" && <DoshaAnalysis doshas={kundli.doshas} />}
                </div>

                {/* Lead-Gen Action Strip */}
                <div className="mt-8 pt-6 border-t border-[#E8D8C3] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSignupPrompt(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#7B2D26] bg-[#FFFDF9] px-4 py-2 text-xs font-bold text-[#7B2D26] hover:bg-[#FBF3E7] transition-all"
                    >
                      <BookmarkPlus className="h-4 w-4 text-[#C1662F]" />
                      <span>Save Kundli to Account</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowSignupPrompt(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] px-4 py-2 text-xs font-bold text-[#3B2A1E] hover:bg-[#E8D8C3] transition-all"
                    >
                      <Download className="h-4 w-4 text-[#6E5545]" />
                      <span>Download PDF Report</span>
                    </button>
                  </div>

                  <Link
                    href="/consult"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#7B2D26] px-4 py-2 text-xs font-bold text-[#FBF3E7] hover:bg-[#96372E] transition-all shadow-sm"
                  >
                    <PhoneCall className="h-3.5 w-3.5 text-[#E8A33D]" />
                    <span>Discuss Live with Acharya Ji</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signup Lead-Gen Modal */}
      {showSignupPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] p-8 shadow-2xl text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7B2D26]/10 text-[#7B2D26] mx-auto mb-4">
              <Lock className="h-6 w-6" />
            </div>

            <h3 className="font-temple text-2xl font-bold text-[#7B2D26]">
              Create Free Seeker Account
            </h3>

            <p className="mt-2 text-xs text-[#6E5545] leading-relaxed">
              Save your birth chart permanently, download your 40-page comprehensive Janam Kundli dossier, and unlock 50% discount on your first consultation.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href="/signup"
                className="block w-full rounded-xl bg-[#7B2D26] py-3 text-xs font-bold text-[#FBF3E7] hover:bg-[#96372E] transition-all shadow-sm"
              >
                Sign Up with Phone &amp; OTP
              </Link>
              <Link
                href="/login"
                className="block w-full rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] py-3 text-xs font-bold text-[#3B2A1E] hover:bg-[#E8D8C3] transition-all"
              >
                Already have an account? Log In
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setShowSignupPrompt(false)}
              className="mt-4 text-xs font-semibold text-[#6E5545] hover:text-[#3B2A1E]"
            >
              Continue exploring without saving
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
