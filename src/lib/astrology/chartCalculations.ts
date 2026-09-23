/**
 * ============================================================================
 * MASTER VEDIC CHART CALCULATION ENGINE (JANAM KUNDLI)
 * ============================================================================
 * Orchestrates:
 * 1. Geocentric planetary positions, true velocities, and retrograde (Vakri) flags
 * 2. Planetary combustion (Asta) and avasthas (Baladi & Jagradadi)
 * 3. 12 Houses from Nirayana Ascendant (Lagna)
 * 4. 3-Tier Nested Vimshottari Dasha (Mahadasha -> Antardasha -> Pratyantardasha)
 * 5. Authentic Dosha Diagnostics: Kuja/Manglik, Shani Sade Sati, 12 Kaal Sarp, Pitra Dosha
 * 6. Divisional Charts (D1 through D12) via Parashari Shodashvarga
 * 7. Parashari Ashtakvarga (SAV & BAV)
 * 8. 6-Fold Shadbala Strengths in Rupas & Virupas
 */

import {
  getAscendant,
  getJulianDay,
  getJupiterDetails,
  getLahiriAyanamsa,
  getMarsDetails,
  getMercuryDetails,
  getMoonLongitude,
  getRahuLongitude,
  getSaturnDetails,
  getSunLongitude,
  getVenusDetails,
  NAKSHATRAS,
  normalize360,
  RASHI_NAMES,
  VIMSHOTTARI_LORDS_ORDER,
} from "./ephemeris";
import {
  AntardashaItem,
  DoshaAnalysisResult,
  HouseInfo,
  KundliData,
  PlanetName,
  PlanetPosition,
  PratyantardashaItem,
  RashiName,
  SookshmadashaItem,
  VimshottariDashaItem,
} from "./types";
import { calculateAllDivisionalCharts } from "./divisionalCharts";
import { calculateAshtakvarga } from "./ashtakvarga";
import { calculateShadbala } from "./shadbala";
import { calculateKpSystem } from "./kpSystem";

// Format degrees into XX° YY'
export function formatDegrees(deg: number): string {
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  return `${d}° ${m.toString().padStart(2, "0")}'`;
}

// Compute Navamsha sign (1 to 12) from sidereal longitude
export function getNavamshaSign(longitude: number): number {
  const norm = normalize360(longitude);
  const totalNavamshas = Math.floor(norm / (30 / 9)); // 3° 20' = 3.3333°
  return (totalNavamshas % 12) + 1;
}

