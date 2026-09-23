/**
 * ============================================================================
 * FREE ASTROLOGY & NUMEROLOGY LEAD-GEN CALCULATORS
 * ============================================================================
 * Instant top-of-funnel viral tools for Aapka Astro:
 * 1. Love Calculator (Name & DOB synergy)
 * 2. FLAMES Calculator (Classical relationship elimination game)
 * 3. Moon Sign Calculator (Chandra Rashi & Nakshatra via NASA JPL Ephemeris)
 * 4. Sun Sign Calculator (Western Zodiac sign, element, and planetary ruler)
 * 5. Numerology Calculator (Life Path / Mulank, Destiny / Namank, Soul Urge)
 */

import { getJulianDay, getLahiriAyanamsa, getMoonLongitude, normalize360, RASHI_NAMES, NAKSHATRAS } from "./ephemeris";

// ----------------------------------------------------------------------------
// 1. LOVE CALCULATOR
// ----------------------------------------------------------------------------
export interface LoveCalculatorResult {
  partner1: string;
  partner2: string;
  score: number; // 0 to 100
  verdict: string;
  verdictHindi: string;
  summary: string;
  pillars: {
    emotional: number;
    communication: number;
    passion: number;
    stability: number;
  };
  advice: string;
}

export function calculateLoveScore(
  name1: string,
  name2: string,
  dob1?: string,
  dob2?: string
): LoveCalculatorResult {
  const clean1 = name1.trim().toLowerCase().replace(/[^a-z]/g, "");
  const clean2 = name2.trim().toLowerCase().replace(/[^a-z]/g, "");

  // Deterministic seed based on sorted names to guarantee consistency regardless of order
  const combined = [clean1, clean2].sort().join("&");
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (hash << 5) - hash + combined.charCodeAt(i);
    hash |= 0;
  }

  // Include DOB seeds if provided
  if (dob1 && dob2) {
    const dCombined = [dob1, dob2].sort().join("@");
    for (let j = 0; j < dCombined.length; j++) {
      hash = (hash << 3) - hash + dCombined.charCodeAt(j);
      hash |= 0;
    }
  }

  const absHash = Math.abs(hash);

  // Score between 58% and 98% for positive engagement
  const score = 58 + (absHash % 41);

  const emotional = 60 + ((absHash >> 2) % 39);
  const communication = 55 + ((absHash >> 4) % 44);
  const passion = 62 + ((absHash >> 6) % 37);
  const stability = 58 + ((absHash >> 8) % 41);

  let verdict = "Harmonious & Soulful Connection";
  let verdictHindi = "मधुर एवं आत्मीय सम्बंध";
  let summary =
    "Your relationship indicates a profound emotional resonance and shared life perspective. You uplift each other during moments of uncertainty.";
  let advice =
    "Nurture mutual transparency and active listening. A deeper Kundli Guna Milan analysis can reveal exact marital yogas and dasha timing.";

  if (score >= 90) {
    verdict = "Celestial Soulmate Connection (दिव्य सम्बंध)";
    verdictHindi = "परम शुभ एवं दिव्य सम्बंध";
    summary =
      "An exceptional planetary and numerical alignment. Your energies complement each other with effortless emotional understanding and enduring mutual respect.";
    advice =
      "Your natural chemistry is extraordinary. Fortify this bond with joint spiritual practices and ensure family blessing alignment.";
  } else if (score >= 75) {
    verdict = "Promising & Loving Partnership (शुभ साथी)";
    verdictHindi = "शुभ एवं प्रेमपूर्ण सम्बंध";
    summary =
      "Strong affection and communication bridge any temporary temperamental differences. You inspire ambition and comfort in one another.";
    advice =
      "Give each other personal space to grow while celebrating little milestones together regularly.";
  } else {
    verdict = "Dynamic & Evolving Bond (परिवर्तनशील)";
    verdictHindi = "सचेत एवं विकासशील सम्बंध";
    summary =
      "An intriguing chemistry filled with passionate sparks, though requiring conscious emotional patience and clarity during disagreements.";
    advice =
      "Avoid making hasty assumptions during misunderstandings. A personalized 1-on-1 synastry consultation with Acharya Ji can help unlock lasting harmony.";
  }

  return {
    partner1: name1,
    partner2: name2,
    score,
    verdict,
    verdictHindi,
    summary,
    pillars: {
      emotional,
      communication,
      passion,
      stability,
    },
    advice,
  };
}

