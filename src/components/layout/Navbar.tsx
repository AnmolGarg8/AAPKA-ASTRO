"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AstrologerStateStore } from "@/lib/store/astrologerStore";
import {
  Wallet,
  Menu,
  X,
  PhoneCall,
  Gem,
  Compass,
  FileText,
  HeartHandshake,
  User,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { DiyaIcon } from "@/components/ui/DiyaIcon";

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
    { label: "Services", href: "/services", icon: Compass },
    { label: "Live Consult", href: "/consult", icon: PhoneCall, highlight: true },
    { label: "Kundli Generator", href: "/kundli-generator", icon: FileText },
    { label: "Daily Panchang", href: "/panchang", icon: HeartHandshake },
    { label: "Reels", href: "/reels", icon: Sparkles },
    { label: "Blog", href: "/blog", icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#E8D8C3] bg-[#FFFDF9]/95 backdrop-blur-md shadow-[0_2px_8px_rgba(59,42,30,0.04)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Emblem */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <img
            src="/images/logo.png"
            alt="Aapka Astro"
            className="h-10 w-10 object-contain rounded-xl border border-[#C1662F]/30 bg-[#7B2D26] p-1 shadow-sm group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-temple text-xl font-bold tracking-wider text-[#7B2D26]">
                AAPKA<span className="text-[#C1662F]">ASTRO</span>
              </span>
              <span className="rounded bg-[#FBF3E7] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#7B2D26] border border-[#E8D8C3]">
                Vedic
              </span>
            </div>
            <div className="text-[10px] text-[#6E5545] font-medium tracking-wide flex items-center gap-1">
              <span>Acharya Niraj Kumar &bull; Jyotish &amp; Vastu</span>
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
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#7B2D26] text-[#FBF3E7] shadow-sm"
                    : link.highlight
                    ? "text-[#7B2D26] bg-[#E8A33D]/15 hover:bg-[#E8A33D]/25"
                    : "text-[#3B2A1E] hover:bg-[#FBF3E7] hover:text-[#7B2D26]"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${link.highlight ? "text-[#7B2D26]" : ""}`} />
                <span>{link.label}</span>
                {link.highlight && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6B8E5A] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6B8E5A]" />
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
            className="flex items-center gap-2 rounded-lg border border-[#E8D8C3] bg-[#FBF3E7] px-3 py-1.5 text-xs font-bold text-[#3B2A1E] hover:border-[#C1662F] transition-all"
            title="Your Aapka Astro Wallet Balance"
          >
            <Wallet className="h-3.5 w-3.5 text-[#C1662F]" />
            <span className="font-mono font-black text-[#7B2D26]">₹{walletBalance}</span>
            <span className="hidden sm:inline text-[10px] text-[#7B2D26] font-bold bg-[#E8A33D]/25 px-1.5 py-0.5 rounded">
              + Top up
            </span>
          </Link>

          {/* User Account */}
          <Link
            href="/account"
            className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[#E8D8C3] bg-[#FFFDF9] px-3 py-1.5 text-xs font-bold text-[#3B2A1E] hover:bg-[#FBF3E7] transition-all"
          >
            <User className="h-3.5 w-3.5 text-[#6E5545]" />
            <span>My Account</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-[#E8D8C3] bg-[#FBF3E7] p-2 text-[#3B2A1E] lg:hidden hover:bg-[#E8D8C3]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E8D8C3] bg-[#FFFDF9] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-bold text-[#3B2A1E] hover:bg-[#FBF3E7]"
                >
                  <Icon className="h-4 w-4 text-[#7B2D26]" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg border border-[#E8D8C3] bg-[#FBF3E7] px-3 py-2.5 text-xs font-bold text-[#3B2A1E]"
            >
              <User className="h-4 w-4 text-[#7B2D26]" />
              <span>My Account</span>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg border border-[#7B2D26]/20 bg-[#7B2D26]/10 px-3 py-2.5 text-xs font-bold text-[#7B2D26]"
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
