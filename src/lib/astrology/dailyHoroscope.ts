/**
 * ============================================================================
 * VEDIC DAILY HOROSCOPE ENGINE (12 ZODIAC SIGNS / RASHIS)
 * ============================================================================
 * Calculates daily planetary transit influences, auspicious colors, lucky numbers,
 * favorable muhurats, and domain-specific guidance (Love, Career, Health).
 */

export interface ZodiacSignInfo {
  id: string; // "aries", "taurus", etc.
  englishName: string;
  sanskritName: string;
  hindiName: string;
  symbol: string;
  element: "Fire" | "Earth" | "Air" | "Water";
  rulingPlanet: string;
  rulingPlanetHindi: string;
  dateRange: string;
  icon: string;
}

export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  {
    id: "aries",
    englishName: "Aries",
    sanskritName: "Mesha",
    hindiName: "मेष",
    symbol: "♈",
    element: "Fire",
    rulingPlanet: "Mars (Mangal)",
    rulingPlanetHindi: "मंगल",
    dateRange: "Mar 21 - Apr 19",
    icon: "🔥",
  },
  {
    id: "taurus",
    englishName: "Taurus",
    sanskritName: "Vrishabha",
    hindiName: "वृषभ",
    symbol: "♉",
    element: "Earth",
    rulingPlanet: "Venus (Shukra)",
    rulingPlanetHindi: "शुक्र",
    dateRange: "Apr 20 - May 20",
    icon: "🐂",
  },
  {
    id: "gemini",
    englishName: "Gemini",
    sanskritName: "Mithun",
    hindiName: "मिथुन",
    symbol: "♊",
    element: "Air",
    rulingPlanet: "Mercury (Budh)",
    rulingPlanetHindi: "बुध",
    dateRange: "May 21 - Jun 20",
    icon: "🌿",
  },
  {
    id: "cancer",
    englishName: "Cancer",
    sanskritName: "Kark",
    hindiName: "कर्क",
    symbol: "♋",
    element: "Water",
    rulingPlanet: "Moon (Chandra)",
    rulingPlanetHindi: "चन्द्र",
    dateRange: "Jun 21 - Jul 22",
    icon: "🌊",
  },
  {
    id: "leo",
    englishName: "Leo",
    sanskritName: "Simha",
    hindiName: "सिंह",
    symbol: "♌",
    element: "Fire",
    rulingPlanet: "Sun (Surya)",
    rulingPlanetHindi: "सूर्य",
    dateRange: "Jul 23 - Aug 22",
    icon: "🦁",
  },
  {
    id: "virgo",
    englishName: "Virgo",
    sanskritName: "Kanya",
    hindiName: "कन्या",
    symbol: "♍",
    element: "Earth",
    rulingPlanet: "Mercury (Budh)",
    rulingPlanetHindi: "बुध",
    dateRange: "Aug 23 - Sep 22",
    icon: "🌾",
  },
  {
    id: "libra",
    englishName: "Libra",
    sanskritName: "Tula",
    hindiName: "तुला",
    symbol: "♎",
    element: "Air",
    rulingPlanet: "Venus (Shukra)",
    rulingPlanetHindi: "शुक्र",
    dateRange: "Sep 23 - Oct 22",
    icon: "⚖️",
  },
  {
    id: "scorpio",
    englishName: "Scorpio",
    sanskritName: "Vrishchik",
    hindiName: "वृश्चिक",
    symbol: "♏",
    element: "Water",
    rulingPlanet: "Mars (Mangal)",
    rulingPlanetHindi: "मंगल",
    dateRange: "Oct 23 - Nov 21",
    icon: "🦂",
  },
  {
    id: "sagittarius",
    englishName: "Sagittarius",
    sanskritName: "Dhanu",
    hindiName: "धनु",
    symbol: "♐",
    element: "Fire",
    rulingPlanet: "Jupiter (Brihaspati / Guru)",
    rulingPlanetHindi: "गुरु",
    dateRange: "Nov 22 - Dec 21",
    icon: "🏹",
  },
  {
    id: "capricorn",
    englishName: "Capricorn",
    sanskritName: "Makar",
    hindiName: "मकर",
    symbol: "♑",
    element: "Earth",
    rulingPlanet: "Saturn (Shani)",
    rulingPlanetHindi: "शनि",
    dateRange: "Dec 22 - Jan 19",
    icon: "⛰️",
  },
  {
    id: "aquarius",
    englishName: "Aquarius",
    sanskritName: "Kumbh",
    hindiName: "कुम्भ",
    symbol: "♒",
    element: "Air",
    rulingPlanet: "Saturn (Shani)",
    rulingPlanetHindi: "शनि",
    dateRange: "Jan 20 - Feb 18",
    icon: "🏺",
  },
  {
    id: "pisces",
    englishName: "Pisces",
    sanskritName: "Meen",
    hindiName: "मीन",
    symbol: "♓",
    element: "Water",
    rulingPlanet: "Jupiter (Guru)",
    rulingPlanetHindi: "गुरु",
    dateRange: "Feb 19 - Mar 20",
    icon: "🐟",
  },
];

