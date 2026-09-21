// Vedic Ephemeris & Astronomical Calculation Engine
// Implements Meeus astronomical algorithms with Lahiri (Chitra Paksha) Ayanamsa for Sidereal Vedic Astrology

export const RASHI_NAMES: { [key: number]: { en: string; hi: string; lord: string } } = {
  1: { en: "Aries", hi: "मेष (Mesh)", lord: "Mars" },
  2: { en: "Taurus", hi: "वृषभ (Vrishabha)", lord: "Venus" },
  3: { en: "Gemini", hi: "मिथुन (Mithun)", lord: "Mercury" },
  4: { en: "Cancer", hi: "कर्क (Kark)", lord: "Moon" },
  5: { en: "Leo", hi: "सिंह (Simha)", lord: "Sun" },
  6: { en: "Virgo", hi: "कन्या (Kanya)", lord: "Mercury" },
  7: { en: "Libra", hi: "तुला (Tula)", lord: "Venus" },
  8: { en: "Scorpio", hi: "वृश्चिक (Vrishchik)", lord: "Mars" },
  9: { en: "Sagittarius", hi: "धनु (Dhanu)", lord: "Jupiter" },
  10: { en: "Capricorn", hi: "मकर (Makar)", lord: "Saturn" },
  11: { en: "Aquarius", hi: "कुम्भ (Kumbha)", lord: "Saturn" },
  12: { en: "Pisces", hi: "मीन (Meen)", lord: "Jupiter" },
};

export const NAKSHATRAS = [
  { name: "Ashwini", lord: "Ketu", deity: "Ashwini Kumaras" },
  { name: "Bharani", lord: "Venus", deity: "Yama" },
  { name: "Krittika", lord: "Sun", deity: "Agni" },
  { name: "Rohini", lord: "Moon", deity: "Brahma" },
  { name: "Mrigashira", lord: "Mars", deity: "Soma" },
  { name: "Ardra", lord: "Rahu", deity: "Rudra" },
  { name: "Punarvasu", lord: "Jupiter", deity: "Aditi" },
  { name: "Pushya", lord: "Saturn", deity: "Brihaspati" },
  { name: "Ashlesha", lord: "Mercury", deity: "Nagas" },
  { name: "Magha", lord: "Ketu", deity: "Pitris" },
  { name: "Purva Phalguni", lord: "Venus", deity: "Bhaga" },
  { name: "Uttara Phalguni", lord: "Sun", deity: "Aryaman" },
  { name: "Hasta", lord: "Moon", deity: "Savitar" },
  { name: "Chitra", lord: "Mars", deity: "Tvashtar" },
  { name: "Swati", lord: "Rahu", deity: "Vayu" },
  { name: "Vishakha", lord: "Jupiter", deity: "Indragni" },
  { name: "Anuradha", lord: "Saturn", deity: "Mitra" },
  { name: "Jyeshtha", lord: "Mercury", deity: "Indra" },
  { name: "Mula", lord: "Ketu", deity: "Nirriti" },
  { name: "Purva Ashadha", lord: "Venus", deity: "Apas" },
  { name: "Uttara Ashadha", lord: "Sun", deity: "Vishwadevas" },
  { name: "Shravana", lord: "Moon", deity: "Vishnu" },
  { name: "Dhanishta", lord: "Mars", deity: "Vasus" },
  { name: "Shatabhisha", lord: "Rahu", deity: "Varuna" },
  { name: "Purva Bhadrapada", lord: "Jupiter", deity: "Aja Ekapada" },
  { name: "Uttara Bhadrapada", lord: "Saturn", deity: "Ahirbudhnya" },
  { name: "Revati", lord: "Mercury", deity: "Pushan" },
];

export const VIMSHOTTARI_LORDS_ORDER = [
  { lord: "Ketu", hindi: "केतु", years: 7 },
  { lord: "Venus", hindi: "शुक्र", years: 20 },
  { lord: "Sun", hindi: "सूर्य", years: 6 },
  { lord: "Moon", hindi: "चन्द्र", years: 10 },
  { lord: "Mars", hindi: "मंगल", years: 7 },
  { lord: "Rahu", hindi: "राहु", years: 18 },
  { lord: "Jupiter", hindi: "बृहस्पति", years: 16 },
  { lord: "Saturn", hindi: "शनि", years: 19 },
  { lord: "Mercury", hindi: "बुध", years: 17 },
];

// Helper: Normalize angle to 0..360
export function normalize360(deg: number): number {
  let v = deg % 360;
  if (v < 0) v += 360;
  return v;
}

// Convert Degrees to Radians
export function degToRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

// Convert Radians to Degrees
export function radToDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

// Calculate Julian Day Number from Gregorian Date and UTC decimal hour
export function getJulianDay(year: number, month: number, day: number, utcHour: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD =
    Math.floor(365.25 * (year + 4716)) +
    Math.floor(30.6001 * (month + 1)) +
    day +
    utcHour / 24.0 +
    B -
    1524.5;
  return JD;
}

