"use client";

import React from "react";
import { Check, X, ShieldAlert, Sparkles, Award, Lock, UserCheck } from "lucide-react";

export const WhyAapkaAstro: React.FC = () => {
  const comparisonItems = [
    {
      feature: "Who Conducts Your Consultation?",
      aapkaAstro: "Exclusively Acharya Rajesh Sharma (18+ Years Exp, BHU Gold Medalist)",
      astrotalk: "Random gig worker selected from 500+ unverified listings",
      aapkaPositive: true,
    },
    {
      feature: "Consultation Style & Depth",
      aapkaAstro: "Direct, deep classical Vedic analysis with chart on screen and customized remedies",
      astrotalk: "Frequent copy-pasted scripts designed to keep billing clock running",
      aapkaPositive: true,
    },
    {
      feature: "Availability & Honesty",
      aapkaAstro: "Strictly transparent real-time status: Online, In Consultation, or Scheduled Queue",
      astrotalk: "Illusion of instant 24/7 availability by rotating unknown interns",
      aapkaPositive: true,
    },
    {
      feature: "Privacy & Data Protection",
      aapkaAstro: "100% confidential. Your birth charts and questions are never shared or resold",
      astrotalk: "Shared across multiple operator terminals and customer service desks",
      aapkaPositive: true,
    },
    {
      feature: "Remedy Philosophy",
      aapkaAstro: "Simple, highly effective mantras, charity (Daan), and certified natural gemstones",
      astrotalk: "High-pressure upsells for expensive poojas worth thousands of rupees",
      aapkaPositive: true,
    },
  ];

  return (
    <section className="border-t border-slate-800 bg-[#0B0F19] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
            <Award className="h-3.5 w-3.5" />
            <span>THE AAPKA ASTRO PROMISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Discerning Clients Choose Aapka Astro Over Mass Marketplaces
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Astrology is sacred guidance. Discover why personal attention from a true Vedic Master
            yields radically better life clarity.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-slate-800 bg-slate-950/80 p-4 text-xs font-bold uppercase tracking-wider text-slate-400">
            <div className="md:col-span-4 hidden md:block">Evaluation Metric</div>
            <div className="md:col-span-4 text-amber-400 font-extrabold text-sm flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              <span>Aapka Astro (Single Master)</span>
            </div>
            <div className="md:col-span-4 text-slate-400 text-sm hidden md:block">
              Astrotalk / Aggregators
            </div>
          </div>

          <div className="divide-y divide-slate-800/70">
            {comparisonItems.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 gap-4 items-center hover:bg-slate-800/20 transition-colors"
              >
                {/* Metric Title */}
                <div className="md:col-span-4">
                  <span className="font-bold text-sm text-slate-200">{item.feature}</span>
                </div>

                {/* Aapka Astro Column */}
                <div className="md:col-span-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5 md:p-2.5">
                  <div className="md:hidden text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1">
                    Aapka Astro
                  </div>
                  <div className="flex items-start gap-2 text-xs font-semibold text-amber-200">
                    <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item.aapkaAstro}</span>
                  </div>
                </div>

                {/* Astrotalk Column */}
                <div className="md:col-span-4 rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 md:p-2.5">
                  <div className="md:hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Mass Aggregators
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-400">
                    <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{item.astrotalk}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
