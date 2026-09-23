/**
 * ============================================================================
 * AUTHENTIC VEDIC ASHTAKOOT GUNA MILAN ENGINE (36 GUNA MATCHING)
 * ============================================================================
 * Implements classical Parashari Ashtakoot rules with:
 * 1. Varna (1 Point): Spiritual & intellectual compatibility
 * 2. Vashya (2 Points): Dominance, mutual attraction, and marital control
 * 3. Tara (3 Points): Two-way health, longevity, and fate harmony
 * 4. Yoni (4 Points): Classical 14-animal biological compatibility matrix
 * 5. Graha Maitri (5 Points): Planetary friendship of natal Moon sign lords
 * 6. Gana (6 Points): Temperamental alignment (Deva, Manushya, Rakshasa)
 * 7. Bhakoot (7 Points): Mutual rashi axis with classical cancellation exceptions
 * 8. Nadi (8 Points): Genetic, biological & progeny compatibility with Nadi exemptions
 *
 * Total Score = 36 Points.
 */

import { calculateKundli } from "./chartCalculations";
import { GunMilanResult, PlanetName } from "./types";
import { RASHI_NAMES } from "./ephemeris";

// 1. Varna Mapping (Water > Fire > Earth > Air)
const RASHI_VARNA: Record<number, number> = {
  4: 4, 8: 4, 12: 4, // Brahmin (Water: Cancer, Scorpio, Pisces)
  1: 3, 5: 3, 9: 3,  // Kshatriya (Fire: Aries, Leo, Sagittarius)
  2: 2, 6: 2, 10: 2, // Vaishya (Earth: Taurus, Virgo, Capricorn)
  3: 1, 7: 1, 11: 1, // Shudra (Air: Gemini, Libra, Aquarius)
};

// 2. Vashya Categories
type VashyaType = "Chatushpada" | "Manava" | "Jalachara" | "Vanachara" | "Keeta";

function getVashya(rashi: number): VashyaType {
  if (rashi === 1 || rashi === 2) return "Chatushpada";
  if (rashi === 3 || rashi === 6 || rashi === 7 || rashi === 11) return "Manava";
  if (rashi === 4 || rashi === 12) return "Jalachara";
  if (rashi === 5) return "Vanachara";
  if (rashi === 8) return "Keeta";
  if (rashi === 9) return "Manava"; // first half human
  return "Chatushpada"; // Capricorn
}

// 3. 14 Yoni Animals for each of the 27 Nakshatras
export type YoniAnimal =
  | "Horse"
  | "Elephant"
  | "Sheep"
  | "Serpent"
  | "Dog"
  | "Cat"
  | "Rat"
  | "Cow"
  | "Buffalo"
  | "Tiger"
  | "Deer"
  | "Monkey"
  | "Mongoose"
  | "Lion";

const NAKSHATRA_YONI: Record<number, YoniAnimal> = {
  1: "Horse",      // Ashwini
  2: "Elephant",   // Bharani
  3: "Sheep",      // Krittika
  4: "Serpent",    // Rohini
  5: "Serpent",    // Mrigashira
  6: "Dog",        // Ardra
  7: "Cat",        // Punarvasu
  8: "Sheep",      // Pushya
  9: "Cat",        // Ashlesha
  10: "Rat",       // Magha
  11: "Rat",       // Purva Phalguni
  12: "Cow",       // Uttara Phalguni
  13: "Buffalo",   // Hasta
  14: "Tiger",     // Chitra
  15: "Buffalo",   // Swati
  16: "Tiger",     // Vishakha
  17: "Deer",      // Anuradha
  18: "Deer",      // Jyeshtha
  19: "Dog",       // Mula
  20: "Monkey",    // Purva Ashadha
  21: "Mongoose",  // Uttara Ashadha
  22: "Monkey",    // Shravana
  23: "Lion",      // Dhanishta
  24: "Horse",     // Shatabhisha
  25: "Lion",      // Purva Bhadrapada
  26: "Cow",       // Uttara Bhadrapada
  27: "Elephant",  // Revati
};

