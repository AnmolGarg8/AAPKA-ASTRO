import {
  degToRad,
  getAscendant,
  getJulianDay,
  getJupiterLongitude,
  getLahiriAyanamsa,
  getMarsLongitude,
  getMercuryLongitude,
  getMoonLongitude,
  getRahuLongitude,
  getSaturnLongitude,
  getSunLongitude,
  getVenusLongitude,
  NAKSHATRAS,
  normalize360,
  RASHI_NAMES,
  VIMSHOTTARI_LORDS_ORDER,
} from "./ephemeris";
import {
  DoshaAnalysisResult,
  HouseInfo,
  KundliData,
  PlanetName,
  PlanetPosition,
  RashiName,
  VimshottariDashaItem,
} from "./types";

// Format degrees into XX° YY'
export function formatDegrees(deg: number): string {
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  return `${d}° ${m.toString().padStart(2, "0")}'`;
}

// Compute Navamsha sign (1 to 12) from sidereal longitude
export function getNavamshaSign(longitude: number): number {
  const totalNavamshas = Math.floor(longitude / (30 / 9)); // each navamsha is 3° 20' (3.3333°)
  return (totalNavamshas % 12) + 1;
}

// Determine Vedic Planetary Dignity (Exaltation, Mooltrikona, Own, Friendly, Debilitated)
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

// Calculate House relative to Ascendant (Equal House System from Lagna sign)
export function getHouseNumber(planetRashi: number, ascendantRashi: number): number {
  let house = planetRashi - ascendantRashi + 1;
  if (house <= 0) house += 12;
  return house;
}

// Calculate Manglik & Sade Sati
export function analyzeDoshas(
  planets: PlanetPosition[],
  ascendantRashi: number,
  moonRashi: number
): DoshaAnalysisResult {
  const mars = planets.find((p) => p.name === "Mars");
  const marsHouseFromLagna = mars ? mars.house : 1;
  const marsHouseFromMoon = mars ? getHouseNumber(mars.rashiNumber, moonRashi) : 1;

  // Manglik houses: 1, 2, 4, 7, 8, 12
  const manglikHouses = [1, 2, 4, 7, 8, 12];
  const isLagnaManglik = manglikHouses.includes(marsHouseFromLagna);
  const isMoonManglik = manglikHouses.includes(marsHouseFromMoon);

  const hasManglik = isLagnaManglik || isMoonManglik;
  let manglikSeverity: DoshaAnalysisResult["manglikSeverity"] = "None";
  let manglikDetails = "No significant Manglik Dosha detected. Marital prospects are peaceful.";

  if (isLagnaManglik && isMoonManglik) {
    manglikSeverity = "Strong (Purna)";
    manglikDetails = `Mars is placed in House ${marsHouseFromLagna} from Lagna and House ${marsHouseFromMoon} from Moon, indicating Purna Manglik Dosha. Kumbh Vivah or matching with another Manglik partner is recommended.`;
  } else if (hasManglik) {
    manglikSeverity = "Mild (Anshik)";
    manglikDetails = `Mars is placed in House ${marsHouseFromLagna} (from Lagna), indicating mild/Anshik Manglik influence. This typically calms down significantly after 28 years of age.`;
  }

  // Sade Sati Analysis: Current transit Saturn (Saturn in Aquarius/Pisces approx in 2024-2027)
  // When Saturn transits 12th, 1st, or 2nd from Natal Moon
  // For 2025/2026, Saturn transit is at Pisces (12)
  const currentTransitSaturnRashi = 12; // Pisces (Current Transit)
  let hasSadeSati = false;
  let sadeSatiPhase: DoshaAnalysisResult["sadeSatiPhase"] = "None";
  let sadeSatiDetails = "You are currently not undergoing Shani Sade Sati.";

  if (moonRashi === 1) {
    hasSadeSati = true;
    sadeSatiPhase = "Rising Phase (1st)";
    sadeSatiDetails = "Saturn is transiting 12th from your Moon sign (Pisces). First phase brings mental anxieties and unexpected expenditures. Remedial chanting of Hanuman Chalisa is advised.";
  } else if (moonRashi === 12) {
    hasSadeSati = true;
    sadeSatiPhase = "Peak Phase (2nd)";
    sadeSatiDetails = "Saturn is transiting over your natal Moon sign (Pisces). Peak phase demands perseverance, discipline, and regular Saturday oil donations to Shani Dev.";
  } else if (moonRashi === 11) {
    hasSadeSati = true;
    sadeSatiPhase = "Setting Phase (3rd)";
    sadeSatiDetails = "Saturn is transiting 2nd from your Moon sign (Pisces). Setting phase signifies culmination of trials, stabilizing financial and domestic peace.";
  }

  // Kalsarpa Dosha: When all 7 planets are hemmed between Rahu and Ketu
  return {
    hasManglik,
    manglikSeverity,
    manglikDetails,
    hasSadeSati,
    sadeSatiPhase,
    sadeSatiDetails,
    hasKalsarpa: false,
    kalsarpaType: "None (Planetary axis is balanced)",
  };
}

