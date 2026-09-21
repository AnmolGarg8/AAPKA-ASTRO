// PLACEHOLDER: replace with real content
import { PLACEHOLDER_SOCIAL_LINKS } from "@/config/placeholderContent";

export interface AstroReel {
  id: string;
  caption: string;
  thumbnail: string;
  videoDuration: string;
  views: string;
  likes: string;
  instagramUrl: string;
  pinnedToHome: boolean;
  isHidden: boolean;
  date: string;
  category: "Horoscope" | "Vastu" | "Gemstone" | "Remedy";
}

export const INITIAL_REELS: AstroReel[] = [
  {
    id: "reel-1",
    caption: "Is your main entrance in the South? 3 powerful zero-demolition remedies you must do this week! 🚪✨",
    thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=600&q=80",
    videoDuration: "0:58",
    views: "142.5K",
    likes: "12.8K",
    instagramUrl: PLACEHOLDER_SOCIAL_LINKS.instagram.url,
    pinnedToHome: true,
    isHidden: false,
    date: "2 days ago",
    category: "Vastu",
  },
  {
    id: "reel-2",
    caption: "Saturn retrograde ends! What each Moon sign needs to prepare for over the next 45 days 🪐",
    thumbnail: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80",
    videoDuration: "1:15",
    views: "98.2K",
    likes: "8.4K",
    instagramUrl: PLACEHOLDER_SOCIAL_LINKS.instagram.url,
    pinnedToHome: true,
    isHidden: false,
    date: "4 days ago",
    category: "Horoscope",
  },
  {
    id: "reel-3",
    caption: "Never wear a gemstone without testing this single test first! Real vs synthetic Ruby & Sapphire test 💎",
    thumbnail: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    videoDuration: "0:45",
    views: "210.4K",
    likes: "24.1K",
    instagramUrl: PLACEHOLDER_SOCIAL_LINKS.instagram.url,
    pinnedToHome: true,
    isHidden: false,
    date: "1 week ago",
    category: "Gemstone",
  },
  {
    id: "reel-4",
    caption: "How simple morning Surya Arghya (copper water offering) cures Rahu & Ketu restlessness instantly ☀️",
    thumbnail: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80",
    videoDuration: "0:52",
    views: "76.9K",
    likes: "7.1K",
    instagramUrl: PLACEHOLDER_SOCIAL_LINKS.instagram.url,
    pinnedToHome: false,
    isHidden: false,
    date: "2 weeks ago",
    category: "Remedy",
  },
  {
    id: "reel-5",
    caption: "Why money drains out of your wallet despite earning well: Check this Vastu corner right now 💰",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    videoDuration: "1:02",
    views: "185.0K",
    likes: "19.3K",
    instagramUrl: PLACEHOLDER_SOCIAL_LINKS.instagram.url,
    pinnedToHome: true,
    isHidden: false,
    date: "3 weeks ago",
    category: "Vastu",
  },
  {
    id: "reel-6",
    caption: "Manglik Dosha after age 28: Does it really cancel automatically? Vedic truth revealed.",
    thumbnail: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    videoDuration: "1:20",
    views: "115.3K",
    likes: "11.2K",
    instagramUrl: PLACEHOLDER_SOCIAL_LINKS.instagram.url,
    pinnedToHome: false,
    isHidden: false,
    date: "1 month ago",
    category: "Horoscope",
  },
];

let memoryReels = [...INITIAL_REELS];

export const ReelsStore = {
  getVisibleReels: (): AstroReel[] => {
    return memoryReels.filter((r) => !r.isHidden);
  },

  getPinnedReels: (): AstroReel[] => {
    return memoryReels.filter((r) => r.pinnedToHome && !r.isHidden);
  },

  getAllReels: (): AstroReel[] => {
    return memoryReels;
  },

  togglePin: (id: string): void => {
    const reel = memoryReels.find((r) => r.id === id);
    if (reel) {
      reel.pinnedToHome = !reel.pinnedToHome;
    }
  },

  toggleHide: (id: string): void => {
    const reel = memoryReels.find((r) => r.id === id);
    if (reel) {
      reel.isHidden = !reel.isHidden;
    }
  },
};