// Classical Sworn Enemies (0 Points)
const SWORN_ENEMIES: Array<[YoniAnimal, YoniAnimal]> = [
  ["Cow", "Tiger"],
  ["Elephant", "Lion"],
  ["Horse", "Buffalo"],
  ["Dog", "Deer"],
  ["Serpent", "Mongoose"],
  ["Monkey", "Sheep"],
  ["Cat", "Rat"],
];

function getYoniScore(y1: YoniAnimal, y2: YoniAnimal): number {
  if (y1 === y2) return 4;
  for (const [a, b] of SWORN_ENEMIES) {
    if ((y1 === a && y2 === b) || (y1 === b && y2 === a)) return 0;
  }
  // Standard compatibility tiers
  const friendlyPairs: Array<[YoniAnimal, YoniAnimal]> = [
    ["Horse", "Deer"],
    ["Elephant", "Sheep"],
    ["Cat", "Monkey"],
    ["Dog", "Cow"],
    ["Buffalo", "Serpent"],
  ];
  for (const [a, b] of friendlyPairs) {
    if ((y1 === a && y2 === b) || (y1 === b && y2 === a)) return 3;
  }
  return 2; // Neutral
}

// 4. Planetary Natural Friendships
const PLANET_FRIENDS: Record<string, { friends: string[]; enemies: string[]; neutral: string[] }> = {
  Sun: {
    friends: ["Moon", "Mars", "Jupiter"],
    enemies: ["Venus", "Saturn"],
    neutral: ["Mercury"],
  },
  Moon: {
    friends: ["Sun", "Mercury"],
    enemies: [],
    neutral: ["Mars", "Jupiter", "Venus", "Saturn"],
  },
  Mars: {
    friends: ["Sun", "Moon", "Jupiter"],
    enemies: ["Mercury"],
    neutral: ["Venus", "Saturn"],
  },
  Mercury: {
    friends: ["Sun", "Venus"],
    enemies: ["Moon"],
    neutral: ["Mars", "Jupiter", "Saturn"],
  },
  Jupiter: {
    friends: ["Sun", "Moon", "Mars"],
    enemies: ["Mercury", "Venus"],
    neutral: ["Saturn"],
  },
  Venus: {
    friends: ["Mercury", "Saturn"],
    enemies: ["Sun", "Moon"],
    neutral: ["Mars", "Jupiter"],
  },
  Saturn: {
    friends: ["Mercury", "Venus"],
    enemies: ["Sun", "Moon", "Mars"],
    neutral: ["Jupiter"],
  },
};

function getGrahaMaitriScore(lord1: string, lord2: string): number {
  if (lord1 === lord2) return 5;

  const rel1to2 = PLANET_FRIENDS[lord1]?.friends.includes(lord2)
    ? "friend"
    : PLANET_FRIENDS[lord1]?.enemies.includes(lord2)
    ? "enemy"
    : "neutral";

  const rel2to1 = PLANET_FRIENDS[lord2]?.friends.includes(lord1)
    ? "friend"
    : PLANET_FRIENDS[lord2]?.enemies.includes(lord1)
    ? "enemy"
    : "neutral";

  if (rel1to2 === "friend" && rel2to1 === "friend") return 5;
  if ((rel1to2 === "friend" && rel2to1 === "neutral") || (rel1to2 === "neutral" && rel2to1 === "friend")) return 4;
  if (rel1to2 === "neutral" && rel2to1 === "neutral") return 3;
  if ((rel1to2 === "friend" && rel2to1 === "enemy") || (rel1to2 === "enemy" && rel2to1 === "friend")) return 1;
  if ((rel1to2 === "neutral" && rel2to1 === "enemy") || (rel1to2 === "enemy" && rel2to1 === "neutral")) return 0.5;
  return 0; // Both enemies
}