// ----------------------------------------------------------------------------
// 2. FLAMES CALCULATOR
// ----------------------------------------------------------------------------
export type FlamesLetter = "F" | "L" | "A" | "M" | "E" | "S";

export interface FlamesResult {
  name1: string;
  name2: string;
  letter: FlamesLetter;
  category: string;
  categoryHindi: string;
  emoji: string;
  description: string;
  compatibilityAdvice: string;
  strikeCount: number;
}

const FLAMES_DATA: Record<
  FlamesLetter,
  { category: string; categoryHindi: string; emoji: string; description: string; advice: string }
> = {
  F: {
    category: "Friends (मित्रता)",
    categoryHindi: "सच्ची मित्रता",
    emoji: "🤝",
    description:
      "A bond grounded in honesty, loyalty, and effortless banter. You can confide in each other without fear of judgment.",
    advice:
      "Friendship is often the most enduring foundation for romance. Cherish the trust and mutual laughter you share.",
  },
  L: {
    category: "Love (प्रेम)",
    categoryHindi: "गहरा प्रेम",
    emoji: "💖",
    description:
      "A magnetic romantic attraction that draws hearts together. You spark profound passion and emotional warmth in each other.",
    advice:
      "True love blossoms with mutual patience and respect. Check your Vedic Guna Milan to see if marriage yogas support this feeling.",
  },
  A: {
    category: "Affection (स्नेह)",
    categoryHindi: "स्नेह एवं आकर्षण",
    emoji: "🥰",
    description:
      "A tender, gentle connection marked by care and comforting protectiveness. You bring genuine peace to each other's presence.",
    advice:
      "Affection deepens through open emotional expression. Don't hesitate to share your dreams and vulnerable thoughts.",
  },
  M: {
    category: "Marriage (विवाह)",
    categoryHindi: "पवित्र दांपत्य",
    emoji: "💍",
    description:
      "A sacred union designed for long-term domestic stability, shared family values, and joint life milestones.",
    advice:
      "The stars suggest strong lifelong compatibility. A full Kundli matching consultation is recommended to align manglik and dasha factors.",
  },
  E: {
    category: "Enemies / Polar Opposites (विरोधी स्वभाव)",
    categoryHindi: "विरोधी स्वभाव",
    emoji: "⚡",
    description:
      "Intense friction and conflicting personalities. You see the world from radically different angles, triggering frequent debates.",
    advice:
      "Opposites can attract if you learn the art of compromise. Speak to Acharya Ji to diagnose underlying planetary enmity (Grah Maitri Dosha).",
  },
  S: {
    category: "Siblings / Pure Platonic (सहोदर जैसा सम्बंध)",
    categoryHindi: "पवित्र भाई-बहन जैसा स्नेह",
    emoji: "🛡️",
    description:
      "A protective, deeply platonic relationship akin to kindred spirits or sibling guardians looking out for each other's well-being.",
    advice:
      "Respect the platonic nature of this bond. You serve as steady anchors and dependable guides in each other's lives.",
  },
};

