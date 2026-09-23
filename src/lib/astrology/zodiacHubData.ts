/**
 * ============================================================================
 * EVERGREEN ZODIAC SIGNS ENCYCLOPEDIC HUB DATA
 * ============================================================================
 * High-authority evergreen SEO content for /zodiac-signs and /zodiac-signs/[sign].
 * Covers classical Vedic & Western synthesis:
 * - General Characteristics, Mindset, and Demeanor
 * - Love & Romance Compatibility (Best, Moderate, Incompatible)
 * - Career, Wealth & Professional Strengths
 * - Health, Vitality & Physical Predispositions
 * - Auspicious Symbols, Ruling Grahas, Elements, Gemstones, Mantras
 */

export interface ZodiacSignEvergreen {
  slug: string;
  name: string;
  vedicName: string; // Sanskrit Rashi Name
  symbol: string;
  glyph: string;
  dateRange: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Cardinal (Chara)" | "Fixed (Sthira)" | "Mutable (Dwisvabhava)";
  rulingPlanet: string;
  rulingGrahaHindi: string;
  vedicLord: string;
  luckyGemstone: string;
  luckyColors: string[];
  luckyNumbers: number[];
  luckyDays: string[];
  ishtaDeity: string;
  tagline: string;
  overview: string;
  personality: {
    strengths: string[];
    weaknesses: string[];
    summary: string;
  };
  loveCompatibility: {
    bestMatches: string[];
    challengingMatches: string[];
    summary: string;
  };
  careerAndWealth: {
    idealCareers: string[];
    moneyAttitude: string;
    leadershipStyle: string;
  };
  healthAndVitality: {
    rulingBodyParts: string;
    healthTips: string;
  };
  vedicVsWestern: string;
  sacredMantra: string;
}