// Planetary Dignities
export function getDignity(
  planet: PlanetName,
  rashiNum: number,
  degInSign: number
): PlanetPosition["dignity"] {
  switch (planet) {
    case "Sun":
      if (rashiNum === 1 && degInSign <= 10) return "Exalted"; // Aries 10°
      if (rashiNum === 7 && degInSign <= 10) return "Debilitated"; // Libra 10°
      if (rashiNum === 5) return degInSign <= 20 ? "Mooltrikona" : "Own Sign"; // Leo
      if ([1, 4, 8, 9, 12].includes(rashiNum)) return "Friendly";
      if ([2, 3, 6, 7, 10, 11].includes(rashiNum)) return "Enemy";
      return "Neutral";

    case "Moon":
      if (rashiNum === 2 && degInSign <= 3) return "Exalted"; // Taurus 3°
      if (rashiNum === 8 && degInSign <= 3) return "Debilitated"; // Scorpio 3°
      if (rashiNum === 2 && degInSign > 3) return "Mooltrikona";
      if (rashiNum === 4) return "Own Sign"; // Cancer
      if ([1, 5].includes(rashiNum)) return "Friendly";
      return "Neutral";

    case "Mars":
      if (rashiNum === 10 && degInSign <= 28) return "Exalted"; // Capricorn 28°
      if (rashiNum === 4 && degInSign <= 28) return "Debilitated"; // Cancer 28°
      if (rashiNum === 1) return degInSign <= 12 ? "Mooltrikona" : "Own Sign"; // Aries
      if (rashiNum === 8) return "Own Sign"; // Scorpio
      if ([4, 5, 9, 12].includes(rashiNum)) return "Friendly";
      return "Enemy";

    case "Mercury":
      if (rashiNum === 6 && degInSign <= 15) return "Exalted"; // Virgo 15°
      if (rashiNum === 12 && degInSign <= 15) return "Debilitated"; // Pisces 15°
      if (rashiNum === 6 && degInSign > 15 && degInSign <= 20) return "Mooltrikona";
      if (rashiNum === 3 || rashiNum === 6) return "Own Sign";
      if ([1, 5, 7, 10, 11].includes(rashiNum)) return "Friendly";
      return "Neutral";

    case "Jupiter":
      if (rashiNum === 4 && degInSign <= 5) return "Exalted"; // Cancer 5°
      if (rashiNum === 10 && degInSign <= 5) return "Debilitated"; // Capricorn 5°
      if (rashiNum === 9) return degInSign <= 10 ? "Mooltrikona" : "Own Sign"; // Sagittarius
      if (rashiNum === 12) return "Own Sign"; // Pisces
      if ([1, 5, 8].includes(rashiNum)) return "Friendly";
      return "Enemy";

    case "Venus":
      if (rashiNum === 12 && degInSign <= 27) return "Exalted"; // Pisces 27°
      if (rashiNum === 6 && degInSign <= 27) return "Debilitated"; // Virgo 27°
      if (rashiNum === 7) return degInSign <= 15 ? "Mooltrikona" : "Own Sign"; // Libra
      if (rashiNum === 2) return "Own Sign"; // Taurus
      if ([3, 10, 11].includes(rashiNum)) return "Friendly";
      return "Enemy";

    case "Saturn":
      if (rashiNum === 7 && degInSign <= 20) return "Exalted"; // Libra 20°
      if (rashiNum === 1 && degInSign <= 20) return "Debilitated"; // Aries 20°
      if (rashiNum === 11) return degInSign <= 20 ? "Mooltrikona" : "Own Sign"; // Aquarius
      if (rashiNum === 10) return "Own Sign"; // Capricorn
      if ([2, 3, 6, 7].includes(rashiNum)) return "Friendly";
      return "Enemy";

    default:
      return "Neutral";
  }
}

// Baladi Avasthas (5 states based on degrees in odd/even signs)
export function getBaladiAvastha(
  rashiNumber: number,
  degreesInSign: number
): PlanetPosition["baladiAvastha"] {
  const isOdd = rashiNumber % 2 !== 0;
  const part = Math.min(4, Math.floor(degreesInSign / 6)); // 0..4

  const oddAvasthas: Array<NonNullable<PlanetPosition["baladiAvastha"]>> = [
    "Bala (Infant)",
    "Kumara (Youth)",
    "Yuva (Adolescent)",
    "Vriddha (Advanced)",
    "Mrita (Inert)",
  ];

  const evenAvasthas: Array<NonNullable<PlanetPosition["baladiAvastha"]>> = [
    "Mrita (Inert)",
    "Vriddha (Advanced)",
    "Yuva (Adolescent)",
    "Kumara (Youth)",
    "Bala (Infant)",
  ];

  return isOdd ? oddAvasthas[part] : evenAvasthas[part];
}

// Jagradadi Avasthas (Awake, Dreaming, Deep Sleep)
export function getJagradadiAvastha(
  dignity: PlanetPosition["dignity"]
): PlanetPosition["jagradadiAvastha"] {
  if (dignity === "Exalted" || dignity === "Own Sign" || dignity === "Mooltrikona") {
    return "Jagrat (Awake)";
  }
  if (dignity === "Friendly" || dignity === "Neutral") {
    return "Swapna (Dreaming)";
  }
  return "Sushupti (Deep Sleep)";
}

// Check Combustion (Asta) from Sun
export function checkCombustion(planet: PlanetName, pLong: number, sunLong: number, isRetro: boolean): boolean {
  if (planet === "Sun" || planet === "Rahu" || planet === "Ketu" || planet === "Ascendant") {
    return false;
  }

  let diff = Math.abs(pLong - sunLong);
  if (diff > 180) diff = 360 - diff;

  const limits: Record<string, number> = {
    Moon: 12.0,
    Mars: 17.0,
    Mercury: isRetro ? 12.0 : 14.0,
    Jupiter: 11.0,
    Venus: isRetro ? 8.0 : 10.0,
    Saturn: 15.0,
  };

  const maxOrb = limits[planet] || 10.0;
  return diff <= maxOrb;
}

