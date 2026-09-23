"use client";

import React from "react";
import { KundliData } from "@/lib/astrology/types";

interface SouthIndianChartProps {
  kundli: KundliData;
  customHouses?: Array<{
    houseNumber: number;
    rashiNumber: number;
    planets: Array<{ symbol: string; isRetrograde?: boolean; name?: string }>;
  }>;
  size?: number;
  className?: string;
  chartTitle?: string;
}

export const SouthIndianChart: React.FC<SouthIndianChartProps> = ({
  kundli,
  customHouses,
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
    if (customHouses) {
      const house = customHouses.find((h) => h.rashiNumber === rashiNum);
      const isAsc = house?.houseNumber === 1;
      const list = house?.planets || [];
      if (isAsc) {
        return [{ symbol: "Asc", name: "Ascendant", isRetrograde: false }, ...list];
      }
      return list;
    }

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
                    style={{ gridColumn: "span 2", gridRow: "span 2" }}
                    className="flex flex-col items-center justify-center border border-[#7B2D26]/20 bg-[#FAF1E4]/50"
                  >
                    <div className="font-temple text-3xl font-bold text-[#7B2D26] opacity-30 select-none">
                      ॐ
                    </div>
                    <div className="text-[10px] font-bold text-[#7B2D26]/70 uppercase tracking-widest mt-1">
                      {chartTitle.split(" ")[0]}
                    </div>
                  </div>
                );
              }
              return null;
            }

            const rashiEntry = Object.entries(rashiGridPos).find(
              ([, pos]) => pos.r === row && pos.c === col
            );
            const rashiNum = rashiEntry ? parseInt(rashiEntry[0], 10) : 1;
            const rashiName = rashiEntry ? rashiEntry[1].name : "";
            const planets = getPlanetsInRashi(rashiNum);

            return (
              <div
                key={`${row}-${col}`}
                className="relative border border-[#7B2D26]/30 p-1 flex flex-col justify-between overflow-hidden bg-[#FFFDF7] hover:bg-[#FAF1E4]/30 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono text-[#C1662F] font-bold leading-none">
                    {rashiNum}
                  </span>
                  <span className="text-[8px] text-[#7D6B5D] truncate max-w-[45px] leading-none">
                    {rashiName}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-1 my-auto">
                  {planets.map((p, pIdx) => {
                    const isAsc = p.symbol === "Asc";
                    return (
                      <span
                        key={pIdx}
                        className={`text-[10px] font-bold leading-none ${
                          isAsc ? "text-[#C1662F] underline" : "text-[#7B2D26]"
                        }`}
                      >
                        {p.symbol}
                        {p.isRetrograde && (
                          <span className="text-[8px] text-[#DC2626] font-bold">(R)</span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
