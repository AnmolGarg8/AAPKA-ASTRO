/**
 * ============================================================================
 * BILINGUAL TRANSLATION DICTIONARY (ENGLISH / HINDI)
 * ============================================================================
 * Key conversion UI strings, navigation, presence status, and consultation prompts.
 */

export type Language = "en" | "hi";

export const TRANSLATIONS = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_services: "Services",
    nav_live_consult: "Live Consult",
    nav_kundli: "Kundli Generator",
    nav_matching: "Kundli Matching",
    nav_horoscope: "Daily Horoscope",
    nav_panchang: "Daily Panchang",
    nav_reels: "Reels",
    nav_blog: "Blog",
    nav_my_account: "My Account",
    nav_sign_in: "Sign In",
    nav_top_up: "+ Top up",

    // Presence & Status
    status_online: "Acharya Ji is Online (Available for Chat / Call)",
    status_busy: "In Consultation (Waiting Queue Open)",
    status_break: "On a Sacred Break",
    status_offline: "Offline (Request Callback)",
    status_est_wait: "Est. wait:",
    status_mins: "mins",
    status_talk_now: "Talk to Acharya Ji Now",
    status_notify_me: "Request Callback / Notify Me",

    // Hero Section
    hero_badge: "AUTHENTIC VEDIC SCIENCE • NO MARKETPLACE GIMMICKS",
    hero_title_1: "Direct Guidance with",
    hero_title_2: "Acharya Niraj Kumar",
    hero_tagline:
      "Vedic Jyotish, Devta Vastu Audits & Certified Gemstones from a Fortune-50 VP turned Bhartiya Vidya Bhawan Jyotish Acharya.",
    hero_cta_consult: "Consult Acharya Ji Live",
    hero_cta_kundli: "Free Janam Kundli",
    hero_offer_banner: "50% Discount on Your First Consultation",

    // Services
    services_heading: "Our Sacred Offerings",
    services_subheading:
      "Every consultation is conducted directly with Acharya Niraj Kumar, rooted in authentic Parashari shastras and practical remedies.",
    service_kundli_title: "Janam Kundli Reading",
    service_vastu_title: "Devta & Energy Vastu",
    service_gemstones_title: "Certified Natural Gemstones",
    service_consult_title: "1-on-1 Live Guidance",

    // Horoscope & Panchang
    horoscope_title: "Daily Vedic Horoscope",
    horoscope_subtitle: "Accurate planetary Gochara predictions for all 12 Rashis",
    panchang_title: "Today's Vedic Panchang",
    panchang_subtitle: "Five limbs of time: Tithi, Nakshatra, Yoga, Karana & Vara",

    // Matchmaking
    match_title: "36-Guna Kundli Matching",
    match_subtitle: "Ashtakoot Milan for marital harmony, Nadi & Bhakoot dosha review",

    // Footer & Trust
    footer_guarantee: "100% Confidential. Shastra-grounded remedies. Zero fear tactics.",
    all_rights_reserved: "All rights reserved. Aapka Astro.",
  },
  hi: {
    // Navigation
    nav_home: "मुख्य पृष्ठ",
    nav_services: "सेवाएं",
    nav_live_consult: "लाइव परामर्श",
    nav_kundli: "जन्म कुण्डली",
    nav_matching: "गुण मिलान",
    nav_horoscope: "दैनिक राशिफल",
    nav_panchang: "दैनिक पंचांग",
    nav_reels: "वीडियो रील्स",
    nav_blog: "ज्योतिष आलेख",
    nav_my_account: "मेरा खाता",
    nav_sign_in: "लॉगिन करें",
    nav_top_up: "+ रीचार्ज",

    // Presence & Status
    status_online: "आचार्य जी ऑनलाइन हैं (चैट / कॉल हेतु उपलब्ध)",
    status_busy: "परामर्श में व्यस्त (प्रतीक्षा पंक्ति खुली है)",
    status_break: "लघु विश्राम पर",
    status_offline: "ऑफ़लाइन (कॉल-बैक अनुरोध भेजें)",
    status_est_wait: "अनुमानित समय:",
    status_mins: "मिनट",
    status_talk_now: "आचार्य जी से अभी बात करें",
    status_notify_me: "कॉल-बैक अनुरोध भेजें",

    // Hero Section
    hero_badge: "प्रामाणिक वैदिक ज्योतिष • कोई बाज़ारू आडंबर नहीं",
    hero_title_1: "प्रत्यक्ष वैदिक मार्गदर्शन",
    hero_title_2: "आचार्य नीरज कुमार जी के साथ",
    hero_tagline:
      "रिलायंस रिटेल के पूर्व उपाध्यक्ष और भारतीय विद्या भवन के ज्योतिष आचार्य द्वारा व्यक्तिगत कुण्डली, वास्तु एवं सटीक रत्न परामर्श।",
    hero_cta_consult: "आचार्य जी से परामर्श लें",
    hero_cta_kundli: "मुफ़्त जन्म कुण्डली बनाएं",
    hero_offer_banner: "प्रथम परामर्श पर 50% विशेष छूट उपलब्ध",

    // Services
    services_heading: "हमारी प्रमुख वैदिक सेवाएं",
    services_subheading:
      "प्रत्येक परामर्श सीधे आचार्य नीरज कुमार जी द्वारा प्राचीन पाराशरी सूत्रों व सात्विक उपायों के साथ दिया जाता है।",
    service_kundli_title: "सटीक जन्म कुण्डली विश्लेषण",
    service_vastu_title: "देवता व ऊर्जा वास्तु परामर्श",
    service_gemstones_title: "लैब-प्रमाणित प्राकृतिक रत्न",
    service_consult_title: "1-ऑन-1 प्रत्यक्ष परामर्श",

    // Horoscope & Panchang
    horoscope_title: "दैनिक वैदिक राशिफल",
    horoscope_subtitle: "समस्त 12 राशियों का गोचर आधारित सम्पूर्ण भविष्यफल",
    panchang_title: "आज का वैदिक पंचांग",
    panchang_subtitle: "समय के पांच मुख्य अंग: तिथि, नक्षत्र, योग, करण एवं वार",

    // Matchmaking
    match_title: "36-गुण कुण्डली मिलान",
    match_subtitle: "सुखद वैवाहिक जीवन हेतु अष्टकूट मिलान, नाड़ी व भकूट दोष विश्लेषण",

    // Footer & Trust
    footer_guarantee: "100% गोपनीय व प्रामाणिक। शास्त्र-सम्मत सात्विक उपाय। भयमुक्त मार्गदर्शन।",
    all_rights_reserved: "सर्वाधिकार सुरक्षित। आपका एस्ट्रो।",
  },
};

export type TranslationKey = keyof typeof TRANSLATIONS.en;
