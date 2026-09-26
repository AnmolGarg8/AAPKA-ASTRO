/**
 * ============================================================================
 * PRODUCTION BUSINESS DATA & CONTENT CONFIGURATION
 * ============================================================================
 * Official data migrated and synchronized from https://aapkaastro.com/
 * Features Acharya Niraj Kumar, authentic credentials, certificates,
 * contact details, services, pricing, and visual assets.
 */

export const PLACEHOLDER_ASTROLOGER = {
  rawName: "Niraj Kumar",
  displayName: "Acharya Niraj Kumar",
  experienceYears: "20+",
  experienceText: "Over 20+ Years of Traditional Vedic & Vastu Mastery",
  followersCount: "15,000+ Consultations",
  tagline: "Where Spiritual Science Meets Corporate Insight",
  bio: "Aapka Astro is led by Acharya Niraj Kumar, a practitioner who brings together deep traditional learning and rare real-world experience. Raised in the spiritually rich ecosystem of Baidyanath Dham, Deoghar, his journey into astrology and Vastu began early, shaped by both curiosity and disciplined guidance. Over the last two decades, he has studied, practiced, and refined his approach across more than 15,000 chart analyses and numerous Vastu consultations. Trained under Late Guru Shri B. B. Tiwari, he holds a Jyotish Acharya from Bhartiya Vidya Bhawan (K.N. Rao Institute), M.A. in Jyotish, Nadi Parveen (ICAS), and Jyotish Prabhakar under Dr. Pawan Sinha. With over two decades in senior corporate leadership roles including Vice President and Business Head at Reliance Retail and Metro Cash & Carry, he translates Vedic wisdom and Vastu from theory into actionable life strategy.",
  avatarUrl: "/images/Acharya_Niraj_Kumar.jpg",
  lineage: "Late Guru Shri B. B. Tiwari • Bhartiya Vidya Bhawan (K.N. Rao Institute) • Dr. Pawan Sinha (IRIW)",
  academicQualifications: [
    "B.Sc. (Hons.) in Physics",
    "PGDBM in International Business & Marketing",
    "Leadership Development & Change Management certification from XLRI",
    "Former Vice President & Business Head at Reliance Retail, Metro Cash & Carry, NIF Food",
  ],
  jyotishCertifications: [
    "Jyotish Acharya from Bhartiya Vidya Bhawan (K.N. Rao Institute)",
    "M.A. in Jyotish (IGNOU, 2024)",
    "Trained under Late Guru Shri B. B. Tiwari",
    "Jyotish Prabhakar (IRIW under Dr. Pawan Sinha)",
    "Nadi Parveen (ICAS - Indian Council of Astrological Sciences)",
    "Jyotish Visharad & Jyotish Mani (Bharat Jyotish Vidyapith)",
    "Advanced Devta Vastu, Energy Vastu & AstroVastu from Divya Vastu and Vaastu Just For You",
  ],
};

// Official Gallery Images & Certificates from https://aapkaastro.com/
export const OFFICIAL_GALLERY_IMAGES = [
  {
    src: "/gallery/with_guruji.jpg",
    alt: "With Guruji",
    caption: "A cherished moment with Guruji — the foundation of our spiritual lineage",
    category: "Heritage",
  },
  {
    src: "/gallery/Jyotish_Acharya_Certificate.png",
    alt: "Jyotish Acharya Certificate",
    caption: "Jyotish Acharya — certified by Bhartiya Vidya Bhawan (K.N. Rao Institute)",
    category: "Credentials",
  },
  {
    src: "/gallery/Vastu_Expert_Certificate.png",
    alt: "Vastu Expert Certificate",
    caption: "Certified Vastu expertise — a mark of formal training and mastery",
    category: "Credentials",
  },
  {
    src: "/gallery/Awards_Receiving.jpg",
    alt: "Awards Receiving",
    caption: "Honoured with prestigious recognition for excellence in Vastu & Astrology",
    category: "Awards",
  },
  {
    src: "/gallery/Getting_Awards.jpg",
    alt: "Getting Awards",
    caption: "Celebrating milestones of dedication and practice",
    category: "Awards",
  },
  {
    src: "/gallery/Getting_Certificates.jpg",
    alt: "Getting Certificates",
    caption: "Receiving certification for advanced proficiency in Jyotish sciences",
    category: "Achievements",
  },
  {
    src: "/gallery/Recognition_Awards.jpg",
    alt: "Recognition Awards",
    caption: "Recognised for impactful contributions to Vastu and Astrology practice",
    category: "Awards",
  },
];

// Admin-editable pricing configuration
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