export function calculateFlames(name1: string, name2: string): FlamesResult {
  const arr1 = name1.toLowerCase().replace(/[^a-z]/g, "").split("");
  const arr2 = name2.toLowerCase().replace(/[^a-z]/g, "").split("");

  // Remove common characters
  for (let i = 0; i < arr1.length; i++) {
    const char = arr1[i];
    const matchIdx = arr2.indexOf(char);
    if (matchIdx !== -1) {
      arr1.splice(i, 1);
      arr2.splice(matchIdx, 1);
      i--; // adjust index after removal
    }
  }

  const remainingCount = arr1.length + arr2.length;
  const count = remainingCount === 0 ? 1 : remainingCount;

  // Elimination cycle through F-L-A-M-E-S
  const letters: FlamesLetter[] = ["F", "L", "A", "M", "E", "S"];
  let index = 0;

  while (letters.length > 1) {
    index = (index + count - 1) % letters.length;
    letters.splice(index, 1);
  }

  const finalLetter = letters[0];
  const meta = FLAMES_DATA[finalLetter];

  return {
    name1: name1.trim(),
    name2: name2.trim(),
    letter: finalLetter,
    category: meta.category,
    categoryHindi: meta.categoryHindi,
    emoji: meta.emoji,
    description: meta.description,
    compatibilityAdvice: meta.advice,
    strikeCount: remainingCount,
  };
}

// ----------------------------------------------------------------------------
// 3. MOON SIGN CALCULATOR (CHANDRA RASHI)
// ----------------------------------------------------------------------------
export interface MoonSignResult {
  name: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  moonSign: string;
  moonSignHindi: string;
  rashiNumber: number;
  rashiLord: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  nakshatra: string;
  nakshatraPada: number;
  coreTraits: string[];
  emotionalProfile: string;
  favorableGemstone: string;
  favorableDeity: string;
}

const RASHI_ELEMENTS: Record<number, "Fire" | "Earth" | "Air" | "Water"> = {
  1: "Fire",
  2: "Earth",
  3: "Air",
  4: "Water",
  5: "Fire",
  6: "Earth",
  7: "Air",
  8: "Water",
  9: "Fire",
  10: "Earth",
  11: "Air",
  12: "Water",
};

const RASHI_EMOTIONAL_PROFILES: Record<number, { profile: string; traits: string[]; gemstone: string; deity: string }> = {
  1: {
    profile: "Dynamic, spontaneous, and courageously expressive. You process emotions through direct action and crave autonomy.",
    traits: ["Bold Leadership", "Passionate", "Fast Decision-Maker", "Quick to Anger, Quick to Forgive"],
    gemstone: "Red Coral (Moonga)",
    deity: "Lord Hanuman",
  },
  2: {
    profile: "Grounded, serene, and deeply loyal. You seek physical and emotional security and take comfort in sensory beauty.",
    traits: ["Patient & Calm", "Steadfast Loyalty", "Appreciation for Luxury", "Resistant to Sudden Change"],
    gemstone: "Diamond / White Sapphire",
    deity: "Maa Lakshmi",
  },
  3: {
    profile: "Inquisitive, communicative, and intellectually agile. You process feelings through talking, writing, and intellectual analysis.",
    traits: ["Articulate", "Multitasker", "Curious Mind", "Occasional Restlessness"],
    gemstone: "Emerald (Panna)",
    deity: "Lord Ganesha",
  },
  4: {
    profile: "Profoundly intuitive, empathetic, and nurturing. Moon is in its own home rashi here, bestowing deep emotional depth.",
    traits: ["Deep Empathy", "Protective Nature", "Strong Memory", "Sensitive to Atmospheres"],
    gemstone: "Natural Pearl (Moti)",
    deity: "Lord Shiva",
  },
  5: {
    profile: "Warm-hearted, noble, and magnetic. You express love with generous grandeur and seek authentic recognition.",
    traits: ["Generous Spirit", "Natural Charisma", "Dignified Pride", "Fiercely Loyal"],
    gemstone: "Ruby (Manikya)",
    deity: "Lord Surya",
  },
  6: {
    profile: "Analytical, discerning, and detail-oriented. You show love through practical acts of service and helpful problem-solving.",
    traits: ["Systematic Thinking", "Caring Service", "High Standards", "Constructive Mindset"],
    gemstone: "Emerald (Panna)",
    deity: "Lord Vishnu",
  },
  7: {
    profile: "Harmonious, diplomatic, and partnership-oriented. You seek peace, aesthetic balance, and fairness in all relationships.",
    traits: ["Diplomatic Grace", "Fair-Minded", "Aesthetic Charm", "Dislikes Conflict"],
    gemstone: "White Sapphire / Diamond",
    deity: "Maa Lakshmi",
  },
  8: {
    profile: "Intense, transformative, and deeply perceptive. You experience emotions with volcanic passion and prize emotional truth.",
    traits: ["Unwavering Willpower", "Keen Intuition", "Transformative Power", "Fiercely Protective"],
    gemstone: "Red Coral (Moonga)",
    deity: "Lord Kartikeya",
  },
  9: {
    profile: "Optimistic, philosophical, and freedom-loving. You view life as a grand quest for truth and moral righteousness.",
    traits: ["Wisdom & Faith", "Love for Truth", "Generous Vision", "Inspiring Mentor"],
    gemstone: "Yellow Sapphire (Pukhraj)",
    deity: "Lord Brihaspati",
  },
  10: {
    profile: "Disciplined, pragmatic, and duty-driven. You handle emotional stress with stoic perseverance and achieve enduring respect.",
    traits: ["Resilient Patience", "Strategic Planner", "High Integrity", "Pragmatic Mind"],
    gemstone: "Blue Sapphire (Neelam)",
    deity: "Lord Shani",
  },
  11: {
    profile: "Humanitarian, visionary, and intellectually free. You possess a forward-thinking mind and value egalitarian brotherhood.",
    traits: ["Progressive Vision", "Unconventional Mind", "Social Consciousness", "Loyal Friend"],
    gemstone: "Blue Sapphire (Neelam)",
    deity: "Lord Shiva",
  },
  12: {
    profile: "Mystical, compassionate, and boundless in imagination. You possess psychic sensitivity and a deep spiritual longing.",
    traits: ["Spiritual Insight", "Compassionate Heart", "Creative Imagination", "Gentle Soul"],
    gemstone: "Yellow Sapphire (Pukhraj)",
    deity: "Lord Vishnu",
  },
};

