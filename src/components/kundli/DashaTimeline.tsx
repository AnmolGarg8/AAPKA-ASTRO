"use client";

import React, { useState } from "react";
import { VimshottariDashaItem, SookshmadashaItem } from "@/lib/astrology/types";
import { calculateSookshmadashas } from "@/lib/astrology/chartCalculations";
import { ChevronDown, ChevronRight, Clock, Sparkles } from "lucide-react";

interface DashaTimelineProps {
  dashas: VimshottariDashaItem[];
  className?: string;
}

export const DashaTimeline: React.FC<DashaTimelineProps> = ({ dashas, className = "" }) => {
  // Find currently active Mahadasha index to open by default
  const activeMahaIndex = dashas.findIndex((d) => d.isCurrent);
  const [expandedMaha, setExpandedMaha] = useState<number | null>(activeMahaIndex >= 0 ? activeMahaIndex : 0);
  const [expandedAntar, setExpandedAntar] = useState<string | null>(null);
  const [expandedPrat, setExpandedPrat] = useState<string | null>(null);

  const toggleMaha = (index: number) => {
    setExpandedMaha(expandedMaha === index ? null : index);
  };

  const toggleAntar = (key: string) => {
    setExpandedAntar(expandedAntar === key ? null : key);
  };

  const togglePrat = (key: string) => {
    setExpandedPrat(expandedPrat === key ? null : key);
  };

  return (
    <div className={`rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-[#E8D8C3] pb-3">
        <div>
          <h4 className="font-temple text-sm font-bold text-[#7B2D26] uppercase tracking-wider flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#C1662F]" />
            <span>4-Tier Vimshottari Dasha (महादशा &bull; अंतर्दशा &bull; प्रत्यंतर्दशा &bull; सूक्ष्मदशा)</span>
          </h4>
          <p className="text-[11px] text-[#6E5545] mt-0.5">
            Click any Mahadasha &rarr; Antardasha &rarr; Pratyantardasha to drill down to 4th-level Sookshma micro-timing
          </p>
        </div>
        <span className="text-[10px] text-[#7B2D26] font-bold bg-[#E8A33D]/25 px-2 py-0.5 rounded-full border border-[#E8A33D]/40">
          Astrotalk Parity &bull; 120-Yr Cycle
        </span>
      </div>

      <div className="space-y-3">
        {dashas.map((d, index) => {
          const isMahaOpen = expandedMaha === index;

          return (
            <div
              key={`${d.planet}-${index}`}
              className={`rounded-xl border transition-all overflow-hidden ${
                d.isCurrent
                  ? "border-[#C1662F] bg-[#FFFDF9] shadow-xs ring-1 ring-[#C1662F]/40"
                  : "border-[#E8D8C3] bg-[#FBF3E7]/40"
              }`}
            >
              {/* Mahadasha Header Row */}
              <div
                onClick={() => toggleMaha(index)}
                className={`flex items-center justify-between p-3.5 cursor-pointer select-none transition-colors ${
                  d.isCurrent
                    ? "bg-[#E8A33D]/15 hover:bg-[#E8A33D]/25"
                    : "hover:bg-[#FBF3E7]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs ${
                      d.isCurrent ? "bg-[#7B2D26] text-[#FBF3E7]" : "bg-[#E8D8C3] text-[#3B2A1E]"
                    }`}
                  >
                    {d.planet.slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#3B2A1E]">{d.planet} Mahadasha</span>
                      <span className="text-xs text-[#7B2D26] font-semibold">({d.hindiName})</span>
                      {d.isCurrent && (
                        <span className="rounded-full bg-[#6B8E5A] px-2 py-0.5 text-[9px] font-bold text-[#FBF3E7] flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                          <span>CURRENT</span>
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#6E5545] mt-0.5">
                      Duration: {d.durationYears} Years
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-[#3B2A1E]">
                      {d.startDate} &rarr; {d.endDate}
                    </div>
                  </div>
                  {isMahaOpen ? (
                    <ChevronDown className="h-4 w-4 text-[#7B2D26]" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-[#6E5545]" />
                  )}
                </div>
              </div>

              {/* Antardashas Accordion */}
              {isMahaOpen && d.antardashas && (
                <div className="border-t border-[#E8D8C3] bg-[#FFFDF9] p-3 space-y-2">
                  <div className="text-[11px] font-bold text-[#7B2D26] uppercase tracking-wide flex items-center gap-1.5 mb-2">
                    <Sparkles className="h-3 w-3 text-[#E8A33D]" />
                    <span>Antardashas (Sub-periods) under {d.planet}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {d.antardashas.map((antar, aIdx) => {
                      const antarKey = `${d.planet}-${antar.planet}-${aIdx}`;
                      const isAntarOpen = expandedAntar === antarKey || (expandedAntar === null && antar.isCurrent);

                      return (
                        <div
                          key={antarKey}
                          className={`rounded-lg border text-xs transition-all ${
                            antar.isCurrent
                              ? "border-[#6B8E5A] bg-[#6B8E5A]/10"
                              : "border-[#E8D8C3]/80 bg-[#FBF3E7]/50"
                          }`}
                        >
                          <div
                            onClick={() => antar.pratyantardashas && toggleAntar(antarKey)}
                            className={`flex items-center justify-between p-2.5 ${
                              antar.pratyantardashas ? "cursor-pointer hover:bg-[#FBF3E7]" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-[#7B2D26] w-5 text-center">
                                {antar.planet.slice(0, 2)}
                              </span>
                              <span className="font-semibold text-[#3B2A1E]">
                                {d.planet} / {antar.planet}
                              </span>
                              <span className="text-[10px] text-[#6E5545]">({antar.hindiName})</span>
                              {antar.isCurrent && (
                                <span className="rounded bg-[#6B8E5A] px-1.5 py-0.2 text-[9px] font-bold text-white">
                                  ACTIVE ANTAR
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[11px] text-[#6E5545]">
                                {antar.startDate} &rarr; {antar.endDate}
                              </span>
                              {antar.pratyantardashas && (
                                <span className="text-[10px] text-[#7B2D26] font-bold flex items-center gap-1">
                                  {isAntarOpen ? "Hide Pratyantar" : "View Pratyantar"}
                                  {isAntarOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Pratyantardashas Sub-Accordion */}
                          {isAntarOpen && antar.pratyantardashas && (
                            <div className="border-t border-[#E8D8C3] bg-white p-2.5 space-y-2">
                              <div className="text-[10px] font-bold text-[#7B2D26] uppercase flex items-center justify-between">
                                <span>Pratyantardashas (Sub-sub periods &bull; Level 3):</span>
                                <span className="text-[9px] font-normal text-[#6E5545]">Click any to view Sookshmadashas</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {antar.pratyantardashas.map((prat, pIdx) => {
                                  const pratKey = `${antarKey}-${prat.planet}-${pIdx}`;
                                  const isPratOpen = expandedPrat === pratKey || (expandedPrat === null && prat.isCurrent);
                                  const sookshmas: SookshmadashaItem[] =
                                    prat.sookshmadashas && prat.sookshmadashas.length > 0
                                      ? prat.sookshmadashas
                                      : isPratOpen
                                      ? calculateSookshmadashas(prat.planet, prat.startDate, prat.endDate)
                                      : [];

                                  return (
                                    <div
                                      key={pratKey}
                                      className={`rounded-lg p-2 text-[10px] border transition-all ${
                                        prat.isCurrent
                                          ? "border-[#7B2D26] bg-[#E8A33D]/15 font-medium text-[#7B2D26] ring-1 ring-[#7B2D26]/20"
                                          : "border-[#E8D8C3] bg-[#FBF3E7]/40 text-[#6E5545]"
                                      }`}
                                    >
                                      <div
                                        onClick={() => togglePrat(pratKey)}
                                        className="flex justify-between items-center cursor-pointer select-none"
                                      >
                                        <div className="font-semibold text-[#3B2A1E]">
                                          {prat.planet} ({prat.hindiName})
                                        </div>
                                        <div className="flex items-center gap-1">
                                          {prat.isCurrent && (
                                            <span className="text-[8px] bg-[#7B2D26] text-white px-1.5 py-0.2 rounded font-bold">
                                              ACTIVE
                                            </span>
                                          )}
                                          {isPratOpen ? (
                                            <ChevronDown className="h-3 w-3 text-[#7B2D26]" />
                                          ) : (
                                            <ChevronRight className="h-3 w-3 text-[#6E5545]" />
                                          )}
                                        </div>
                                      </div>
                                      <div className="font-mono text-[9px] mt-0.5 text-[#6E5545]">
                                        {prat.startDate} &rarr; {prat.endDate}
                                      </div>

                                      {/* Level 4: Sookshmadashas Drill-Down */}
                                      {isPratOpen && sookshmas.length > 0 && (
                                        <div className="mt-2 pt-2 border-t border-[#E8D8C3] bg-white/80 rounded p-1.5 space-y-1">
                                          <div className="text-[8.5px] font-bold text-[#7B2D26] uppercase">
                                            Sookshma (सूक्ष्म &bull; Level 4):
                                          </div>
                                          <div className="space-y-1">
                                            {sookshmas.map((sook, sIdx) => (
                                              <div
                                                key={sIdx}
                                                className={`flex items-center justify-between text-[8.5px] px-1.5 py-0.5 rounded ${
                                                  sook.isCurrent
                                                    ? "bg-[#6B8E5A] text-white font-bold"
                                                    : "bg-[#FBF3E7] text-[#3B2A1E]"
                                                }`}
                                              >
                                                <span>{sook.planet} ({sook.hindiName})</span>
                                                <span className="font-mono">{sook.startDate.slice(5)} to {sook.endDate.slice(5)}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

