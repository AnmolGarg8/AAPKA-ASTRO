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
  size = 400,
  className = "",
  chartTitle = "Lagna Kundli (D1 Chart)",
}) => {
  const S = size;
  const H_S = S / 2;
  const Q_S = S / 4;
  const TQ_S = (3 * S) / 4;

  const getHouseData = (houseNum: number) => {
    const house = kundli.houses.find((h) => h.houseNumber === houseNum);
    return {
      rashi: house?.rashiNumber ?? 1,
      planets: house?.planets ?? [],
    };
  };

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
        <div className="font-temple text-xs font-bold uppercase tracking-wider text-[#7B2D26] mb-2">
          {chartTitle}
        </div>
      )}

      <svg
        width={S}
        height={S}
        viewBox={`0 0 ${S} ${S}`}
        className="rounded-2xl border-2 border-[#7B2D26] bg-[#FFFDF7] shadow-md"
      >
        {/* Outer Square Frame */}
        <rect
          x="2"
          y="2"
          width={S - 4}
          height={S - 4}
          fill="#FFFDF7"
          stroke="#7B2D26"
          strokeWidth="3"
        />

        {/* Diagonal Cross Lines */}
        <line x1="0" y1="0" x2={S} y2={S} stroke="#C1662F" strokeWidth="1.8" />
        <line x1="0" y1={S} x2={S} y2="0" stroke="#C1662F" strokeWidth="1.8" />

        {/* Inner Diamond connecting midpoints */}
        <polygon
          points={`${H_S},0 ${S},${H_S} ${H_S},${S} 0,${H_S}`}
          fill="none"
          stroke="#7B2D26"
          strokeWidth="2.2"
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
                fill="#C1662F"
                fontSize="11.5"
                fontWeight="bold"
                className="font-mono"
              >
                {rashi}
              </text>

              {/* Occupying Planets */}
              {planets.length > 0 && (
                <g>
                  {planets.map((p, idx) => {
                    const offset = (idx - (planets.length - 1) / 2) * 14;
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
                            ? "#2E7D32"
                            : isDebilitated
                            ? "#C62828"
                            : p.name === "Sun"
                            ? "#B45309"
                            : p.name === "Mars"
                            ? "#7B2D26"
                            : p.name === "Saturn"
                            ? "#1E3A8A"
                            : "#3B2A1E"
                        }
                        fontSize="12"
                        fontWeight="bold"
                        className="tracking-tight"
                      >
                        {p.symbol}
                        <tspan fontSize="9" fill="#78716C" dx="2">
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
      <div className="flex items-center gap-4 text-[10px] text-[#6E5545] mt-2 font-medium">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#2E7D32] inline-block" /> Exalted (उच्च)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#C62828] inline-block" /> Debilitated (नीच)
        </span>
        <span className="flex items-center gap-1">
          <span className="text-[#C1662F] font-bold font-mono">1-12</span> Signs (राशि)
        </span>
      </div>
    </div>
  );
};