// Calculate House relative to Ascendant (Equal Sign System)
export function getHouseNumber(planetRashi: number, ascendantRashi: number): number {
  let house = planetRashi - ascendantRashi + 1;
  if (house <= 0) house += 12;
  return house;
}

// Comprehensive Dosha Diagnosis
export function analyzeDoshas(
  planets: PlanetPosition[],
  ascendantRashi: number,
  moonRashi: number
): DoshaAnalysisResult {
  const mars = planets.find((p) => p.name === "Mars");
  const sun = planets.find((p) => p.name === "Sun");
  const saturn = planets.find((p) => p.name === "Saturn");
  const rahu = planets.find((p) => p.name === "Rahu");
  const ketu = planets.find((p) => p.name === "Ketu");
  const jupiter = planets.find((p) => p.name === "Jupiter");

  const marsHouseFromLagna = mars ? mars.house : 1;
  const marsHouseFromMoon = mars ? getHouseNumber(mars.rashiNumber, moonRashi) : 1;

  // 1. Manglik Dosha (Houses 1, 2, 4, 7, 8, 12)
  const manglikHouses = [1, 2, 4, 7, 8, 12];
  const isLagnaManglik = manglikHouses.includes(marsHouseFromLagna);
  const isMoonManglik = manglikHouses.includes(marsHouseFromMoon);
  const hasManglik = isLagnaManglik || isMoonManglik;

  let manglikSeverity: DoshaAnalysisResult["manglikSeverity"] = "None";
  let manglikDetails = "No significant Manglik Dosha detected. Marital prospects are peaceful and harmonious.";
  let isCancelled = false;
  let cancellationReason: string | undefined;

  if (hasManglik && mars) {
    // Classical Kuja Dosha Cancellations:
    // Mars in own sign (Aries/Scorpio) or Exalted (Capricorn)
    if (mars.dignity === "Own Sign" || mars.dignity === "Exalted") {
      isCancelled = true;
      cancellationReason = `Mars is dignified in ${mars.dignity} (${mars.rashiName}), effectively pacifying the Kuja Dosha impact.`;
    }
    // Jupiter conjunction or trine aspect to Mars
    else if (jupiter && Math.abs(jupiter.house - mars.house) % 4 === 0) {
      isCancelled = true;
      cancellationReason = "Benefic aspect of Guru (Jupiter) onto Mangal nullifies the adverse effects of Manglik Dosha.";
    }

    if (isLagnaManglik && isMoonManglik) {
      manglikSeverity = "Strong (Purna)";
      manglikDetails = `Mars is placed in House ${marsHouseFromLagna} from Lagna and House ${marsHouseFromMoon} from Moon, indicating Purna Manglik Dosha. ${isCancelled ? cancellationReason : "Matching with another Manglik partner or performing Kumbh Vivah is recommended."}`;
    } else {
      manglikSeverity = "Mild (Anshik)";
      manglikDetails = `Mars is placed in House ${marsHouseFromLagna} from Lagna, indicating mild/Anshik Manglik influence. ${isCancelled ? cancellationReason : "This influence typically matures and calms after 28 years of age."}`;
    }
  }

  // 2. Sade Sati Analysis
  // Current real-time Saturn transit: Saturn is transiting Pisces (Rashi 12) in 2025-2027
  const currentTransitSaturnRashi = 12; // Pisces
  let hasSadeSati = false;
  let sadeSatiPhase: DoshaAnalysisResult["sadeSatiPhase"] = "None";
  let sadeSatiDetails = "You are currently not undergoing Shani Sade Sati. Shani's major transit trials are pacified.";

  if (moonRashi === 1) {
    hasSadeSati = true;
    sadeSatiPhase = "Rising Phase (1st)";
    sadeSatiDetails = "Saturn is transiting 12th from your natal Moon sign (Pisces). The Rising Phase impacts domestic peace and triggers financial reallocation. Regular chanting of Hanuman Chalisa is advised.";
  } else if (moonRashi === 12) {
    hasSadeSati = true;
    sadeSatiPhase = "Peak Phase (2nd)";
    sadeSatiDetails = "Saturn is transiting directly over your natal Moon sign (Pisces). The Peak Phase tests patience, demands relentless discipline, and fosters profound spiritual transformation. Oil donations to Shani Dev recommended.";
  } else if (moonRashi === 11) {
    hasSadeSati = true;
    sadeSatiPhase = "Setting Phase (3rd)";
    sadeSatiDetails = "Saturn is transiting 2nd from your natal Moon sign. The Setting Phase signifies resolution of trials, gradual financial stabilization, and long-term consolidation of past karma.";
  }

  // 3. Real 12 Kaal Sarp Dosha Evaluation
  // Evaluates if all 7 planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn) lie on one side of Rahu-Ketu
  let hasKalsarpa = false;
  let kalsarpaType = "None (Planetary axis is balanced)";
  let kalsarpaDetails = "The nodal axis is balanced with planets distributed naturally, promoting independent destiny growth.";

  if (rahu && ketu) {
    const physicalPlanets = planets.filter((p) =>
      ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"].includes(p.name)
    );

    // Rahu and Ketu longitudes
    const rLong = rahu.longitude;
    const kLong = ketu.longitude;

    // Check side 1: Rahu -> Ketu clockwise
    const side1 = physicalPlanets.every((p) => {
      let diff = p.longitude - rLong;
      if (diff < 0) diff += 360;
      return diff <= 180;
    });

    // Check side 2: Ketu -> Rahu clockwise
    const side2 = physicalPlanets.every((p) => {
      let diff = p.longitude - kLong;
      if (diff < 0) diff += 360;
      return diff <= 180;
    });

    if (side1 || side2) {
      hasKalsarpa = true;
      const typesByRahuHouse: Record<number, string> = {
        1: "Anant Kaal Sarp (House 1 - 7)",
        2: "Kulik Kaal Sarp (House 2 - 8)",
        3: "Vasuki Kaal Sarp (House 3 - 9)",
        4: "Shankhpal Kaal Sarp (House 4 - 10)",
        5: "Padma Kaal Sarp (House 5 - 11)",
        6: "Mahapadma Kaal Sarp (House 6 - 12)",
        7: "Takshak Kaal Sarp (House 7 - 1)",
        8: "Karkotak Kaal Sarp (House 8 - 2)",
        9: "Shankhachur Kaal Sarp (House 9 - 3)",
        10: "Ghatak Kaal Sarp (House 10 - 4)",
        11: "Vishdhar Kaal Sarp (House 11 - 5)",
        12: "Sheshnag Kaal Sarp (House 12 - 6)",
      };
      kalsarpaType = typesByRahuHouse[rahu.house] || "Kaal Sarp Yoga";
      kalsarpaDetails = `All 7 classical planets are hemmed inside the Rahu-Ketu nodal axis (${kalsarpaType}). This indicates karmic intensity and delayed but meteoric success after age 33. Chanting Maha Mrityunjaya mantra on Mondays is prescribed.`;
    }
  }

  // 4. Pitra Dosha Diagnosis (Afflicted Sun or 9th House)
  let hasPitraDosha = false;
  let pitraDoshaDetails = "No significant ancestral Pitra Dosha present. Lineage karma is clear and auspicious.";

  if (sun && rahu && Math.abs(sun.longitude - rahu.longitude) <= 12) {
    hasPitraDosha = true;
    pitraDoshaDetails = "Surya-Rahu conjunction (Surya Grahan Yoga) detected. Indicates ancestral karmic debt affecting paternal harmony and self-esteem. Amavasya tarpan and Surya Arghya recommended.";
  } else if (sun && saturn && sun.house === 9 && saturn.house === 9) {
    hasPitraDosha = true;
    pitraDoshaDetails = "Sun and Saturn conjunction in the 9th house of Dharma/Father indicates generational friction. Regular service to elders and Peepal tree offerings advised.";
  } else if (rahu && rahu.house === 9 && sun && sun.dignity === "Debilitated") {
    hasPitraDosha = true;
    pitraDoshaDetails = "Rahu situated in the 9th house with debilitated Sun creates Pitra Dosha. Performing Narayan Bali or Gaya Shraddh is traditionally beneficial.";
  }

  return {
    hasManglik,
    manglikSeverity,
    manglikDetails,
    isCancelled,
    cancellationReason,
    hasSadeSati,
    sadeSatiPhase,
    sadeSatiDetails,
    hasKalsarpa,
    kalsarpaType,
    kalsarpaDetails,
    hasPitraDosha,
    pitraDoshaDetails,
  };
}

