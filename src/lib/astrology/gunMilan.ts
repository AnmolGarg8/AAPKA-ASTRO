import { calculateKundli } from "./chartCalculations";
import { GunMilanResult } from "./types";

// Ashta Koota Tables and Logic
// 1. Varna (1 pt)
// 2. Vashya (2 pts)
// 3. Tara (3 pts)
// 4. Yoni (4 pts)
// 5. Graha Maitri (5 pts)
// 6. Gana (6 pts)
// 7. Bhakoot (7 pts)
// 8. Nadi (8 pts)
// Total = 36 points

const RASHI_VARNA: Record<number, number> = {
  4: 4, 8: 4, 12: 4, // Brahmin (Water signs)
  1: 3, 5: 3, 9: 3,  // Kshatriya (Fire signs)
  2: 2, 6: 2, 10: 2, // Vaishya (Earth signs)
  3: 1, 7: 1, 11: 1  // Shudra (Air signs)
};

const NAKSHATRA_GANA: Record<number, "Deva" | "Manushya" | "Rakshasa"> = {
  1: "Deva", 2: "Manushya", 3: "Rakshasa", 4: "Manushya", 5: "Deva",
  6: "Manushya", 7: "Deva", 8: "Deva", 9: "Rakshasa", 10: "Rakshasa",
  11: "Manushya", 12: "Manushya", 13: "Deva", 14: "Rakshasa", 15: "Deva",
  16: "Rakshasa", 17: "Deva", 18: "Rakshasa", 19: "Rakshasa", 20: "Manushya",
  21: "Manushya", 22: "Deva", 23: "Rakshasa", 24: "Rakshasa", 25: "Manushya",
  26: "Manushya", 27: "Deva"
};

const NAKSHATRA_NADI: Record<number, "Aadi" | "Madhya" | "Antya"> = {
  1: "Aadi", 2: "Madhya", 3: "Antya",
  4: "Antya", 5: "Madhya", 6: "Aadi",
  7: "Aadi", 8: "Madhya", 9: "Antya",
  10: "Antya", 11: "Madhya", 12: "Aadi",
  13: "Aadi", 14: "Madhya", 15: "Antya",
  16: "Antya", 17: "Madhya", 18: "Aadi",
  19: "Aadi", 20: "Madhya", 21: "Antya",
  22: "Antya", 23: "Madhya", 24: "Aadi",
  25: "Aadi", 26: "Madhya", 27: "Antya"
};