export function calculateMoonSign(
  name: string,
  birthDate: string,
  birthTime: string,
  birthPlace: string,
  lat: number,
  lng: number,
  tz: number
): MoonSignResult {
  const [y, m, d] = birthDate.split("-").map(Number);
  const [hh, mm] = birthTime.split(":").map(Number);

  // UTC conversion
  const utcHours = hh + mm / 60 - tz;
  const jd = getJulianDay(y, m, d, utcHours);
  const ayanamsa = getLahiriAyanamsa(jd);
  const tropicalMoon = getMoonLongitude(jd);
  const siderealMoon = normalize360(tropicalMoon - ayanamsa);

  const rashiNumber = Math.floor(siderealMoon / 30) + 1;
  const rashiMeta = RASHI_NAMES[rashiNumber];
  const element = RASHI_ELEMENTS[rashiNumber];
  const profileData = RASHI_EMOTIONAL_PROFILES[rashiNumber];

  const nakshatraIndex = Math.floor(siderealMoon / (13 + 20 / 60));
  const nakshatraItem = NAKSHATRAS[nakshatraIndex % 27];
  const nakshatraName = typeof nakshatraItem === "string" ? nakshatraItem : (nakshatraItem?.name || "Ashwini");
  const nakshatraSpan = 13 + 20 / 60;
  const pada = Math.floor((siderealMoon % nakshatraSpan) / (nakshatraSpan / 4)) + 1;

  return {
    name: name || "Seeker",
    birthDate,
    birthTime,
    birthPlace,
    moonSign: rashiMeta.en,
    moonSignHindi: rashiMeta.hi,
    rashiNumber,
    rashiLord: rashiMeta.lord,
    element,
    nakshatra: nakshatraName,
    nakshatraPada: pada,
    coreTraits: profileData.traits,
    emotionalProfile: profileData.profile,
    favorableGemstone: profileData.gemstone,
    favorableDeity: profileData.deity,
  };
}

// ----------------------------------------------------------------------------
// 4. SUN SIGN CALCULATOR (WESTERN ZODIAC)
// ----------------------------------------------------------------------------
export interface SunSignResult {
  sign: string;
  signHindi: string;
  symbol: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Cardinal" | "Fixed" | "Mutable";
  rulingPlanet: string;
  dateRange: string;
  coreTraits: string[];
  description: string;
  vedicContrast: string;
  luckyDay: string;
  luckyColor: string;
}

