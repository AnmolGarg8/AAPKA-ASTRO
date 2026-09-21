"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AstrologerStateStore } from "@/lib/store/astrologerStore";
import {
  Sparkles,
  Wallet,
  Menu,
  X,
  PhoneCall,
  Flame,
  Gem,
  Compass,
  FileText,
  HeartHandshake,
  User,
  ShieldCheck
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [walletBalance, setWalletBalance] = useState(250);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const updateBalance = () => {
    setWalletBalance(AstrologerStateStore.getWalletBalance());
  };

  useEffect(() => {
    updateBalance();
    window.addEventListener("astro_state_changed", updateBalance);
    return () => {
      window.removeEventListener("astro_state_changed", updateBalance);
    };
  }, []);

  const navLinks = [
    { label: "Free Kundli", href: "/kundli", icon: FileText },
    { label: "Kundli Milan", href: "/kundli-matching", icon: HeartHandshake },
    { label: "Live Consult", href: "/consult", icon: PhoneCall, highlight: true },
    { label: "Vastu Shastra", href: "/vastu", icon: Compass },
    { label: "Gemstones", href: "/gemstones", icon: Gem },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#0B0F19]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 text-slate-950 font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-all">
            <Sparkles className="h-5 w-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white">
                AAPKA<span className="text-amber-400">ASTRO</span>
              </span>
              <span className="rounded bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-bold uppercase tracking-wider text-amber-300 border border-amber-500/30">
                Vedic
              </span>
            </div>
            <div className="text-[10px] text-amber-200/70 font-medium tracking-wide">
              Bespoke Jyotish &amp; Vastu Advisory
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    : link.highlight
                    ? "text-amber-300 hover:bg-amber-500/10"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${link.highlight ? "text-amber-400" : ""}`} />
                <span>{link.label}</span>
                {link.highlight && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Wallet & Profile */}
        <div className="flex items-center gap-3">
          {/* Wallet Balance Widget */}
          <Link
            href="/wallet"
            className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 to-amber-600/20 px-3 py-1.5 text-xs font-bold text-amber-300 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 transition-all"
            title="Your Aapka Astro Wallet Balance"
          >
            <Wallet className="h-4 w-4 text-amber-400" />
            <span>₹{walletBalance}</span>
            <span className="hidden sm:inline text-[10px] text-amber-400/80 font-semibold bg-amber-500/20 px-1.5 py-0.5 rounded">
              + Recharge
            </span>
          </Link>

          {/* User Dashboard / Profile */}
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-semibold text-white hover:border-slate-600 hover:bg-slate-800 transition-all"
          >
            <User className="h-3.5 w-3.5 text-slate-400" />
            <span>My Account</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-slate-700 bg-slate-800 p-2 text-slate-300 lg:hidden hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-800"
                >
                  <Icon className="h-4 w-4 text-amber-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <Link
              href="/astrologer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-sm font-semibold text-amber-300"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Operator Cockpit (Admin)</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
