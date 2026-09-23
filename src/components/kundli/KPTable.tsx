"use client";

import React, { useState } from "react";
import { KpSystemData } from "@/lib/astrology/kpSystem";
import { Compass, Sparkles, BookOpen } from "lucide-react";

interface KPTableProps {
  kpData?: KpSystemData;
}

export const KPTable: React.FC<KPTableProps> = ({ kpData }) => {
  const [activeSubTab, setActiveSubTab] = useState<"cusps" | "planets">("cusps");

  if (!kpData) {
    return (
      <div className="p-8 text-center text-xs text-[#7D6B5D] bg-[#FFFDF9] rounded-2xl border border-[#E8D8C3]">
        KP System calculations are loading or unavailable.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E8D8C3]">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E8A33D]/40 bg-[#FAF1E4] px-2.5 py-0.5 text-[10px] font-bold text-[#7B2D26] uppercase font-temple">
            <Compass className="h-3 w-3 text-[#C1662F]" />
            <span>Krishnamurti Paddhati (KP System)</span>
          </div>
          <h3 className="text-lg font-bold font-temple text-[#7B2D26] mt-1">
            KP Sub-Lord Cuspal &amp; Planetary Analysis
          </h3>
          <p className="text-xs text-[#6E5545]">
            Precision sub-lord divisions for stellar event-timing and cuspal significations.
          </p>
        </div>

        {/* View Switcher Pill */}
        <div className="flex rounded-xl bg-[#FBF3E7] p-1 border border-[#E8D8C3] shrink-0">
          <button
            type="button"
            onClick={() => setActiveSubTab("cusps")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              activeSubTab === "cusps"
                ? "bg-[#7B2D26] text-[#FBF3E7] shadow-sm"
                : "text-[#6E5545] hover:text-[#3B2A1E]"
            }`}
          >
            House Cusps (12 भाव)
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab("planets")}
            className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
              activeSubTab === "planets"
                ? "bg-[#7B2D26] text-[#FBF3E7] shadow-sm"
                : "text-[#6E5545] hover:text-[#3B2A1E]"
            }`}
          >
            Planetary Sub-Lords (ग्रह)
          </button>
        </div>
      </div>

      {/* 1. KP House Cusps Table */}
      {activeSubTab === "cusps" && (
        <div className="overflow-x-auto rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF5EE] text-[#7D6B5D] font-bold uppercase border-b border-[#E8D8C3]">
              <tr>
                <th className="px-4 py-3">Cusp (भाव)</th>
                <th className="px-4 py-3">Degree</th>
                <th className="px-4 py-3">Sign (राशि)</th>
                <th className="px-4 py-3">Sign Lord (राशि स्वामी)</th>
                <th className="px-4 py-3">Star (नक्षत्र)</th>
                <th className="px-4 py-3">Star Lord (नक्षत्र स्वामी)</th>
                <th className="px-4 py-3 text-[#7B2D26] font-bold bg-[#FAF1E4]/60">
                  Sub-Lord (उप स्वामी)
                </th>
                <th className="px-4 py-3">Sub-Sub Lord</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D8C3]/70 text-[#3B2A1E]">
              {kpData.houses.map((h) => (
                <tr key={h.houseNumber} className="hover:bg-[#FAF5EE]/60 transition-colors">
                  <td className="px-4 py-2.5 font-bold font-temple text-[#7B2D26]">
                    House {h.houseNumber}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-[#6E5545]">
                    {h.formattedDegree}
                  </td>
                  <td className="px-4 py-2.5 font-semibold text-[#3B2A1E]">{h.sign}</td>
                  <td className="px-4 py-2.5 text-[#6E5545]">{h.signLord}</td>
                  <td className="px-4 py-2.5 font-medium">{h.star}</td>
                  <td className="px-4 py-2.5 text-[#6E5545]">{h.starLord}</td>
                  <td className="px-4 py-2.5 font-bold text-[#7B2D26] bg-[#FAF1E4]/60">
                    <span className="inline-block px-2 py-0.5 rounded bg-[#E8A33D]/20 text-[#7B2D26] font-mono font-bold">
                      {h.subLord}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[11px] text-[#7D6B5D]">{h.subSubLord}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. KP Planetary Positions Table */}
      {activeSubTab === "planets" && (
        <div className="overflow-x-auto rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF5EE] text-[#7D6B5D] font-bold uppercase border-b border-[#E8D8C3]">
              <tr>
                <th className="px-4 py-3">Planet (ग्रह)</th>
                <th className="px-4 py-3">Degree</th>
                <th className="px-4 py-3">House</th>
                <th className="px-4 py-3">Sign (राशि)</th>
                <th className="px-4 py-3">Sign Lord</th>
                <th className="px-4 py-3">Star (नक्षत्र)</th>
                <th className="px-4 py-3">Star Lord</th>
                <th className="px-4 py-3 text-[#7B2D26] font-bold bg-[#FAF1E4]/60">
                  Sub-Lord (उप स्वामी)
                </th>
                <th className="px-4 py-3">Sub-Sub Lord</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D8C3]/70 text-[#3B2A1E]">
              {kpData.planets.map((p) => (
                <tr key={p.name} className="hover:bg-[#FAF5EE]/60 transition-colors">
                  <td className="px-4 py-2.5 font-bold font-temple text-[#7B2D26] flex items-center gap-1.5">
                    <span>{p.name}</span>
                    <span className="text-[10px] text-[#6E5545] font-normal">({p.hindiName})</span>
                    {p.isRetrograde && (
                      <span className="rounded bg-amber-100 px-1 py-0.2 text-[9px] font-bold text-amber-900">
                        R
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-[#6E5545]">
                    {p.formattedDegree}
                  </td>
                  <td className="px-4 py-2.5 font-bold text-[#C1662F]">House {p.house}</td>
                  <td className="px-4 py-2.5 font-semibold text-[#3B2A1E]">{p.sign}</td>
                  <td className="px-4 py-2.5 text-[#6E5545]">{p.signLord}</td>
                  <td className="px-4 py-2.5 font-medium">{p.star}</td>
                  <td className="px-4 py-2.5 text-[#6E5545]">{p.starLord}</td>
                  <td className="px-4 py-2.5 font-bold text-[#7B2D26] bg-[#FAF1E4]/60">
                    <span className="inline-block px-2 py-0.5 rounded bg-[#E8A33D]/20 text-[#7B2D26] font-mono font-bold">
                      {p.subLord}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-[11px] text-[#7D6B5D]">{p.subSubLord}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* KP Interpretation Guide Callout */}
      <div className="rounded-2xl border border-[#E8A33D]/50 bg-[#FAF1E4]/60 p-4 text-xs text-[#6B5A4E]">
        <div className="flex items-center gap-2 font-bold text-[#7B2D26] mb-1 font-temple">
          <BookOpen className="h-4 w-4 text-[#C1662F]" />
          <span>KP Astrological Principle (Krishnamurti Stellar Law)</span>
        </div>
        <p className="leading-relaxed">
          In Krishnamurti Paddhati, a planet delivers the results of its <strong>Star Lord</strong>, while
          the quality, success, or denial of the event is ruled decisively by its <strong>Sub-Lord</strong>.
          For instance, if the 7th Cusp Sub-Lord connects to Houses 2, 7, 11, matrimonial union is guaranteed;
          if it connects to 1, 6, 10, delays or obstacles manifest.
        </p>
      </div>
    </div>
  );
};
