// PLACEHOLDER: replace with real content
import { PLACEHOLDER_ASTROLOGER } from "@/config/placeholderContent";

export interface SavedKundli {
  id: string;
  name: string;
  relation: "Self" | "Spouse" | "Child" | "Parent" | "Business Partner" | "Other";
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  gender: "Male" | "Female" | "Other";
  lagna: string;
  rashi: string;
  nakshatra: string;
  createdAt: string;
}

export interface ConsultationRecord {
  id: string;
  date: string;
  duration: string;
  mode: "Chat" | "Voice Call" | "Video Call";
  amount: string;
  astrologer: string;
  topic: string;
  remedy: string;
  notes: string;
  summaryUrl?: string;
  hasReview: boolean;
}

export interface ClientReview {
  id: string;
  consultationId?: string;
  clientName: string;
  service: string;
  rating: number;
  comment: string;
  consentPublic: boolean;
  date: string;
}

export interface CallbackRequest {
  id: string;
  clientName: string;
  phone: string;
  topic: string;
  preferredSlot: string;
  createdAt: string;
  status: "pending" | "contacted" | "cancelled";
}

export interface ClientProfile {
  name: string;
  phone: string;
  email: string;
  isLoggedIn: boolean;
  walletBalance: number;
  joinedDate: string;
}

let memoryClientProfile: ClientProfile = {
  name: "Aarav Sharma",
  phone: "+91 98765 43210",
  email: "aarav.sharma@example.com",
  isLoggedIn: true,
  walletBalance: 250,
  joinedDate: "14 Aug 2026",
};

let memorySavedKundlis: SavedKundli[] = [
  {
    id: "knd-1",
    name: "Aarav Sharma (Self)",
    relation: "Self",
    birthDate: "1995-10-24",
    birthTime: "14:35",
    birthPlace: "New Delhi",
    gender: "Male",
    lagna: "Capricorn (Makar)",
    rashi: "Libra (Tula)",
    nakshatra: "Swati (Pada 3)",
    createdAt: "2026-08-14",
  },
  {
    id: "knd-2",
    name: "Meera Kapoor (Spouse)",
    relation: "Spouse",
    birthDate: "1997-04-12",
    birthTime: "09:15",
    birthPlace: "Jaipur, Rajasthan",
    gender: "Female",
    lagna: "Gemini (Mithun)",
    rashi: "Taurus (Vrishabha)",
    nakshatra: "Rohini (Pada 2)",
    createdAt: "2026-08-20",
  },
];

let memoryConsultations: ConsultationRecord[] = [
  {
    id: "CON-8842",
    date: "18 Sep 2026",
    duration: "14 Minutes",
    mode: "Voice Call",
    amount: "₹210",
    astrologer: PLACEHOLDER_ASTROLOGER.displayName,
    topic: "Career Promotion & Foreign Relocation Dasha",
    remedy: "Chant Brihaspati Beej Mantra 108 times on Thursdays. Wear 6.25 Ratti Yellow Sapphire.",
    notes:
      "Client is in Rahu-Jupiter Antardasha. High prospects for international placement by mid-2027. Maintain discipline in speech and avoid speculative investments.",
    hasReview: true,
  },
  {
    id: "CON-7104",
    date: "04 Sep 2026",
    duration: "20 Minutes",
    mode: "Chat",
    amount: "₹150",
    astrologer: PLACEHOLDER_ASTROLOGER.displayName,
    topic: "Residential Vastu Rectification for North-West Entrance",
    remedy: "Placed consecrated Brass Helix in Vayavya corner. Lighted white mustard oil diya.",
    notes:
      "Vastu dosha in Vayavya (North-West) zone was causing domestic disharmony. Suggested non-demolition brass pyramid installation.",
    hasReview: false,
  },
];

let memoryReviews: ClientReview[] = [
  {
    id: "rev-1",
    consultationId: "CON-8842",
    clientName: "Aarav Sharma",
    service: "Voice Call Consultation",
    rating: 5,
    comment:
      "Acharya ji explained the dasha timing with unmatched clarity. Within 2 weeks of performing the recommended Guru remedy, I received a confirmation email from my overseas team!",
    consentPublic: true,
    date: "19 Sep 2026",
  },
];

let memoryCallbacks: CallbackRequest[] = [];

export const ClientAccountStore = {
  getProfile: (): ClientProfile => ({ ...memoryClientProfile }),

  setLoggedIn: (status: boolean, phone: string = "+91 98765 43210") => {
    memoryClientProfile.isLoggedIn = status;
    memoryClientProfile.phone = phone;
  },

  getSavedKundlis: (): SavedKundli[] => [...memorySavedKundlis],

  addSavedKundli: (kundli: Omit<SavedKundli, "id" | "createdAt">): SavedKundli => {
    const newKnd: SavedKundli = {
      ...kundli,
      id: `knd-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    memorySavedKundlis.unshift(newKnd);
    return newKnd;
  },

  deleteSavedKundli: (id: string) => {
    memorySavedKundlis = memorySavedKundlis.filter((k) => k.id !== id);
  },

  getConsultationHistory: (): ConsultationRecord[] => [...memoryConsultations],

  getConsultations: (): ConsultationRecord[] => [...memoryConsultations],

  getConsultationById: (id: string): ConsultationRecord | undefined => {
    return memoryConsultations.find((c) => c.id === id);
  },

  addConsultationRecord: (record: ConsultationRecord) => {
    memoryConsultations.unshift(record);
  },

  getReviews: (): ClientReview[] => [...memoryReviews],

  addReview: (review: Omit<ClientReview, "id" | "date">): ClientReview => {
    const newReview: ClientReview = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    };
    memoryReviews.unshift(newReview);
    if (review.consultationId) {
      const c = memoryConsultations.find((item) => item.id === review.consultationId);
      if (c) c.hasReview = true;
    }
    return newReview;
  },

  getCallbackRequests: (): CallbackRequest[] => [...memoryCallbacks],

  requestCallback: (req: Omit<CallbackRequest, "id" | "createdAt" | "status">): CallbackRequest => {
    const newReq: CallbackRequest = {
      ...req,
      id: `call-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    memoryCallbacks.unshift(newReq);
    return newReq;
  },
};