const ZODIAC_SIGNS: Array<{
  sign: string;
  signHindi: string;
  symbol: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Cardinal" | "Fixed" | "Mutable";
  rulingPlanet: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  dateRange: string;
  traits: string[];
  description: string;
  luckyDay: string;
  luckyColor: string;
}> = [
  {
    sign: "Aries",
    signHindi: "मेष",
    symbol: "♈ The Ram",
    element: "Fire",
    modality: "Cardinal",
    rulingPlanet: "Mars",
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    dateRange: "March 21 – April 19",
    traits: ["Courageous", "Determined", "Enthusiastic", "Pioneering"],
    description: "The trailblazer of the zodiac. You dive headfirst into ambitious ventures with fierce vitality and bold confidence.",
    luckyDay: "Tuesday",
    luckyColor: "Crimson Red",
  },
  {
    sign: "Taurus",
    signHindi: "वृषभ",
    symbol: "♉ The Bull",
    element: "Earth",
    modality: "Fixed",
    rulingPlanet: "Venus",
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
    dateRange: "April 20 – May 20",
    traits: ["Reliable", "Patient", "Practical", "Sensual"],
    description: "Grounded and enduring. You seek physical stability, culinary pleasures, and loyal bonds that stand the test of time.",
    luckyDay: "Friday",
    luckyColor: "Emerald Green & Pink",
  },
  {
    sign: "Gemini",
    signHindi: "मिथुन",
    symbol: "♊ The Twins",
    element: "Air",
    modality: "Mutable",
    rulingPlanet: "Mercury",
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
    dateRange: "May 21 – June 20",
    traits: ["Adaptable", "Witty", "Curious", "Expressive"],
    description: "Quick-witted and versatile. You thrive on learning new concepts, socializing, and synthesizing diverse perspectives.",
    luckyDay: "Wednesday",
    luckyColor: "Light Yellow & Mint",
  },
  {
    sign: "Cancer",
    signHindi: "कर्क",
    symbol: "♋ The Crab",
    element: "Water",
    modality: "Cardinal",
    rulingPlanet: "Moon",
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
    dateRange: "June 21 – July 22",
    traits: ["Intuitive", "Sentimental", "Protective", "Tenacious"],
    description: "The emotional caretaker of the zodiac. Deeply attached to family and home, your intuition guides your key decisions.",
    luckyDay: "Monday",
    luckyColor: "Silver & Seafoam White",
  },
  {
    sign: "Leo",
    signHindi: "सिंह",
    symbol: "♌ The Lion",
    element: "Fire",
    modality: "Fixed",
    rulingPlanet: "Sun",
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
    dateRange: "July 23 – August 22",
    traits: ["Charismatic", "Generous", "Creative", "Proud"],
    description: "Radiant and regal. You illuminate any room with innate charisma, big-hearted generosity, and commanding leadership.",
    luckyDay: "Sunday",
    luckyColor: "Gold & Saffron Orange",
  },
  {
    sign: "Virgo",
    signHindi: "कन्या",
    symbol: "♍ The Maiden",
    element: "Earth",
    modality: "Mutable",
    rulingPlanet: "Mercury",
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
    dateRange: "August 23 – September 22",
    traits: ["Analytical", "Helpful", "Diligent", "Precision-Focused"],
    description: "Systematic and deeply observant. You bring order from chaos through meticulous problem-solving and humble service.",
    luckyDay: "Wednesday",
    luckyColor: "Olive Green & Ochre",
  },
  {
    sign: "Libra",
    signHindi: "तुला",
    symbol: "♎ The Scales",
    element: "Air",
    modality: "Cardinal",
    rulingPlanet: "Venus",
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
    dateRange: "September 23 – October 22",
    traits: ["Diplomatic", "Graceful", "Fair", "Charming"],
    description: "The champion of harmony and aesthetics. You naturally balance viewpoints and appreciate refined art and romance.",
    luckyDay: "Friday",
    luckyColor: "Pastel Blue & Rose Pink",
  },
  {
    sign: "Scorpio",
    signHindi: "वृश्चिक",
    symbol: "♏ The Scorpion",
    element: "Water",
    modality: "Fixed",
    rulingPlanet: "Pluto / Mars",
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
    dateRange: "October 23 – November 21",
    traits: ["Passionate", "Intuitive", "Magnetic", "Fiercely Loyal"],
    description: "Intense, mysterious, and emotionally penetrating. You see beneath superficial appearances and possess immense inner strength.",
    luckyDay: "Tuesday",
    luckyColor: "Deep Maroon & Black",
  },
  {
    sign: "Sagittarius",
    signHindi: "धनु",
    symbol: "♐ The Archer",
    element: "Fire",
    modality: "Mutable",
    rulingPlanet: "Jupiter",
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
    dateRange: "November 22 – December 21",
    traits: ["Adventurous", "Philosophical", "Optimistic", "Generous"],
    description: "The spiritual seeker and explorer. You crave philosophical wisdom, international travel, and boundless freedom.",
    luckyDay: "Thursday",
    luckyColor: "Royal Purple & Indigo",
  },
  {
    sign: "Capricorn",
    signHindi: "मकर",
    symbol: "♑ The Sea-Goat",
    element: "Earth",
    modality: "Cardinal",
    rulingPlanet: "Saturn",
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
    dateRange: "December 22 – January 19",
    traits: ["Ambitious", "Disciplined", "Patient", "Strategic"],
    description: "The master builder of long-term empires. Through unwavering perseverance and discipline, you scale life's highest peaks.",
    luckyDay: "Saturday",
    luckyColor: "Charcoal Gray & Navy",
  },
  {
    sign: "Aquarius",
    signHindi: "कुंभ",
    symbol: "♒ The Water Bearer",
    element: "Air",
    modality: "Fixed",
    rulingPlanet: "Uranus / Saturn",
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
    dateRange: "January 20 – February 18",
    traits: ["Visionary", "Original", "Independent", "Humanitarian"],
    description: "The innovative reformer. You champion futuristic ideals, intellectual freedom, and humanitarian progress.",
    luckyDay: "Saturday",
    luckyColor: "Electric Blue & Turquoise",
  },
  {
    sign: "Pisces",
    signHindi: "मीन",
    symbol: "♓ The Fishes",
    element: "Water",
    modality: "Mutable",
    rulingPlanet: "Neptune / Jupiter",
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
    dateRange: "February 19 – March 20",
    traits: ["Compassionate", "Artistic", "Intuitive", "Empathetic"],
    description: "The mystic and poet of the zodiac. Boundlessly creative and compassionate, you feel universal emotions deeply.",
    luckyDay: "Thursday",
    luckyColor: "Aquamarine & Lavender",
  },
];

