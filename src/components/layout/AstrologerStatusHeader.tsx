"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AstrologerStateStore, AstrologerStatus, QueueItem } from "@/lib/store/astrologerStore";
import { Clock, ShieldCheck, Sparkles, UserCheck, Flame, PhoneCall } from "lucide-react";

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
    <aside aria-label="Astrologer Live Status" className="border-b border-amber-500/20 bg-gradient-to-r from-slate-950 via-[#0F172A] to-slate-950 px-4 py-2 text-xs backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        {/* Left: Real-time Astrologer Status Indicator */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center">
            {status === "AVAILABLE" && (
              <>
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />
              </>
            )}
            {status === "BUSY" && (
              <>
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
              </>
            )}
            {status === "BREAK" && (
              <span className="relative h-2.5 w-2.5 rounded-full bg-indigo-400 shadow" />
            )}
            {status === "OFFLINE" && (
              <span className="relative h-2.5 w-2.5 rounded-full bg-slate-500" />
            )}
          </div>

          <div className="flex items-center gap-1.5 font-medium">
            <span className="text-white font-semibold">Acharya Rajesh Sharma:</span>

            {status === "AVAILABLE" && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                ONLINE &amp; AVAILABLE
                <span className="hidden sm:inline text-slate-400 font-normal">
                  — Direct 1-on-1 Audio/Chat (Intro: ₹19/min)
                </span>
              </span>
            )}

            {status === "BUSY" && (
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                IN CONSULTATION
                <span className="hidden sm:inline text-slate-300 font-normal">
                  ({queueCount} in queue • Est. wait ~{estWait} mins)
                </span>
              </span>
            )}

            {status === "BREAK" && (
              <span className="text-indigo-300 font-medium">
                ON BREAK — Resuming live sessions shortly
              </span>
            )}

            {status === "OFFLINE" && (
              <span className="text-slate-400">
                OFFLINE — Next live slot: Tomorrow 10:00 AM IST
              </span>
            )}
          </div>
        </div>

        {/* Right: Quick CTA & Astrologer Cockpit Demo Switch */}
        <div className="flex items-center gap-3">
          <Link
            href="/consult"
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1 font-bold text-slate-950 hover:bg-amber-400 hover:shadow-md hover:shadow-amber-500/20 transition-all"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>{status === "AVAILABLE" ? "Consult Now" : status === "BUSY" ? "Join Queue" : "Book Slot"}</span>
          </Link>

          <Link
            href="/astrologer"
            className="hidden md:flex items-center gap-1 rounded-lg border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300 hover:bg-amber-500/20 transition-all"
            title="Switch to Astrologer Cockpit to toggle status and accept live calls"
          >
            <span>Operator Cockpit</span>
            <span className="rounded bg-amber-500/30 px-1 text-[9px]">Admin</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};