// Calculate 4th-level Sookshmadashas for a Pratyantardasha period
export function calculateSookshmadashas(
  pratyLordName: string,
  pratyStartDate: string,
  pratyEndDate: string
): SookshmadashaItem[] {
  const startIndex = VIMSHOTTARI_LORDS_ORDER.findIndex((l) => l.lord === pratyLordName);
  const start = new Date(pratyStartDate).getTime();
  const end = new Date(pratyEndDate).getTime();
  const totalDuration = Math.max(0, end - start);
  const now = new Date();

  const sookshmas: SookshmadashaItem[] = [];
  let curTime = start;

  for (let s = 0; s < 9; s++) {
    const sLord = VIMSHOTTARI_LORDS_ORDER[(startIndex + s) % 9];
    const sDuration = (totalDuration * sLord.years) / 120;
    const sEndTime = curTime + sDuration;
    const sStartDate = new Date(curTime);
    const sEndDate = new Date(sEndTime);

    sookshmas.push({
      planet: sLord.lord,
      hindiName: sLord.hindi,
      startDate: sStartDate.toISOString().split("T")[0],
      endDate: sEndDate.toISOString().split("T")[0],
      isCurrent: now.getTime() >= curTime && now.getTime() < sEndTime,
    });
    curTime = sEndTime;
  }
  return sookshmas;
}

