// Single Astrologer Business State & Live Presence Store
// Centralized state manager handling Astrologer status, Live Queue, and Active Consultation Sessions

export type AstrologerStatus = "AVAILABLE" | "BUSY" | "BREAK" | "OFFLINE";

export interface QueueItem {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  consultationType: "chat" | "call";
  birthDetails: {
    name: string;
    gender: "male" | "female" | "other";
    birthDate: string;
    birthTime: string;
    birthPlace: string;
    latitude: number;
    longitude: number;
    timezone: number;
  };
  concern: string;
  joinedAt: string;
  estimatedWaitMins: number;
}

export interface ConsultationMessage {
  id: string;
  sessionId: string;
  sender: "astrologer" | "user" | "client";
  text: string;
  timestamp: string;
  attachmentType?: "kundli" | "remedy" | "image";
  attachmentData?: any;
}

export interface ActiveSession {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  type: "chat" | "call";
  startedAt: string;
  ratePerMin: number;
  elapsedSeconds: number;
  status: "active" | "completed" | "cancelled";
  birthDetails: QueueItem["birthDetails"];
  concern: string;
  notes: string;
  remedies: string[];
}

export interface AstrologerProfile {
  id: string;
  name: string;
  title: string;
  degree: string;
  experienceYears: number;
  consultationsCompleted: number;
  rating: number;
  reviewsCount: number;
  avatarUrl: string;
  bio: string;
  languages: string[];
  specialties: string[];
  status: AstrologerStatus;
  statusMessage: string;
  nextAvailableAt?: string;
  ratePerMinute: number;
  discountedRatePerMinute: number;
  flatRates: {
    kundliReading: number;
    vastuConsultation: number;
    gemstoneRecommendation: number;
  };
}

export const INITIAL_ASTROLOGER: AstrologerProfile = {
  id: "acharya-rajesh-sharma",
  name: "Acharya Rajesh Sharma",
  title: "Vedic Jyotish Maharishi & Vastu Shastra Expert",
  degree: "Jyotish Acharya (Gold Medalist), Sampurnanand Sanskrit Vishwavidyalaya, Varanasi",
  experienceYears: 18,
  consultationsCompleted: 35420,
  rating: 4.98,
  reviewsCount: 12850,
  avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80",
  bio: "Celebrated Vedic scholar with over 18 years of disciplined Sadhana and predictive mastery. Known across India for unfailingly accurate astrological timelines, non-demolition Vastu remedies, and authentic gemstone prescriptions.",
  languages: ["Hindi (हिंदी)", "Sanskrit (संस्कृत)", "English"],
  specialties: [
    "Kundli Janampatri & Dasha Fal",
    "Marriage, Compatibility & Kundli Milan",
    "Career, Business & Financial Yoga",
    "Vedic Vastu Shastra (Residential & Commercial)",
    "Govt.-Certified Gemstone Remedies"
  ],
  status: "AVAILABLE",
  statusMessage: "Available right now for 1-on-1 consultations",
  nextAvailableAt: "Tomorrow, 10:00 AM IST",
  ratePerMinute: 35,
  discountedRatePerMinute: 19,
  flatRates: {
    kundliReading: 999,
    vastuConsultation: 2499,
    gemstoneRecommendation: 499
  }
};

const STORAGE_KEYS = {
  STATUS: "aapka_astro_status",
  QUEUE: "aapka_astro_queue",
  ACTIVE_SESSION: "aapka_astro_session",
  MESSAGES: "aapka_astro_messages",
  WALLET: "aapka_astro_user_wallet"
};

