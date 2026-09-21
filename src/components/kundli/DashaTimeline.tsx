"use client";

import React from "react";
import { VimshottariDashaItem } from "@/lib/astrology/types";

interface DashaTimelineProps {
  dashas: VimshottariDashaItem[];
  className?: string;
}

export const DashaTimeline: React.FC<DashaTimelineProps> = ({ dashas, className = "" }) => {
  return (
    <div className={`rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-md ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
          Vimshottari Mahadasha Timeline (विंशोत्तरी महादशा)
        </h4>
        <span className="text-[10px] text-slate-400">120-Year Natural Planetary Cycle</span>
      </div>

      <div className="space-y-2.5">
        {dashas.map((d, index) => {
          return (
            <div
              key={`${d.planet}-${index}`}
              className={`flex items-center justify-between rounded-lg p-3 border transition-all ${
                d.isCurrent
                  ? "border-amber-500/60 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30"
                  : "border-slate-800 bg-slate-950/40 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs ${
                    d.isCurrent
                      ? "bg-amber-500 text-slate-950 shadow"
                      : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {d.planet.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{d.planet} Mahadasha</span>
                    <span className="text-xs text-amber-300/80 font-normal">({d.hindiName})</span>
                    {d.isCurrent && (
                      <span className="animate-pulse rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
                        ACTIVE NOW
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Duration: {d.durationYears} Years
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono font-medium text-slate-300">
                  {d.startDate} &rarr; {d.endDate}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