// 5. Gana Classification
const NAKSHATRA_GANA: Record<number, "Deva" | "Manushya" | "Rakshasa"> = {
  1: "Deva", 2: "Manushya", 3: "Rakshasa", 4: "Manushya", 5: "Deva",
  6: "Manushya", 7: "Deva", 8: "Deva", 9: "Rakshasa", 10: "Rakshasa",
  11: "Manushya", 12: "Manushya", 13: "Deva", 14: "Rakshasa", 15: "Deva",
  16: "Rakshasa", 17: "Deva", 18: "Rakshasa", 19: "Rakshasa", 20: "Manushya",
  21: "Manushya", 22: "Deva", 23: "Rakshasa", 24: "Rakshasa", 25: "Manushya",
  26: "Manushya", 27: "Deva",
};

// 6. Nadi Classification
const NAKSHATRA_NADI: Record<number, "Aadi" | "Madhya" | "Antya"> = {
  1: "Aadi", 2: "Madhya", 3: "Antya",
  4: "Antya", 5: "Madhya", 6: "Aadi",
  7: "Aadi", 8: "Madhya", 9: "Antya",
  10: "Antya", 11: "Madhya", 12: "Aadi",
  13: "Aadi", 14: "Madhya", 15: "Antya",
  16: "Antya", 17: "Madhya", 18: "Aadi",
  19: "Aadi", 20: "Madhya", 21: "Antya",
  22: "Antya", 23: "Madhya", 24: "Aadi",
  25: "Aadi", 26: "Madhya", 27: "Antya",
};

