"use client";

import React from "react";
import { DoshaAnalysisResult } from "@/lib/astrology/types";
import { CheckCircle2, Flame, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";
import { DiyaIcon } from "@/components/ui/DiyaIcon";

interface DoshaAnalysisProps {
  doshas: DoshaAnalysisResult;
  className?: string;
}

export const DoshaAnalysis: React.FC<DoshaAnalysisProps> = ({ doshas, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Manglik Card */}
      <div className="rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                doshas.hasManglik ? "bg-[#7B2D26]/10 text-[#7B2D26]" : "bg-[#6B8E5A]/15 text-[#6B8E5A]"
              }`}
            >
              {doshas.hasManglik ? <Flame className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </div>
            <div>
              <h4 className="font-temple text-sm font-bold text-[#7B2D26]">
                Manglik Dosha (मांगलिक दोष)
              </h4>
              <p className="text-xs text-[#6E5545]">Marital harmony &amp; planetary alignment</p>
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              doshas.hasManglik
                ? "bg-[#7B2D26]/10 text-[#7B2D26] border border-[#7B2D26]/30"
                : "bg-[#6B8E5A]/15 text-[#2E7D32] border border-[#6B8E5A]/30"
            }`}
          >
            {doshas.manglikSeverity}
          </span>
        </div>
        <p className="mt-3 text-xs text-[#3B2A1E] leading-relaxed">{doshas.manglikDetails}</p>
        {doshas.hasManglik && (
          <div className="mt-3 flex items-center justify-between border-t border-[#E8D8C3] pt-3 text-[11px]">
            <span className="text-[#C1662F] font-bold">Personalized Kumbh Vivah or Anushthan recommended</span>
            <Link
              href="/consult"
              className="font-bold text-[#7B2D26] hover:underline flex items-center gap-1"
            >
              <span>Consult Acharya Ji</span> &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* Shani Sade Sati Card */}
      <div className="rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm">
        <div className="flex items-start justify-between">
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
              <p className="text-xs text-[#6E5545]">7.5-Year Saturn Transit lifecycle</p>
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

      {/* Kalsarpa Yoga Card */}
      <div className="rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6B8E5A]/15 text-[#6B8E5A]">
              <DiyaIcon size={20} />
            </div>
            <div>
              <h4 className="font-temple text-sm font-bold text-[#7B2D26]">
                Kalsarpa Yoga (कालसर्प योग)
              </h4>
              <p className="text-xs text-[#6E5545]">Rahu-Ketu karmic axis status</p>
            </div>
          </div>
          <span className="rounded-full bg-[#6B8E5A]/15 px-2.5 py-1 text-xs font-bold text-[#2E7D32] border border-[#6B8E5A]/30">
            Balanced
          </span>
        </div>
        <p className="mt-3 text-xs text-[#3B2A1E] leading-relaxed">
          Planets are safely distributed outside the nodal hem, forming no severe Kalsarpa obstruction.
        </p>
      </div>
    </div>
  );
};