export function calculateSunSign(birthDate: string): SunSignResult {
  const parts = birthDate.split("-");
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  const found = ZODIAC_SIGNS.find((z) => {
    if (z.startMonth === z.endMonth) {
      return month === z.startMonth && day >= z.startDay && day <= z.endDay;
    }
    if (month === z.startMonth) {
      return day >= z.startDay;
    }
    if (month === z.endMonth) {
      return day <= z.endDay;
    }
    return false;
  }) || ZODIAC_SIGNS[0];

  return {
    sign: found.sign,
    signHindi: found.signHindi,
    symbol: found.symbol,
    element: found.element,
    modality: found.modality,
    rulingPlanet: found.rulingPlanet,
    dateRange: found.dateRange,
    coreTraits: found.traits,
    description: found.description,
    vedicContrast: `In Western astrology your Sun is in ${found.sign}. Note that Vedic astrology uses the sidereal zodiac (Lahiri ayanamsa ~24° earlier), meaning your Vedic Sun sign may be the preceding constellation. For exact destiny analysis, Vedic astrology prioritizes your Moon sign and Ascendant.`,
    luckyDay: found.luckyDay,
    luckyColor: found.luckyColor,
  };
}

// ----------------------------------------------------------------------------
// 5. NUMEROLOGY CALCULATOR
// ----------------------------------------------------------------------------
export interface NumerologyResult {
  fullName: string;
  birthDate: string;
  lifePathNumber: number; // Mulank / Bhagyank
  destinyNumber: number; // Namank
  soulUrgeNumber: number; // Atma Karaka / Heart desire
  personalityNumber: number;
  rulingPlanet: string;
  coreVibration: string;
  strengths: string[];
  challenges: string[];
  careerAffinities: string[];
  lifeMission: string;
}

