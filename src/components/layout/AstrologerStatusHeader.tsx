"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AstrologerStateStore, AstrologerStatus, QueueItem } from "@/lib/store/astrologerStore";
import { PhoneCall } from "lucide-react";
import { DiyaIcon } from "@/components/ui/DiyaIcon";

import { PLACEHOLDER_ASTROLOGER, ADMIN_CONFIGURABLE_PRICING } from "@/config/placeholderContent";

export const AstrologerStatusHeader: React.FC = () => {
  const [status, setStatus] = useState<AstrologerStatus>("AVAILABLE");
  const [queue, setQueue] = useState<QueueItem[]>([]);

  const syncState = () => {
    setStatus(AstrologerStateStore.getStatus());
    setQueue(AstrologerStateStore.getQueue());
  };

  useEffect(() => {
    syncState();
    window.addEventListener("astro_state_changed", syncState);
    const interval = setInterval(syncState, 2000);
    return () => {
      window.removeEventListener("astro_state_changed", syncState);
      clearInterval(interval);
    };
  }, []);

  const queueCount = queue.length;
  const estWait = (queueCount + 1) * 7;

  return (
    <aside
      aria-label="Astrologer Live Status"
      className="border-b border-[#E8D8C3] bg-[#7B2D26] px-4 py-2 text-xs text-[#FBF3E7]"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        {/* Left: Real-time Astrologer Status Indicator */}
        {/* PLACEHOLDER: replace with real content */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <DiyaIcon size={18} />
            <div className="relative flex items-center">
              {status === "AVAILABLE" && (
                <>
                  <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#6B8E5A] opacity-75" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-[#6B8E5A]" />
                </>
              )}
              {status === "BUSY" && (
                <>
                  <span className="absolute h-3 w-3 animate-ping rounded-full bg-[#E8A33D] opacity-75" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-[#E8A33D]" />
                </>
              )}
              {status === "BREAK" && (
                <span className="relative h-2.5 w-2.5 rounded-full bg-[#C1662F]" />
              )}
              {status === "OFFLINE" && (
                <span className="relative h-2.5 w-2.5 rounded-full bg-[#A8988B]" />
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <span className="font-temple tracking-wide text-[#FBF3E7] font-semibold">
              {PLACEHOLDER_ASTROLOGER.displayName}:
            </span>

            {status === "AVAILABLE" && (
              <span className="text-[#A7D095] font-bold flex items-center gap-1">
                ONLINE &amp; AVAILABLE
                <span className="hidden sm:inline text-[#FBF3E7]/80 font-normal">
                  — 1-on-1 Consultation (From ₹{ADMIN_CONFIGURABLE_PRICING.chat.ratePerMinute}/min • 50% Off First)
                </span>
              </span>
            )}

            {status === "BUSY" && (
              <span className="text-[#F6CF86] font-semibold flex items-center gap-1">
                IN CONSULTATION
                <span className="hidden sm:inline text-[#FBF3E7]/80 font-normal">
                  ({queueCount} waiting • Est. wait ~{estWait} mins)
                </span>
              </span>
            )}

            {status === "BREAK" && (
              <span className="text-[#F6CF86] font-medium">
                ON BREAK — Resuming live sessions shortly
              </span>
            )}

            {status === "OFFLINE" && (
              <span className="text-[#FBF3E7]/70">
                OFFLINE — Next live slot: Tomorrow 10:00 AM IST
              </span>
            )}
          </div>
        </div>

        {/* Right: Quick CTA & Astrologer Cockpit Demo Switch */}
        <div className="flex items-center gap-3">
          <Link
            href="/consult"
            className="flex items-center gap-1.5 rounded-lg bg-[#E8A33D] px-3.5 py-1 text-xs font-bold text-[#3B2A1E] hover:bg-[#F6CF86] transition-all shadow-sm"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>
              {status === "AVAILABLE" ? "Consult Now" : status === "BUSY" ? "Join Queue" : "Book Slot"}
            </span>
          </Link>

          <Link
            href="/astrologer"
            className="hidden md:flex items-center gap-1 rounded-lg border border-[#FBF3E7]/30 bg-[#FBF3E7]/10 px-2.5 py-1 text-[11px] font-semibold text-[#FBF3E7] hover:bg-[#FBF3E7]/20 transition-all"
            title="Operator Cockpit"
          >
            <span>Operator Cockpit</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