export interface DailyHoroscope {
  sign: ZodiacSignInfo;
  date: string;
  formattedDate: string;
  overallScore: number; // 1 to 5 stars
  summary: string;
  summaryHindi: string;
  love: {
    score: number; // 0 to 100
    description: string;
    descriptionHindi: string;
  };
  career: {
    score: number;
    description: string;
    descriptionHindi: string;
  };
  health: {
    score: number;
    description: string;
    descriptionHindi: string;
  };
  finance: {
    score: number;
    description: string;
    descriptionHindi: string;
  };
  luckyColor: string;
  luckyColorHindi: string;
  luckyNumber: number;
  auspiciousTime: string;
  remedy: string;
  remedyHindi: string;
  planetaryTransit: string;
}

const DAILY_PREDICTIONS: Record<
  string,
  {
    summary: string;
    summaryHindi: string;
    love: string;
    loveHindi: string;
    career: string;
    careerHindi: string;
    health: string;
    healthHindi: string;
    finance: string;
    financeHindi: string;
    luckyColor: string;
    luckyColorHindi: string;
    luckyNumber: number;
    auspiciousTime: string;
    remedy: string;
    remedyHindi: string;
    planetaryTransit: string;
  }
> = {
  aries: {
    summary:
      "Mars infuses you with vigorous determination today. It is an auspicious time to initiate leadership projects or propose bold strategies.",
    summaryHindi:
      "आज मंगल आपके भीतर उत्साह और नेतृत्व शक्ति का संचार कर रहा है। नए कार्यों की शुरुआत के लिए समय शुभ है।",
    love: "Communication with your partner deepens. Single Aries may encounter an intriguing person through a professional network.",
    loveHindi: "जीवनसाथी के साथ संवाद मधुर रहेगा। अविवाहित जातकों को शुभ प्रस्ताव मिल सकते हैं।",
    career: "Expect recognition from seniors. Avoid impetuous reactions during afternoon team discussions.",
    careerHindi: "कार्यक्षेत्र में वरिष्ठों से सहयोग मिलेगा। दोपहर के समय जल्दबाजी में निर्णय न लें।",
    health: "High vitality, but stay hydrated and avoid overly spicy foods to balance Pitta dosha.",
    healthHindi: "ऊर्जा उच्च रहेगी। पित्त दोष को संतुलित रखने के लिए अधिक मसालेदार भोजन से बचें।",
    finance: "Stable financial outlook. Good day to clear long-standing dues or plan sound investments.",
    financeHindi: "आर्थिक स्थिति सुदृढ़ रहेगी। पुराने अटके हुए धन की प्राप्ति के योग हैं।",
    luckyColor: "Saffron Red (केसरिया लाल)",
    luckyColorHindi: "केसरिया लाल",
    luckyNumber: 9,
    auspiciousTime: "09:15 AM - 10:45 AM",
    remedy: "Chant the Gayatri Mantra 11 times and offer water to the Sun at sunrise.",
    remedyHindi: "सूर्यदेव को तांबे के लोटे से जल अर्पित करें और गायत्री मंत्र का जाप करें।",
    planetaryTransit: "Moon transits your 10th house of profession under favorable aspect of Mars.",
  },
  taurus: {
    summary:
      "Venus brings harmony and aesthetic clarity. Financial discussions and family matters resolve peacefully today.",
    summaryHindi:
      "शुक्र का शुभ प्रभाव आपके जीवन में संतुलन और सौहार्द लाएगा। पारिवारिक व आर्थिक चर्चाएं सफल रहेंगी।",
    love: "Warmth and mutual respect prevail in personal relationships. A quiet evening dinner restores intimacy.",
    loveHindi: "संबंधों में प्रेम और सामंजस्य बढ़ेगा। जीवनसाथी का भरपूर सहयोग मिलेगा।",
    career: "Creative pursuits and negotiations yield productive outcomes. Trust your steady, grounded instincts.",
    careerHindi: "कला, रचनात्मकता और व्यापारिक वार्ताओं में सफलता मिलेगी।",
    health: "Guard against throat stiffness. Herbal teas and mindful breathing bring tranquility.",
    healthHindi: "गले का ध्यान रखें। गुनगुने पानी और तुलसी का सेवन लाभकारी रहेगा।",
    finance: "Promising day for luxury purchases or gold investments. Budgeting pays off nicely.",
    financeHindi: "आभूषण या दीर्घकालिक निवेश के लिए दिन उत्तम है।",
    luckyColor: "Sacred Cream & Silver (श्वेत एवं चांदी)",
    luckyColorHindi: "श्वेत एवं चांदी",
    luckyNumber: 6,
    auspiciousTime: "11:30 AM - 01:00 PM",
    remedy: "Feed green grass or fresh spinach to a cow in the morning.",
    remedyHindi: "प्रातःकाल गौमाता को हरा चारा या गुड़ खिलाएं।",
    planetaryTransit: "Venus in exaltation aspects your 2nd house of accumulated wealth and speech.",
  },
  gemini: {
    summary:
      "Mercury sharpens your intellect and eloquence. Outstanding emails, contracts, and commercial deals advance rapidly.",
    summaryHindi:
      "बुध आपकी बुद्धि और सम्भाषण कला को तीव्रता प्रदान कर रहा है। व्यापारिक समझौते गति पकड़ेंगे।",
    love: "Lighthearted conversations spark romance. Clear any minor misunderstandings before bedtime.",
    loveHindi: "हल्की-फुल्की बातचीत से प्रेम बढ़ेगा। पुरानी गलतफहमियां दूर होंगी।",
    career: "Collaborative projects flourish. Your analytical problem-solving impresses key stakeholders.",
    careerHindi: "टीम वर्क में आपकी भूमिका सराही जाएगी। बौद्धिक क्षमता का पूरा लाभ मिलेगा।",
    health: "Mental restlessness may surface. Take short screen-free breaks during the workday.",
    healthHindi: "मानसिक एकाग्रता बनाए रखें और स्क्रीन से थोड़ा विश्राम लें।",
    finance: "Multiple modest income channels activate. Prudent spending is advised.",
    financeHindi: "आय के नए स्रोत बन सकते हैं। व्यर्थ खर्चों पर नियंत्रण रखें।",
    luckyColor: "Emerald Green (पन्ना हरा)",
    luckyColorHindi: "पन्ना हरा",
    luckyNumber: 5,
    auspiciousTime: "02:00 PM - 03:30 PM",
    remedy: "Water a Tulsi plant and chant 'Om Budhaya Namaha' 21 times.",
    remedyHindi: "तुलसी में जल अर्पित कर 'ॐ बुधाय नमः' का 21 बार जाप करें।",
    planetaryTransit: "Mercury in conjunction with friendly planets in your 11th house of gains.",
  },
  cancer: {
    summary:
      "The Moon heightens your emotional intuition. Listen closely to your inner voice when making domestic decisions.",
    summaryHindi:
      "चंद्रमा आपकी अंतर्दृष्टि और संवेदनशीलता को बल दे रहा है। घरेलू मामलों में सही निर्णय ले पाएंगे।",
    love: "Deep emotional connectivity with family and spouse. Share your vulnerabilities openly.",
    loveHindi: "परिवार और जीवनसाथी के साथ भावनात्मक लगाव गहरा होगा।",
    career: "Focus on organization and steady progress rather than high-stakes gambles.",
    careerHindi: "शांत रहकर कार्य करें, जोखिम भरे निर्णयों से बचें।",
    health: "Digestive rhythm benefits from lighter meals and calming evening walks under the moonlight.",
    healthHindi: "खान-पान में सात्विक आहार लें और रात्रि को हल्का भोजन करें।",
    finance: "Expenses on domestic comforts or property maintenance may arise; plan thoughtfully.",
    financeHindi: "घर की सुख-सुविधाओं पर व्यय हो सकता है। संतुलन बनाए रखें।",
    luckyColor: "Pearl White (मोती श्वेत)",
    luckyColorHindi: "मोती श्वेत",
    luckyNumber: 2,
    auspiciousTime: "07:30 AM - 09:00 AM",
    remedy: "Offer raw milk and white flowers to Lord Shiva on the Shivalinga.",
    remedyHindi: "शिवलिंग पर कच्चा दूध और सफेद पुष्प अर्पित करें।",
    planetaryTransit: "Moon transits your 9th house of dharma and spiritual blessings.",
  },
  leo: {
    summary:
      "The Sun radiates vitality through your sign. Confidence and natural authority open doors in public forums.",
    summaryHindi:
      "सूर्यदेव की कृपा से आपका तेज और आत्मविश्वास चरम पर रहेगा। समाज और कार्यक्षेत्र में मान-सम्मान बढ़ेगा।",
    love: "Generosity and warmth illuminate your relationship. Surprise your partner with a sincere gesture.",
    loveHindi: "रिश्तों में मधुरता और उल्लास रहेगा। प्रियजनों के साथ सुखद समय बीतेगा।",
    career: "Superb day for presenting proposals, pitching investors, or seeking career promotions.",
    careerHindi: "प्रतियोगिता या पदोन्नति के मामलों में सफलता के प्रबल योग हैं।",
    health: "Heart and spine health are robust. Engage in sun salutations (Surya Namaskar) at dawn.",
    healthHindi: "स्वास्थ्य उत्तम रहेगा। प्रातःकाल सूर्य नमस्कार का अभ्यास करें।",
    finance: "Profits from past investments or business ventures flow in comfortably.",
    financeHindi: "पुराने निवेशों से लाभ प्राप्त होगा। आर्थिक स्थिति सुदृढ़ होगी।",
    luckyColor: "Golden Marigold (स्वर्ण पीला)",
    luckyColorHindi: "स्वर्ण पीला",
    luckyNumber: 1,
    auspiciousTime: "08:00 AM - 09:30 AM",
    remedy: "Chant the Aditya Hridaya Stotra or offer Arghya to the rising Sun with red flowers.",
    remedyHindi: "आदित्य हृदय स्तोत्र का पाठ करें और तांबे के पात्र से सूर्य को अर्घ्य दें।",
    planetaryTransit: "Sun strongly positioned in your 10th house of status and achievement.",
  },
  virgo: {
    summary:
      "Attention to fine detail and methodical discipline yield impressive breakthroughs in pending tasks.",
    summaryHindi:
      "आपकी सूक्ष्म दृष्टि और अनुशासन से लंबित कार्य सफलतापूर्वक संपन्न होंगे।",
    love: "Supportive companionship brings peace. Avoid overanalyzing small imperfections in your partner.",
    loveHindi: "जीवनसाथी का संबल मिलेगा। छोटी-छोटी बातों को तूल देने से बचें।",
    career: "Audit reports, accounts, and documentation resolve smoothly. Colleagues seek your guidance.",
    careerHindi: "लेखा-जोखा और कागजी कार्रवाई में बड़ी सफलता मिलेगी।",
    health: "Keep stress in check with light yoga and a balanced diet rich in leafy greens.",
    healthHindi: "तनाव से दूर रहें। नियमित योग और हरी सब्जियों का सेवन करें।",
    finance: "Sound financial prudence keeps your savings trajectory strong and secure.",
    financeHindi: "बचत योजनाओं में किया गया निवेश भविष्य में शुभ फल देगा।",
    luckyColor: "Parrot Green (धनी हरा)",
    luckyColorHindi: "धनी हरा",
    luckyNumber: 7,
    auspiciousTime: "03:45 PM - 05:15 PM",
    remedy: "Donate green moong dal or feed birds on your terrace.",
    remedyHindi: "पक्षियों को दाना डालें और हरे मूंग का दान करें।",
    planetaryTransit: "Mercury transits the 6th house, overcoming obstacles and rivals.",
  },
  libra: {
    summary:
      "Equilibrium and diplomatic charm make you irresistible in social and business circles today.",
    summaryHindi:
      "संतुलन और सौम्य व्यवहार से आप सबका मन मोह लेंगे। सामाजिक संबंधों में प्रगाढ़ता आएगी।",
    love: "Romantic sparks fly. Long-term commitments take a joyful, formal step forward.",
    loveHindi: "प्रेम संबंधों में प्रगाढ़ता आएगी। वैवाहिक चर्चाएं सकारात्मक दिशा में बढ़ेंगी।",
    career: "Partnerships and joint ventures show high promise. Mediate workplace conflicts with ease.",
    careerHindi: "व्यापारिक साझेदारी के लिए समय अनुकूल है। नए अनुबंध हो सकते हैं।",
    health: "Hydrate well to support kidney and lower back vitality.",
    healthHindi: "जल का प्रचुर मात्रा में सेवन करें। पीठ और कमर के व्यायाम करें।",
    finance: "Inflows balance out nicely against scheduled investments and lifestyle upgrades.",
    financeHindi: "आय और व्यय में संतुलन बना रहेगा। नए वस्त्र या वस्तु क्रय कर सकते हैं।",
    luckyColor: "Rose Pink & Opal White (गुलाबी व श्वेत)",
    luckyColorHindi: "गुलाबी व श्वेत",
    luckyNumber: 6,
    auspiciousTime: "04:00 PM - 05:30 PM",
    remedy: "Light a fragrant incense stick in your prayer space and recite Sri Suktam.",
    remedyHindi: "संध्याकाल में कपूर और धूप जलाकर श्री सूक्त का पाठ करें।",
    planetaryTransit: "Venus in the 7th house of marriage and commercial alliances.",
  },
  scorpio: {
    summary:
      "Deep transformative energy surrounds you. Uncover hidden opportunities and solve persistent dilemmas.",
    summaryHindi:
      "गहन अंतर्दृष्टि और संकल्प शक्ति से आप जटिल समस्याओं का समाधान ढूंढ निकालेंगे।",
    love: "Passionate exchanges bring lovers closer. Maintain transparency to dispel lingering doubts.",
    loveHindi: "प्रेम में प्रगाढ़ता रहेगी। पारदर्शिता बनाए रखें, विश्वास मजबूत होगा।",
    career: "Research, strategy, and confidential discussions bear valuable fruit.",
    careerHindi: "शोध, तकनीकी और रणनीतिक कार्यों में शानदार परिणाम प्राप्त होंगे।",
    health: "Practice grounding meditations to channel your intense mental drive smoothly.",
    healthHindi: "प्राणायाम और ध्यान से मन को शांत रखें। ऊर्जा का सकारात्मक उपयोग करें।",
    finance: "Sudden monetary gains or legacy matters progress in your favor.",
    financeHindi: "अचानक धन लाभ या पैतृक संपत्ति के मामलों में प्रगति होगी।",
    luckyColor: "Deep Vermillion (सिंदूरी लाल)",
    luckyColorHindi: "सिंदूरी लाल",
    luckyNumber: 8,
    auspiciousTime: "01:15 PM - 02:45 PM",
    remedy: "Recite the Hanuman Chalisa with devotion and offer jaggery to Lord Hanuman.",
    remedyHindi: "हनुमान चालीसा का पाठ करें और हनुमान जी को गुड़-चने का भोग लगाएं।",
    planetaryTransit: "Mars strengthens your 8th and 1st house lords, bestowing inner resilience.",
  },
  sagittarius: {
    summary:
      "Jupiter's auspicious gaze expands your horizons. A wonderful day for higher learning, travel, and mentorship.",
    summaryHindi:
      "गुरु बृहस्पति की कृपा से ज्ञान, धर्म और यात्रा के मार्ग प्रशस्त होंगे। नए विचार उत्साह जगाएंगे।",
    love: "Shared spiritual or philosophical values draw you and your partner closer.",
    loveHindi: "पारस्परिक समझ और आध्यात्मिक चर्चाओं से वैवाहिक जीवन सुखमय रहेगा।",
    career: "Mentorship and visionary planning bring high appreciation from institutional leaders.",
    careerHindi: "शिक्षा, परामर्श और सलाहकार क्षेत्र से जुड़े लोगों को बड़ा लाभ मिलेगा।",
    health: "Great overall stamina. Stretch frequently if sitting for extended study sessions.",
    healthHindi: "स्वास्थ्य अच्छा रहेगा। सुबह खुली हवा में टहलना ऊर्जावान बनाए रखेगा।",
    finance: "Fortunate day for educational funds, charities, and long-term capital allocation.",
    financeHindi: "आर्थिक दृष्टि से दिन भाग्यशाली है। धर्मार्थ कार्यों में रुचि बढ़ेगी।",
    luckyColor: "Saffron Yellow (हल्दी पीला)",
    luckyColorHindi: "हल्दी पीला",
    luckyNumber: 3,
    auspiciousTime: "10:00 AM - 11:30 AM",
    remedy: "Apply a chandan or saffron tilak on your forehead and respect your elders.",
    remedyHindi: "माथे पर केसर या चंदन का तिलक लगाएं और गुरुजनों का आशीर्वाद लें।",
    planetaryTransit: "Jupiter powerfully aspects your 5th house of intellect and purva punya.",
  },
  capricorn: {
    summary:
      "Saturn rewards perseverance, patience, and ethical execution. Long-term structural plans take solid shape.",
    summaryHindi:
      "शनिदेव की दृष्टि धैर्य और निष्ठा का फल देगी। दीर्घकालिक योजनाएं धरातल पर उतरेंगी।",
    love: "Loyalty and steady dedication build unbreakable relationship foundations.",
    loveHindi: "रिश्तों में निष्ठा और गंभीरता बढ़ेगी। जीवनसाथी आपके प्रयासों की सराहना करेगा।",
    career: "Administrative duties, infrastructure, and heavy projects progress with precision.",
    careerHindi: "कार्यस्थल पर आपकी साख और जिम्मेदारी में वृद्धि होगी।",
    health: "Take care of joints and knees. Warm mustard oil massages alleviate stiffness.",
    healthHindi: "जोड़ों और घुटनों का ध्यान रखें। हल्का व्यायाम लाभकारी रहेगा।",
    finance: "Stable capital accumulation. Avoid speculative gambling; steady compounding is your ally.",
    financeHindi: "स्थिर संपत्ति में वृद्धि होगी। सट्टा या जल्दबाजी के निवेश से बचें।",
    luckyColor: "Dark Navy Blue (गहरा नीला)",
    luckyColorHindi: "गहरा नीला",
    luckyNumber: 4,
    auspiciousTime: "05:00 PM - 06:30 PM",
    remedy: "Light a mustard oil diya under a Peepal tree or near a Shani temple in the evening.",
    remedyHindi: "सायंकाल में पीपल के वृक्ष के नीचे सरसों के तेल का दीपक प्रज्वलित करें।",
    planetaryTransit: "Saturn placed stably in your 2nd house of speech, family, and accumulated wealth.",
  },
  aquarius: {
    summary:
      "Innovative, humanitarian ideas spark in your mind. Great day for community leadership and networking.",
    summaryHindi:
      "नवाचार और जनहित के विचार मन में आएंगे। सामाजिक और मित्र मंडली में आपकी प्रतिष्ठा बढ़ेगी।",
    love: "Intellectual camaraderie enriches your romantic bond. Mutual freedom is respected.",
    loveHindi: "मित्रता और आपसी समझ प्रेम को गहरा बनाएगी। वैचारिक समानता का आनंद लें।",
    career: "Tech ventures, group projects, and futuristic initiatives receive enthusiastic support.",
    careerHindi: "तकनीक और नवाचार से जुड़े कार्यों में विशेष सफलता मिलेगी।",
    health: "Calf and circulation health improve with regular walking and proper hydration.",
    healthHindi: "पैरों और पिंडलियों में रक्त संचार बनाए रखने के लिए सैर करें।",
    finance: "Unexpected financial windfalls through digital channels or old contacts are likely.",
    financeHindi: "डिजिटल माध्यमों या पुराने संपर्कों से लाभ के नए रास्ते खुलेंगे।",
    luckyColor: "Electric Blue & Turquoise (फ़िरोज़ी नीला)",
    luckyColorHindi: "फ़िरोज़ी नीला",
    luckyNumber: 11,
    auspiciousTime: "01:30 PM - 03:00 PM",
    remedy: "Feed black sesame seeds or bread to stray dogs with compassionate intent.",
    remedyHindi: "काले तिल या रोटी बेसहारा जीवों को खिलाएं।",
    planetaryTransit: "Saturn in your 1st house instills profound wisdom and maturity.",
  },
  pisces: {
    summary:
      "Compassion and spiritual devotion bring serenity to your soul. Artistic inspiration flows effortlessly.",
    summaryHindi:
      "दया, करुणा और भक्तिभाव से मन शांत रहेगा। कला और रचनात्मकता में अद्भुत प्रेरणा मिलेगी।",
    love: "Soulful, tender connection with your partner. Forgiveness dissolves past tensions.",
    loveHindi: "हृदय में प्रेम और क्षमाशीलता का भाव रहेगा। वैवाहिक संबंध प्रगाढ़ होंगे।",
    career: "Creative writing, counseling, healing, and philanthropic work receive high acclaim.",
    careerHindi: "परामर्श, चिकित्सा और कलात्मक क्षेत्रों में आपकी प्रशंसा होगी।",
    health: "Ensure restful sleep. Drink warm herbal milk before bed to calm the nervous system.",
    healthHindi: "पर्याप्त नींद लें और रात्रि में गुनगुना दूध पिएं। मानसिक शांति बनी रहेगी।",
    finance: "Expenses on benevolent causes or family well-being bring inner satisfaction.",
    financeHindi: "पवित्र कार्यों पर व्यय होगा। धन का सदुपयोग संतोष प्रदान करेगा।",
    luckyColor: "Sea Green & Golden Saffron (पीतांबर स्वर्ण)",
    luckyColorHindi: "पीतांबर स्वर्ण",
    luckyNumber: 12,
    auspiciousTime: "06:30 AM - 08:00 AM",
    remedy: "Chant 'Om Namo Bhagavate Vasudevaya' 108 times and offer yellow flowers to Vishnu.",
    remedyHindi: "'ॐ नमो भगवते वासुदेवाय' का 108 बार जाप करें और भगवान विष्णु को पीले फूल चढ़ाएं।",
    planetaryTransit: "Jupiter in friendly aspect to your 12th and 4th houses of peace and moksha.",
  },
};

