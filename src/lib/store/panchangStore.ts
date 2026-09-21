export interface DailyPanchang {
  date: string;
  samvat: string;
  ritu: string;
  ayana: string;
  city: string;
  tithi: {
    name: string;
    paksha: "Shukla Paksha" | "Krishna Paksha";
    endsAt: string;
    nextTithi: string;
  };
  nakshatra: {
    name: string;
    pada: number;
    endsAt: string;
    lord: string;
  };
  yoga: {
    name: string;
    endsAt: string;
  };
  karana: {
    name: string;
    endsAt: string;
  };
  vaar: string;
  sunTimes: {
    sunrise: string;
    sunset: string;
  };
  moonTimes: {
    moonrise: string;
    moonset: string;
    moonSign: string;
  };
  auspiciousTimings: {
    abhijitMuhurat: string;
    amritKaal: string;
    brahmaMuhurat: string;
    vijayaMuhurat: string;
  };
  inauspiciousTimings: {
    rahuKaal: string;
    yamaganda: string;
    gulikaKaal: string;
    durMuhurat: string;
  };
  specialSignificance: string;
}

export const CITIES_LIST = [
  { id: "delhi", name: "New Delhi", state: "Delhi NCR" },
  { id: "varanasi", name: "Varanasi (Kashi)", state: "Uttar Pradesh" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra" },
  { id: "bengaluru", name: "Bengaluru", state: "Karnataka" },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan" },
  { id: "kolkata", name: "Kolkata", state: "West Bengal" },
];

export const getPanchangForCity = (cityId: string = "delhi"): DailyPanchang => {
  const cityName = CITIES_LIST.find((c) => c.id === cityId)?.name || "New Delhi";

  return {
    date: new Date().toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    samvat: "Vikram Samvat 2083 (Pingala) / Shaka 1948",
    ritu: "Sharad (Autumn)",
    ayana: "Dakshinayana",
    city: cityName,
    tithi: {
      name: "Ekadashi",
      paksha: "Shukla Paksha",
      endsAt: "03:42 PM, Sep 22",
      nextTithi: "Dwadashi",
    },
    nakshatra: {
      name: "Rohini",
      pada: 2,
      endsAt: "06:14 PM",
      lord: "Chandra (Moon)",
    },
    yoga: {
      name: "Sobhana",
      endsAt: "08:25 PM",
    },
    karana: {
      name: "Vanija",
      endsAt: "03:42 PM",
    },
    vaar: "Somavara (Monday - Ruled by Moon)",
    sunTimes: {
      sunrise: "06:10 AM",
      sunset: "06:22 PM",
    },
    moonTimes: {
      moonrise: "02:30 PM",
      moonset: "02:10 AM",
      moonSign: "Vrishabha (Taurus - Exalted Moon)",
    },
    auspiciousTimings: {
      abhijitMuhurat: "11:51 AM – 12:41 PM",
      amritKaal: "08:45 AM – 10:20 AM",
      brahmaMuhurat: "04:32 AM – 05:21 AM",
      vijayaMuhurat: "02:15 PM – 03:05 PM",
    },
    inauspiciousTimings: {
      rahuKaal: "07:42 AM – 09:14 AM (Avoid new ventures)",
      yamaganda: "10:45 AM – 12:17 PM",
      gulikaKaal: "01:48 PM – 03:20 PM",
      durMuhurat: "12:41 PM – 01:31 PM",
    },
    specialSignificance:
      "Auspicious day for Shiva puja, Somavara Vrat, and embarking on educational or property investments during Abhijit Muhurat.",
  };
};
