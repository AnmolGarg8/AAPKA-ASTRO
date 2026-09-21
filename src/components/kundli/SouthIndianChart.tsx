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
  size = 400,
  className = "",
  chartTitle = "South Indian Kundli",
}) => {
  const S = size;

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
        <div className="font-temple text-xs font-bold uppercase tracking-wider text-[#7B2D26] mb-2">
          {chartTitle}
        </div>
      )}

      <div
        style={{ width: S, height: S }}
        className="grid grid-cols-4 grid-rows-4 rounded-2xl border-2 border-[#7B2D26] bg-[#FFFDF7] overflow-hidden shadow-md"
      >
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => {
            const isCenter = (row === 1 || row === 2) && (col === 1 || col === 2);

            if (isCenter) {
              if (row === 1 && col === 1) {
                return (
                  <div
                    key={`${row}-${col}`}
                    className="col-span-2 row-span-2 flex flex-col items-center justify-center border border-[#E8D8C3] bg-[#FBF3E7] p-2 text-center"
                  >
                    <div className="font-temple text-[#7B2D26] font-bold text-sm tracking-wide">
                      {kundli.name}
                    </div>
                    <div className="text-[10px] text-[#6E5545] font-semibold mt-0.5">
                      Lagna: {kundli.ascendant.rashiName}
                    </div>
                    <div className="text-[10px] text-[#6E5545]">
                      Moon: {kundli.moonSign} &bull; {kundli.nakshatra}
                    </div>
                  </div>
                );
              }
              return null;
            }

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
                className={`relative flex flex-col justify-between p-1.5 border border-[#E8D8C3] ${
                  isLagnaHouse ? "bg-[#E8A33D]/15" : "bg-[#FFFDF7]"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-[#6E5545]">
                  <span className="font-bold text-[#C1662F]">{rashiEntry[1].name.slice(0, 3)}</span>
                  {isLagnaHouse && (
                    <span className="text-[9px] px-1 py-0.2 bg-[#7B2D26] text-[#FBF3E7] rounded font-bold">
                      ASC
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 mt-1">
                  {planets.map((p) => (
                    <span
                      key={p.name}
                      className={`text-[10px] font-bold ${
                        p.name === "Ascendant"
                          ? "text-[#7B2D26]"
                          : p.dignity === "Exalted"
                          ? "text-[#2E7D32]"
                          : p.dignity === "Debilitated"
                          ? "text-[#C62828]"
                          : "text-[#3B2A1E]"
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
