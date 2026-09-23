"use client";

import React from "react";
import { ShadbalaData } from "@/lib/astrology/types";
import { ShieldCheck, TrendingUp, AlertCircle, Award } from "lucide-react";

interface ShadbalaTableProps {
  shadbala?: ShadbalaData;
  className?: string;
}

export const ShadbalaTable: React.FC<ShadbalaTableProps> = ({ shadbala, className = "" }) => {
  if (!shadbala) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-[#6B8E5A]/40 bg-emerald-50/50 p-4 flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6B8E5A] text-white">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#6E5545] uppercase tracking-wider">
              Strongest Benefic Planet
            </div>
            <div className="font-temple text-lg font-bold text-[#2E7D32]">
              {shadbala.strongestPlanet} (Rank #1)
            </div>
            <div className="text-[11px] text-[#6E5545]">
              Commands maximum Shadbala vitality to deliver auspicious yogas
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-amber-300 bg-amber-50/50 p-4 flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C1662F] text-white">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#6E5545] uppercase tracking-wider">
              Planet Requiring Strengthening
            </div>
            <div className="font-temple text-lg font-bold text-[#C1662F]">
              {shadbala.weakestPlanet} (Rank #7)
            </div>
            <div className="text-[11px] text-[#6E5545]">
              Requires mantra chanting, gemstone or Vedic satvik remedies
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Shadbala Table */}
      <div className="overflow-hidden rounded-2xl border-2 border-[#E8D8C3] bg-[#FFFDF9] shadow-sm">
        <div className="border-b border-[#E8D8C3] bg-[#FBF3E7] px-4 py-3">
          <h4 className="font-temple text-sm font-bold text-[#7B2D26] uppercase tracking-wider">
            6-Fold Shadbala Breakdown (षड्बल तालिका)
          </h4>
          <p className="text-[11px] text-[#6E5545] mt-0.5">
            Sthana (Positional), Dik (Directional), Kaala (Temporal), Cheshta (Motional), Naisargika (Natural), Drik (Aspectual) &bull; 60 Virupas = 1 Rupa
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E8D8C3] bg-[#FBF3E7]/60 text-[#6E5545] font-bold uppercase">
              <tr>
                <th className="px-3 py-2.5">Rank</th>
                <th className="px-3 py-2.5">Planet</th>
                <th className="px-2.5 py-2.5 text-center">Sthana</th>
                <th className="px-2.5 py-2.5 text-center">Dik</th>
                <th className="px-2.5 py-2.5 text-center">Kaala</th>
                <th className="px-2.5 py-2.5 text-center">Cheshta</th>
                <th className="px-2.5 py-2.5 text-center">Naisargika</th>
                <th className="px-2.5 py-2.5 text-center">Drik</th>
                <th className="px-3 py-2.5 text-center font-bold text-[#7B2D26]">Total Rupas</th>
                <th className="px-3 py-2.5 text-center font-bold">Required</th>
                <th className="px-3 py-2.5 text-center">Ratio / Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8D8C3] text-[#3B2A1E]">
              {shadbala.planets.map((p) => {
                const isPass = p.strengthRatio >= 1.0;

                return (
                  <tr key={p.planet} className="hover:bg-[#FBF3E7]/50 transition-colors">
                    <td className="px-3 py-2.5 font-bold font-mono text-[#7B2D26]">#{p.rank}</td>
                    <td className="px-3 py-2.5 font-bold text-[#3B2A1E] whitespace-nowrap">{p.planet}</td>
                    <td className="px-2.5 py-2.5 text-center font-mono text-[#6E5545]">{p.sthanaBala}</td>
                    <td className="px-2.5 py-2.5 text-center font-mono text-[#6E5545]">{p.dikBala}</td>
                    <td className="px-2.5 py-2.5 text-center font-mono text-[#6E5545]">{p.kaalaBala}</td>
                    <td className="px-2.5 py-2.5 text-center font-mono text-[#6E5545]">{p.cheshtaBala}</td>
                    <td className="px-2.5 py-2.5 text-center font-mono text-[#6E5545]">{p.naisargikaBala}</td>
                    <td className="px-2.5 py-2.5 text-center font-mono text-[#6E5545]">{p.drikBala}</td>
                    <td className="px-3 py-2.5 text-center font-mono font-bold text-[#7B2D26] bg-[#E8A33D]/15">
                      {p.totalRupas}
                    </td>
                    <td className="px-3 py-2.5 text-center font-mono text-[#6E5545]">{p.requiredRupas}</td>
                    <td className="px-3 py-2.5 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold ${
                          isPass
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        <span className="font-mono">{p.strengthRatio}x</span>
                        <span>{isPass ? "Strong" : "Sensitive"}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