export const ZODIAC_SIGNS_EVERGREEN: ZodiacSignEvergreen[] = [
  {
    slug: "aries",
    name: "Aries",
    vedicName: "Mesha (मेष)",
    symbol: "The Ram",
    glyph: "♈",
    dateRange: "March 21 – April 19",
    element: "Fire",
    modality: "Cardinal (Chara)",
    rulingPlanet: "Mars (Mangal)",
    rulingGrahaHindi: "मंगल ग्रह",
    vedicLord: "Mars",
    luckyGemstone: "Red Coral (Moonga)",
    luckyColors: ["Crimson Red", "Saffron", "Golden Yellow"],
    luckyNumbers: [9, 1, 18],
    luckyDays: ["Tuesday", "Sunday"],
    ishtaDeity: "Lord Hanuman / Kartikeya",
    tagline: "The Fearless Trailblazer of the Zodiac",
    overview:
      "Aries is the first sign of the zodiac, symbolizing birth, raw vital force, and the unstoppable urge to initiate. Ruled by Mars (Mangal), the celestial commander, Arians possess heroic courage, direct honesty, and an adventurous spirit that inspires everyone around them.",
    personality: {
      strengths: ["Bold Initiative", "Unshakable Courage", "Honest & Direct", "Enthusiastic Pioneer"],
      weaknesses: ["Impatience", "Short Temper", "Difficulty Delegating", "Reckless Spending"],
      summary:
        "Arians meet life head-on with zero hesitation. They dislike bureaucratic delays and thrive in dynamic environments where rapid decision-making is celebrated. While their passion can occasionally flare into temper, they harbor no lingering grudges.",
    },
    loveCompatibility: {
      bestMatches: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
      challengingMatches: ["Cancer", "Capricorn"],
      summary:
        "In romance, Aries craves excitement, unfiltered authenticity, and mutual admiration. They need an equally self-assured partner who matches their high energy without attempting to cage their independence.",
    },
    careerAndWealth: {
      idealCareers: ["Entrepreneurship", "Defense & Military", "Surgery & Medicine", "Sports & Athletics", "Executive Leadership"],
      moneyAttitude: "Generous and bold risk-taker. Prefers reinvesting capital into new ventures over passive hoarding.",
      leadershipStyle: "Leads by personal example from the frontline rather than from an isolated boardroom.",
    },
    healthAndVitality: {
      rulingBodyParts: "Head, brain, facial muscles, and blood vitality.",
      healthTips: "Prone to headaches, eye strain, and minor burns. Practice cooling Pranayama (Sheetali) and stay hydrated to balance excess Pitta fire.",
    },
    vedicVsWestern:
      "Western astrology tracks Aries along the tropical vernal equinox. In Vedic sidereal astrology (Lahiri Ayanamsa), the Sun transits Mesha approximately from April 14 to May 14, where it attains its highest astrological dignity (Param Uchcha).",
    sacredMantra: "Om Kram Kreem Kroum Sah Bhaumaya Namah (ॐ क्रां क्रीं क्रौं सः भौमाय नमः)",
  },
  {
    slug: "taurus",
    name: "Taurus",
    vedicName: "Vrishabha (वृषभ)",
    symbol: "The Bull",
    glyph: "♉",
    dateRange: "April 20 – May 20",
    element: "Earth",
    modality: "Fixed (Sthira)",
    rulingPlanet: "Venus (Shukra)",
    rulingGrahaHindi: "शुक्र ग्रह",
    vedicLord: "Venus",
    luckyGemstone: "Diamond or White Sapphire",
    luckyColors: ["Emerald Green", "Silk White", "Pastel Pink"],
    luckyNumbers: [6, 2, 15],
    luckyDays: ["Friday", "Monday"],
    ishtaDeity: "Maa Lakshmi",
    tagline: "The Steadfast Guardian of Beauty and Abundance",
    overview:
      "Taurus is the second sign of the zodiac, epitomizing physical beauty, material security, and steadfast endurance. Governed by Venus (Shukra), the planet of arts and wealth, Taureans possess grounded patience, refined taste, and an instinctive ability to build lasting prosperity.",
    personality: {
      strengths: ["Rock-Solid Reliability", "Patience", "Loyal Friendship", "Artistic Eye"],
      weaknesses: ["Stubborn Resistance to Change", "Possessiveness", "Over-Indulgence", "Procrastination"],
      summary:
        "Taureans value stability above all else. They take their time before committing, but once their resolve is set, their perseverance is unmovable. They find deep spiritual fulfillment in nature, culinary artistry, and harmonious home surroundings.",
    },
    loveCompatibility: {
      bestMatches: ["Virgo", "Capricorn", "Cancer", "Pisces"],
      challengingMatches: ["Leo", "Aquarius"],
      summary:
        "Taurus loves with steadfast dedication, physical affection, and unwavering loyalty. They offer their partners a safe sanctuary of enduring love and domestic peace.",
    },
    careerAndWealth: {
      idealCareers: ["Banking & Wealth Management", "Architecture & Real Estate", "Fine Dining & Culinary Arts", "Agriculture & Landscaping", "Fashion & Luxury Design"],
      moneyAttitude: "Prudent and visionary. Excels in long-term compound investing, tangible assets, and wealth preservation.",
      leadershipStyle: "Calm, consistent, and supportive. Focuses on pragmatic execution and dependable systems.",
    },
    healthAndVitality: {
      rulingBodyParts: "Neck, throat, vocal cords, thyroid gland.",
      healthTips: "Prone to sore throats and sluggish metabolism. Avoid heavy cold dairy at night and practice throat chakra chants (HAM).",
    },
    vedicVsWestern:
      "In Vedic astrology, Moon reaches its peak exaltation (Uchcha) in Vrishabha Rashi (Taurus) at 3 degrees, making Taurean moon placements remarkably peaceful, emotionally stable, and blessed with material affluence.",
    sacredMantra: "Om Dram Dreem Droum Sah Shukraya Namah (ॐ द्रां द्रीं द्रौं सः शुक्राय नमः)",
  },
  {
    slug: "gemini",
    name: "Gemini",
    vedicName: "Mithuna (मिथुन)",
    symbol: "The Twins",
    glyph: "♊",
    dateRange: "May 21 – June 20",
    element: "Air",
    modality: "Mutable (Dwisvabhava)",
    rulingPlanet: "Mercury (Budh)",
    rulingGrahaHindi: "बुध ग्रह",
    vedicLord: "Mercury",
    luckyGemstone: "Emerald (Panna)",
    luckyColors: ["Light Green", "Lemon Yellow", "Sky Blue"],
    luckyNumbers: [5, 14, 23],
    luckyDays: ["Wednesday", "Thursday"],
    ishtaDeity: "Lord Ganesha / Vishnu",
    tagline: "The Versatile Messenger of Intellect and Innovation",
    overview:
      "Gemini is the third zodiac sign, representing the restless pursuit of knowledge, verbal brilliance, and vibrant social connectivity. Ruled by Mercury (Budh), the intellectual synthesizer, Geminis are quick-witted, multifaceted, and endlessly curious about the world.",
    personality: {
      strengths: ["Intellectual Agility", "Witty Eloquence", "Adaptable Multitasker", "Youthful Energy"],
      weaknesses: ["Scattered Focus", "Restlessness", "Superficiality", "Indecisiveness"],
      summary:
        "Geminis are natural communicators who effortlessly connect diverse ideas and people. They possess dualistic minds that can examine any debate from multiple angles simultaneously. Boredom is their only true enemy.",
    },
    loveCompatibility: {
      bestMatches: ["Libra", "Aquarius", "Aries", "Leo"],
      challengingMatches: ["Virgo", "Pisces"],
      summary:
        "For Gemini, intellectual stimulation is the ultimate aphrodisiac. They need partners who can keep pace with their witty banter, love spontaneous travel, and give them room to socialize freely.",
    },
    careerAndWealth: {
      idealCareers: ["Journalism & Media", "Software & IT Networking", "Digital Marketing", "Public Relations & Diplomacy", "Teaching & Authorship"],
      moneyAttitude: "Dynamic cash flow. Generates wealth through multiple concurrent streams, consulting, and digital ventures.",
      leadershipStyle: "Collaborative, communicative, and idea-driven. Encourages lateral thinking and agile innovation.",
    },
    healthAndVitality: {
      rulingBodyParts: "Lungs, shoulders, hands, nervous system.",
      healthTips: "Prone to nervous exhaustion and respiratory sensitivities. Regular meditation and digital detoxes are vital to calm an overactive Vata dosha.",
    },
    vedicVsWestern:
      "Vedic astrology views Mithuna Rashi as an intellectual, creative domain governed by Budh. It is represented by a couple holding a mace and a lute (veena), signifying a balance of martial strategy and fine artistic expression.",
    sacredMantra: "Om Bram Breem Broum Sah Budhaya Namah (ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः)",
  },
  {
    slug: "cancer",
    name: "Cancer",
    vedicName: "Karka (कर्क)",
    symbol: "The Crab",
    glyph: "♋",
    dateRange: "June 21 – July 22",
    element: "Water",
    modality: "Cardinal (Chara)",
    rulingPlanet: "Moon (Chandra)",
    rulingGrahaHindi: "चन्द्र ग्रह",
    vedicLord: "Moon",
    luckyGemstone: "Natural Pearl (Moti)",
    luckyColors: ["Pearl White", "Silver", "Sea Green"],
    luckyNumbers: [2, 7, 20],
    luckyDays: ["Monday", "Thursday"],
    ishtaDeity: "Lord Shiva",
    tagline: "The Intuitive Nurturer of Soul and Sanctuary",
    overview:
      "Cancer is the fourth sign, symbolizing the home, emotional ancestry, maternal protection, and psychic intuition. Ruled by the Moon (Chandra), Cancerians feel life with extraordinary depth, possessing an innate gift for nurturing loved ones and sensing unspoken feelings.",
    personality: {
      strengths: ["Deep Empathy", "Protective Loyalty", "Profound Intuition", "Tenacious Care"],
      weaknesses: ["Mood Swings", "Clinging to the Past", "Defensive Shell", "Over-Sensitivity"],
      summary:
        "Cancerians may present a tough exterior shell to protect their soft, tender hearts. Once you earn their trust, their devotion is unconditional and eternal. Their intuitive hunches are almost never wrong.",
    },
    loveCompatibility: {
      bestMatches: ["Scorpio", "Pisces", "Taurus", "Virgo"],
      challengingMatches: ["Aries", "Libra"],
      summary:
        "Cancer seeks a soulful emotional sanctuary where feelings can be shared without fear. They express devotion through tender acts of domestic care, comforting presence, and deep emotional security.",
    },
    careerAndWealth: {
      idealCareers: ["Psychology & Counseling", "Hospitality & Gastronomy", "Pediatrics & Nursing", "Real Estate & Interior Architecture", "Human Resources"],
      moneyAttitude: "Conservative and protective. Excels in property accumulation, generational savings, and securing family safety nets.",
      leadershipStyle: "Empathetic and intuitive. Treats team members like family and fosters deep institutional loyalty.",
    },
    healthAndVitality: {
      rulingBodyParts: "Chest, breasts, stomach, digestive tract.",
      healthTips: "Emotional distress immediately impacts digestion (Kapha imbalances). Maintain warm home-cooked meals and practice moon-gazing meditation.",
    },
    vedicVsWestern:
      "In Vedic astrology, Karka is the Moon's own home sign (Swakshetra). A strong Moon in Karka bestows exceptional psychic perception, immense public popularity, and a charismatic, comforting aura.",
    sacredMantra: "Om Shram Shreem Shroum Sah Chandraya Namah (ॐ श्रां श्रीं श्रौं सः चन्द्राय नमः)",
  },
  {
    slug: "leo",
    name: "Leo",
    vedicName: "Simha (सिंह)",
    symbol: "The Lion",
    glyph: "♌",
    dateRange: "July 23 – August 22",
    element: "Fire",
    modality: "Fixed (Sthira)",
    rulingPlanet: "Sun (Surya)",
    rulingGrahaHindi: "सूर्य ग्रह",
    vedicLord: "Sun",
    luckyGemstone: "Ruby (Manikya)",
    luckyColors: ["Golden Yellow", "Saffron", "Royal Gold"],
    luckyNumbers: [1, 10, 19],
    luckyDays: ["Sunday", "Tuesday"],
    ishtaDeity: "Lord Surya / Gayatri",
    tagline: "The Radiant Monarch of Dignity and Heart",
    overview:
      "Leo is the fifth sign, representing the soul's light, creative sovereignty, self-expression, and noble honor. Governed by the Sun (Surya), the king of the planetary cabinet, Leos possess natural commanding charisma, generous warmth, and an innate dignity that commands respect.",
    personality: {
      strengths: ["Commanding Charisma", "Generous Heart", "Creative Vitality", "Noble Integrity"],
      weaknesses: ["Pride & Egotism", "Need for Validation", "Domineering Streak", "Dramatics"],
      summary:
        "Leos shine like the midday sun. They are fiercely loyal protectors of their circle and treat life as a majestic stage for creative greatness. Their generosity knows no bounds when their leadership is appreciated.",
    },
    loveCompatibility: {
      bestMatches: ["Aries", "Sagittarius", "Gemini", "Libra"],
      challengingMatches: ["Taurus", "Scorpio"],
      summary:
        "In love, Leo is a passionate, grand romantic who showers their partner with lavish affection, loyalty, and pride. They blossom when praised sincerely and treated as true royalty.",
    },
    careerAndWealth: {
      idealCareers: ["Corporate CEO & Governance", "Performing Arts & Cinema", "Politics & Diplomacy", "Luxury Brand Management", "Public Speaking"],
      moneyAttitude: "High-earning, high-spending. Attracts wealth effortlessly and loves investing in prestigious, high-status assets.",
      leadershipStyle: "Inspirational and visionary. Motivates others through infectious self-belief and grand vision.",
    },
    healthAndVitality: {
      rulingBodyParts: "Heart, spine, upper back, circulatory system.",
      healthTips: "Prone to high blood pressure and cardiac stress from carrying excessive burdens. Practice daily Surya Namaskar and heart-opening yoga.",
    },
    vedicVsWestern:
      "Vedic astrology considers Simha Rashi to be the Mooltrikona sign of Lord Surya. A dignified Sun here confers immense administrative authority, royal patronage, and high spiritual righteousness.",
    sacredMantra: "Om Hram Hreem Hroum Sah Suryaya Namah (ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः)",
  },
  {
    slug: "virgo",
    name: "Virgo",
    vedicName: "Kanya (कन्या)",
    symbol: "The Maiden",
    glyph: "♍",
    dateRange: "August 23 – September 22",
    element: "Earth",
    modality: "Mutable (Dwisvabhava)",
    rulingPlanet: "Mercury (Budh)",
    rulingGrahaHindi: "बुध ग्रह",
    vedicLord: "Mercury",
    luckyGemstone: "Emerald (Panna)",
    luckyColors: ["Forest Green", "Olive", "Sand Ochre"],
    luckyNumbers: [5, 14, 23],
    luckyDays: ["Wednesday", "Friday"],
    ishtaDeity: "Lord Vishnu / Maa Saraswati",
    tagline: "The Master of Precision, Healing, and Service",
    overview:
      "Virgo is the sixth sign, embodying discriminating intellect, practical analysis, holistic healing, and dedicated craftsmanship. Governed by Mercury (Budh) in its exaltation sign, Virgos possess unmatched attention to detail, humble diligence, and a passion for constructive self-improvement.",
    personality: {
      strengths: ["Analytical Genius", "Constructive Service", "High Integrity", "Methodical Precision"],
      weaknesses: ["Over-Critical Nature", "Chronic Worry", "Perfectionist Anxiety", "Micro-Management"],
      summary:
        "Virgos are the quiet problem-solvers who keep the machinery of life running seamlessly. They demonstrate affection not through empty flattery, but through practical support and thoughtful solutions to life's challenges.",
    },
    loveCompatibility: {
      bestMatches: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
      challengingMatches: ["Gemini", "Sagittarius"],
      summary:
        "Virgo values reliability, cleanliness, and sincere communication in romance. Once they feel safe, their devotion is steadfast, considerate, and deeply grounded.",
    },
    careerAndWealth: {
      idealCareers: ["Data Analytics & Research", "Medicine & Pharmacology", "Quality Assurance & Engineering", "Accounting & Audit", "Veterinary Sciences"],
      moneyAttitude: "Meticulous and debt-averse. Carefully tracks expenditures and builds reliable, bulletproof financial reserves.",
      leadershipStyle: "Excellence-driven and detail-oriented. Leads through competence, empirical data, and clear checklists.",
    },
    healthAndVitality: {
      rulingBodyParts: "Digestive system, intestines, spleen, nervous system.",
      healthTips: "Anxiety easily upsets the gut (IBS tendencies). Favor probiotic-rich foods, warm herbal teas, and grounding walking meditations.",
    },
    vedicVsWestern:
      "In Vedic astrology, Mercury is not only the ruler of Kanya but also attains exaltation (Uchcha) at 15 degrees of Virgo. This makes Kanya the zodiac's premier sign for logic, analytical sciences, and Vedic accounting.",
    sacredMantra: "Om Bram Breem Broum Sah Budhaya Namah (ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः)",
  },
  {
    slug: "libra",
    name: "Libra",
    vedicName: "Tula (तुला)",
    symbol: "The Balance Scales",
    glyph: "♎",
    dateRange: "September 23 – October 22",
    element: "Air",
    modality: "Cardinal (Chara)",
    rulingPlanet: "Venus (Shukra)",
    rulingGrahaHindi: "शुक्र ग्रह",
    vedicLord: "Venus",
    luckyGemstone: "Diamond or White Zircon",
    luckyColors: ["Pastel Blue", "Silk White", "Rose Quartz"],
    luckyNumbers: [6, 15, 24],
    luckyDays: ["Friday", "Saturday"],
    ishtaDeity: "Maa Lakshmi",
    tagline: "The Harmonious Champion of Justice and Aesthetics",
    overview:
      "Libra is the seventh sign, governing marriage, legal balance, diplomacy, and exquisite artistic harmony. Ruled by Venus (Shukra), Libras possess refined charm, natural tact, and a profound desire to build fair, aesthetically pleasing relationships in all walks of life.",
    personality: {
      strengths: ["Diplomatic Grace", "Impartial Fairness", "Aesthetic Sensitivity", "Charming Charm"],
      weaknesses: ["Indecision", "Conflict Avoidance", "People-Pleasing", "Superficial Hesitation"],
      summary:
        "Libras see both sides of every equation, making them world-class peacemakers. They despise coarse discord and instinctively restore beauty and balance wherever they step. Partnership is central to their personal fulfillment.",
    },
    loveCompatibility: {
      bestMatches: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
      challengingMatches: ["Cancer", "Capricorn"],
      summary:
        "Romance is an art form for Libra. They thrive in relationships marked by courtly elegance, deep conversation, shared cultural activities, and mutual respect.",
    },
    careerAndWealth: {
      idealCareers: ["Law & Judiciary", "Diplomacy & Arbitration", "Interior & Fashion Design", "Public Relations", "Fine Art Curation"],
      moneyAttitude: "Values wealth for the aesthetic lifestyle and comfort it provides. Balances spending on fine luxuries with smart joint ventures.",
      leadershipStyle: "Consensus-building and polite. Unifies conflicting teams through win-win compromises and diplomatic mediation.",
    },
    healthAndVitality: {
      rulingBodyParts: "Kidneys, lower back, adrenal glands, skin.",
      healthTips: "Prone to lower back strain and kidney imbalances. Drink pure structured water and maintain balanced work-rest boundaries.",
    },
    vedicVsWestern:
      "In Vedic astrology, Saturn (Shani) reaches its supreme exaltation in Tula Rashi at 20 degrees. This demonstrates that true justice (Saturn) requires balanced scales (Libra), granting deep judicial wisdom and perseverance.",
    sacredMantra: "Om Shum Shukraya Namah (ॐ शुं शुक्राय नमः)",
  },
  {
    slug: "scorpio",
    name: "Scorpio",
    vedicName: "Vrischika (वृश्चिक)",
    symbol: "The Scorpion",
    glyph: "♏",
    dateRange: "October 23 – November 21",
    element: "Water",
    modality: "Fixed (Sthira)",
    rulingPlanet: "Mars & Ketu",
    rulingGrahaHindi: "मंगल एवं केतु",
    vedicLord: "Mars",
    luckyGemstone: "Red Coral (Moonga) / Cat's Eye",
    luckyColors: ["Deep Maroon", "Blood Red", "Charcoal Black"],
    luckyNumbers: [9, 18, 27],
    luckyDays: ["Tuesday", "Thursday"],
    ishtaDeity: "Lord Kartikeya / Lord Bhairava",
    tagline: "The Mystic Alchemist of Transformation and Will",
    overview:
      "Scorpio is the eighth sign, reigning over hidden secrets, transformative alchemy, deep psychological insight, and unwavering willpower. Governed by Mars (Mangal) and co-ruled in Vedic thought by Ketu, Scorpios possess magnetic emotional intensity, acute perception, and the power of rebirth.",
    personality: {
      strengths: ["Indomitable Willpower", "Profound Loyalty", "Psychic Intuition", "Transformative Resilience"],
      weaknesses: ["Secretiveness", "Obsessive Tendencies", "Vindictiveness", "Difficulty Trusting"],
      summary:
        "Scorpios are psychological detectives who see straight through pretense and deception. They do not do anything halfway; their commitments are absolute and their loyalty to those who stand by them is lifelong.",
    },
    loveCompatibility: {
      bestMatches: ["Cancer", "Pisces", "Virgo", "Capricorn"],
      challengingMatches: ["Leo", "Aquarius"],
      summary:
        "Scorpio seeks a soul-merging connection of profound emotional intimacy and absolute fidelity. Surface-level flings do not satisfy them; they crave transcendent loyalty.",
    },
    careerAndWealth: {
      idealCareers: ["Investigative Research", "Occult & Astrology", "Psychiatry & Deep Surgery", "Cybersecurity & Forensic Law", "Asset Reconstruction"],
      moneyAttitude: "Secretive and strategic. Excels in managing joint resources, legacy inheritances, and high-stakes turnaround investments.",
      leadershipStyle: "Intense, razor-sharp, and commanding. Demands unwavering commitment and protects their inner circle fiercely.",
    },
    healthAndVitality: {
      rulingBodyParts: "Reproductive organs, pelvis, excretory system.",
      healthTips: "Prone to harboring buried resentments that manifest as toxicity. Regular sweating, detoxification, and Kundalini pranayama restore balance.",
    },
    vedicVsWestern:
      "Vedic astrology associates Vrischika with the 8th house of Kundli—the house of Ayur (longevity), sudden discoveries, and deep occult insight. Moon is debilitated (Neecha) here, requiring conscious mental grounding.",
    sacredMantra: "Om Kram Kreem Kroum Sah Bhaumaya Namah (ॐ क्रां क्रीं क्रौं सः भौमाय नमः)",
  },
  {
    slug: "sagittarius",
    name: "Sagittarius",
    vedicName: "Dhanu (धनु)",
    symbol: "The Archer / Centaur",
    glyph: "♐",
    dateRange: "November 22 – December 21",
    element: "Fire",
    modality: "Mutable (Dwisvabhava)",
    rulingPlanet: "Jupiter (Brihaspati)",
    rulingGrahaHindi: "बृहस्पति / गुरु ग्रह",
    vedicLord: "Jupiter",
    luckyGemstone: "Yellow Sapphire (Pukhraj)",
    luckyColors: ["Golden Yellow", "Royal Purple", "Saffron"],
    luckyNumbers: [3, 12, 21],
    luckyDays: ["Thursday", "Sunday"],
    ishtaDeity: "Lord Vishnu / Brihaspati",
    tagline: "The Philosophical Seeker of Truth and Higher Dharma",
    overview:
      "Sagittarius is the ninth sign, embodying moral righteousness (Dharma), higher spiritual wisdom, philosophical exploration, and expansive optimism. Governed by Jupiter (Guru), Sagittarians possess a generous worldview, a love for adventure, and an unwavering belief in ultimate good.",
    personality: {
      strengths: ["Expansive Wisdom", "Infectious Optimism", "Love for Truth", "Generous Vision"],
      weaknesses: ["Tactless Bluntness", "Over-Promising", "Restless Dogmatism", "Gambling Impulses"],
      summary:
        "Sagittarians are eternal students and inspiring mentors. They look at life through a wide-angle lens, always aiming their arrows at lofty spiritual, intellectual, or humanitarian targets. Their candor is genuine, even when painfully blunt.",
    },
    loveCompatibility: {
      bestMatches: ["Aries", "Leo", "Libra", "Aquarius"],
      challengingMatches: ["Virgo", "Pisces"],
      summary:
        "Sagittarius needs an intellectual co-adventurer who respects their independence, joins them on spontaneous journeys, and engages in deep late-night philosophical debates.",
    },
    careerAndWealth: {
      idealCareers: ["Higher Education & Academia", "International Law & Publishing", "Spiritual Mentorship & Philosophy", "Global Tourism & Diplomacy", "Philanthropic Foundations"],
      moneyAttitude: "Generous and abundant. Believes wealth is meant to circulate and fund noble causes and life-changing experiences.",
      leadershipStyle: "Visionary, moral, and uplifting. Inspires teams through ethical principles, grand goals, and high trust.",
    },
    healthAndVitality: {
      rulingBodyParts: "Hips, thighs, sciatic nerve, liver.",
      healthTips: "Prone to liver congestion from rich festive foods and sports injuries to the hips. Engage in outdoor hiking, equestrian sports, and liver flushes.",
    },
    vedicVsWestern:
      "In Vedic astrology, Dhanu Rashi is the Mooltrikona sign of Devaguru Brihaspati (Jupiter). It represents the natural 9th house of Bhagya (good fortune), higher temple worship, and divine grace.",
    sacredMantra: "Om Gram Greem Groum Sah Gurave Namah (ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः)",
  },
  {
    slug: "capricorn",
    name: "Capricorn",
    vedicName: "Makara (मकर)",
    symbol: "The Sea-Goat",
    glyph: "♑",
    dateRange: "December 22 – January 19",
    element: "Earth",
    modality: "Cardinal (Chara)",
    rulingPlanet: "Saturn (Shani)",
    rulingGrahaHindi: "शनि ग्रह",
    vedicLord: "Saturn",
    luckyGemstone: "Blue Sapphire (Neelam)",
    luckyColors: ["Royal Navy Blue", "Charcoal Gray", "Black"],
    luckyNumbers: [8, 17, 26],
    luckyDays: ["Saturday", "Wednesday"],
    ishtaDeity: "Lord Shani / Lord Shiva",
    tagline: "The Master Builder of Legacy, Discipline, and Duty",
    overview:
      "Capricorn is the tenth sign, reigning over societal structure, career achievement, karmic duty, and enduring legacy. Ruled by Saturn (Shani), Capricorns possess unmatched stamina, strategic pragmatism, and the patient wisdom to scale life's highest summits step by step.",
    personality: {
      strengths: ["Strategic Patience", "Relentless Discipline", "Rock-Solid Integrity", "Master Organizer"],
      weaknesses: ["Emotional Reserve", "Pessimism / Melancholy", "Workaholism", "Rigid Expectations"],
      summary:
        "Capricorns are old souls who age backward—often serious in youth and playful as they mature and achieve security. They respect earned competence, keep their promises, and build monuments that withstand generations.",
    },
    loveCompatibility: {
      bestMatches: ["Taurus", "Virgo", "Scorpio", "Pisces"],
      challengingMatches: ["Aries", "Cancer"],
      summary:
        "Capricorn approaches romance with deliberate, honorable intentions. They may take time to open emotionally, but their loyalty, domestic stability, and protective support are lifelong.",
    },
    careerAndWealth: {
      idealCareers: ["Corporate Leadership & Board Governance", "Civil Administration (IAS/IPS)", "Mining & Infrastructure", "Judicial Architecture", "Enterprise Management"],
      moneyAttitude: "Master wealth-builder. Excels in value investing, commercial real estate, and long-term capital compounding.",
      leadershipStyle: "Authoritative, disciplined, and meritocratic. Demands high accountability and rewards proven loyalty.",
    },
    healthAndVitality: {
      rulingBodyParts: "Bones, joints, knees, teeth, skeletal framework.",
      healthTips: "Prone to joint stiffness, dry skin, and Vata-induced coldness. Warm sesame oil massage (Abhyanga) and calcium-rich diets provide vital nourishment.",
    },
    vedicVsWestern:
      "In Vedic astrology, Mars (Mangal) reaches its supreme exaltation (Uchcha) in Makara Rashi at 28 degrees. Here, Mars' fiery energy is directed with surgical, stoic discipline, producing legendary executive power.",
    sacredMantra: "Om Sham Shanaishcharaya Namah (ॐ शं शनैश्चराय नमः)",
  },
  {
    slug: "aquarius",
    name: "Aquarius",
    vedicName: "Kumbha (कुंभ)",
    symbol: "The Water-Bearer",
    glyph: "♒",
    dateRange: "January 20 – February 18",
    element: "Air",
    modality: "Fixed (Sthira)",
    rulingPlanet: "Saturn & Rahu",
    rulingGrahaHindi: "शनि एवं राहु ग्रह",
    vedicLord: "Saturn",
    luckyGemstone: "Blue Sapphire (Neelam) / Hessonite",
    luckyColors: ["Electric Blue", "Turquoise", "Steel Gray"],
    luckyNumbers: [8, 4, 22],
    luckyDays: ["Saturday", "Sunday"],
    ishtaDeity: "Lord Shiva / Lord Hanuman",
    tagline: "The Revolutionary Visionary of Collective Consciousness",
    overview:
      "Aquarius is the eleventh sign, embodying futuristic innovation, collective brotherhood, egalitarian social reform, and scientific brilliance. Governed classically by Saturn (Shani) and co-ruled in Vedic thought by Rahu, Aquarians are original thinkers who look decades ahead of their time.",
    personality: {
      strengths: ["Original Vision", "Humanitarian Spirit", "Intellectual Independence", "Egalitarian Loyalty"],
      weaknesses: ["Emotional Detachment", "Stubborn Dogmatism", "Rebelliousness for its Own Sake", "Unpredictability"],
      summary:
        "Aquarians refuse to follow the herd. They march to the rhythm of their own cosmic drum, caring little for outdated social conventions. They pour the life-giving waters of insight and technology for the upliftment of humanity.",
    },
    loveCompatibility: {
      bestMatches: ["Gemini", "Libra", "Aries", "Sagittarius"],
      challengingMatches: ["Taurus", "Scorpio"],
      summary:
        "Aquarius seeks an intellectual soulmate and best friend in their romantic partner. They need someone who cherishes their unconventional mindset and gives them freedom to pursue humanitarian causes.",
    },
    careerAndWealth: {
      idealCareers: ["Artificial Intelligence & Advanced Tech", "Astronomy & Aerospace", "Social Reform & NGOs", "Renewable Energy & Ecology", "Data Science & Blockchain"],
      moneyAttitude: "Forward-thinking and unconventional. Gains wealth through progressive tech innovations, patents, and large societal networks.",
      leadershipStyle: "Decentralized and democratic. Empowers team members as equals and encourages bold experimentation.",
    },
    healthAndVitality: {
      rulingBodyParts: "Shins, calves, ankles, circulatory bio-currents.",
      healthTips: "Prone to circulatory sluggishness and ankle sprains. Daily aerobic movement, cold-pressed oils, and grounding earth practices maintain vitality.",
    },
    vedicVsWestern:
      "Vedic astrology recognizes Kumbha as the natural 11th sign of the zodiac—the house of Labha (massive gains), expansive aspirations, and fulfilled desires through community networks.",
    sacredMantra: "Om Sham Shanaishcharaya Namah (ॐ शं शनैश्चराय नमः)",
  },
  {
    slug: "pisces",
    name: "Pisces",
    vedicName: "Meena (मीन)",
    symbol: "The Two Fishes Swimming in Contrary Directions",
    glyph: "♓",
    dateRange: "February 19 – March 20",
    element: "Water",
    modality: "Mutable (Dwisvabhava)",
    rulingPlanet: "Jupiter (Brihaspati)",
    rulingGrahaHindi: "देवगुरु बृहस्पति",
    vedicLord: "Jupiter",
    luckyGemstone: "Yellow Sapphire (Pukhraj)",
    luckyColors: ["Seafoam Green", "Golden Ochre", "Lavender"],
    luckyNumbers: [3, 7, 12],
    luckyDays: ["Thursday", "Monday"],
    ishtaDeity: "Lord Vishnu / Sri Radharani",
    tagline: "The Spiritual Mystic of Universal Compassion and Moksha",
    overview:
      "Pisces is the twelfth and final sign of the zodiac, symbolizing the culmination of all soul experiences, universal compassion, mystical imagination, and spiritual liberation (Moksha). Governed by Jupiter (Brihaspati), Pisceans possess psychic sensitivity, poetic creativity, and boundless empathy.",
    personality: {
      strengths: ["Universal Empathy", "Spiritual Intuition", "Artistic & Musical Genius", "Selfless Compassion"],
      weaknesses: ["Escapism", "Boundary Confusion", "Victim Mentality", "Over-Idealization"],
      summary:
        "Pisceans live with one foot in this physical reality and one foot in the divine cosmos. They absorb the vibrations of their environment like spiritual sponges, often instinctively knowing the truth before a single word is spoken.",
    },
    loveCompatibility: {
      bestMatches: ["Cancer", "Scorpio", "Taurus", "Capricorn"],
      challengingMatches: ["Gemini", "Sagittarius"],
      summary:
        "Pisces loves with ethereal, unconditional devotion. They seek a sacred spiritual union where two souls dissolve boundaries and create a shared haven of poetry, music, and eternal support.",
    },
    careerAndWealth: {
      idealCareers: ["Spiritual Healing & Yoga Therapy", "Cinema, Music & Poetry", "Oceanography & Marine Biology", "Psychiatry & Hospice Care", "Charitable Trusts"],
      moneyAttitude: "Intuitive flow. Money comes naturally through creative and spiritual avenues; benefits greatly from grounded financial management.",
      leadershipStyle: "Compassionate, creative, and values-centered. Motivates through empathy, moral purpose, and artistic inspiration.",
    },
    healthAndVitality: {
      rulingBodyParts: "Feet, lymphatic system, immune defense, pineal gland.",
      healthTips: "Prone to fluid retention and immune sensitivities. Warm foot baths with Epsom salts and grounding walks on dewy grass keep prana circulating.",
    },
    vedicVsWestern:
      "In Vedic astrology, Venus (Shukra) reaches its supreme exaltation (Param Uchcha) in Meena Rashi at 27 degrees. Here, love transforms from mere sensory desire into divine, transcendent devotion (Prema).",
    sacredMantra: "Om Gram Greem Groum Sah Gurave Namah (ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः)",
  },
];

export function getZodiacSignBySlug(slug: string): ZodiacSignEvergreen | undefined {
  const norm = slug.toLowerCase().trim();
  return ZODIAC_SIGNS_EVERGREEN.find((z) => z.slug === norm);
}
