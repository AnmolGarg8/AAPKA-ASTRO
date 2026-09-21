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
      <div className="border-b border-[#E8D8C3] bg-[#FBF3E7] px-4 py-3">
        <h4 className="font-temple text-sm font-bold text-[#7B2D26] uppercase tracking-wider">
          Planetary Positions &amp; Dignities (ग्रह स्थिति)
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E8D8C3] bg-[#FBF3E7]/60 text-[#6E5545] font-bold uppercase">
            <tr>
              <th className="px-3.5 py-2.5">Planet</th>
              <th className="px-3.5 py-2.5">Sign (Rashi)</th>
              <th className="px-3.5 py-2.5">Degrees</th>
              <th className="px-3.5 py-2.5">Nakshatra</th>
              <th className="px-3.5 py-2.5">Pada</th>
              <th className="px-3.5 py-2.5">House</th>
              <th className="px-3.5 py-2.5">Dignity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8D8C3] text-[#3B2A1E]">
            {list.map((p) => {
              const isExalted = p.dignity === "Exalted";
              const isDebilitated = p.dignity === "Debilitated";
              const isOwn = p.dignity === "Own Sign" || p.dignity === "Mooltrikona";

              return (
                <tr key={p.name} className="hover:bg-[#FBF3E7]/50 transition-colors">
                  <td className="px-3.5 py-2.5 font-bold text-[#7B2D26] flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-black">{p.symbol}</span>
                    <span>{p.name}</span>
                    <span className="text-[10px] text-[#6E5545] font-normal">({p.hindiName})</span>
                  </td>
                  <td className="px-3.5 py-2.5 font-semibold">{p.rashiName}</td>
                  <td className="px-3.5 py-2.5 font-mono font-bold text-[#C1662F]">{p.degreeFormatted}</td>
                  <td className="px-3.5 py-2.5">
                    {p.nakshatra}
                    <span className="text-[10px] text-[#6E5545] block">{p.nakshatraLord}</span>
                  </td>
                  <td className="px-3.5 py-2.5 text-center font-mono font-bold">{p.pada}</td>
                  <td className="px-3.5 py-2.5 text-center font-bold text-[#7B2D26]">H{p.house}</td>
                  <td className="px-3.5 py-2.5">
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