// Chaldean letter values (1 to 8)
const CHALDEAN_VALUES: Record<string, number> = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8,
};

function reduceToSingleDigit(num: number, allowMaster: boolean = false): number {
  while (num > 9) {
    if (allowMaster && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    num = num
      .toString()
      .split("")
      .reduce((sum, d) => sum + parseInt(d, 10), 0);
  }
  return num;
}

const LIFE_PATH_METAS: Record<
  number,
  {
    rulingPlanet: string;
    vibration: string;
    mission: string;
    strengths: string[];
    challenges: string[];
    careers: string[];
  }
> = {
  1: {
    rulingPlanet: "Sun (Surya)",
    vibration: "The Pioneering Leader (नेतृत्व)",
    mission: "To initiate breakthroughs, inspire others through independent courage, and stand as an original pioneer.",
    strengths: ["Unyielding Willpower", "Courageous Innovation", "Self-Reliance", "Executive Focus"],
    challenges: ["Impatience with Delays", "Stubborn Independence", "Ego Friction"],
    careers: ["Entrepreneur", "Executive Leader", "Innovator", "Military / Defense", "Director"],
  },
  2: {
    rulingPlanet: "Moon (Chandra)",
    vibration: "The Diplomatic Healer (समन्वय)",
    mission: "To create peace, harmonize contrasting opinions, and heal emotional discord through gentle empathy.",
    strengths: ["Intuitive Sensitivity", "Master Peacemaker", "Subtle Diplomacy", "Collaborative Spirit"],
    challenges: ["Over-Sensitivity to Criticism", "Indecision", "Self-Doubt"],
    careers: ["Diplomat", "Counselor / Therapist", "Arbitrator", "Artistic Designer", "Healthcare"],
  },
  3: {
    rulingPlanet: "Jupiter (Guru)",
    vibration: "The Creative Communicator (अभिव्यक्ति)",
    mission: "To uplift collective consciousness through authentic creative expression, wisdom, optimism, and speech.",
    strengths: ["Magnetic Charisma", "Artistic Flair", "Infectious Optimism", "Eloquence"],
    challenges: ["Scattered Focus", "Superficial Distractions", "Mood Swings"],
    careers: ["Author / Speaker", "Actor / Performer", "Teacher / Mentor", "Marketing & Media", "Creative Director"],
  },
  4: {
    rulingPlanet: "Rahu / Uranus",
    vibration: "The Pragmatic Architect (व्यवस्थापक)",
    mission: "To build enduring structural foundations, ensure order, and execute complex long-term projects with integrity.",
    strengths: ["Methodical Discipline", "Rock-Solid Loyalty", "High Practicality", "Reliable Endurance"],
    challenges: ["Rigidity to Change", "Tendency to Workaholic Habits", "Excessive Caution"],
    careers: ["Civil Engineer", "Financial Analyst", "Architect", "Legal Specialist", "Operations Head"],
  },
  5: {
    rulingPlanet: "Mercury (Budh)",
    vibration: "The Dynamic Visionary (गतिशीलता)",
    mission: "To experience life's versatile tapestry, champion personal freedom, and inspire progressive adaptability.",
    strengths: ["Rapid Adaptability", "Quick Intellect", "Cosmopolitan Perspective", "Curious Mind"],
    challenges: ["Restlessness", "Impulsive Commitments", "Short Attention Span"],
    careers: ["Journalist / Travel", "Sales Director", "Public Relations", "Tech Entrepreneur", "International Trade"],
  },
  6: {
    rulingPlanet: "Venus (Shukra)",
    vibration: "The Nurturing Guardian (संरक्षक)",
    mission: "To uphold family harmony, serve the community, and create environments of aesthetic and moral beauty.",
    strengths: ["Unconditional Care", "Aesthetic Mastery", "Devoted Responsibility", "Protective Heart"],
    challenges: ["Tendency to Over-Control", "Self-Sacrificing to Burnout", "Martyr Complex"],
    careers: ["Doctor / Healer", "Interior Architect", "Social Reformer", "Educator", "Hospitality Management"],
  },
  7: {
    rulingPlanet: "Ketu / Neptune",
    vibration: "The Mystic Truth-Seeker (अन्वेषक)",
    mission: "To investigate life's hidden spiritual and scientific mysteries, seeking ultimate truth over superficial illusion.",
    strengths: ["Profound Intuition", "Analytical Genius", "Spiritual Wisdom", "Philosophical Depth"],
    challenges: ["Isolation & Cynicism", "Overthinking", "Difficulty Expressing Warmth"],
    careers: ["Researcher / Scientist", "Astrologer / Occultist", "Philosopher", "Data Scientist", "Spiritual Guru"],
  },
  8: {
    rulingPlanet: "Saturn (Shani)",
    vibration: "The Powerhouse of Material Mastery (सामर्थ्य)",
    mission: "To master the karmic balance of power, wealth, and authority through ethical leadership and discipline.",
    strengths: ["Master Organizer", "Financial Vision", "Authoritative Command", "Resilience under Fire"],
    challenges: ["Materialistic Preoccupation", "Harsh Expectations", "Fear of Vulnerability"],
    careers: ["CEO / Corporate Titan", "Investment Banker", "Real Estate Mogul", "Judge / Politician", "Industrialist"],
  },
  9: {
    rulingPlanet: "Mars (Mangal)",
    vibration: "The Universal Humanitarian (विश्व कल्याण)",
    mission: "To complete karmic cycles, champion justice, and offer compassionate wisdom to humanity unconditionally.",
    strengths: ["Boundless Compassion", "Visionary Generosity", "Creative Magnetism", "Philosophical Courage"],
    challenges: ["Difficulty Letting Go", "Resentment toward Injustice", "Emotional Turbulence"],
    careers: ["Philanthropist", "International Law", "Environmentalist", "Artist / Humanitarian", "Spiritual Leader"],
  },
};

export function calculateNumerology(name: string, birthDate: string): NumerologyResult {
  // 1. Life Path Number (Sum of all digits in birth date)
  const dateDigits = birthDate.replace(/[^0-9]/g, "");
  const sumDigits = dateDigits.split("").reduce((acc, d) => acc + parseInt(d, 10), 0);
  const lifePath = reduceToSingleDigit(sumDigits);

  // 2. Destiny / Expression Number (Sum of all letters in name using Chaldean system)
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, "");
  let nameSum = 0;
  let vowelsSum = 0;
  let consonantsSum = 0;

  const vowels = new Set(["a", "e", "i", "o", "u"]);

  for (const char of cleanName) {
    const val = CHALDEAN_VALUES[char] || 1;
    nameSum += val;
    if (vowels.has(char)) {
      vowelsSum += val;
    } else {
      consonantsSum += val;
    }
  }

  const destiny = reduceToSingleDigit(nameSum || 1);
  const soulUrge = reduceToSingleDigit(vowelsSum || 1);
  const personality = reduceToSingleDigit(consonantsSum || 1);

  const meta = LIFE_PATH_METAS[lifePath] || LIFE_PATH_METAS[1];

  return {
    fullName: name.trim() || "Seeker",
    birthDate,
    lifePathNumber: lifePath,
    destinyNumber: destiny,
    soulUrgeNumber: soulUrge,
    personalityNumber: personality,
    rulingPlanet: meta.rulingPlanet,
    coreVibration: meta.vibration,
    strengths: meta.strengths,
    challenges: meta.challenges,
    careerAffinities: meta.careers,
    lifeMission: meta.mission,
  };
}
