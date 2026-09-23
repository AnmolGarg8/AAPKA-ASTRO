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
  longitude: number; // 0 to 360 (Nirayana / Sidereal)
  rashiNumber: number; // 1 to 12
  rashiName: RashiName;
  degreesInSign: number; // 0 to 30
  degreeFormatted: string; // e.g. 14° 23'
  nakshatra: string;
  nakshatraNumber: number; // 1 to 27
  nakshatraLord: string;
  pada: number; // 1 to 4
  house: number; // 1 to 12
  isRetrograde: boolean; // Vakri
  isCombust: boolean; // Asta
  speed?: number; // degrees per day
  baladiAvastha?: "Bala (Infant)" | "Kumara (Youth)" | "Yuva (Adolescent)" | "Vriddha (Advanced)" | "Mrita (Inert)";
  jagradadiAvastha?: "Jagrat (Awake)" | "Swapna (Dreaming)" | "Sushupti (Deep Sleep)";
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

export interface SookshmadashaItem {
  planet: string;
  hindiName: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface PratyantardashaItem {
  planet: string;
  hindiName: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  sookshmadashas?: SookshmadashaItem[];
}

export interface AntardashaItem {
  planet: string;
  hindiName: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  pratyantardashas?: PratyantardashaItem[];
}

export interface VimshottariDashaItem {
  planet: string;
  hindiName: string;
  durationYears: number;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  antardashas?: AntardashaItem[];
}

export interface DoshaAnalysisResult {
  hasManglik: boolean;
  manglikSeverity: "None" | "Mild (Anshik)" | "Strong (Purna)";
  manglikDetails: string;
  isCancelled?: boolean;
  cancellationReason?: string;
  hasSadeSati: boolean;
  sadeSatiPhase: "None" | "Rising Phase (1st)" | "Peak Phase (2nd)" | "Setting Phase (3rd)";
  sadeSatiDetails: string;
  hasKalsarpa: boolean;
  kalsarpaType: string;
  kalsarpaDetails?: string;
  hasPitraDosha?: boolean;
  pitraDoshaDetails?: string;
}

export type DivisionalChartCode = "D1" | "D2" | "D3" | "D7" | "D9" | "D10" | "D12";

export interface DivisionalPlacement {
  planetName: PlanetName;
  hindiName: string;
  symbol: string;
  rashiNumber: number;
  rashiName: RashiName;
  house: number;
}

export interface DivisionalChartData {
  code: DivisionalChartCode;
  name: string;
  sanskritName: string;
  significance: string;
  houses: {
    houseNumber: number;
    rashiNumber: number;
    rashiName: RashiName;
    planets: DivisionalPlacement[];
  }[];
}

export interface AshtakvargaData {
  // Sarvashtakavarga: total bindus per rashi (1..12), sums to 337
  sarvashtakavarga: Record<number, number>;
  // Bhinnashtakavarga: bindus contributed by each planet across the 12 rashis
  bhinnashtakavarga: Record<string, number[]>;
  favorableHouses: number[]; // houses with > 28 points
  challengingHouses: number[]; // houses with < 28 points
}

export interface ShadbalaPlanetScore {
  planet: PlanetName;
  sthanaBala: number; // Positional
  dikBala: number; // Directional
  kaalaBala: number; // Temporal
  cheshtaBala: number; // Motional
  naisargikaBala: number; // Natural
  drikBala: number; // Aspectual
  totalVirupas: number;
  totalRupas: number;
  requiredRupas: number;
  strengthRatio: number; // total / required
  rank: number;
}

export interface ShadbalaData {
  planets: ShadbalaPlanetScore[];
  strongestPlanet: PlanetName;
  weakestPlanet: PlanetName;
}

export interface KpPlanetInfo {
  name: string;
  hindiName: string;
  longitude: number;
  formattedDegree: string;
  sign: string;
  signLord: string;
  star: string;
  starLord: string;
  subLord: string;
  subSubLord: string;
  house: number;
  isRetrograde: boolean;
}

export interface KpHouseCusp {
  houseNumber: number;
  longitude: number;
  formattedDegree: string;
  sign: string;
  signLord: string;
  star: string;
  starLord: string;
  subLord: string;
  subSubLord: string;
}

export interface KpSystemData {
  ayanamsaName: string;
  ayanamsaValue: number;
  houses: KpHouseCusp[];
  planets: KpPlanetInfo[];
}

export interface KundliData {
  name: string;
  gender: "male" | "female" | "other";
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  birthPlace: string;
  latitude: number;
  longitude: number;
  timezone: number;
  ayanamsa: number;
  ascendant: PlanetPosition;
  planets: PlanetPosition[];
  houses: HouseInfo[];
  dashas: VimshottariDashaItem[];
  doshas: DoshaAnalysisResult;
  divisionalCharts?: Record<DivisionalChartCode, DivisionalChartData>;
  ashtakvarga?: AshtakvargaData;
  shadbala?: ShadbalaData;
  kpSystem?: KpSystemData;
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
  manglikMatch: {
    boyManglik: boolean;
    girlManglik: boolean;
    compatible: boolean;
    verdict: string;
  };
  recommendations: string;
}
