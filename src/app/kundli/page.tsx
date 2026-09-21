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
import {
  Sparkles,
  PhoneCall,
  Printer,
  CheckCircle2,
} from "lucide-react";
import { PLACEHOLDER_ASTROLOGER, ADMIN_CONFIGURABLE_PRICING } from "@/config/placeholderContent";

export default function KundliPage() {
  const [kundli, setKundli] = useState<KundliData>(() =>
    calculateKundli({
      name: "Aarav Sharma",
      gender: "male",
      birthDate: "1995-10-24",
      birthTime: "14:35",
      birthPlace: "New Delhi, Delhi",
      latitude: 28.6139,
      longitude: 77.209,
      timezone: 5.5,
    })
  );

  const [chartType, setChartType] = useState<"north" | "south">("north");
  const [activeTab, setActiveTab] = useState<"chart" | "planets" | "dasha" | "dosha" | "remedies">("chart");

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="bg-[#FBF3E7] py-8 lg:py-12 min-h-screen text-[#3B2A1E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#7D6B5D] mb-1">
              <Link href="/" className="hover:text-[#7B2D26]">Home</Link>
              <span>/</span>
              <span className="text-[#7B2D26] font-semibold">Vedic Janam Kundli</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold font-temple text-[#7B2D26] tracking-tight">
              Detailed Vedic Janam Kundli (जन्म पत्रिका)
            </h1>
            <p className="text-xs sm:text-sm text-[#7D6B5D] mt-1 font-body">
              High-precision planetary degrees and Dasha timing based on authentic Lahiri Ephemeris
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl border border-[#D4C3B3] bg-[#FFFDF9] px-3.5 py-2 text-xs font-semibold text-[#3B2A1E] hover:bg-[#F3E7D3] transition-all shadow-sm"
            >
              <Printer className="h-4 w-4 text-[#C1662F]" />
              <span>Print / Save PDF</span>
            </button>
            <Link
              href="/consult"
              className="flex items-center gap-1.5 rounded-xl bg-[#7B2D26] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#64231D] transition-all"
            >
              <PhoneCall className="h-4 w-4 text-[#E8A33D]" />
              <span>Get Detailed Analysis from Acharya Ji</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form & Key Metrics */}
          <div className="lg:col-span-4 space-y-6">
            <KundliForm onCalculated={(data) => setKundli(data)} />

            {/* Favorable Metrics Card */}
            <div className="rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#7B2D26] font-temple mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#E8A33D]" />
                <span>Auspicious Vedic Alignments</span>
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#E8D8C3]/80 pb-2">
                  <span className="text-[#7D6B5D]">Ascendant (Lagna):</span>
                  <span className="font-bold text-[#3B2A1E]">{kundli.ascendant.rashiName} ({kundli.ascendant.hindiName})</span>
                </div>
                <div className="flex justify-between border-b border-[#E8D8C3]/80 pb-2">
                  <span className="text-[#7D6B5D]">Moon Sign (Rashi):</span>
                  <span className="font-bold text-[#7B2D26]">{kundli.moonSign}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8D8C3]/80 pb-2">
                  <span className="text-[#7D6B5D]">Sun Sign:</span>
                  <span className="font-bold text-[#3B2A1E]">{kundli.sunSign}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8D8C3]/80 pb-2">
                  <span className="text-[#7D6B5D]">Birth Nakshatra:</span>
                  <span className="font-bold text-[#C1662F]">{kundli.nakshatra} (Pada {kundli.charanPada})</span>
                </div>
                <div className="flex justify-between border-b border-[#E8D8C3]/80 pb-2">
                  <span className="text-[#7D6B5D]">Recommended Gemstone:</span>
                  <span className="font-bold text-[#6B8E5A]">{kundli.luckyGemstone}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8D8C3]/80 pb-2">
                  <span className="text-[#7D6B5D]">Favorable Color:</span>
                  <span className="font-bold text-[#3B2A1E]">{kundli.luckyColor}</span>
                </div>
                <div className="flex justify-between border-b border-[#E8D8C3]/80 pb-2">
                  <span className="text-[#7D6B5D]">Lucky Number:</span>
                  <span className="font-bold text-[#C1662F]">{kundli.luckyNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7D6B5D]">Ishta Devata:</span>
                  <span className="font-bold text-[#7B2D26]">{kundli.favorableDeity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Chart & Deep Tab Content */}
          <div className="lg:col-span-8 rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] p-6 shadow-sm">
            {/* Header & Chart Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8D8C3] pb-5">
              <div>
                <h3 className="text-xl font-bold font-temple text-[#7B2D26]">{kundli.name}&apos;s Vedic Chart</h3>
                <div className="text-xs text-[#7D6B5D] mt-0.5">
                  Born {kundli.birthDate} at {kundli.birthTime} ({kundli.birthPlace})
                </div>
              </div>

              <div className="flex items-center rounded-xl border border-[#D4C3B3] bg-[#F5EBE1] p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setChartType("north")}
                  className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                    chartType === "north"
                      ? "bg-[#7B2D26] text-white shadow-sm"
                      : "text-[#7D6B5D] hover:text-[#3B2A1E]"
                  }`}
                >
                  North Indian
                </button>
                <button
                  type="button"
                  onClick={() => setChartType("south")}
                  className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                    chartType === "south"
                      ? "bg-[#7B2D26] text-white shadow-sm"
                      : "text-[#7D6B5D] hover:text-[#3B2A1E]"
                  }`}
                >
                  South Indian
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#E8D8C3] my-5 text-xs font-semibold gap-3 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("chart")}
                className={`pb-3 border-b-2 transition-all shrink-0 ${
                  activeTab === "chart"
                    ? "border-[#7B2D26] text-[#7B2D26] font-bold"
                    : "border-transparent text-[#7D6B5D] hover:text-[#3B2A1E]"
                }`}
              >
                Kundli Chart (D1)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("planets")}
                className={`pb-3 border-b-2 transition-all shrink-0 ${
                  activeTab === "planets"
                    ? "border-[#7B2D26] text-[#7B2D26] font-bold"
                    : "border-transparent text-[#7D6B5D] hover:text-[#3B2A1E]"
                }`}
              >
                Planetary Degrees
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("dasha")}
                className={`pb-3 border-b-2 transition-all shrink-0 ${
                  activeTab === "dasha"
                    ? "border-[#7B2D26] text-[#7B2D26] font-bold"
                    : "border-transparent text-[#7D6B5D] hover:text-[#3B2A1E]"
                }`}
              >
                Vimshottari Dasha
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("dosha")}
                className={`pb-3 border-b-2 transition-all shrink-0 ${
                  activeTab === "dosha"
                    ? "border-[#7B2D26] text-[#7B2D26] font-bold"
                    : "border-transparent text-[#7D6B5D] hover:text-[#3B2A1E]"
                }`}
              >
                Dosha Diagnosis
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("remedies")}
                className={`pb-3 border-b-2 transition-all shrink-0 ${
                  activeTab === "remedies"
                    ? "border-[#7B2D26] text-[#7B2D26] font-bold"
                    : "border-transparent text-[#7D6B5D] hover:text-[#3B2A1E]"
                }`}
              >
                Remedies &amp; Gemstones
              </button>
            </div>

            {/* Tab Views */}
            <div className="min-h-[420px]">
              {activeTab === "chart" && (
                <div className="flex flex-col items-center justify-center py-6">
                  {chartType === "north" ? (
                    <NorthIndianChart kundli={kundli} size={420} chartTitle="Lagna Kundli (D1 Chart)" />
                  ) : (
                    <SouthIndianChart kundli={kundli} size={420} chartTitle="South Indian Kundli" />
                  )}
                  <p className="text-xs text-[#7D6B5D] mt-4 text-center max-w-lg font-body">
                    House 1 represents the physical self, health, and innate vitality. The Ascendant sign
                    governs life trajectory and overall personality.
                  </p>
                </div>
              )}

              {activeTab === "planets" && <PlanetaryTable kundli={kundli} />}
              {activeTab === "dasha" && <DashaTimeline dashas={kundli.dashas} />}
              {activeTab === "dosha" && <DoshaAnalysis doshas={kundli.doshas} />}

              {activeTab === "remedies" && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-[#E8A33D]/40 bg-[#FAF1E4] p-5">
                    <h4 className="text-sm font-bold text-[#7B2D26] font-temple mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#E8A33D]" />
                      <span>Prescribed Gemstone: {kundli.luckyGemstone}</span>
                    </h4>
                    <p className="text-xs text-[#6B5A4E] leading-relaxed">
                      Recommended to fortify your Lagna Lord and balance planetary afflictions. Wear on the designated finger after proper purification with raw milk, Gangajal, and Vedic mantra chanting on an auspicious day.
                    </p>
                    <div className="mt-4 flex gap-3">
                      <Link
                        href="/gemstones"
                        className="rounded-lg bg-[#7B2D26] px-4 py-2 text-xs font-bold text-white hover:bg-[#64231D] shadow-sm transition-all"
                      >
                        Order Govt-Certified {kundli.luckyGemstone.split(" ")[0]}
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#E8D8C3] bg-[#FFFDF9] p-5">
                    <h4 className="text-sm font-bold font-temple text-[#3B2A1E] mb-2">
                      Daily Vedic Mantras &amp; Lifestyle Alignment
                    </h4>
                    <ul className="space-y-2 text-xs text-[#6B5A4E]">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#6B8E5A]" />
                        <span>Chant Gayatri Mantra 21 times daily during sunrise facing East.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#6B8E5A]" />
                        <span>Perform water offering (Surya Arghya) with copper vessel and red flowers.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#6B8E5A]" />
                        <span>Favorable Day for beginning critical ventures: Thursday &amp; Monday.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Consultation CTA */}
            {/* PLACEHOLDER: replace with real content */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#E8A33D]/60 bg-gradient-to-r from-[#7B2D26] via-[#64231D] to-[#3B2A1E] text-white p-5 shadow-lg">
              <div>
                <h4 className="text-base font-bold font-temple">Have specific questions about this Kundli?</h4>
                <p className="text-xs text-amber-100/80 mt-0.5 font-body">
                  Discuss career transitions, love life, child prospects, and health directly with {PLACEHOLDER_ASTROLOGER.displayName}.
                </p>
              </div>
              <Link
                href="/consult"
                className="shrink-0 rounded-xl bg-[#E8A33D] px-5 py-2.5 text-xs font-bold text-[#3B2A1E] hover:bg-[#d69330] shadow-md transition-all"
              >
                Consult Acharya Ji (From ₹{ADMIN_CONFIGURABLE_PRICING.chat.ratePerMinute}/min)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