// Core services
export const CORE_SERVICES = [
  {
    id: "kundli",
    title: "Kundli & Horoscope Reading",
    hindi: "जन्म कुण्डली एवं फलित ज्योतिष",
    description: "Deep insights into your life path, career, and relationships based on your birth chart with ancient mathematical calculations.",
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
    hindi: "वैदिक वास्तु परामर्श (देवता व ऊर्जा वास्तु)",
    description: "Precision Devta Vastu, Energy Vastu, and AstroVastu using non-destructive, non-demolition scientific remedies.",
    highlights: [
      "Micro-zoning & 45 Devta energy flow alignment",
      "Zero-demolition elemental metallic & pyramid corrections",
      "Residential, corporate headquarters & industrial audits",
    ],
    href: "/vastu",
  },
  {
    id: "gemstone",
    title: "Gemstone Recommendation",
    hindi: "रत्न परामर्श एवं प्राण-प्रतिष्ठा",
    description: "Find the authentic gemstone to balance your planetary energies, strengthen beneficial planets, and bring harmony.",
    highlights: [
      "Govt.-certified 100% natural unheated stones",
      "Individualized Vedic consecration (Prana Pratishtha)",
      "Wearing rules, metal choice & muhurat timing",
    ],
    href: "/gemstones",
  },
  {
    id: "live-consultation",
    title: "Live 1-on-1 Consultation",
    hindi: "सीधा व्यक्तिगत परामर्श",
    description: "Real-time chat, voice, or video sessions covering Kundli, Vastu, and Gemstones directly with Acharya Niraj Kumar.",
    highlights: [
      "Direct 1-on-1 private encrypted connection",
      "Audio, video, or real-time text chat",
      "Second-by-second billing with 50% off first session",
    ],
    href: "/consult",
  },
];

// Verified Client Testimonials from https://aapkaastro.com/
export const PLACEHOLDER_TESTIMONIALS = [
  {
    id: "test-1",
    clientName: "Priya Sharma",
    city: "Entrepreneur, New Delhi",
    service: "Kundli & Vastu Suggestions",
    stars: 5,
    text: "I was going through a very tough phase in my career and personal life. The Kundli reading and Vastu suggestions from Aapka Astro were incredibly accurate. Within a few months of following their remedies, I saw a massive positive shift. Highly recommended!",
    verified: true,
  },
  {
    id: "test-2",
    clientName: "Vikramaditya Singhal",
    city: "Managing Director, Gurgaon",
    service: "Commercial Vastu Consultancy",
    stars: 5,
    text: "What makes Acharya Niraj Kumar uniquely effective is his corporate leadership background. He understood our enterprise bottlenecks immediately and applied Devta Vastu micro-zone corrections without breaking a single wall. Productivity and cash flows improved remarkably.",
    verified: true,
  },
  {
    id: "test-3",
    clientName: "Ananya Deshmukh",
    city: "Senior Architect, Mumbai",
    service: "AstroVastu & Residential Audit",
    stars: 5,
    text: "Acharya Niraj Kumar's expertise in Devta Vastu and Energy Vastu goes far beyond conventional directional advice. Grounded in pure science and mathematical precision, zero superstition. An absolute master.",
    verified: true,
  },
  {
    id: "test-4",
    clientName: "Siddharth Malhotra",
    city: "Tech Founder, Bengaluru",
    service: "Career Guidance & Dasha Analysis",
    stars: 5,
    text: "Had a 45-minute live consultation regarding career expansion and investment timing. The planetary Dasha roadmap Acharya Ji predicted materialized precisely. Transparent, calm, and reassuring.",
    verified: true,
  },
  {
    id: "test-5",
    clientName: "Sunita Agarwal",
    city: "Jaipur, Rajasthan",
    service: "Kundli Reading & Gemstones",
    stars: 5,
    text: "The 50% first-session discount made it effortless to connect. The natural Yellow Sapphire prescribed with consecration brought immense mental peace and clarity to our family.",
    verified: true,
  },
];

// Official Contact & Sanctum Information from https://aapkaastro.com/
export const PLACEHOLDER_CONTACT_INFO = {
  email: "ask@aapkaastro.com",
  phone: "+91 931-121-5564",
  phoneRaw: "+919311215564",
  whatsapp: "+91 93112 15564",
  whatsappLink: "https://wa.me/919311215564",
  sanctumCity: "New Delhi NCR & Baidyanath Dham, Deoghar",
  address: "Aapka Astro Consultation Sanctum, New Delhi NCR, India",
  operatingHours: "Monday – Sunday: 7:00 AM – 11:00 PM IST",
};

// Official Social Media Handles from https://aapkaastro.com/
export const PLACEHOLDER_SOCIAL_LINKS = {
  instagram: {
    name: "Instagram",
    url: "https://www.instagram.com/aapkaastrologer/",
    handle: "@aapkaastrologer",
  },
  youtube: {
    name: "YouTube",
    url: "https://www.youtube.com/@aapkaastro7900",
    embedUrl: "https://www.youtube.com/embed/hibDdoH5kbQ?si=1fp_acyv9bs01pLm",
    handle: "@aapkaastro7900",
  },
  facebook: {
    name: "Facebook",
    url: "https://www.facebook.com/aapkaastro",
    handle: "@aapkaastro",
  },
};