export function calculateGunMilan(
  boyDetails: { name: string; birthDate: string; birthTime: string; birthPlace: string; latitude: number; longitude: number; timezone: number },
  girlDetails: { name: string; birthDate: string; birthTime: string; birthPlace: string; latitude: number; longitude: number; timezone: number }
): GunMilanResult {
  const boyKundli = calculateKundli({ ...boyDetails, gender: "male" });
  const girlKundli = calculateKundli({ ...girlDetails, gender: "female" });

  const boyMoon = boyKundli.planets.find((p) => p.name === "Moon")!;
  const girlMoon = girlKundli.planets.find((p) => p.name === "Moon")!;

  const boyRashi = boyMoon.rashiNumber;
  const girlRashi = girlMoon.rashiNumber;
  const boyNak = boyMoon.nakshatraNumber;
  const girlNak = girlMoon.nakshatraNumber;
  const boyPada = boyMoon.pada;
  const girlPada = girlMoon.pada;

  const boyLord = RASHI_NAMES[boyRashi].lord;
  const girlLord = RASHI_NAMES[girlRashi].lord;

  // 1. Varna (1 Point)
  const boyVarnaVal = RASHI_VARNA[boyRashi] || 1;
  const girlVarnaVal = RASHI_VARNA[girlRashi] || 1;
  const varnaPoints = boyVarnaVal >= girlVarnaVal ? 1 : 0;
  const varnaDesc =
    varnaPoints === 1
      ? "Favorable spiritual inclination, natural harmony in duty, and ego alignment."
      : "Varna disparity; slight variance in philosophical outlook and duty orientation.";

  // 2. Vashya (2 Points)
  const boyVashya = getVashya(boyRashi);
  const girlVashya = getVashya(girlRashi);
  let vashyaPoints = 1.0;
  if (boyVashya === girlVashya) {
    vashyaPoints = 2.0;
  } else if (
    (boyVashya === "Manava" && girlVashya === "Chatushpada") ||
    (boyVashya === "Chatushpada" && girlVashya === "Manava")
  ) {
    vashyaPoints = 1.5;
  } else if (boyVashya === "Vanachara" || girlVashya === "Vanachara") {
    vashyaPoints = 0.0;
  } else {
    vashyaPoints = 1.0;
  }
  const vashyaDesc = `${vashyaPoints}/2 points. Measures mutual magnetic pull, dominance balance, and cordial affection.`;

  // 3. Tara (3 Points - Two Way Verification)
  // Distance from Boy to Girl Nakshatra
  const d1 = girlNak >= boyNak ? girlNak - boyNak + 1 : 27 - boyNak + girlNak + 1;
  const tara1 = d1 % 9;
  const inauspicious = [3, 5, 7];
  const bToGGood = !inauspicious.includes(tara1);

  // Distance from Girl to Boy Nakshatra
  const d2 = boyNak >= girlNak ? boyNak - girlNak + 1 : 27 - girlNak + boyNak + 1;
  const tara2 = d2 % 9;
  const gToBGood = !inauspicious.includes(tara2);

  let taraPoints = 3;
  if (bToGGood && gToBGood) taraPoints = 3;
  else if (bToGGood || gToBGood) taraPoints = 1.5;
  else taraPoints = 0;
  const taraDesc = `${taraPoints}/3 points. Destiny harmony, health well-being, and longevity balance.`;

  // 4. Yoni (4 Points - 14 Classical Animal Archetypes)
  const boyYoni = NAKSHATRA_YONI[boyNak];
  const girlYoni = NAKSHATRA_YONI[girlNak];
  const yoniScore = getYoniScore(boyYoni, girlYoni);
  const yoniDesc = `${yoniScore}/4 points (${boyYoni} & ${girlYoni}). Intimacy, mutual physical attraction, and biological harmony.`;

  // 5. Graha Maitri (5 Points - Moon Sign Lords Friendship)
  const maitriPoints = getGrahaMaitriScore(boyLord, girlLord);
  const maitriDesc = `${maitriPoints}/5 points (${boyLord} & ${girlLord}). Intellectual rapport, psychological compatibility, and mutual respect.`;

  // 6. Gana (6 Points - Temperament)
  const boyGana = NAKSHATRA_GANA[boyNak];
  const girlGana = NAKSHATRA_GANA[girlNak];
  let ganaPoints = 3;
  if (boyGana === girlGana) {
    ganaPoints = 6;
  } else if ((boyGana === "Deva" && girlGana === "Manushya") || (boyGana === "Manushya" && girlGana === "Deva")) {
    ganaPoints = 5;
  } else if (boyGana === "Deva" && girlGana === "Rakshasa") {
    ganaPoints = 1;
  } else if (boyGana === "Rakshasa" && girlGana === "Deva") {
    ganaPoints = 1;
  } else {
    ganaPoints = 0; // Manushya & Rakshasa
  }
  const ganaDesc = `${ganaPoints}/6 points (${boyGana} & ${girlGana}). Temperament alignment, daily outlook, and mutual patience.`;

  // 7. Bhakoot (7 Points - Mutual Rashi Axis & Cancellations)
  // Distance from Boy to Girl Rashi
  let rashiDist = girlRashi - boyRashi + 1;
  if (rashiDist <= 0) rashiDist += 12;

  let bhakootDosha = false;
  let bhakootPoints = 7;

  // Inauspicious axes: 2/12 (Dwidwadasha), 6/8 (Shadashtaka), 9/5 (Navapanchama)
  if ([2, 12, 6, 8, 5, 9].includes(rashiDist)) {
    bhakootDosha = true;
    // Classical Cancellation Rules:
    // 1. Same Rashi Lord (e.g. Aries & Scorpio = Mars, Taurus & Libra = Venus)
    // 2. Lords are mutual friends
    const isSameLord = boyLord === girlLord;
    const isFriendlyLords =
      PLANET_FRIENDS[boyLord]?.friends.includes(girlLord) &&
      PLANET_FRIENDS[girlLord]?.friends.includes(boyLord);

    if (isSameLord || isFriendlyLords) {
      bhakootPoints = 7; // Cancelled
      bhakootDosha = false;
    } else {
      bhakootPoints = 0;
    }
  }
  const bhakootDesc =
    bhakootPoints === 7
      ? `7/7 points. ${bhakootDosha ? "Bhakoot Dosha pacified by friendly planetary lordships." : "Auspicious relational axis for longevity and financial growth."}`
      : "0/7 points. Shadashtaka or Dwidwadasha axis present; special marital harmony remedies recommended.";

  // 8. Nadi (8 Points - Biological & Genetic Compatibility)
  const boyNadi = NAKSHATRA_NADI[boyNak];
  const girlNadi = NAKSHATRA_NADI[girlNak];
  let nadiPoints = 8;
  let nadiDosha = false;

  if (boyNadi === girlNadi) {
    nadiDosha = true;
    // Classical Nadi Dosha Exemptions:
    // 1. Same Rashi but different Nakshatras
    // 2. Same Nakshatra but different Charan/Padas
    // 3. Same Rashi Lord
    const isDifferentNak = boyNak !== girlNak && boyRashi === girlRashi;
    const isDifferentPada = boyNak === girlNak && boyPada !== girlPada;
    const isSameLord = boyLord === girlLord;

    if (isDifferentNak || isDifferentPada || isSameLord) {
      nadiPoints = 8; // Nadi Dosha Cancelled
      nadiDosha = false;
    } else {
      nadiPoints = 0;
    }
  }
  const nadiDesc =
    nadiPoints === 8
      ? `8/8 points (${boyNadi} & ${girlNadi}). ${nadiDosha ? "Nadi Dosha cancelled due to different Pada/Nakshatra." : "Excellent genetic vitality and sound progeny prospects."}`
      : `0/8 points (Both ${boyNadi} Nadi). Nadi Dosha detected; consultation with Acharya Ji advised for Mahamrityunjaya or cow-donation remedies.`;

  // Total Guna Score
  const totalScore = parseFloat(
    (varnaPoints + vashyaPoints + taraPoints + yoniScore + maitriPoints + ganaPoints + bhakootPoints + nadiPoints).toFixed(1)
  );
  const percentage = Math.round((totalScore / 36) * 100);

  // Verdict
  let verdict: GunMilanResult["verdict"] = "Inauspicious / Not Recommended";
  if (totalScore >= 28) verdict = "Excellent Match";
  else if (totalScore >= 21) verdict = "Good Match";
  else if (totalScore >= 18) verdict = "Average Match";

  // Manglik Evaluation
  const boyManglik = boyKundli.doshas.hasManglik;
  const girlManglik = girlKundli.doshas.hasManglik;
  let manglikCompatible = true;
  let manglikVerdict = "Both charts have harmonious Mars energy.";

  if (boyManglik && girlManglik) {
    manglikVerdict = "Both are Manglik — planetary fire energies neutralize, creating high compatibility.";
  } else if (boyManglik && !girlManglik) {
    manglikCompatible = false;
    manglikVerdict = "Boy is Manglik while Girl is Non-Manglik; Kuja Dosha remedy or detailed chart check advised.";
  } else if (!boyManglik && girlManglik) {
    manglikCompatible = false;
    manglikVerdict = "Girl is Manglik while Boy is Non-Manglik; Kumbh Vivah or Mars pacification advised.";
  }

  let recommendations = "";
  if (totalScore >= 24 && manglikCompatible) {
    recommendations = "This match possesses robust Vedic foundation across spiritual, mental, and physical planes. Very favorable for matrimonial union.";
  } else if (totalScore >= 18) {
    recommendations = "Good foundational compatibility. Minor doshas present can be easily harmonized with Vedic satvik remedies and pre-wedding pujas.";
  } else {
    recommendations = "Significant doshic disparities (Nadi or Bhakoot). Direct 1-on-1 chart consultation with Acharya Niraj Kumar is strongly recommended before finalizing.";
  }

  return {
    boyName: boyDetails.name,
    girlName: girlDetails.name,
    totalScore,
    maxScore: 36,
    percentage,
    verdict,
    varna: { points: varnaPoints, maxPoints: 1, description: varnaDesc },
    vashya: { points: vashyaPoints, maxPoints: 2, description: vashyaDesc },
    tara: { points: taraPoints, maxPoints: 3, description: taraDesc },
    yoni: { points: yoniScore, maxPoints: 4, description: yoniDesc },
    grahaMaitri: { points: maitriPoints, maxPoints: 5, description: maitriDesc },
    gana: { points: ganaPoints, maxPoints: 6, description: ganaDesc },
    bhakoot: { points: bhakootPoints, maxPoints: 7, description: bhakootDesc },
    nadi: { points: nadiPoints, maxPoints: 8, description: nadiDesc },
    nadiDosha,
    bhakootDosha,
    manglikMatch: {
      boyManglik,
      girlManglik,
      compatible: manglikCompatible,
      verdict: manglikVerdict,
    },
    recommendations,
  };
}