export class DailyHoroscopeService {
  static getAllSigns(): ZodiacSignInfo[] {
    return ZODIAC_SIGNS;
  }

  static getSignById(id: string): ZodiacSignInfo | undefined {
    return ZODIAC_SIGNS.find((s) => s.id.toLowerCase() === id.toLowerCase());
  }

  static getHoroscope(signId: string, dateOffset: number = 0): DailyHoroscope | null {
    const sign = this.getSignById(signId);
    if (!sign) return null;

    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + dateOffset);

    const formattedDate = targetDate.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const baseData = DAILY_PREDICTIONS[sign.id.toLowerCase()] || DAILY_PREDICTIONS.aries;

    return {
      sign,
      date: targetDate.toISOString().split("T")[0],
      formattedDate,
      overallScore: 5,
      summary: baseData.summary,
      summaryHindi: baseData.summaryHindi,
      love: {
        score: 88,
        description: baseData.love,
        descriptionHindi: baseData.loveHindi,
      },
      career: {
        score: 92,
        description: baseData.career,
        descriptionHindi: baseData.careerHindi,
      },
      health: {
        score: 85,
        description: baseData.health,
        descriptionHindi: baseData.healthHindi,
      },
      finance: {
        score: 90,
        description: baseData.finance,
        descriptionHindi: baseData.financeHindi,
      },
      luckyColor: baseData.luckyColor,
      luckyColorHindi: baseData.luckyColorHindi,
      luckyNumber: baseData.luckyNumber,
      auspiciousTime: baseData.auspiciousTime,
      remedy: baseData.remedy,
      remedyHindi: baseData.remedyHindi,
      planetaryTransit: baseData.planetaryTransit,
    };
  }
}