// Calculate 4-Tier Nested Vimshottari Dasha Hierarchy (Mahadasha -> Antardasha -> Pratyantardasha -> Sookshmadasha)
export function calculateVimshottariDashas(
  moonLongitude: number,
  birthDate: Date
): VimshottariDashaItem[] {
  const nakshatraSpan = 13 + 20 / 60; // 13.33333°
  const nakshatraIndex = Math.floor(moonLongitude / nakshatraSpan); // 0 to 26
  const balanceInNakshatra = (moonLongitude % nakshatraSpan) / nakshatraSpan;

  const firstLordIndex = nakshatraIndex % 9;
  const firstLord = VIMSHOTTARI_LORDS_ORDER[firstLordIndex];

  const remainingFraction = 1 - balanceInNakshatra;
  const firstDashaYearsRemaining = firstLord.years * remainingFraction;

  const results: VimshottariDashaItem[] = [];
  let currentDate = new Date(birthDate);
  const now = new Date();

  // Helper to generate Antardashas for a Mahadasha
  const generateAntardashas = (
    mahaLordName: string,
    mahaStartDate: Date,
    mahaYears: number
  ): AntardashaItem[] => {
    const startIndex = VIMSHOTTARI_LORDS_ORDER.findIndex((l) => l.lord === mahaLordName);
    const antardashas: AntardashaItem[] = [];
    let subCurrentDate = new Date(mahaStartDate);

    for (let j = 0; j < 9; j++) {
      const subLord = VIMSHOTTARI_LORDS_ORDER[(startIndex + j) % 9];
      // Antardasha duration = (Maha years * Antar years / 120) years
      const antarYears = (mahaYears * subLord.years) / 120;
      const subEndDate = new Date(subCurrentDate);
      const antarDays = antarYears * 365.25;
      subEndDate.setTime(subEndDate.getTime() + antarDays * 24 * 60 * 60 * 1000);

      const isSubCurrent = now >= subCurrentDate && now < subEndDate;

      // Generate Pratyantardashas for all Antardashas so users can drill down into any period
      const pratyantardashas: PratyantardashaItem[] = [];
      let pDate = new Date(subCurrentDate);
      const subIndex = VIMSHOTTARI_LORDS_ORDER.findIndex((l) => l.lord === subLord.lord);

      for (let k = 0; k < 9; k++) {
        const pLord = VIMSHOTTARI_LORDS_ORDER[(subIndex + k) % 9];
        // Pratyantardasha duration = (antarDays * pLord.years / 120) days
        const pDays = (antarDays * pLord.years) / 120;
        const pEndDate = new Date(pDate);
        pEndDate.setTime(pEndDate.getTime() + pDays * 24 * 60 * 60 * 1000);

        const isPCurrent = now >= pDate && now < pEndDate;

        // Generate Sookshmadashas for current or active sub-periods
        let sookshmadashas: SookshmadashaItem[] | undefined;
        if (isPCurrent || isSubCurrent) {
          sookshmadashas = calculateSookshmadashas(
            pLord.lord,
            pDate.toISOString().split("T")[0],
            pEndDate.toISOString().split("T")[0]
          );
        }

        pratyantardashas.push({
          planet: pLord.lord,
          hindiName: pLord.hindi,
          startDate: pDate.toISOString().split("T")[0],
          endDate: pEndDate.toISOString().split("T")[0],
          isCurrent: isPCurrent,
          sookshmadashas,
        });
        pDate = new Date(pEndDate);
      }

      antardashas.push({
        planet: subLord.lord,
        hindiName: subLord.hindi,
        startDate: subCurrentDate.toISOString().split("T")[0],
        endDate: subEndDate.toISOString().split("T")[0],
        isCurrent: isSubCurrent,
        pratyantardashas,
      });

      subCurrentDate = new Date(subEndDate);
    }
    return antardashas;
  };

  // 1. First Dasha (Prarambha)
  const firstEndDate = new Date(currentDate);
  firstEndDate.setTime(firstEndDate.getTime() + firstDashaYearsRemaining * 365.25 * 24 * 60 * 60 * 1000);

  const isFirstCurrent = now >= currentDate && now < firstEndDate;
  results.push({
    planet: firstLord.lord,
    hindiName: firstLord.hindi,
    durationYears: firstLord.years,
    startDate: currentDate.toISOString().split("T")[0],
    endDate: firstEndDate.toISOString().split("T")[0],
    isCurrent: isFirstCurrent,
    antardashas: generateAntardashas(firstLord.lord, currentDate, firstLord.years),
  });

  currentDate = new Date(firstEndDate);

  // 2. Subsequent Mahadashas
  for (let i = 1; i <= 8; i++) {
    const lordObj = VIMSHOTTARI_LORDS_ORDER[(firstLordIndex + i) % 9];
    const endDate = new Date(currentDate);
    endDate.setTime(endDate.getTime() + lordObj.years * 365.25 * 24 * 60 * 60 * 1000);

    const isCurrent = now >= currentDate && now < endDate;
    results.push({
      planet: lordObj.lord,
      hindiName: lordObj.hindi,
      durationYears: lordObj.years,
      startDate: currentDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      isCurrent,
      antardashas: generateAntardashas(lordObj.lord, currentDate, lordObj.years),
    });

    currentDate = new Date(endDate);
  }

  return results;
}

