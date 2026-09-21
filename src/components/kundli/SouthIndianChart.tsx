"use client";

import React from "react";
import { KundliData } from "@/lib/astrology/types";

interface SouthIndianChartProps {
  kundli: KundliData;
  size?: number;
  className?: string;
  chartTitle?: string;
}

export const SouthIndianChart: React.FC<SouthIndianChartProps> = ({
  kundli,
  size = 420,
  className = "",
  chartTitle = "South Indian Chart",
}) => {
  const S = size;
  const cellSize = S / 4;

  // South Indian box indices for Rashis (1: Aries to 12: Pisces)
  // Grid layout (row, col) 0-indexed:
  // (0,1): 1 Aries, (0,2): 2 Taurus, (0,3): 3 Gemini, (1,3): 4 Cancer,
  // (2,3): 5 Leo, (3,3): 6 Virgo, (3,2): 7 Libra, (3,1): 8 Scorpio,
  // (3,0): 9 Sagittarius, (2,0): 10 Capricorn, (1,0): 11 Aquarius, (0,0): 12 Pisces
  const rashiGridPos: Record<number, { r: number; c: number; name: string }> = {
    12: { r: 0, c: 0, name: "Pisces" },
    1: { r: 0, c: 1, name: "Aries" },
    2: { r: 0, c: 2, name: "Taurus" },
    3: { r: 0, c: 3, name: "Gemini" },
    4: { r: 1, c: 3, name: "Cancer" },
    5: { r: 2, c: 3, name: "Leo" },
    6: { r: 3, c: 3, name: "Virgo" },
    7: { r: 3, c: 2, name: "Libra" },
    8: { r: 3, c: 1, name: "Scorpio" },
    9: { r: 3, c: 0, name: "Sagittarius" },
    10: { r: 2, c: 0, name: "Capricorn" },
    11: { r: 1, c: 0, name: "Aquarius" },
  };

  const getPlanetsInRashi = (rashiNum: number) => {
    const list = kundli.planets.filter((p) => p.rashiNumber === rashiNum);
    if (kundli.ascendant.rashiNumber === rashiNum) {
      return [kundli.ascendant, ...list];
    }
    return list;
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {chartTitle && (
        <div className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2">
          {chartTitle}
        </div>
      )}

      <div
        style={{ width: S, height: S }}
        className="grid grid-cols-4 grid-rows-4 rounded-xl border-2 border-amber-500/40 bg-[#0B0F19] overflow-hidden shadow-2xl"
      >
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => {
            // Check if center (1,1), (1,2), (2,1), (2,2)
            const isCenter = (row === 1 || row === 2) && (col === 1 || col === 2);

            if (isCenter) {
              if (row === 1 && col === 1) {
                return (
                  <div
                    key={`${row}-${col}`}
                    className="col-span-2 row-span-2 flex flex-col items-center justify-center border border-amber-500/20 bg-gradient-to-br from-[#111827] to-[#1E1B4B] p-2 text-center"
                  >
                    <div className="text-amber-400 font-bold text-sm tracking-wider">
                      {kundli.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Lagna: {kundli.ascendant.rashiName}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Moon: {kundli.moonSign} • {kundli.nakshatra}
                    </div>
                  </div>
                );
              }
              return null; // Handled by col-span-2 row-span-2
            }

            // Find which Rashi this grid cell belongs to
            const rashiEntry = Object.entries(rashiGridPos).find(
              ([, pos]) => pos.r === row && pos.c === col
            );
            if (!rashiEntry) return null;

            const rashiNum = parseInt(rashiEntry[0], 10);
            const planets = getPlanetsInRashi(rashiNum);
            const isLagnaHouse = kundli.ascendant.rashiNumber === rashiNum;

            return (
              <div
                key={`${row}-${col}`}
                className={`relative flex flex-col justify-between p-1.5 border border-amber-500/30 ${
                  isLagnaHouse ? "bg-amber-500/10" : "bg-[#0F172A]/70"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-semibold text-amber-300">{rashiEntry[1].name.slice(0, 3)}</span>
                  {isLagnaHouse && (
                    <span className="text-[9px] px-1 py-0.2 bg-amber-500/30 text-amber-300 rounded font-bold">
                      ASC
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mt-1">
                  {planets.map((p) => (
                    <span
                      key={p.name}
                      className={`text-[10px] font-semibold ${
                        p.name === "Ascendant"
                          ? "text-amber-400"
                          : p.dignity === "Exalted"
                          ? "text-emerald-400"
                          : p.dignity === "Debilitated"
                          ? "text-rose-400"
                          : "text-slate-200"
                      }`}
                    >
                      {p.symbol}
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
