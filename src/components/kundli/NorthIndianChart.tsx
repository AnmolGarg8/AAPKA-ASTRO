"use client";

import React from "react";
import { KundliData } from "@/lib/astrology/types";

interface NorthIndianChartProps {
  kundli: KundliData;
  size?: number;
  className?: string;
  chartTitle?: string;
}

export const NorthIndianChart: React.FC<NorthIndianChartProps> = ({
  kundli,
  size = 420,
  className = "",
  chartTitle = "Lagna Chart (D1)",
}) => {
  const S = size;
  const H_S = S / 2;
  const Q_S = S / 4;
  const TQ_S = (3 * S) / 4;

  // Get planets grouped by house
  const getHouseData = (houseNum: number) => {
    const house = kundli.houses.find((h) => h.houseNumber === houseNum);
    return {
      rashi: house?.rashiNumber ?? 1,
      planets: house?.planets ?? [],
    };
  };

  // Center coordinates for House labels & planet lists
  const houseCoordinates: Record<number, { rashiX: number; rashiY: number; planetX: number; planetY: number }> = {
    1: { rashiX: H_S, rashiY: Q_S - 24, planetX: H_S, planetY: Q_S },
    2: { rashiX: Q_S - 15, rashiY: 28, planetX: Q_S - 10, planetY: 55 },
    3: { rashiX: 28, rashiY: Q_S - 15, planetX: 45, planetY: Q_S },
    4: { rashiX: Q_S - 20, rashiY: H_S, planetX: Q_S, planetY: H_S },
    5: { rashiX: 28, rashiY: TQ_S + 15, planetX: 45, planetY: TQ_S },
    6: { rashiX: Q_S - 15, rashiY: S - 20, planetX: Q_S - 10, planetY: S - 45 },
    7: { rashiX: H_S, rashiY: TQ_S + 35, planetX: H_S, planetY: TQ_S },
    8: { rashiX: TQ_S + 15, rashiY: S - 20, planetX: TQ_S + 10, planetY: S - 45 },
    9: { rashiX: S - 28, rashiY: TQ_S + 15, planetX: S - 45, planetY: TQ_S },
    10: { rashiX: TQ_S + 20, rashiY: H_S, planetX: TQ_S, planetY: H_S },
    11: { rashiX: S - 28, rashiY: Q_S - 15, planetX: S - 45, planetY: Q_S },
    12: { rashiX: TQ_S + 15, rashiY: 28, planetX: TQ_S + 10, planetY: 55 },
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {chartTitle && (
        <div className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-2">
          {chartTitle}
        </div>
      )}

      <svg
        width={S}
        height={S}
        viewBox={`0 0 ${S} ${S}`}
        className="rounded-xl shadow-2xl border-2 border-amber-500/40 bg-gradient-to-br from-[#0F172A] via-[#0B0F19] to-[#1E1B4B]"
      >
        <defs>
          {/* Subtle cosmic glow */}
          <radialGradient id="kundliGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width={S} height={S} fill="url(#kundliGlow)" />

        {/* Outer Square */}
        <rect
          x="1.5"
          y="1.5"
          width={S - 3}
          height={S - 3}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2.5"
          opacity="0.85"
        />

        {/* Main Diagonals */}
        <line x1="0" y1="0" x2={S} y2={S} stroke="#D97706" strokeWidth="1.75" opacity="0.75" />
        <line x1="0" y1={S} x2={S} y2="0" stroke="#D97706" strokeWidth="1.75" opacity="0.75" />

        {/* Inner Diamond connecting midpoints */}
        <polygon
          points={`${H_S},0 ${S},${H_S} ${H_S},${S} 0,${H_S}`}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
          opacity="0.85"
        />

        {/* Houses data & planets rendering */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hNum) => {
          const { rashi, planets } = getHouseData(hNum);
          const coords = houseCoordinates[hNum];

          return (
            <g key={hNum}>
              {/* Rashi Sign Number */}
              <text
                x={coords.rashiX}
                y={coords.rashiY}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
                className="font-mono opacity-80"
              >
                {rashi}
              </text>

              {/* Occupying Planets */}
              {planets.length > 0 && (
                <g>
                  {planets.map((p, idx) => {
                    const offset = (idx - (planets.length - 1) / 2) * 13;
                    const isExalted = p.dignity === "Exalted";
                    const isDebilitated = p.dignity === "Debilitated";

                    return (
                      <text
                        key={p.name}
                        x={coords.planetX}
                        y={coords.planetY + offset}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={
                          isExalted
                            ? "#34D399"
                            : isDebilitated
                            ? "#F87171"
                            : p.name === "Sun"
                            ? "#FDE047"
                            : p.name === "Moon"
                            ? "#E0E7FF"
                            : p.name === "Mars"
                            ? "#FB7185"
                            : p.name === "Jupiter"
                            ? "#FCD34D"
                            : "#CBD5E1"
                        }
                        fontSize="11.5"
                        fontWeight="600"
                        className="tracking-tight"
                      >
                        {p.symbol}
                        <tspan fontSize="8.5" fill="#94A3B8" dx="2">
                          {p.degreeFormatted.split(" ")[0]}
                        </tspan>
                      </text>
                    );
                  })}
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend footnote */}
      <div className="flex items-center gap-4 text-[10px] text-slate-400 mt-2">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Exalted
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" /> Debilitated
        </span>
        <span className="flex items-center gap-1">
          <span className="text-amber-400 font-bold font-mono">1-12</span> Signs (Rashis)
        </span>
      </div>
    </div>
  );
};
