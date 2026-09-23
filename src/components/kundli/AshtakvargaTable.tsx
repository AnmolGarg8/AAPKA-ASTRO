"use client";

import React, { useState } from "react";
import { AshtakvargaData } from "@/lib/astrology/types";
import { Sparkles, ShieldAlert, Award } from "lucide-react";

interface AshtakvargaTableProps {
  ashtakvarga?: AshtakvargaData;
  className?: string;
}

export const AshtakvargaTable: React.FC<AshtakvargaTableProps> = ({ ashtakvarga, className = "" }) => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  if (!ashtakvarga) {
    return null;
  }

  const sav = ashtakvarga.sarvashtakavarga;
  const bav = ashtakvarga.bhinnashtakavarga;
  const planets = Object.keys(bav);

  const houses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* SAV Overview Card */}
      <div className="rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8D8C3] pb-3 mb-4">
          <div>
            <h4 className="font-temple text-sm font-bold text-[#7B2D26] uppercase tracking-wider flex items-center gap-2">
              <Award className="h-4 w-4 text-[#E8A33D]" />
              <span>Sarvashtakavarga (सर्वाष्टकवर्ग - 337 Bindus)</span>
            </h4>
            <p className="text-[11px] text-[#6E5545] mt-0.5">
              Accumulated benefic points per house &bull; Standard benchmark: 28 Bindus
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-[#2E7D32] font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              <span className="h-2 w-2 rounded-full bg-[#6B8E5A]" />
              <span>&ge; 28 (Auspicious)</span>
            </span>
            <span className="flex items-center gap-1 text-[#991B1B] font-semibold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span>&lt; 28 (Sensitive)</span>
            </span>
          </div>
        </div>

        {/* 12 House SAV Heatmap Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {houses.map((h) => {
            const score = sav[h] || 0;
            const isHigh = score >= 28;

            return (
              <div
                key={h}
                className={`rounded-xl border p-3 text-center transition-all ${
                  isHigh
                    ? "border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50"
                    : "border-amber-300 bg-amber-50/40 hover:bg-amber-50"
                }`}
              >
                <div className="text-[10px] font-bold text-[#7B2D26] uppercase">House {h}</div>
                <div
                  className={`text-xl font-mono font-black my-1 ${
                    isHigh ? "text-[#2E7D32]" : "text-[#C1662F]"
                  }`}
                >
                  {score}
                </div>
                <div className="text-[9px] font-medium text-[#6E5545]">
                  {isHigh ? "Benefic Power" : "Requires Care"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BAV Planetary Breakdown */}
      <div className="rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8D8C3] pb-3 mb-4">
          <div>
            <h4 className="font-temple text-sm font-bold text-[#7B2D26] uppercase tracking-wider">
              Bhinnashtakavarga (भिन्नाष्टकवर्ग - Individual Planetary Bindus)
            </h4>
            <p className="text-[11px] text-[#6E5545] mt-0.5">
              Specific benefic contributions across all 12 houses for Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E8D8C3] bg-[#FBF3E7]/60 text-[#6E5545] font-bold uppercase">
              <tr>
                <th className="px-3 py-2">Planet</th>
                {houses.map((h) => (
                  <th key={h} className="px-2 py-2 text-center font-mono">
                    H{h}
                  </th>
                ))}
                <th className="px-3 py-2 text-center font-bold text-[#7B2D26]">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D8C3] text-[#3B2A1E]">
              {planets.map((planet) => {
                const row = bav[planet] || [];
                const rowTotal = row.reduce((a, b) => a + b, 0);

                return (
                  <tr key={planet} className="hover:bg-[#FBF3E7]/50 transition-colors">
                    <td className="px-3 py-2 font-bold text-[#7B2D26] flex items-center gap-1.5 whitespace-nowrap">
                      <span>{planet}</span>
                    </td>
                    {row.map((val, idx) => {
                      const isHigh = val >= 4;
                      return (
                        <td
                          key={idx}
                          className={`px-2 py-2 text-center font-mono font-semibold ${
                            isHigh ? "text-[#2E7D32] bg-emerald-50/30" : "text-[#6E5545]"
                          }`}
                        >
                          {val}
                        </td>
                      );
                    })}
                    <td className="px-3 py-2 text-center font-mono font-bold text-[#7B2D26] bg-[#E8A33D]/15">
                      {rowTotal}
                    </td>
                  </tr>
                );
              })}
              {/* Total SAV Row */}
              <tr className="bg-[#7B2D26] text-[#FBF3E7] font-bold">
                <td className="px-3 py-2 uppercase font-temple">SAV Total</td>
                {houses.map((h) => (
                  <td key={h} className="px-2 py-2 text-center font-mono text-xs text-[#E8A33D]">
                    {sav[h]}
                  </td>
                ))}
                <td className="px-3 py-2 text-center font-mono text-sm text-[#FBF3E7]">337</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