// Lahiri (Chitra Paksha) Ayanamsa calculation
export function getLahiriAyanamsa(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0; // Julian centuries from J2000.0
  // Standard Lahiri formula: ~23.856° at J2000 with 50.29" precession per year
  const ayanamsa = 23.85611 + 1.396042 * T + 0.000308 * T * T;
  return ayanamsa;
}

// Greenwich Mean Sidereal Time (GMST) in degrees
export function getGMST(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  let gmst =
    280.46061837 +
    360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T -
    (T * T * T) / 38710000.0;
  return normalize360(gmst);
}

// Ascendant (Lagna) Calculation
export function getAscendant(
  jd: number,
  latitude: number,
  longitude: number,
  ayanamsa: number
): number {
  const gmst = getGMST(jd);
  const lmst = normalize360(gmst + longitude); // Local Mean Sidereal Time in degrees
  const T = (jd - 2451545.0) / 36525.0;
  const obliquity = 23.439291 - 0.0130042 * T; // True obliquity of ecliptic

  const thetaRad = degToRad(lmst);
  const epsRad = degToRad(obliquity);
  const phiRad = degToRad(latitude);

  const y = -Math.cos(thetaRad);
  const x = Math.sin(thetaRad) * Math.cos(epsRad) + Math.tan(phiRad) * Math.sin(epsRad);

  let tropicalAsc = radToDeg(Math.atan2(y, x));
  tropicalAsc = normalize360(tropicalAsc + 90);

  // Convert to Sidereal (Nirayana) Ascendant
  const siderealAsc = normalize360(tropicalAsc - ayanamsa);
  return siderealAsc;
}

// Meeus Solar coordinates
export function getSunLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  const L0 = normalize360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  const M = normalize360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const M_rad = degToRad(M);

  const C =
    (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M_rad) +
    (0.019993 - 0.000101 * T) * Math.sin(2 * M_rad) +
    0.000289 * Math.sin(3 * M_rad);

  return normalize360(L0 + C);
}

// Meeus Lunar coordinates
export function getMoonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  const L_prime = normalize360(218.3164477 + 481267.88123421 * T);
  const D = normalize360(297.8501921 + 445267.1114034 * T);
  const M = normalize360(357.5291092 + 35999.0502909 * T);
  const M_prime = normalize360(134.9633964 + 477198.8675055 * T);
  const F = normalize360(93.272095 + 483202.0175233 * T);

  const lMoon =
    L_prime +
    6.288774 * Math.sin(degToRad(M_prime)) +
    1.274027 * Math.sin(degToRad(2 * D - M_prime)) +
    0.658314 * Math.sin(degToRad(2 * D)) +
    0.213618 * Math.sin(degToRad(2 * M_prime)) -
    0.185116 * Math.sin(degToRad(M)) -
    0.114332 * Math.sin(degToRad(2 * F));

  return normalize360(lMoon);
}

// Rahu (Mean Lunar Ascending Node)
export function getRahuLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;
  const omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T;
  return normalize360(omega);
}

// Keplerian orbit positions for major planets
function getPlanetMeanElements(jd: number, a: number, e: number, i: number, L: number, varpi: number, omega: number, rates: number[]) {
  const T = (jd - 2451545.0) / 36525.0;
  const meanL = normalize360(L + rates[0] * T);
  const meanVarpi = normalize360(varpi + rates[1] * T);
  const M = normalize360(meanL - meanVarpi);
  const M_rad = degToRad(M);

  // Equation of center approx
  const eqCenter = (2 * e - (e ** 3) / 4) * Math.sin(M_rad) + (5 / 4) * (e ** 2) * Math.sin(2 * M_rad);
  const trueAnomaly = M + radToDeg(eqCenter);
  const trueLong = normalize360(trueAnomaly + meanVarpi);
  return trueLong;
}

export function getMarsLongitude(jd: number): number {
  return getPlanetMeanElements(jd, 1.523662, 0.09341233, 1.85061, 355.45332, 336.04084, 49.5574, [19140.302684, 1.84105]);
}

export function getMercuryLongitude(jd: number): number {
  return getPlanetMeanElements(jd, 0.387098, 0.20563069, 7.00487, 252.25032, 77.45645, 48.33167, [149472.674111, 1.556477]);
}

export function getJupiterLongitude(jd: number): number {
  return getPlanetMeanElements(jd, 5.203363, 0.04839266, 1.3053, 34.40438, 14.75385, 100.55615, [3034.746128, 1.61933]);
}

export function getVenusLongitude(jd: number): number {
  return getPlanetMeanElements(jd, 0.723332, 0.00677323, 3.39471, 181.9798, 131.53298, 76.68069, [58517.815387, 1.40222]);
}

export function getSaturnLongitude(jd: number): number {
  return getPlanetMeanElements(jd, 9.53707, 0.0541506, 2.48446, 49.94424, 92.43194, 113.6634, [1222.49362, 1.9637]);
}