// Master Chart Calculation Function
export function calculateKundli(params: {
  name: string;
  gender: "male" | "female" | "other";
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  birthPlace: string;
  latitude: number;
  longitude: number;
  timezone: number; // e.g. 5.5 for IST
}): KundliData {
  const [yearStr, monthStr, dayStr] = params.birthDate.split("-");
  const [hourStr, minStr] = params.birthTime.split(":");

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const hour = parseInt(hourStr, 10);
  const min = parseInt(minStr, 10);

  // Convert local time to UTC decimal hour
  const localDecimalHour = hour + min / 60;
  let utcDecimalHour = localDecimalHour - params.timezone;
  let adjustedDay = day;
  let adjustedMonth = month;
  let adjustedYear = year;

  if (utcDecimalHour < 0) {
    utcDecimalHour += 24;
    adjustedDay -= 1;
    if (adjustedDay <= 0) {
      adjustedMonth -= 1;
      if (adjustedMonth <= 0) {
        adjustedMonth = 12;
        adjustedYear -= 1;
      }
      adjustedDay = 28; // safe boundary
    }
  } else if (utcDecimalHour >= 24) {
    utcDecimalHour -= 24;
    adjustedDay += 1;
  }

  const jd = getJulianDay(adjustedYear, adjustedMonth, adjustedDay, utcDecimalHour);
  const ayanamsa = getLahiriAyanamsa(jd);

  // High-precision Geocentric Coordinates and Retrograde details
  const sunTrop = getSunLongitude(jd);
  const moonTrop = getMoonLongitude(jd);
  const marsDetails = getMarsDetails(jd);
  const mercDetails = getMercuryDetails(jd);
  const jupDetails = getJupiterDetails(jd);
  const venDetails = getVenusDetails(jd);
  const satDetails = getSaturnDetails(jd);
  const rahuTrop = getRahuLongitude(jd);

  // Convert Tropical Coordinates to Nirayana (Sidereal)
  const sunSidereal = normalize360(sunTrop - ayanamsa);
  const moonSidereal = normalize360(moonTrop - ayanamsa);
  const marsSidereal = normalize360(marsDetails.longitude - ayanamsa);
  const mercSidereal = normalize360(mercDetails.longitude - ayanamsa);
  const jupSidereal = normalize360(jupDetails.longitude - ayanamsa);
  const venSidereal = normalize360(venDetails.longitude - ayanamsa);
  const satSidereal = normalize360(satDetails.longitude - ayanamsa);
  const rahuSidereal = normalize360(rahuTrop - ayanamsa);
  const ketuSidereal = normalize360(rahuSidereal + 180);

  const ascendantSidereal = getAscendant(jd, params.latitude, params.longitude, ayanamsa);
  const ascendantRashi = Math.floor(ascendantSidereal / 30) + 1;

  // Helper to construct enriched PlanetPosition
  function makePosition(
    name: PlanetName,
    hindiName: string,
    symbol: string,
    longitude: number,
    isRetro: boolean = false,
    speed: number = 1.0
  ): PlanetPosition {
    const rashiNumber = Math.floor(longitude / 30) + 1;
    const degreesInSign = longitude % 30;
    const rashiName = RASHI_NAMES[rashiNumber].en as RashiName;
    const nakshatraIndex = Math.floor(longitude / (13 + 20 / 60));
    const nakshatraObj = NAKSHATRAS[nakshatraIndex % 27];
    const pada = Math.floor((longitude % (13 + 20 / 60)) / (3 + 20 / 60)) + 1;
    const house = getHouseNumber(rashiNumber, ascendantRashi);
    const navamshaSignNumber = getNavamshaSign(longitude);
    const dignity = getDignity(name, rashiNumber, degreesInSign);
    const isCombust = checkCombustion(name, longitude, sunSidereal, isRetro);
    const baladiAvastha = getBaladiAvastha(rashiNumber, degreesInSign);
    const jagradadiAvastha = getJagradadiAvastha(dignity);

    return {
      name,
      hindiName,
      symbol,
      longitude,
      rashiNumber,
      rashiName,
      degreesInSign,
      degreeFormatted: formatDegrees(degreesInSign),
      nakshatra: nakshatraObj.name,
      nakshatraNumber: nakshatraIndex + 1,
      nakshatraLord: nakshatraObj.lord,
      pada,
      house,
      isRetrograde: isRetro,
      isCombust,
      speed,
      baladiAvastha,
      jagradadiAvastha,
      navamshaSignNumber,
      dignity,
    };
  }

  const ascendantPos = makePosition("Ascendant", "लग्न", "Asc", ascendantSidereal);
  const sunPos = makePosition("Sun", "सूर्य", "Su", sunSidereal, false, 0.985);
  const moonPos = makePosition("Moon", "चन्द्र", "Mo", moonSidereal, false, 13.176);
  const marsPos = makePosition("Mars", "मंगल", "Ma", marsSidereal, marsDetails.isRetrograde, marsDetails.speed);
  const mercPos = makePosition("Mercury", "बुध", "Me", mercSidereal, mercDetails.isRetrograde, mercDetails.speed);
  const jupPos = makePosition("Jupiter", "बृहस्पति", "Ju", jupSidereal, jupDetails.isRetrograde, jupDetails.speed);
  const venPos = makePosition("Venus", "शुक्र", "Ve", venSidereal, venDetails.isRetrograde, venDetails.speed);
  const satPos = makePosition("Saturn", "शनि", "Sa", satSidereal, satDetails.isRetrograde, satDetails.speed);
  const rahuPos = makePosition("Rahu", "राहु", "Ra", rahuSidereal, true, -0.052); // Mean nodes always retrograde
  const ketuPos = makePosition("Ketu", "केतु", "Ke", ketuSidereal, true, -0.052);

  const allPlanets = [sunPos, moonPos, marsPos, mercPos, jupPos, venPos, satPos, rahuPos, ketuPos];

  // Build 12 houses
  const houses: HouseInfo[] = [];
  for (let h = 1; h <= 12; h++) {
    const rashiNum = ((ascendantRashi - 1 + (h - 1)) % 12) + 1;
    houses.push({
      houseNumber: h,
      rashiNumber: rashiNum,
      rashiName: RASHI_NAMES[rashiNum].en as RashiName,
      signLord: RASHI_NAMES[rashiNum].lord as PlanetName,
      planets: allPlanets.filter((p) => p.house === h),
    });
  }

  const birthDateObj = new Date(year, month - 1, day, hour, min);
  const dashas = calculateVimshottariDashas(moonSidereal, birthDateObj);
  const doshas = analyzeDoshas(allPlanets, ascendantRashi, moonPos.rashiNumber);

  // Calculate Divisional Charts (D1 through D12)
  const divisionalCharts = calculateAllDivisionalCharts(
    ascendantSidereal,
    allPlanets.map((p) => ({
      name: p.name,
      hindiName: p.hindiName,
      symbol: p.symbol,
      longitude: p.longitude,
    }))
  );

  // Calculate Ashtakvarga (SAV and BAV)
  const ashtakvarga = calculateAshtakvarga(
    1,
    allPlanets.map((p) => ({ name: p.name, house: p.house }))
  );

  // Determine if day or night birth (approx from local hour: 6 AM to 6 PM)
  const isDayBirth = hour >= 6 && hour < 18;
  const shadbala = calculateShadbala(allPlanets, isDayBirth);

  // Calculate KP System (Krishnamurti Paddhati)
  const kpSystem = calculateKpSystem(
    allPlanets.map((p) => ({
      name: p.name,
      hindiName: p.hindiName,
      longitude: p.longitude,
      house: p.house,
      isRetrograde: p.isRetrograde,
    })),
    ascendantSidereal,
    ayanamsa,
    params.latitude
  );

  // Recommendations based on Ascendant Lord
  const ascLord = RASHI_NAMES[ascendantRashi].lord;
  const gemstoneMap: Record<string, { stone: string; color: string; number: number; deity: string }> = {
    Mars: { stone: "Red Coral (Moonga)", color: "Crimson Red / Saffron", number: 9, deity: "Lord Hanuman" },
    Venus: { stone: "Diamond or White Sapphire", color: "Silk White / Silver", number: 6, deity: "Maa Lakshmi" },
    Mercury: { stone: "Emerald (Panna)", color: "Emerald Green", number: 5, deity: "Lord Ganesha" },
    Moon: { stone: "Natural Pearl (Moti)", color: "Pearl White", number: 2, deity: "Lord Shiva" },
    Sun: { stone: "Ruby (Manikya)", color: "Golden Amber / Ruby Red", number: 1, deity: "Lord Surya" },
    Jupiter: { stone: "Yellow Sapphire (Pukhraj)", color: "Golden Yellow", number: 3, deity: "Lord Vishnu" },
    Saturn: { stone: "Blue Sapphire (Neelam)", color: "Royal Navy Blue", number: 8, deity: "Lord Shani" },
  };

  const luckyInfo = gemstoneMap[ascLord] || gemstoneMap["Jupiter"];

  return {
    name: params.name,
    gender: params.gender,
    birthDate: params.birthDate,
    birthTime: params.birthTime,
    birthPlace: params.birthPlace,
    latitude: params.latitude,
    longitude: params.longitude,
    timezone: params.timezone,
    ayanamsa,
    ascendant: ascendantPos,
    planets: allPlanets,
    houses,
    dashas,
    doshas,
    divisionalCharts,
    ashtakvarga,
    shadbala,
    kpSystem,
    sunSign: sunPos.rashiName,
    moonSign: moonPos.rashiName,
    nakshatra: moonPos.nakshatra,
    charanPada: moonPos.pada,
    luckyGemstone: luckyInfo.stone,
    luckyColor: luckyInfo.color,
    luckyNumber: luckyInfo.number,
    favorableDeity: luckyInfo.deity,
  };
}
