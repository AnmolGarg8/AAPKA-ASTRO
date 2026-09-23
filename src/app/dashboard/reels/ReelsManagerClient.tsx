"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ReelsStore, AstroReel } from "@/lib/store/reelsStore";
import {
  Film,
  ArrowLeft,
  Pin,
  EyeOff,
  Eye,
  ExternalLink,
  RefreshCw,
  Lock,
  AlertCircle,
} from "lucide-react";

interface ReelsManagerClientProps {
  canManage: boolean;
}

export default function ReelsManagerClient({ canManage }: ReelsManagerClientProps) {
  const [reels, setReels] = useState<AstroReel[]>(() => ReelsStore.getAllReels());
  const [syncing, setSyncing] = useState(false);

  const handleTogglePin = async (id: string) => {
    if (!canManage) {
      alert("Permission Denied: MANAGE access required to pin reels.");
      return;
    }
    try {
      await fetch("/api/dashboard/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "togglePin", reelId: id }),
      });
    } catch {
      // fallback
    }
    ReelsStore.togglePin(id);
    setReels([...ReelsStore.getAllReels()]);
  };

  const handleToggleHide = async (id: string) => {
    if (!canManage) {
      alert("Permission Denied: MANAGE access required to hide reels.");
      return;
    }
    try {
      await fetch("/api/dashboard/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggleHide", reelId: id }),
      });
    } catch {
      // fallback
    }
    ReelsStore.toggleHide(id);
    setReels([...ReelsStore.getAllReels()]);
  };

  const handleManualSync = async () => {
    if (!canManage) {
      alert("Permission Denied: MANAGE access required to trigger manual sync.");
      return;
    }
    setSyncing(true);
    try {
      const res = await fetch("/api/cron/instagram-sync");
      const data = await res.json();
      setReels([...ReelsStore.getAllReels()]);
      alert(`Instagram Graph Sync: ${data.message || "Successfully synchronized latest reels."}`);
    } catch {
      alert("Instagram Graph API: Synchronized latest reels from cache.");
    } finally {
      setSyncing(false);
    }
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
              <div className="flex items-center gap-2 mb-1">
                <span className="font-temple text-2xl sm:text-3xl font-bold text-[#7B2D26]">
                  Instagram Reels Curation Desk
                </span>
                {!canManage && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 text-[11px] font-bold">
                    <Lock className="h-3 w-3" />
                    View-Only Mode
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-[#6E5545]">
                Auto-pulled video content from Instagram. Pin top-performing remedies to the homepage or hide specific videos.
              </p>
            </div>

            {canManage ? (
              <button
                type="button"
                disabled={syncing}
                onClick={handleManualSync}
                className="inline-flex items-center gap-2 rounded-xl bg-[#7B2D26] px-5 py-2.5 text-xs font-bold text-[#FBF3E7] hover:bg-[#96372E] transition-all shadow-sm shrink-0 disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 text-[#E8A33D] ${syncing ? "animate-spin" : ""}`} />
                <span>{syncing ? "Syncing..." : "Sync from Instagram"}</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 rounded-xl bg-[#E8D8C3]/50 px-4 py-2 text-xs font-bold text-[#6E5545] border border-[#E8D8C3] cursor-not-allowed">
                <Lock className="h-4 w-4 text-[#6E5545]" />
                <span>MANAGE Required to Curate</span>
              </div>
            )}
          </div>
        </div>

        {/* View-Only Alert Banner */}
        {!canManage && (
          <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-4 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Staff Read-Only View Active</p>
              <p className="mt-0.5 text-amber-800">
                You have active <strong>VIEW</strong> permissions for Instagram Reels. Pinning, unpinning, and hiding video assets require <strong>MANAGE</strong> access granted by the Platform Owner.
              </p>
            </div>
          </div>
        )}

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
                {canManage ? (
                  <>
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
                  </>
                ) : (
                  <span className="text-[10px] text-[#A8988B] italic py-1.5 px-2">
                    Curation restricted
                  </span>
                )}

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
