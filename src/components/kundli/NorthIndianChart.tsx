"use client";

import React from "react";
import { KundliData } from "@/lib/astrology/types";

interface NorthIndianChartProps {
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

export const NorthIndianChart: React.FC<NorthIndianChartProps> = ({
  kundli,
  customHouses,
  size = 400,
  className = "",
  chartTitle = "Lagna Kundli (D1 Chart)",
}) => {
  const S = size;
  const H_S = S / 2;
  const Q_S = S / 4;
  const TQ_S = (3 * S) / 4;

  const housesSource = customHouses || kundli.houses;

  const getHouseData = (houseNum: number) => {
    const house = housesSource.find((h) => h.houseNumber === houseNum);
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
        {/* Outer Square */}
        <rect x="2" y="2" width={S - 4} height={S - 4} fill="none" stroke="#7B2D26" strokeWidth="2.5" />

        {/* Diagonals */}
        <line x1="0" y1="0" x2={S} y2={S} stroke="#C1662F" strokeWidth="1.5" />
        <line x1={S} y1="0" x2="0" y2={S} stroke="#C1662F" strokeWidth="1.5" />

        {/* Inner Diamond (Houses 1, 4, 7, 10 - Kendras) */}
        <polygon
          points={`${H_S},0 ${S},${H_S} ${H_S},${S} 0,${H_S}`}
          fill="#FFF9F0"
          fillOpacity="0.4"
          stroke="#7B2D26"
          strokeWidth="2"
        />

        {/* Central Lotus Motif / Om */}
        <circle cx={H_S} cy={H_S} r={18} fill="#7B2D26" fillOpacity="0.1" stroke="#E8A33D" strokeWidth="1" />
        <text
          x={H_S}
          y={H_S + 5}
          textAnchor="middle"
          fontSize="14"
          fill="#7B2D26"
          fontFamily="Cinzel, serif"
          fontWeight="bold"
        >
          ॐ
        </text>

        {/* Render 12 Houses: Rashi Numbers and Planets */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((houseNum) => {
          const { rashi, planets } = getHouseData(houseNum);
          const coords = houseCoordinates[houseNum];

          return (
            <g key={houseNum}>
              {/* Rashi Number in house corner */}
              <text
                x={coords.rashiX}
                y={coords.rashiY}
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="#C1662F"
                fontFamily="sans-serif"
              >
                {rashi}
              </text>

              {/* Planets in this house */}
              <g transform={`translate(${coords.planetX}, ${coords.planetY})`}>
                {planets.map((p, pIdx) => {
                  const total = planets.length;
                  const cols = total > 3 ? 2 : 1;
                  const row = Math.floor(pIdx / cols);
                  const col = pIdx % cols;
                  const offsetX = cols > 1 ? (col === 0 ? -16 : 16) : 0;
                  const offsetY = (row - Math.floor(total / (cols * 2))) * 14;

                  return (
                    <text
                      key={pIdx}
                      x={offsetX}
                      y={offsetY}
                      textAnchor="middle"
                      fontSize="10.5"
                      fontWeight="bold"
                      fill="#7B2D26"
                      fontFamily="sans-serif"
                    >
                      {p.symbol}
                      {p.isRetrograde && (
                        <tspan fontSize="8.5" fill="#DC2626" fontWeight="bold">
                          (R)
                        </tspan>
                      )}
                    </text>
                  );
                })}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
