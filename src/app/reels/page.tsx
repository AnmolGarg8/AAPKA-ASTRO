"use client";

import React, { useState } from "react";
import { ReelsStore, AstroReel } from "@/lib/store/reelsStore";
import { PLACEHOLDER_ASTROLOGER, PLACEHOLDER_SOCIAL_LINKS } from "@/config/placeholderContent";
import { MandalaDivider } from "@/components/ui/MandalaDivider";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import {
  Play,
  Eye,
  Heart,
  ExternalLink,
  Sparkles,
  X,
  Share2,
} from "lucide-react";

export default function ReelsPage() {
  const allReels = ReelsStore.getVisibleReels();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedReel, setSelectedReel] = useState<AstroReel | null>(null);

  const categories = ["All", "Horoscope", "Vastu", "Gemstone", "Remedy"];

  const filteredReels = allReels.filter(
    (r) => activeCategory === "All" || r.category === activeCategory
  );

  return (
    <div className="bg-[#FBF3E7] text-[#3B2A1E]">
      {/* 1. Header Banner */}
      <section className="border-b border-[#E8D8C3] bg-[#7B2D26] py-16 sm:py-20 text-[#FBF3E7]">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E8A33D]/30 bg-[#64221C] px-4 py-1 text-xs font-bold text-[#E8A33D] mb-4">
            <DiyaIcon size={14} />
            <span>DAILY VEDIC VIDEO SNIPPETS</span>
          </div>

          <h1 className="font-temple text-3xl sm:text-5xl font-bold tracking-tight text-[#FBF3E7]">
            Instagram Reels &amp; Astrological Shorts
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#FBF3E7]/80 max-w-2xl mx-auto font-body">
            Daily bite-sized Jyotish guidance, planetary transit alerts, and authentic Vastu tips by {PLACEHOLDER_ASTROLOGER.displayName}.
          </p>

          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href={PLACEHOLDER_SOCIAL_LINKS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E8A33D] px-6 py-3 text-xs sm:text-sm font-bold text-[#3B2A1E] hover:bg-[#F6CF86] transition-all shadow-md"
            >
              <span>Follow on Instagram ({PLACEHOLDER_SOCIAL_LINKS.instagram.handle})</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Reels Gallery */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Category Filter */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-5 py-2 text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#7B2D26] text-[#FBF3E7] shadow-sm"
                    : "bg-[#FFFDF9] text-[#3B2A1E] border border-[#E8D8C3] hover:bg-[#FBF3E7]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredReels.map((reel) => (
              <div
                key={reel.id}
                onClick={() => setSelectedReel(reel)}
                className="group cursor-pointer relative overflow-hidden rounded-2xl border border-[#E8D8C3] bg-[#FFFDF9] shadow-sm hover:shadow-lg transition-all hover:border-[#C1662F] flex flex-col"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[9/14] w-full overflow-hidden bg-[#3B2A1E]">
                  <img
                    src={reel.thumbnail}
                    alt={reel.caption}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 rounded-md bg-[#7B2D26]/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-[#FBF3E7]">
                    {reel.category}
                  </div>
                  <div className="absolute top-3 right-3 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-mono text-white">
                    {reel.videoDuration}
                  </div>

                  {/* Play overlay button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8A33D] text-[#3B2A1E] shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 fill-[#3B2A1E] ml-0.5" />
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                    <span className="flex items-center gap-1 font-medium text-[11px]">
                      <Eye className="h-3.5 w-3.5" />
                      {reel.views}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-[11px]">
                      <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400" />
                      {reel.likes}
                    </span>
                  </div>
                </div>

                {/* Caption */}
                <div className="p-4 flex flex-col flex-1 justify-between bg-[#FFFDF9]">
                  <p className="text-xs font-semibold text-[#3B2A1E] line-clamp-2 leading-relaxed">
                    {reel.caption}
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#E8D8C3] flex items-center justify-between text-[11px] text-[#6E5545]">
                    <span>{reel.date}</span>
                    <span className="font-bold text-[#C1662F]">Watch &rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <MandalaDivider opacity={0.3} />
          </div>
        </div>
      </section>

      {/* Reel Modal Preview */}
      {selectedReel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#E8D8C3] bg-[#FFFDF9] shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E8D8C3] px-6 py-4 bg-[#FBF3E7]">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#7B2D26] px-2 py-0.5 text-[10px] font-bold text-white">
                  {selectedReel.category}
                </span>
                <span className="text-xs font-bold text-[#7B2D26]">
                  {PLACEHOLDER_ASTROLOGER.displayName}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReel(null)}
                className="rounded-full p-1.5 text-[#3B2A1E] hover:bg-[#E8D8C3]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Video preview placeholder area */}
            <div className="relative aspect-[9/12] w-full bg-black flex items-center justify-center">
              <img
                src={selectedReel.thumbnail}
                alt={selectedReel.caption}
                className="h-full w-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              <div className="absolute flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E8A33D] text-[#3B2A1E] shadow-2xl">
                  <Play className="h-7 w-7 fill-[#3B2A1E] ml-1" />
                </div>
                <span className="text-xs text-white/90 font-medium">
                  Interactive Video Preview
                </span>
              </div>
            </div>

            {/* Content & Action */}
            <div className="p-6">
              <p className="text-sm font-semibold text-[#3B2A1E] leading-relaxed">
                {selectedReel.caption}
              </p>

              <div className="mt-4 flex items-center justify-between text-xs text-[#6E5545] border-t border-[#E8D8C3] pt-4">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4 text-[#C1662F]" />
                    {selectedReel.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                    {selectedReel.likes} likes
                  </span>
                </div>

                <a
                  href={selectedReel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#7B2D26] px-4 py-2 text-xs font-bold text-white hover:bg-[#96372E] transition-all"
                >
                  <span>Open in Instagram</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
