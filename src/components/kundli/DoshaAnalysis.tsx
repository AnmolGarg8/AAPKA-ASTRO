"use client";

import React from "react";
import { DoshaAnalysisResult } from "@/lib/astrology/types";
import { AlertCircle, CheckCircle2, Flame, ShieldAlert, Sparkles } from "lucide-react";
import Link from "next/link";

interface DoshaAnalysisProps {
  doshas: DoshaAnalysisResult;
  className?: string;
}

export const DoshaAnalysis: React.FC<DoshaAnalysisProps> = ({ doshas, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Manglik Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                doshas.hasManglik ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
              }`}
            >
              {doshas.hasManglik ? <Flame className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Manglik Dosha (मांगलिक दोष)</h4>
              <p className="text-xs text-slate-400">Marital harmony & fiery planetary alignment</p>
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              doshas.hasManglik
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
            }`}
          >
            {doshas.manglikSeverity}
          </span>
        </div>
        <p className="mt-3 text-xs text-slate-300 leading-relaxed">{doshas.manglikDetails}</p>
        {doshas.hasManglik && (
          <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-3 text-[11px]">
            <span className="text-amber-300 font-medium">Recommended: Personalized Kumbh Vivah or Anushthan</span>
            <Link
              href="/consult"
              className="font-bold text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1"
            >
              <span>Consult Acharya Ji</span> &rarr;
            </Link>
          </div>
        )}
      </div>

      {/* Shani Sade Sati Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                doshas.hasSadeSati ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400"
              }`}
            >
              {doshas.hasSadeSati ? <ShieldAlert className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Shani Sade Sati (शनि साढ़े साती)</h4>
              <p className="text-xs text-slate-400">7.5-Year Saturn Transit lifecycle</p>
            </div>
          </div>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              doshas.hasSadeSati
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
            }`}
          >
            {doshas.sadeSatiPhase}
          </span>
        </div>
        <p className="mt-3 text-xs text-slate-300 leading-relaxed">{doshas.sadeSatiDetails}</p>
      </div>

      {/* Kalsarpa Dosha Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Kalsarpa Yoga (कालसर्प योग)</h4>
              <p className="text-xs text-slate-400">Rahu-Ketu karmic axis status</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
            Balanced
          </span>
        </div>
        <p className="mt-3 text-xs text-slate-300 leading-relaxed">
          Planets are safely distributed outside the nodal hem, forming no severe Kalsarpa obstruction.
        </p>
      </div>
    </div>
  );
};
