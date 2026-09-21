"use client";

import React from "react";
import { VimshottariDashaItem } from "@/lib/astrology/types";

interface DashaTimelineProps {
  dashas: VimshottariDashaItem[];
  className?: string;
}

export const DashaTimeline: React.FC<DashaTimelineProps> = ({ dashas, className = "" }) => {
  return (
    <div className={`rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-4 border-b border-[#E8D8C3] pb-3">
        <h4 className="font-temple text-sm font-bold text-[#7B2D26] uppercase tracking-wider">
          Vimshottari Mahadasha Timeline (विंशोत्तरी महादशा)
        </h4>
        <span className="text-[10px] text-[#6E5545] font-semibold">120-Year Natural Cycle</span>
      </div>

      <div className="space-y-2.5">
        {dashas.map((d, index) => {
          return (
            <div
              key={`${d.planet}-${index}`}
              className={`flex items-center justify-between rounded-xl p-3 border transition-all ${
                d.isCurrent
                  ? "border-[#C1662F] bg-[#E8A33D]/15 shadow-sm ring-1 ring-[#C1662F]/40"
                  : "border-[#E8D8C3] bg-[#FBF3E7]/60 hover:bg-[#FBF3E7]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs ${
                    d.isCurrent
                      ? "bg-[#7B2D26] text-[#FBF3E7]"
                      : "bg-[#E8D8C3] text-[#3B2A1E]"
                  }`}
                >
                  {d.planet.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#3B2A1E]">{d.planet} Mahadasha</span>
                    <span className="text-xs text-[#7B2D26] font-semibold">({d.hindiName})</span>
                    {d.isCurrent && (
                      <span className="rounded-full bg-[#6B8E5A] px-2 py-0.5 text-[9px] font-bold text-[#FBF3E7]">
                        ACTIVE NOW
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#6E5545] mt-0.5">
                    Duration: {d.durationYears} Years
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono font-bold text-[#3B2A1E]">
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
