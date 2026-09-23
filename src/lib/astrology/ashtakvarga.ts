/**
 * ============================================================================
 * VEDIC ASHTAKVARGA CALCULATION ENGINE (अष्टकवर्ग)
 * ============================================================================
 * Implements Parashari Ashtakvarga:
 * - Bhinnashtakavarga (BAV): Benefic bindus contributed by each planet
 *   Sun (48), Moon (49), Mars (39), Mercury (54), Jupiter (56), Venus (52), Saturn (39)
 * - Sarvashtakavarga (SAV): Sum of all 7 BAVs across 12 signs/houses (Total = 337 Bindus)
 * - House Strength Evaluation: Benchmark threshold = 28 bindus
 */

import { AshtakvargaData, PlanetName } from "./types";

interface PlanetHouseInput {
  name: PlanetName;
  house: number; // 1 to 12
}

// Classical Parashari Benefic Places (Houses from each contributor)
// Format: Record<Planet, Record<Contributor, number[]>>
const PARASHARI_RULES: Record<
  "Sun" | "Moon" | "Mars" | "Mercury" | "Jupiter" | "Venus" | "Saturn",
  Record<"Sun" | "Moon" | "Mars" | "Mercury" | "Jupiter" | "Venus" | "Saturn" | "Ascendant", number[]>
> = {
  Sun: {
    Sun: [1, 2, 4, 7, 8, 9, 10, 11],
    Moon: [3, 6, 10, 11],
    Mars: [1, 2, 4, 7, 8, 9, 10, 11],
    Mercury: [3, 5, 6, 9, 10, 11, 12],
    Jupiter: [5, 6, 9, 11],
    Venus: [6, 7, 12],
    Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    Ascendant: [3, 4, 6, 10, 11, 12],
  },
  Moon: {
    Sun: [3, 6, 7, 8, 10, 11],
    Moon: [1, 3, 6, 7, 10, 11],
    Mars: [2, 3, 5, 6, 9, 10, 11],
    Mercury: [1, 3, 4, 5, 7, 8, 10, 11],
    Jupiter: [1, 4, 7, 8, 10, 11, 12],
    Venus: [3, 4, 5, 7, 9, 10, 11],
    Saturn: [3, 5, 6, 11],
    Ascendant: [3, 6, 10, 11],
  },
  Mars: {
    Sun: [3, 5, 6, 10, 11],
    Moon: [3, 6, 11],
    Mars: [1, 2, 4, 7, 8, 10, 11],
    Mercury: [3, 5, 6, 11],
    Jupiter: [6, 10, 11, 12],
    Venus: [6, 8, 11, 12],
    Saturn: [1, 4, 7, 8, 9, 10, 11],
    Ascendant: [1, 3, 6, 10, 11],
  },
  Mercury: {
    Sun: [5, 6, 9, 11, 12],
    Moon: [2, 4, 6, 8, 10, 11],
    Mars: [1, 2, 4, 7, 8, 9, 10, 11],
    Mercury: [1, 3, 5, 6, 9, 10, 11, 12],
    Jupiter: [6, 8, 11, 12],
    Venus: [1, 2, 3, 4, 5, 8, 9, 11],
    Saturn: [1, 2, 4, 7, 8, 9, 10, 11],
    Ascendant: [1, 2, 4, 6, 8, 10, 11],
  },
  Jupiter: {
    Sun: [1, 2, 3, 4, 7, 8, 9, 10, 11],
    Moon: [2, 5, 7, 9, 11],
    Mars: [1, 2, 4, 7, 8, 10, 11],
    Mercury: [1, 2, 4, 5, 6, 9, 10, 11],
    Jupiter: [1, 2, 3, 4, 7, 8, 10, 11],
    Venus: [2, 5, 6, 9, 10, 11],
    Saturn: [3, 5, 6, 12],
    Ascendant: [1, 2, 4, 5, 6, 7, 9, 10, 11],
  },
  Venus: {
    Sun: [8, 11, 12],
    Moon: [1, 2, 3, 4, 5, 8, 9, 11, 12],
    Mars: [3, 5, 6, 9, 11, 12],
    Mercury: [3, 5, 6, 9, 11],
    Jupiter: [5, 8, 9, 10, 11],
    Venus: [1, 2, 3, 4, 5, 8, 9, 10, 11],
    Saturn: [3, 4, 5, 8, 9, 10, 11],
    Ascendant: [1, 2, 3, 4, 5, 8, 9, 11],
  },
  Saturn: {
    Sun: [1, 2, 4, 7, 8, 10, 11],
    Moon: [3, 6, 11],
    Mars: [3, 5, 6, 10, 11, 12],
    Mercury: [6, 8, 9, 10, 11, 12],
    Jupiter: [5, 6, 11, 12],
    Venus: [6, 11, 12],
    Saturn: [3, 5, 6, 11],
    Ascendant: [1, 3, 4, 6, 10, 11],
  },
};

export function calculateAshtakvarga(
  ascendantHouse: number, // 1
  planets: PlanetHouseInput[]
): AshtakvargaData {
  const planetList: Array<"Sun" | "Moon" | "Mars" | "Mercury" | "Jupiter" | "Venus" | "Saturn"> = [
    "Sun",
    "Moon",
    "Mars",
    "Mercury",
    "Jupiter",
    "Venus",
    "Saturn",
  ];

  // Map each planet/ascendant to its house
  const houseMap: Record<string, number> = {
    Ascendant: 1,
  };
  for (const p of planets) {
    houseMap[p.name] = p.house;
  }

  const bav: Record<string, number[]> = {};
  const sav: Record<number, number> = {
    1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0,
  };

  // Calculate BAV for each of the 7 planets
  for (const planet of planetList) {
    const bindus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 12 houses (0-indexed)
    const rule = PARASHARI_RULES[planet];

    // For each contributor (Sun, Moon, ..., Ascendant)
    for (const [contribName, places] of Object.entries(rule)) {
      const contribHouse = houseMap[contribName] || 1;
      for (const place of places) {
        // Target house = contribHouse + place - 1
        const targetHouse = ((contribHouse - 1 + (place - 1)) % 12) + 1;
        bindus[targetHouse - 1] += 1;
      }
    }

    bav[planet] = bindus;

    // Accumulate into SAV
    for (let h = 1; h <= 12; h++) {
      sav[h] += bindus[h - 1];
    }
  }

  // Determine favorable (>28) and challenging (<28) houses
  const favorableHouses: number[] = [];
  const challengingHouses: number[] = [];

  for (let h = 1; h <= 12; h++) {
    if (sav[h] >= 28) {
      favorableHouses.push(h);
    } else {
      challengingHouses.push(h);
    }
  }

  return {
    sarvashtakavarga: sav,
    bhinnashtakavarga: bav,
    favorableHouses,
    challengingHouses,
  };
}
