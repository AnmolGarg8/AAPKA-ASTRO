export type PlanetName =
  | "Sun"
  | "Moon"
  | "Mars"
  | "Mercury"
  | "Jupiter"
  | "Venus"
  | "Saturn"
  | "Rahu"
  | "Ketu"
  | "Ascendant";

export type RashiName =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

export interface PlanetPosition {
  name: PlanetName;
  hindiName: string;
  symbol: string;
  longitude: number; // 0 to 360
  rashiNumber: number; // 1 to 12
  rashiName: RashiName;
  degreesInSign: number; // 0 to 30
  degreeFormatted: string; // e.g. 14° 23'
  nakshatra: string;
  nakshatraNumber: number; // 1 to 27
  nakshatraLord: string;
  pada: number; // 1 to 4
  house: number; // 1 to 12
  isRetrograde: boolean;
  navamshaSignNumber: number; // 1 to 12
  dignity: "Exalted" | "Mooltrikona" | "Own Sign" | "Friendly" | "Neutral" | "Enemy" | "Debilitated";
}

export interface HouseInfo {
  houseNumber: number;
  rashiNumber: number;
  rashiName: RashiName;
  signLord: PlanetName;
  planets: PlanetPosition[];
}

export interface VimshottariDashaItem {
  planet: string;
  hindiName: string;
  durationYears: number;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface DoshaAnalysisResult {
  hasManglik: boolean;
  manglikSeverity: "None" | "Mild (Anshik)" | "Strong (Purna)";
  manglikDetails: string;
  hasSadeSati: boolean;
  sadeSatiPhase: "None" | "Rising Phase (1st)" | "Peak Phase (2nd)" | "Setting Phase (3rd)";
  sadeSatiDetails: string;
  hasKalsarpa: boolean;
  kalsarpaType: string;
}

export interface KundliData {
  name: string;
  gender: "male" | "female" | "other";
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:MM
  birthPlace: string;
  latitude: number;
  longitude: number;
  timezone: number;
  ayanamsa: number; // Lahiri Ayanamsa degrees
  ascendant: PlanetPosition;
  planets: PlanetPosition[];
  houses: HouseInfo[];
  dashas: VimshottariDashaItem[];
  doshas: DoshaAnalysisResult;
  sunSign: RashiName;
  moonSign: RashiName;
  nakshatra: string;
  charanPada: number;
  luckyGemstone: string;
  luckyColor: string;
  luckyNumber: number;
  favorableDeity: string;
}

export interface GunMilanResult {
  boyName: string;
  girlName: string;
  totalScore: number; // Max 36
  maxScore: 36;
  percentage: number;
  verdict: "Excellent Match" | "Good Match" | "Average Match" | "Inauspicious / Not Recommended";
  varna: { points: number; maxPoints: 1; description: string };
  vashya: { points: number; maxPoints: 2; description: string };
  tara: { points: number; maxPoints: 3; description: string };
  yoni: { points: number; maxPoints: 4; description: string };
  grahaMaitri: { points: number; maxPoints: 5; description: string };
  gana: { points: number; maxPoints: 6; description: string };
  bhakoot: { points: number; maxPoints: 7; description: string };
  nadi: { points: number; maxPoints: 8; description: string };
  nadiDosha: boolean;
  bhakootDosha: boolean;
  recommendations: string;
}