// Client-side state helper with local synchronization
export class AstrologerStateStore {
  private static getStorage<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private static setStorage<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom event to sync across tabs/components
      window.dispatchEvent(new Event("astro_state_changed"));
    } catch (e) {
      console.error("Storage error", e);
    }
  }

  static getStatus(): AstrologerStatus {
    return this.getStorage<AstrologerStatus>(STORAGE_KEYS.STATUS, "AVAILABLE");
  }

  static setStatus(status: AstrologerStatus): void {
    this.setStorage(STORAGE_KEYS.STATUS, status);
  }

  static getQueue(): QueueItem[] {
    return this.getStorage<QueueItem[]>(STORAGE_KEYS.QUEUE, [
      {
        id: "q-101",
        userId: "user-deepak",
        userName: "Deepak Verma",
        userPhone: "+91 98765 43210",
        consultationType: "call",
        birthDetails: {
          name: "Deepak Verma",
          gender: "male",
          birthDate: "1994-08-15",
          birthTime: "07:30",
          birthPlace: "Jaipur",
          latitude: 26.9124,
          longitude: 75.7873,
          timezone: 5.5
        },
        concern: "Career switch into software and foreign travel yog in 2026",
        joinedAt: new Date(Date.now() - 4 * 60000).toISOString(),
        estimatedWaitMins: 5
      }
    ]);
  }

  static addToQueue(item: Omit<QueueItem, "id" | "joinedAt" | "estimatedWaitMins" | "userId"> & { userId?: string }): QueueItem {
    const queue = this.getQueue();
    const waitMins = (queue.length + 1) * 8;
    const newItem: QueueItem = {
      ...item,
      userId: item.userId || `user-${Date.now()}`,
      id: `q-${Date.now()}`,
      joinedAt: new Date().toISOString(),
      estimatedWaitMins: waitMins
    };
    queue.push(newItem);
    this.setStorage(STORAGE_KEYS.QUEUE, queue);
    return newItem;
  }

  static removeFromQueue(queueId: string): void {
    const queue = this.getQueue().filter(q => q.id !== queueId);
    this.setStorage(STORAGE_KEYS.QUEUE, queue);
  }

  static getActiveSession(): ActiveSession | null {
    return this.getStorage<ActiveSession | null>(STORAGE_KEYS.ACTIVE_SESSION, null);
  }

  static startSessionFromQueue(queueId: string): ActiveSession | null {
    const queue = this.getQueue();
    const item = queue.find(q => q.id === queueId);
    if (!item) return null;

    const newSession: ActiveSession = {
      id: `sess-${Date.now()}`,
      userId: item.userId,
      userName: item.userName,
      userPhone: item.userPhone,
      type: item.consultationType,
      startedAt: new Date().toISOString(),
      ratePerMin: 19,
      elapsedSeconds: 0,
      status: "active",
      birthDetails: item.birthDetails,
      concern: item.concern,
      notes: "",
      remedies: []
    };

    // Remove from queue and set as active
    this.removeFromQueue(queueId);
    this.setStorage(STORAGE_KEYS.ACTIVE_SESSION, newSession);
    this.setStatus("BUSY");
    return newSession;
  }

  static acceptNextInQueue(queueId: string): ActiveSession | null {
    return this.startSessionFromQueue(queueId);
  }

  static startDirectSession(item: {
    userName: string;
    userPhone: string;
    type: "chat" | "call";
    birthDetails: QueueItem["birthDetails"];
    concern: string;
  }): ActiveSession {
    const newSession: ActiveSession = {
      id: `sess-${Date.now()}`,
      userId: `user-${Date.now()}`,
      userName: item.userName,
      userPhone: item.userPhone,
      type: item.type,
      startedAt: new Date().toISOString(),
      ratePerMin: 19,
      elapsedSeconds: 0,
      status: "active",
      birthDetails: item.birthDetails,
      concern: item.concern,
      notes: "",
      remedies: []
    };
    this.setStorage(STORAGE_KEYS.ACTIVE_SESSION, newSession);
    this.setStatus("BUSY");
    return newSession;
  }

  static joinQueue(item: Omit<QueueItem, "id" | "joinedAt" | "estimatedWaitMins" | "userId"> & { userId?: string }): QueueItem {
    return this.addToQueue(item);
  }

  static endSession(): void {
    this.setStorage(STORAGE_KEYS.ACTIVE_SESSION, null);
    const queue = this.getQueue();
    this.setStatus(queue.length > 0 ? "AVAILABLE" : "AVAILABLE");
  }

  static getMessages(sessionId: string): ConsultationMessage[] {
    const all = this.getStorage<ConsultationMessage[]>(STORAGE_KEYS.MESSAGES, [
      {
        id: "m-1",
        sessionId: "default",
        sender: "astrologer",
        text: "प्रणाम! Aapka Astro me aapka swagat hai. Kripya apna prashna vistaar se batayein, mai aapki kundli dekh raha hoon.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    return all.filter(m => m.sessionId === sessionId || m.sessionId === "default");
  }

  static sendMessage(sessionId: string, sender: "astrologer" | "user" | "client", text: string, attachmentType?: "kundli" | "remedy", attachmentData?: any): ConsultationMessage {
    const all = this.getStorage<ConsultationMessage[]>(STORAGE_KEYS.MESSAGES, []);
    const newMsg: ConsultationMessage = {
      id: `msg-${Date.now()}`,
      sessionId,
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachmentType,
      attachmentData
    };
    all.push(newMsg);
    this.setStorage(STORAGE_KEYS.MESSAGES, all);
    return newMsg;
  }

  // User Wallet
  static getWalletBalance(): number {
    return this.getStorage<number>(STORAGE_KEYS.WALLET, 250); // Default promo ₹250
  }

  static addWalletBalance(amount: number): number {
    const current = this.getWalletBalance();
    const updated = current + amount;
    this.setStorage(STORAGE_KEYS.WALLET, updated);
    return updated;
  }

  static deductWalletBalance(amount: number): number {
    const current = this.getWalletBalance();
    const updated = Math.max(0, current - amount);
    this.setStorage(STORAGE_KEYS.WALLET, updated);
    return updated;
  }

  static deductWallet(amount: number): number {
    return this.deductWalletBalance(amount);
  }
}