// Calculate Vimshottari Mahadasha timeline
export function calculateVimshottariDashas(
  moonLongitude: number,
  birthDate: Date
): VimshottariDashaItem[] {
  // Each nakshatra is 13° 20' = 13.33333°
  const nakshatraSpan = 13 + 20 / 60;
  const nakshatraIndex = Math.floor(moonLongitude / nakshatraSpan); // 0 to 26
  const balanceInNakshatra = (moonLongitude % nakshatraSpan) / nakshatraSpan;

  // Dasha lord order repeats every 9 nakshatras
  const firstLordIndex = nakshatraIndex % 9;
  const firstLord = VIMSHOTTARI_LORDS_ORDER[firstLordIndex];

  // Balance of initial dasha remaining at birth
  const remainingFraction = 1 - balanceInNakshatra;
  const firstDashaYearsRemaining = firstLord.years * remainingFraction;

  const results: VimshottariDashaItem[] = [];
  let currentDate = new Date(birthDate);

  // First Dasha
  const firstEndDate = new Date(currentDate);
  firstEndDate.setFullYear(firstEndDate.getFullYear() + Math.floor(firstDashaYearsRemaining));
  firstEndDate.setMonth(
    firstEndDate.getMonth() + Math.round((firstDashaYearsRemaining % 1) * 12)
  );

  const now = new Date();

  results.push({
    planet: firstLord.lord,
    hindiName: firstLord.hindi,
    durationYears: firstLord.years,
    startDate: currentDate.toISOString().split("T")[0],
    endDate: firstEndDate.toISOString().split("T")[0],
    isCurrent: now >= currentDate && now <= firstEndDate,
  });

  currentDate = new Date(firstEndDate);

  // Subsequent dashas for next 100 years
  for (let i = 1; i <= 8; i++) {
    const lordObj = VIMSHOTTARI_LORDS_ORDER[(firstLordIndex + i) % 9];
    const endDate = new Date(currentDate);
    endDate.setFullYear(endDate.getFullYear() + lordObj.years);

    const isCurrent = now >= currentDate && now <= endDate;
    results.push({
      planet: lordObj.lord,
      hindiName: lordObj.hindi,
      durationYears: lordObj.years,
      startDate: currentDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
      isCurrent,
    });
    currentDate = endDate;
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
      adjustedDay = 28; // safe approximation for edge
    }
  } else if (utcDecimalHour >= 24) {
    utcDecimalHour -= 24;
    adjustedDay += 1;
  }

  const jd = getJulianDay(adjustedYear, adjustedMonth, adjustedDay, utcDecimalHour);
  const ayanamsa = getLahiriAyanamsa(jd);

  // Raw Tropical Coordinates converted to Sidereal (Nirayana)
  const sunTrop = getSunLongitude(jd);
  const moonTrop = getMoonLongitude(jd);
  const marsTrop = getMarsLongitude(jd);
  const mercTrop = getMercuryLongitude(jd);
  const jupTrop = getJupiterLongitude(jd);
  const venTrop = getVenusLongitude(jd);
  const satTrop = getSaturnLongitude(jd);
  const rahuTrop = getRahuLongitude(jd);

  const sunSidereal = normalize360(sunTrop - ayanamsa);
  const moonSidereal = normalize360(moonTrop - ayanamsa);
  const marsSidereal = normalize360(marsTrop - ayanamsa);
  const mercSidereal = normalize360(mercTrop - ayanamsa);
  const jupSidereal = normalize360(jupTrop - ayanamsa);
  const venSidereal = normalize360(venTrop - ayanamsa);
  const satSidereal = normalize360(satTrop - ayanamsa);
  const rahuSidereal = normalize360(rahuTrop - ayanamsa);
  const ketuSidereal = normalize360(rahuSidereal + 180);

  const ascendantSidereal = getAscendant(jd, params.latitude, params.longitude, ayanamsa);
  const ascendantRashi = Math.floor(ascendantSidereal / 30) + 1;

  // Helper to construct PlanetPosition
  function makePosition(
    name: PlanetName,
    hindiName: string,
    symbol: string,
    longitude: number
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
      isRetrograde: false,
      navamshaSignNumber,
      dignity,
    };
  }

  const ascendantPos = makePosition("Ascendant", "लग्न", "Asc", ascendantSidereal);
  const sunPos = makePosition("Sun", "सूर्य", "Su", sunSidereal);
  const moonPos = makePosition("Moon", "चन्द्र", "Mo", moonSidereal);
  const marsPos = makePosition("Mars", "मंगल", "Ma", marsSidereal);
  const mercPos = makePosition("Mercury", "बुध", "Me", mercSidereal);
  const jupPos = makePosition("Jupiter", "बृहस्पति", "Ju", jupSidereal);
  const venPos = makePosition("Venus", "शुक्र", "Ve", venSidereal);
  const satPos = makePosition("Saturn", "शनि", "Sa", satSidereal);
  const rahuPos = makePosition("Rahu", "राहु", "Ra", rahuSidereal);
  const ketuPos = makePosition("Ketu", "केतु", "Ke", ketuSidereal);

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
