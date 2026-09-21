/**
 * ============================================================================
 * PLACEHOLDER CONTENT CONFIGURATION
 * ============================================================================
 * All placeholder texts, astrologer details, core services, pricing,
 * testimonials, and social links are centralized here.
 *
 * NOTE: Replace these values with verified production business data when ready.
 */

// {/* PLACEHOLDER: replace with real content */}
export const PLACEHOLDER_ASTROLOGER = {
  rawName: "[ASTROLOGER NAME]",
  displayName: "Acharya [ASTROLOGER NAME]",
  experienceYears: "[X]",
  experienceText: "Over [X] years of Vedic experience",
  followersCount: "26,000+",
  tagline: "Your Trusted Guide to Astrology, Vastu & Gemstone Wisdom",
  bio: "With over [X] years of experience in Vedic astrology, Vastu Shastra, and gemstone science, Acharya [ASTROLOGER NAME] has guided thousands of clients toward clarity, balance, and prosperity. Trained in the traditional Vedic sciences and trusted by a growing community of over 26,000 followers, [ASTROLOGER NAME] combines ancient wisdom with a warm, personal approach to every consultation.",
  avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
};

// {/* PLACEHOLDER: replace with real content */}
// Admin-editable pricing configuration (do NOT hardcode in UI components)
export interface PricingTier {
  type: "chat" | "voice" | "video";
  label: string;
  ratePerMinute: number;
  currency: string;
  discountPercentage: number;
  effectiveFirstTimeRate: number;
  unit: string;
}

export const ADMIN_CONFIGURABLE_PRICING: Record<"chat" | "voice" | "video", PricingTier> = {
  chat: {
    type: "chat",
    label: "Live Chat Consultation",
    ratePerMinute: 15,
    currency: "₹",
    discountPercentage: 50,
    effectiveFirstTimeRate: 7.5, // 50% off for first consultation
    unit: "min",
  },
  voice: {
    type: "voice",
    label: "Voice Call Consultation",
    ratePerMinute: 20,
    currency: "₹",
    discountPercentage: 50,
    effectiveFirstTimeRate: 10, // 50% off for first consultation
    unit: "min",
  },
  video: {
    type: "video",
    label: "Video Call Consultation",
    ratePerMinute: 25,
    currency: "₹",
    discountPercentage: 50,
    effectiveFirstTimeRate: 12.5, // 50% off for first consultation
    unit: "min",
  },
};

export const FIRST_CONSULTATION_OFFER = {
  discountPercentage: 50,
  code: "FIRST50",
  description: "First consultation: 50% off (auto-applied once per user)",
};

// {/* PLACEHOLDER: replace with real content */}
// Core services (equal focus, four categories)
export const CORE_SERVICES = [
  {
    id: "kundli",
    title: "Kundli & Horoscope Reading",
    hindi: "जन्म कुण्डली एवं फलित ज्योतिष",
    description: "Birth chart analysis, life predictions, and dosha identification with authentic Vedic precision.",
    highlights: [
      "Lagna & planetary degrees calculation",
      "Vimshottari Dasha timing & life roadmap",
      "Manglik, Sade Sati & Kaal Sarp analysis",
    ],
    href: "/kundli",
  },
  {
    id: "vastu",
    title: "Vastu Consultancy",
    hindi: "वैदिक वास्तु परामर्श",
    description: "Home and workspace energy alignment for prosperity and peace using non-demolition scientific remedies.",
    highlights: [
      "Directional energy flow (Ishanya/Agni/Nairutya)",
      "Zero-demolition metallic & pyramid corrections",
      "Residential, corporate & factory audits",
    ],
    href: "/vastu",
  },
  {
    id: "gemstone",
    title: "Gemstone Recommendation",
    hindi: "रत्न परामर्श एवं प्राण-प्रतिष्ठा",
    description: "Personalized gemstone guidance based on planetary positions, Shadbala, and Lagna Lord strength.",
    highlights: [
      "Govt.-certified 100% natural stones",
      "Individualized Vedic consecration (Prana Pratishtha)",
      "Wearing rules, metal choice & muhurat timing",
    ],
    href: "/gemstones",
  },
  {
    id: "live-consultation",
    title: "Live Consultation",
    hindi: "सीधा व्यक्तिगत परामर्श",
    description: "Real-time chat, voice, or video sessions covering any of the above with Acharya [ASTROLOGER NAME].",
    highlights: [
      "Live 1-on-1 private encrypted connection",
      "Audio, video, or real-time text chat",
      "Second-by-second billing with 50% off first session",
    ],
    href: "/consult",
  },
];

// {/* PLACEHOLDER: replace with real content */}
// 4–5 realistic placeholder testimonials (Indian names, varied services)
export const PLACEHOLDER_TESTIMONIALS = [
  {
    id: "test-1",
    clientName: "Pooja Deshmukh",
    city: "Pune, Maharashtra",
    service: "Kundli & Horoscope Reading",
    stars: 5,
    text: "The Janam Kundli analysis by Acharya [ASTROLOGER NAME] was astonishingly precise. The timeline given for my job transition matched the exact month of my promotion. Truly enlightened Vedic guidance!",
    verified: true,
  },
  {
    id: "test-2",
    clientName: "Vikram Singhania",
    city: "Indore, Madhya Pradesh",
    service: "Vastu Consultancy",
    stars: 5,
    text: "We were facing continuous business stagnation at our corporate office. Acharya [ASTROLOGER NAME] suggested simple non-demolition directional adjustments in the North-East zone. Within 90 days, cash flow turned around.",
    verified: true,
  },
  {
    id: "test-3",
    clientName: "Ananya Iyer",
    city: "Bengaluru, Karnataka",
    service: "Gemstone Recommendation",
    stars: 5,
    text: "I was prescribed a natural Yellow Sapphire (Pukhraj) after careful Lagna verification. The stone arrived fully consecrated with a lab certificate. My mental clarity and decision-making have improved immensely.",
    verified: true,
  },
  {
    id: "test-4",
    clientName: "Siddharth Malhotra",
    city: "New Delhi",
    service: "Live Chat Session",
    stars: 5,
    text: "Had a 20-minute live chat consultation regarding relationship compatibility. Acharya Ji listened patiently, answered every doubt, and explained the remedies simply without inducing any fear. Highly recommended!",
    verified: true,
  },
  {
    id: "test-5",
    clientName: "Sunita Agarwal",
    city: "Jaipur, Rajasthan",
    service: "Voice Call Consultation",
    stars: 5,
    text: "The 50% discount on the first consultation made it effortless to try. The depth of Acharya Ji's knowledge and the calm, reassuring demeanor left a lasting impression on our family.",
    verified: true,
  },
];

// {/* PLACEHOLDER: replace with real content */}
// Social links: placeholder URLs (real handles will be provided later)
export const PLACEHOLDER_SOCIAL_LINKS = {
  // NOTE: Real social media handles will be provided later by the business owner.
  instagram: {
    name: "Instagram",
    url: "https://instagram.com/aapkaastro.official", // PLACEHOLDER: replace with real handle later
    handle: "@aapkaastro.official",
  },
  youtube: {
    name: "YouTube",
    url: "https://youtube.com/@aapkaastro", // PLACEHOLDER: replace with real handle later
    handle: "@aapkaastro",
  },
  facebook: {
    name: "Facebook",
    url: "https://facebook.com/aapkaastro", // PLACEHOLDER: replace with real handle later
    handle: "Aapka Astro Official",
  },
};
