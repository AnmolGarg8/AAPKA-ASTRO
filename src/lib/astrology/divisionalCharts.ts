/**
 * ============================================================================
 * VEDIC DIVISIONAL CHARTS ENGINE (SHODASHVARGA)
 * ============================================================================
 * Implements classical Parashari divisional chart algorithms:
 * - D1: Rashi (Physical Existence & Vitality)
 * - D2: Hora (Wealth, Assets & Resources)
 * - D3: Drekkana (Siblings, Courage & Initiative)
 * - D7: Saptamsha (Children, Progeny & Creative Lineage)
 * - D9: Navamsha (Dharma, Marriage, Spouse & Inner Fortunes)
 * - D10: Dashamsha (Career, Profession, Status & Public Achievements)
 * - D12: Dwadasamsha (Parents, Lineage & Ancestral Heritage)
 */

import {
  DivisionalChartCode,
  DivisionalChartData,
  DivisionalPlacement,
  PlanetPosition,
  RashiName,
} from "./types";
import { RASHI_NAMES } from "./ephemeris";

interface PlanetInput {
  name: PlanetPosition["name"];
  hindiName: string;
  symbol: string;
  longitude: number; // 0..360
}

function getRashiFromLongitude(longitude: number): { rashiNumber: number; degreesInSign: number } {
  const norm = (longitude % 360 + 360) % 360;
  const rashiNumber = Math.floor(norm / 30) + 1;
  const degreesInSign = norm % 30;
  return { rashiNumber, degreesInSign };
}

// 1. D1: Rashi
export function getD1Sign(longitude: number): number {
  return getRashiFromLongitude(longitude).rashiNumber;
}

// 2. D2: Hora (2 parts of 15°)
export function getD2Sign(longitude: number): number {
  const { rashiNumber, degreesInSign } = getRashiFromLongitude(longitude);
  const isOdd = rashiNumber % 2 !== 0;
  const firstHalf = degreesInSign < 15;

  if (isOdd) {
    return firstHalf ? 5 : 4; // Sun (Leo = 5) : Moon (Cancer = 4)
  } else {
    return firstHalf ? 4 : 5; // Moon (Cancer = 4) : Sun (Leo = 5)
  }
}

// 3. D3: Drekkana (3 parts of 10°)
export function getD3Sign(longitude: number): number {
  const { rashiNumber, degreesInSign } = getRashiFromLongitude(longitude);
  const part = Math.floor(degreesInSign / 10); // 0, 1, 2
  let offset = 0;
  if (part === 1) offset = 4; // 5th sign
  if (part === 2) offset = 8; // 9th sign
  return ((rashiNumber - 1 + offset) % 12) + 1;
}

// 4. D7: Saptamsha (7 parts of 4° 17' 8.57" = 30/7)
export function getD7Sign(longitude: number): number {
  const { rashiNumber, degreesInSign } = getRashiFromLongitude(longitude);
  const part = Math.min(6, Math.floor(degreesInSign / (30 / 7)));
  const isOdd = rashiNumber % 2 !== 0;
  const base = isOdd ? rashiNumber : ((rashiNumber - 1 + 6) % 12) + 1;
  return ((base - 1 + part) % 12) + 1;
}

// 5. D9: Navamsha (9 parts of 3° 20' = 30/9)
export function getD9Sign(longitude: number): number {
  const { rashiNumber, degreesInSign } = getRashiFromLongitude(longitude);
  const part = Math.min(8, Math.floor(degreesInSign / (30 / 9)));

  // Fire signs (1, 5, 9) start from Aries (1)
  // Earth signs (2, 6, 10) start from Capricorn (10)
  // Air signs (3, 7, 11) start from Libra (7)
  // Water signs (4, 8, 12) start from Cancer (4)
  let base = 1;
  if ([1, 5, 9].includes(rashiNumber)) base = 1;
  else if ([2, 6, 10].includes(rashiNumber)) base = 10;
  else if ([3, 7, 11].includes(rashiNumber)) base = 7;
  else base = 4;

  return ((base - 1 + part) % 12) + 1;
}

