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
    <div className={`overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur-md ${className}`}>
      <div className="border-b border-slate-800 bg-slate-900/90 px-4 py-3">
        <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
          Planetary Positions & Dignities (ग्रह स्थिति)
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 bg-slate-950/40 text-slate-400 font-semibold uppercase">
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
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {list.map((p) => {
              const isExalted = p.dignity === "Exalted";
              const isDebilitated = p.dignity === "Debilitated";
              const isOwn = p.dignity === "Own Sign" || p.dignity === "Mooltrikona";

              return (
                <tr key={p.name} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-3.5 py-2.5 font-semibold text-white flex items-center gap-1.5">
                    <span className="text-amber-400 font-mono text-[11px]">{p.symbol}</span>
                    <span>{p.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({p.hindiName})</span>
                  </td>
                  <td className="px-3.5 py-2.5 font-medium">{p.rashiName}</td>
                  <td className="px-3.5 py-2.5 font-mono text-amber-300/90">{p.degreeFormatted}</td>
                  <td className="px-3.5 py-2.5">
                    {p.nakshatra}
                    <span className="text-[10px] text-slate-400 block">{p.nakshatraLord}</span>
                  </td>
                  <td className="px-3.5 py-2.5 text-center font-mono">{p.pada}</td>
                  <td className="px-3.5 py-2.5 text-center font-bold text-amber-400">H{p.house}</td>
                  <td className="px-3.5 py-2.5">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-[10px] font-semibold ${
                        isExalted
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : isDebilitated
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : isOwn
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-slate-800 text-slate-300"
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
