"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyAapkaAstro } from "@/components/home/WhyAapkaAstro";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQSection } from "@/components/home/FAQSection";
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
  Calendar,
  ArrowRight,
  Download,
  Share2,
  ShieldCheck,
  CheckCircle,
  Gem,
} from "lucide-react";

export default function HomePage() {
  // Default sample Kundli calculation for immediate interactive preview
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
  const [activeTab, setActiveTab] = useState<"chart" | "planets" | "dasha" | "dosha">("chart");

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Interactive Free Kundli Lead Section */}
      <section className="border-t border-slate-800 bg-[#0B0F19] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>INSTANT VEDIC EPHEMERIS ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Generate Your Complete Janam Kundli
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Enter your birth details below to calculate your Lagna, planetary degrees,
              Vimshottari Dasha, and Manglik status instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Input Form */}
            <div className="lg:col-span-5">
              <KundliForm onCalculated={(data) => setKundli(data)} />

              {/* Quick Consultation Callout */}
              <div className="mt-6 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-600/15 to-transparent p-5 backdrop-blur-md">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-amber-500 p-2 text-slate-950 font-bold shrink-0">
                    <PhoneCall className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Want Acharya Ji to read this chart?</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Understand what your Mahadasha and planetary yogas mean for your career, health, and marriage.
                    </p>
                    <Link
                      href="/consult"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 underline underline-offset-4"
                    >
                      <span>Start Live Consultation</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Real-time Kundli Output & Visualizer */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl">
              {/* Kundli Summary Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{kundli.name}&apos;s Chart</h3>
                    <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                      Lagna: {kundli.ascendant.rashiName}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {kundli.birthDate} • {kundli.birthTime} • {kundli.birthPlace}
                  </div>
                </div>

                {/* Chart Style Switcher */}
                <div className="flex items-center rounded-xl border border-slate-700 bg-slate-800/80 p-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setChartType("north")}
                    className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
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
                    className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
                      chartType === "south"
                        ? "bg-amber-500 text-slate-950 shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    South Indian
                  </button>
                </div>
              </div>

              {/* Key Astrological Pillars Pill Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-800/80 text-xs">
                <div className="rounded-lg bg-slate-950/50 p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Moon Sign (Rashi)</span>
                  <span className="font-bold text-amber-300">{kundli.moonSign}</span>
                </div>
                <div className="rounded-lg bg-slate-950/50 p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Nakshatra</span>
                  <span className="font-bold text-amber-300">{kundli.nakshatra} (Pada {kundli.charanPada})</span>
                </div>
                <div className="rounded-lg bg-slate-950/50 p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Sun Sign</span>
                  <span className="font-bold text-amber-300">{kundli.sunSign}</span>
                </div>
                <div className="rounded-lg bg-slate-950/50 p-2.5 border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Lucky Gemstone</span>
                  <span className="font-bold text-emerald-300">{kundli.luckyGemstone.split(" ")[0]}</span>
                </div>
              </div>

              {/* Sub-tabs: Chart, Planets, Dasha, Doshas */}
              <div className="flex border-b border-slate-800 my-4 text-xs font-semibold gap-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("chart")}
                  className={`pb-2.5 px-3 border-b-2 transition-all shrink-0 ${
                    activeTab === "chart"
                      ? "border-amber-400 text-amber-400 font-bold"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  Lagna Chart (D1)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("planets")}
                  className={`pb-2.5 px-3 border-b-2 transition-all shrink-0 ${
                    activeTab === "planets"
                      ? "border-amber-400 text-amber-400 font-bold"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  Planets &amp; Degrees
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("dasha")}
                  className={`pb-2.5 px-3 border-b-2 transition-all shrink-0 ${
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
                  className={`pb-2.5 px-3 border-b-2 transition-all shrink-0 ${
                    activeTab === "dosha"
                      ? "border-amber-400 text-amber-400 font-bold"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  Dosha &amp; Yogas
                </button>
              </div>

              {/* Tab Content */}
              <div className="pt-2">
                {activeTab === "chart" && (
                  <div className="flex justify-center py-4">
                    {chartType === "north" ? (
                      <NorthIndianChart kundli={kundli} size={380} />
                    ) : (
                      <SouthIndianChart kundli={kundli} size={380} />
                    )}
                  </div>
                )}

                {activeTab === "planets" && <PlanetaryTable kundli={kundli} />}
                {activeTab === "dasha" && <DashaTimeline dashas={kundli.dashas} />}
                {activeTab === "dosha" && <DoshaAnalysis doshas={kundli.doshas} />}
              </div>

              {/* Direct Full Report Link */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-4 text-xs">
                <span className="text-slate-400">
                  Calculated with Lahiri Ayanamsa: <strong className="text-slate-200">{kundli.ayanamsa.toFixed(2)}°</strong>
                </span>
                <Link
                  href="/kundli"
                  className="flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300"
                >
                  <span>Open Full Screen Detailed Kundli</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Offerings Grid */}
      <ServicesGrid />

      {/* 4. Why Aapka Astro vs Astrotalk */}
      <WhyAapkaAstro />

      {/* 5. Verified Client Reviews */}
      <Testimonials />

      {/* 6. FAQ Section */}
      <FAQSection />

      {/* 7. Final High-Conversion Action Banner */}
      <section className="border-t border-amber-500/30 bg-gradient-to-r from-amber-600/20 via-amber-500/25 to-indigo-900/20 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30 mb-4">
            <PhoneCall className="h-3.5 w-3.5" />
            <span>CONFIDENTIAL 1-ON-1 VEDIC CONSULTATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Stop Guessing Your Future. Start Creating It.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Connect directly with Acharya Rajesh Sharma. Discuss career dilemmas, relationship knots, health timings, and practical remedies tailored specifically to your Janam Kundli.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/consult"
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-8 py-4 font-extrabold text-slate-950 shadow-2xl shadow-amber-500/40 hover:bg-amber-400 hover:scale-105 transition-all text-sm"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Consult Acharya Ji Now</span>
              <span className="rounded-md bg-slate-950/20 px-2 py-0.5 text-xs font-black">
                ₹19/min
              </span>
            </Link>

            <Link
              href="/wallet"
              className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-7 py-4 text-sm font-semibold text-white hover:border-slate-500 hover:bg-slate-800 transition-all"
            >
              <span>Recharge Wallet &amp; Get Extra Talktime</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
