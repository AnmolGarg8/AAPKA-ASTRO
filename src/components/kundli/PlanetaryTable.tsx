"use client";

import React from "react";
import { KundliData } from "@/lib/astrology/types";

interface PlanetaryTableProps {
  kundli: KundliData;
  className?: string;
}

export const PlanetaryTable: React.FC<PlanetaryTableProps> = ({ kundli, className = "" }) => {
  const list = [kundli.ascendant, ...kundli.planets];

  return (
    <div className={`overflow-hidden rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] shadow-sm ${className}`}>
      <div className="border-b border-[#E8D8C3] bg-[#FBF3E7] px-4 py-3 flex items-center justify-between">
        <div>
          <h4 className="font-temple text-sm font-bold text-[#7B2D26] uppercase tracking-wider">
            Planetary Positions, Motion &amp; Avasthas (ग्रह स्थिति व अवस्था)
          </h4>
          <p className="text-[11px] text-[#6E5545] mt-0.5">
            Lahiri Nirayana ephemeris &bull; Accurate geocentric degrees, retrograde motion &bull; 5 Baladi states
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E8D8C3] bg-[#FBF3E7]/60 text-[#6E5545] font-bold uppercase">
            <tr>
              <th className="px-3 py-2.5">Planet</th>
              <th className="px-3 py-2.5">Sign (Rashi)</th>
              <th className="px-3 py-2.5">Degrees</th>
              <th className="px-3 py-2.5">Nakshatra (Lord)</th>
              <th className="px-3 py-2.5 text-center">Pada</th>
              <th className="px-3 py-2.5 text-center">House</th>
              <th className="px-3 py-2.5 text-center">Motion</th>
              <th className="px-3 py-2.5">Baladi Avastha</th>
              <th className="px-3 py-2.5">Dignity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8D8C3] text-[#3B2A1E]">
            {list.map((p) => {
              const isExalted = p.dignity === "Exalted";
              const isDebilitated = p.dignity === "Debilitated";
              const isOwn = p.dignity === "Own Sign" || p.dignity === "Mooltrikona";

              return (
                <tr key={p.name} className="hover:bg-[#FBF3E7]/50 transition-colors">
                  <td className="px-3 py-2.5 font-bold text-[#7B2D26] flex items-center gap-1.5 whitespace-nowrap">
                    <span className="font-mono text-[11px] font-black">{p.symbol}</span>
                    <span>{p.name}</span>
                    <span className="text-[10px] text-[#6E5545] font-normal">({p.hindiName})</span>
                  </td>
                  <td className="px-3 py-2.5 font-semibold whitespace-nowrap">{p.rashiName}</td>
                  <td className="px-3 py-2.5 font-mono font-bold text-[#C1662F] whitespace-nowrap">
                    {p.degreeFormatted}
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span className="font-medium text-[#3B2A1E]">{p.nakshatra}</span>
                    <span className="text-[10px] text-[#6E5545] block font-mono">Lord: {p.nakshatraLord}</span>
                  </td>
                  <td className="px-3 py-2.5 text-center font-mono font-bold">{p.pada}</td>
                  <td className="px-3 py-2.5 text-center font-bold text-[#7B2D26]">H{p.house}</td>
                  <td className="px-3 py-2.5 text-center whitespace-nowrap">
                    {p.name === "Ascendant" ? (
                      <span className="text-[10px] text-[#6E5545]">—</span>
                    ) : p.isRetrograde ? (
                      <span className="inline-flex items-center gap-1 rounded bg-rose-100 border border-rose-300 px-1.5 py-0.5 text-[10px] font-bold text-rose-800">
                        <span>Vakri</span>
                        <span className="font-mono">(R)</span>
                      </span>
                    ) : (
                      <span className="inline-block rounded bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                        Margi (D)
                      </span>
                    )}
                    {p.isCombust && (
                      <span className="ml-1 inline-block rounded bg-amber-100 border border-amber-300 px-1 py-0.5 text-[9px] font-bold text-amber-900">
                        Asta
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span className="text-[11px] font-medium text-[#3B2A1E]">
                      {p.baladiAvastha?.split(" ")[0] || "Yuva"}
                    </span>
                    <span className="text-[10px] text-[#6E5545] block italic">
                      {p.jagradadiAvastha?.split(" ")[0] || "Awake"}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                        isExalted
                          ? "bg-[#6B8E5A]/20 text-[#2E7D32] border border-[#6B8E5A]/40"
                          : isDebilitated
                          ? "bg-[#991B1B]/15 text-[#991B1B] border border-[#991B1B]/30"
                          : isOwn
                          ? "bg-[#E8A33D]/25 text-[#7B2D26] border border-[#E8A33D]/40"
                          : "bg-[#FBF3E7] text-[#6E5545] border border-[#E8D8C3]"
                      }`}
                    >
                      {p.dignity}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