export function calculateGunMilan(
  boyDetails: { name: string; birthDate: string; birthTime: string; birthPlace: string; latitude: number; longitude: number; timezone: number },
  girlDetails: { name: string; birthDate: string; birthTime: string; birthPlace: string; latitude: number; longitude: number; timezone: number }
): GunMilanResult {
  const boyKundli = calculateKundli({ ...boyDetails, gender: "male" });
  const girlKundli = calculateKundli({ ...girlDetails, gender: "female" });

  const boyMoon = boyKundli.planets.find(p => p.name === "Moon")!;
  const girlMoon = girlKundli.planets.find(p => p.name === "Moon")!;

  const boyRashi = boyMoon.rashiNumber;
  const girlRashi = girlMoon.rashiNumber;
  const boyNak = boyMoon.nakshatraNumber;
  const girlNak = girlMoon.nakshatraNumber;

  // 1. Varna (1 Point)
  const boyVarnaVal = RASHI_VARNA[boyRashi] || 1;
  const girlVarnaVal = RASHI_VARNA[girlRashi] || 1;
  const varnaPoints = boyVarnaVal >= girlVarnaVal ? 1 : 0;
  const varnaDesc = varnaPoints === 1
    ? "Favorable spiritual and ego compatibility."
    : "Varna disparity; slight divergence in spiritual inclinations.";

  // 2. Vashya (2 Points)
  let vashyaPoints = 1.0;
  if (boyRashi === girlRashi) vashyaPoints = 2;
  else if (Math.abs(boyRashi - girlRashi) === 6) vashyaPoints = 0.5;
  else vashyaPoints = 1.5;
  const vashyaDesc = `${vashyaPoints}/2 points. Demonstrates mutual attraction and natural cordiality.`;

  // 3. Tara (3 Points)
  const diffNak = (girlNak >= boyNak) ? (girlNak - boyNak + 1) : (27 - boyNak + girlNak + 1);
  const taraRem = diffNak % 9;
  let taraPoints = 3;
  if ([3, 5, 7].includes(taraRem)) taraPoints = 1.5;
  const taraDesc = `${taraPoints}/3 points. Destiny and health harmony between both souls.`;

  // 4. Yoni (4 Points)
  // Simplified Yoni match based on nakshatra groups
  const yoniScore = (boyNak % 7 === girlNak % 7) ? 4 : (Math.abs(boyNak - girlNak) % 2 === 0 ? 3 : 2);
  const yoniDesc = `${yoniScore}/4 points. Physical compatibility, biological harmony, and mutual intimacy.`;

  // 5. Graha Maitri (5 Points)
  // Planetary friendship of Moon sign lords
  let maitriPoints = 3;
  if (boyRashi === girlRashi) maitriPoints = 5;
  else if ([1, 4, 5, 8, 9, 12].includes(boyRashi) && [1, 4, 5, 8, 9, 12].includes(girlRashi)) maitriPoints = 4;
  else if ([2, 3, 6, 7, 10, 11].includes(boyRashi) && [2, 3, 6, 7, 10, 11].includes(girlRashi)) maitriPoints = 4;
  else maitriPoints = 2.5;
  const maitriDesc = `${maitriPoints}/5 points. Intellectual rapport and friendship of planetary lords.`;

  // 6. Gana (6 Points)
  const boyGana = NAKSHATRA_GANA[boyNak];
  const girlGana = NAKSHATRA_GANA[girlNak];
  let ganaPoints = 3;
  if (boyGana === girlGana) ganaPoints = 6;
  else if ((boyGana === "Deva" && girlGana === "Manushya") || (boyGana === "Manushya" && girlGana === "Deva")) ganaPoints = 5;
  else if (boyGana === "Rakshasa" && girlGana === "Rakshasa") ganaPoints = 6;
  else ganaPoints = 0;
  const ganaDesc = `${ganaPoints}/6 points. Temperament match (${boyGana} & ${girlGana}).`;

  // 7. Bhakoot (7 Points)
  // Relative position of Moon signs: 2/12, 6/8, 9/5 are sensitive
  const rashiDiff = Math.abs(boyRashi - girlRashi) + 1;
  const hasBhakootDosha = [2, 6, 8, 12].includes(rashiDiff);
  const bhakootPoints = hasBhakootDosha ? 0 : 7;
  const bhakootDesc = hasBhakootDosha
    ? "0/7 points (Bhakoot Dosha present: differences in emotional expectations or family coordination)."
    : "7/7 points. Excellent emotional wavelength and domestic prosperity.";

  // 8. Nadi (8 Points)
  const boyNadi = NAKSHATRA_NADI[boyNak];
  const girlNadi = NAKSHATRA_NADI[girlNak];
  const hasNadiDosha = boyNadi === girlNadi;
  const nadiPoints = hasNadiDosha ? 0 : 8;
  const nadiDesc = hasNadiDosha
    ? `0/8 points (Same Nadi: ${boyNadi}. Nadi Dosha requires remedies or detailed astrologer scrutiny).`
    : `8/8 points (${boyNadi} and ${girlNadi}). Superior physiological and genetic harmony.`;

  const totalScore = varnaPoints + vashyaPoints + taraPoints + yoniScore + maitriPoints + ganaPoints + bhakootPoints + nadiPoints;
  const percentage = Math.round((totalScore / 36) * 100);

  let verdict: GunMilanResult["verdict"] = "Average Match";
  let recommendations = "";

  if (totalScore >= 28) {
    verdict = "Excellent Match";
    recommendations = "Highly auspicious match. The couple shares profound emotional, physical, and spiritual harmony. Highly recommended for marriage.";
  } else if (totalScore >= 18) {
    verdict = "Good Match";
    recommendations = "Very good compatibility score. Minor differences can be balanced with mutual respect, understanding, and personal astrological remedies.";
  } else {
    verdict = "Inauspicious / Not Recommended";
    recommendations = "Score is below the traditional 18-point threshold or strong Nadi/Bhakoot dosha is active. An in-depth personal chart consultation with Acharya Ji is strongly recommended before finalizing.";
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
    nadiDosha: hasNadiDosha,
    bhakootDosha: hasBhakootDosha,
    recommendations
  };
}
