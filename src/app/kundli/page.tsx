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
  Download,
  Share2,
  Calendar,
  Compass,
  ArrowRight,
  Printer,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

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
    <div className="bg-[#0B0F19] py-8 lg:py-12 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Link href="/" className="hover:text-amber-400">Home</Link>
              <span>/</span>
              <span className="text-amber-400">Vedic Janam Kundli</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Detailed Vedic Janam Kundli (जन्म पत्रिका)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              High-precision planetary degrees and Dasha timing based on authentic Lahiri Ephemeris
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition-all"
            >
              <Printer className="h-4 w-4 text-amber-400" />
              <span>Print / Save PDF</span>
            </button>
            <Link
              href="/consult"
              className="flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Get Detailed Analysis from Acharya Ji</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form & Key Metrics */}
          <div className="lg:col-span-4 space-y-6">
            <KundliForm onCalculated={(data) => setKundli(data)} />

            {/* Favorable Metrics Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span>Auspicious Vedic Alignments</span>
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Ascendant (Lagna):</span>
                  <span className="font-bold text-white">{kundli.ascendant.rashiName} ({kundli.ascendant.hindiName})</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Moon Sign (Rashi):</span>
                  <span className="font-bold text-amber-300">{kundli.moonSign}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Sun Sign:</span>
                  <span className="font-bold text-white">{kundli.sunSign}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Birth Nakshatra:</span>
                  <span className="font-bold text-amber-300">{kundli.nakshatra} (Pada {kundli.charanPada})</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Recommended Gemstone:</span>
                  <span className="font-bold text-emerald-400">{kundli.luckyGemstone}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Favorable Color:</span>
                  <span className="font-bold text-slate-200">{kundli.luckyColor}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Lucky Number:</span>
                  <span className="font-bold text-amber-400">{kundli.luckyNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Ishta Devata:</span>
                  <span className="font-bold text-amber-300">{kundli.favorableDeity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Chart & Deep Tab Content */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
            {/* Header & Chart Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-xl font-bold text-white">{kundli.name}&apos;s Vedic Chart</h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Born {kundli.birthDate} at {kundli.birthTime} ({kundli.birthPlace})
                </div>
              </div>

              <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800/80 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setChartType("north")}
                  className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                    chartType === "north"
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  North Indian
                </button>
                <button
                  type="button"
                  onClick={() => setChartType("south")}
                  className={`rounded-lg px-3 py-1 font-semibold transition-all ${
                    chartType === "south"
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  South Indian
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 my-5 text-xs font-semibold gap-3 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("chart")}
                className={`pb-3 border-b-2 transition-all shrink-0 ${
                  activeTab === "chart"
                    ? "border-amber-400 text-amber-400 font-bold"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                Kundli Chart (D1)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("planets")}
                className={`pb-3 border-b-2 transition-all shrink-0 ${
                  activeTab === "planets"
                    ? "border-amber-400 text-amber-400 font-bold"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                Planetary Degrees
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("dasha")}
                className={`pb-3 border-b-2 transition-all shrink-0 ${
                  activeTab === "dasha"
                    ? "border-amber-400 text-amber-400 font-bold"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                Vimshottari Dasha
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("dosha")}
                className={`pb-3 border-b-2 transition-all shrink-0 ${
                  activeTab === "dosha"
                    ? "border-amber-400 text-amber-400 font-bold"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                Dosha Diagnosis
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("remedies")}
                className={`pb-3 border-b-2 transition-all shrink-0 ${
                  activeTab === "remedies"
                    ? "border-amber-400 text-amber-400 font-bold"
                    : "border-transparent text-slate-400 hover:text-white"
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
                  <p className="text-xs text-slate-400 mt-4 text-center max-w-lg">
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
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5">
                    <h4 className="text-sm font-bold text-amber-300 mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>Prescribed Gemstone: {kundli.luckyGemstone}</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Recommended to fortify your Lagna Lord and balance planetary afflictions. Wear on the designated finger after proper purification with raw milk, Gangajal, and Vedic mantra chanting on an auspicious day.
                    </p>
                    <div className="mt-4 flex gap-3">
                      <Link
                        href="/gemstones"
                        className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-400"
                      >
                        Order Govt-Certified {kundli.luckyGemstone.split(" ")[0]}
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-5">
                    <h4 className="text-sm font-bold text-white mb-2">
                      Daily Vedic Mantras &amp; Lifestyle Alignment
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-400" />
                        <span>Chant Gayatri Mantra 21 times daily during sunrise facing East.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-400" />
                        <span>Perform water offering (Surya Arghya) with copper vessel and red flowers.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-400" />
                        <span>Favorable Day for beginning critical ventures: Thursday &amp; Monday.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Consultation CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-[#1E1B4B] to-slate-900 p-5">
              <div>
                <h4 className="text-sm font-bold text-white">Have specific questions about this Kundli?</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Discuss career transitions, love life, child prospects, and health with Acharya Rajesh Sharma.
                </p>
              </div>
              <Link
                href="/consult"
                className="shrink-0 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 shadow-md"
              >
                Consult Acharya Ji (₹19/min)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
