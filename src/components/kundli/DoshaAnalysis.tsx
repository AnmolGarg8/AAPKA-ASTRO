"use client";

import React from "react";
import { DoshaAnalysisResult } from "@/lib/astrology/types";
import { CheckCircle2, Flame, ShieldAlert, AlertTriangle, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { DiyaIcon } from "@/components/ui/DiyaIcon";

interface DoshaAnalysisProps {
  doshas: DoshaAnalysisResult;
  className?: string;
}

export const DoshaAnalysis: React.FC<DoshaAnalysisProps> = ({ doshas, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* 1. Manglik Dosha Card */}
      <div className="rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                doshas.hasManglik ? "bg-[#7B2D26]/10 text-[#7B2D26]" : "bg-[#6B8E5A]/15 text-[#6B8E5A]"
              }`}
            >
              {doshas.hasManglik ? <Flame className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-temple text-sm font-bold text-[#7B2D26]">
                  Manglik Dosha (मांगलिक दोष / कुज दोष)
                </h4>
                {doshas.isCancelled && (
                  <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[9px] font-bold text-emerald-800">
                    PACIFIED / CANCELLED
                  </span>
                )}
              </div>
              <p className="text-xs text-[#6E5545]">Marital harmony, temperament &amp; fire energy balance</p>
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              doshas.hasManglik
                ? doshas.isCancelled
                  ? "bg-emerald-50 text-[#2E7D32] border border-emerald-200"
                  : "bg-[#7B2D26]/10 text-[#7B2D26] border border-[#7B2D26]/30"
                : "bg-[#6B8E5A]/15 text-[#2E7D32] border border-[#6B8E5A]/30"
            }`}
          >
            {doshas.isCancelled ? "Cancelled (Kuja Nivarana)" : doshas.manglikSeverity}
          </span>
        </div>

        <p className="mt-3 text-xs text-[#3B2A1E] leading-relaxed">{doshas.manglikDetails}</p>

        {doshas.hasManglik && !doshas.isCancelled && (
          <div className="mt-3 flex items-center justify-between border-t border-[#E8D8C3] pt-3 text-[11px]">
            <span className="text-[#C1662F] font-bold">Personalized Kumbh Vivah or Mars Anushthan recommended</span>
            <Link href="/consult" className="font-bold text-[#7B2D26] hover:underline flex items-center gap-1">
              <span>Ask Acharya Ji</span> &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* 2. Shani Sade Sati Card */}
      <div className="rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                doshas.hasSadeSati ? "bg-[#E8A33D]/20 text-[#C1662F]" : "bg-[#6B8E5A]/15 text-[#6B8E5A]"
              }`}
            >
              {doshas.hasSadeSati ? <ShieldAlert className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </div>
            <div>
              <h4 className="font-temple text-sm font-bold text-[#7B2D26]">
                Shani Sade Sati (शनि साढ़े साती)
              </h4>
              <p className="text-xs text-[#6E5545]">7.5-Year Saturn Transit lifecycle (Current transit in Pisces)</p>
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              doshas.hasSadeSati
                ? "bg-[#E8A33D]/25 text-[#7B2D26] border border-[#E8A33D]/50"
                : "bg-[#6B8E5A]/15 text-[#2E7D32] border border-[#6B8E5A]/30"
            }`}
          >
            {doshas.sadeSatiPhase}
          </span>
        </div>
        <p className="mt-3 text-xs text-[#3B2A1E] leading-relaxed">{doshas.sadeSatiDetails}</p>
      </div>

      {/* 3. Kaal Sarp Yoga Card */}
      <div className="rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                doshas.hasKalsarpa ? "bg-[#7B2D26]/10 text-[#7B2D26]" : "bg-[#6B8E5A]/15 text-[#6B8E5A]"
              }`}
            >
              {doshas.hasKalsarpa ? <AlertTriangle className="h-5 w-5" /> : <DiyaIcon size={20} />}
            </div>
            <div>
              <h4 className="font-temple text-sm font-bold text-[#7B2D26]">
                Kaal Sarp Yoga (कालसर्प योग - 12 Types Diagnosis)
              </h4>
              <p className="text-xs text-[#6E5545]">Planetary alignment across the Rahu-Ketu karmic axis</p>
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              doshas.hasKalsarpa
                ? "bg-[#7B2D26]/15 text-[#7B2D26] border border-[#7B2D26]/40"
                : "bg-[#6B8E5A]/15 text-[#2E7D32] border border-[#6B8E5A]/30"
            }`}
          >
            {doshas.hasKalsarpa ? doshas.kalsarpaType : "Balanced Axis"}
          </span>
        </div>
        <p className="mt-3 text-xs text-[#3B2A1E] leading-relaxed">
          {doshas.kalsarpaDetails || "Planets are distributed naturally outside the nodal arc, fostering unhindered career expansion."}
        </p>
        {doshas.hasKalsarpa && (
          <div className="mt-3 flex items-center justify-between border-t border-[#E8D8C3] pt-3 text-[11px]">
            <span className="text-[#7B2D26] font-bold">Rahu-Ketu Shanti &amp; Maha Mrityunjaya Jaap recommended</span>
            <Link href="/consult" className="font-bold text-[#7B2D26] hover:underline flex items-center gap-1">
              <span>Consult Acharya Ji</span> &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* 4. Pitra Dosha Card */}
      <div className="rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                doshas.hasPitraDosha ? "bg-[#E8A33D]/20 text-[#C1662F]" : "bg-[#6B8E5A]/15 text-[#6B8E5A]"
              }`}
            >
              {doshas.hasPitraDosha ? <ShieldAlert className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </div>
            <div>
              <h4 className="font-temple text-sm font-bold text-[#7B2D26]">
                Pitra Dosha (पितृ दोष / पूर्वज ऋण)
              </h4>
              <p className="text-xs text-[#6E5545]">Ancestral karma, Sun dignity &amp; 9th House alignment</p>
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              doshas.hasPitraDosha
                ? "bg-amber-100 text-amber-900 border border-amber-300"
                : "bg-[#6B8E5A]/15 text-[#2E7D32] border border-[#6B8E5A]/30"
            }`}
          >
            {doshas.hasPitraDosha ? "Pitra Dosha Present" : "Clear Lineage"}
          </span>
        </div>
        <p className="mt-3 text-xs text-[#3B2A1E] leading-relaxed">
          {doshas.pitraDoshaDetails || "No ancestral karmic blockages detected in the 9th house or Sun placement."}
        </p>
      </div>
    </div>
  );
};