// 6. D10: Dashamsha (10 parts of 3°)
export function getD10Sign(longitude: number): number {
  const { rashiNumber, degreesInSign } = getRashiFromLongitude(longitude);
  const part = Math.min(9, Math.floor(degreesInSign / 3));
  const isOdd = rashiNumber % 2 !== 0;
  // Odd signs start from the same sign, Even signs start from the 9th from it
  const base = isOdd ? rashiNumber : ((rashiNumber - 1 + 8) % 12) + 1;
  return ((base - 1 + part) % 12) + 1;
}

// 7. D12: Dwadasamsha (12 parts of 2° 30' = 2.5°)
export function getD12Sign(longitude: number): number {
  const { rashiNumber, degreesInSign } = getRashiFromLongitude(longitude);
  const part = Math.min(11, Math.floor(degreesInSign / 2.5));
  return ((rashiNumber - 1 + part) % 12) + 1;
}

// Metadata for all key Divisional Charts
export const DIVISIONAL_METADATA: Record<
  DivisionalChartCode,
  { name: string; sanskritName: string; significance: string; calculator: (lon: number) => number }
> = {
  D1: {
    name: "Rashi Chart",
    sanskritName: "लग्न (D1)",
    significance: "Physical vitality, general temperament, health, and basic life trajectory.",
    calculator: getD1Sign,
  },
  D9: {
    name: "Navamsha Chart",
    sanskritName: "नवांश (D9)",
    significance: "Spouse harmony, marital fortunes, inner dharma, and second-half life strength.",
    calculator: getD9Sign,
  },
  D10: {
    name: "Dashamsha Chart",
    sanskritName: "दशांश (D10)",
    significance: "Professional authority, leadership, corporate honors, and public reputation.",
    calculator: getD10Sign,
  },
  D7: {
    name: "Saptamsha Chart",
    sanskritName: "सप्तांश (D7)",
    significance: "Children, progeny, ancestral continuity, and creative intellectual output.",
    calculator: getD7Sign,
  },
  D3: {
    name: "Drekkana Chart",
    sanskritName: "द्रेष्काण (D3)",
    significance: "Siblings, courage, military/police initiative, and physical endurance.",
    calculator: getD3Sign,
  },
  D12: {
    name: "Dwadasamsha Chart",
    sanskritName: "द्वादशांश (D12)",
    significance: "Parents, lineage, genetic health, and karmic past-life conditioning.",
    calculator: getD12Sign,
  },
  D2: {
    name: "Hora Chart",
    sanskritName: "होरा (D2)",
    significance: "Wealth accumulation, financial assets, treasury, and prosperity.",
    calculator: getD2Sign,
  },
};

// Calculate all divisional charts for a given Kundli
export function calculateAllDivisionalCharts(
  ascendantLongitude: number,
  planets: PlanetInput[]
): Record<DivisionalChartCode, DivisionalChartData> {
  const codes: DivisionalChartCode[] = ["D1", "D9", "D10", "D7", "D3", "D12", "D2"];
  const result: Partial<Record<DivisionalChartCode, DivisionalChartData>> = {};

  for (const code of codes) {
    const meta = DIVISIONAL_METADATA[code];
    const ascSign = meta.calculator(ascendantLongitude);

    // Build 12 houses from the varga ascendant
    const houses = [];
    for (let h = 1; h <= 12; h++) {
      const rashiNum = ((ascSign - 1 + (h - 1)) % 12) + 1;
      houses.push({
        houseNumber: h,
        rashiNumber: rashiNum,
        rashiName: RASHI_NAMES[rashiNum].en as RashiName,
        planets: [] as DivisionalPlacement[],
      });
    }

    // Place each planet into the divisional chart
    for (const p of planets) {
      const pSign = meta.calculator(p.longitude);
      let pangoHouse = pSign - ascSign + 1;
      if (pangoHouse <= 0) pangoHouse += 12;

      const placement: DivisionalPlacement = {
        planetName: p.name,
        hindiName: p.hindiName,
        symbol: p.symbol,
        rashiNumber: pSign,
        rashiName: RASHI_NAMES[pSign].en as RashiName,
        house: pangoHouse,
      };

      const targetHouse = houses.find((h) => h.houseNumber === pangoHouse);
      if (targetHouse) {
        targetHouse.planets.push(placement);
      }
    }

    result[code] = {
      code,
      name: meta.name,
      sanskritName: meta.sanskritName,
      significance: meta.significance,
      houses,
    };
  }

  return result as Record<DivisionalChartCode, DivisionalChartData>;
}
