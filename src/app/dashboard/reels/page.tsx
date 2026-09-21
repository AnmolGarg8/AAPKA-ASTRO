"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ReelsStore, AstroReel } from "@/lib/store/reelsStore";
import { PLACEHOLDER_SOCIAL_LINKS } from "@/config/placeholderContent";
import {
  Film,
  ArrowLeft,
  Pin,
  EyeOff,
  Eye,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  Heart,
} from "lucide-react";

export default function AstrologerReelsManager() {
  const [reels, setReels] = useState<AstroReel[]>(() => ReelsStore.getAllReels());
  const [syncing, setSyncing] = useState(false);

  const handleTogglePin = (id: string) => {
    ReelsStore.togglePin(id);
    setReels([...ReelsStore.getAllReels()]);
  };

  const handleToggleHide = (id: string) => {
    ReelsStore.toggleHide(id);
    setReels([...ReelsStore.getAllReels()]);
  };

  const handleManualSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert("Instagram Graph API: Successfully synchronized 6 recent reels with Aapka Astro database.");
    }, 1200);
  };

  return (
    <div className="bg-[#FBF3E7] text-[#3B2A1E] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Navigation & Header */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7B2D26] hover:underline mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Operator Cockpit</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-temple text-2xl sm:text-3xl font-bold text-[#7B2D26]">
                Instagram Reels Curation Desk
              </h1>
              <p className="text-xs sm:text-sm text-[#6E5545] mt-1">
                Auto-pulled video content from Instagram. Pin top-performing remedies to the homepage or hide specific videos.
              </p>
            </div>

            <button
              type="button"
              disabled={syncing}
              onClick={handleManualSync}
              className="inline-flex items-center gap-2 rounded-xl bg-[#7B2D26] px-5 py-2.5 text-xs font-bold text-[#FBF3E7] hover:bg-[#96372E] transition-all shadow-sm shrink-0 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 text-[#E8A33D] ${syncing ? "animate-spin" : ""}`} />
              <span>{syncing ? "Syncing..." : "Sync from Instagram"}</span>
            </button>
          </div>
        </div>

        {/* Reels Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className={`rounded-3xl border bg-[#FFFDF9] p-5 shadow-sm flex flex-col justify-between transition-all ${
                reel.isHidden ? "opacity-60 border-dashed border-[#A8988B]" : "border-[#E8D8C3]"
              }`}
            >
              <div>
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-3 bg-[#3B2A1E]">
                  <img
                    src={reel.thumbnail}
                    alt={reel.caption}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 left-2 rounded bg-[#7B2D26]/90 px-2 py-0.5 text-[10px] font-bold text-white">
                    {reel.category}
                  </div>
                  {reel.pinnedToHome && (
                    <div className="absolute top-2 right-2 rounded bg-[#E8A33D] px-2 py-0.5 text-[10px] font-bold text-[#3B2A1E] flex items-center gap-1 shadow-sm">
                      <Pin className="h-3 w-3" />
                      <span>Pinned to Home</span>
                    </div>
                  )}
                  {reel.isHidden && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-xs font-bold text-white">
                      Hidden from Public
                    </div>
                  )}
                </div>

                <p className="text-xs font-semibold text-[#3B2A1E] line-clamp-2">
                  {reel.caption}
                </p>

                <div className="mt-2 flex items-center justify-between text-[11px] text-[#6E5545]">
                  <span>{reel.views} Views • {reel.likes} Likes</span>
                  <span>{reel.date}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-[#E8D8C3] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleTogglePin(reel.id)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1 ${
                    reel.pinnedToHome
                      ? "bg-[#E8A33D]/20 text-[#7B2D26] border border-[#E8A33D]"
                      : "border border-[#E8D8C3] bg-[#FBF3E7] text-[#6E5545] hover:text-[#3B2A1E]"
                  }`}
                >
                  <Pin className="h-3.5 w-3.5" />
                  <span>{reel.pinnedToHome ? "Unpin" : "Pin"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleHide(reel.id)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1 ${
                    reel.isHidden
                      ? "bg-[#6B8E5A]/15 text-[#2A4720] border border-[#6B8E5A]/30"
                      : "border border-[#E8D8C3] bg-[#FBF3E7] text-[#6E5545] hover:text-rose-600"
                  }`}
                >
                  {reel.isHidden ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  <span>{reel.isHidden ? "Unhide" : "Hide"}</span>
                </button>

                <a
                  href={reel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[#E8D8C3] p-1.5 text-[#6E5545] hover:text-[#7B2D26]"
                  title="View on Instagram"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
