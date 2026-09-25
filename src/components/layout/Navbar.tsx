"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AstrologerStateStore, AstrologerStatus } from "@/lib/store/astrologerStore";
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
  Star,
  Globe,
} from "lucide-react";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import { Show, UserButton, SignInButton, SignUpButton } from "@/components/auth/ClerkAuthWrapper";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrentUserRole } from "@/lib/auth/roleContext";
import { CallbackRequestModal } from "@/components/consult/CallbackRequestModal";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { isAstrologer } = useCurrentUserRole();
  const [walletBalance, setWalletBalance] = useState(250);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState<AstrologerStatus>("AVAILABLE");
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);

  const syncState = () => {
    setWalletBalance(AstrologerStateStore.getWalletBalance());
    setStatus(AstrologerStateStore.getStatus());
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

  const navLinks = [
    { label: t("nav_services"), href: "/services", icon: Compass },
    { label: t("nav_live_consult"), href: "/consult", icon: PhoneCall, highlight: true },
    { label: t("nav_horoscope"), href: "/horoscope", icon: Star },
    { label: t("nav_matching"), href: "/kundli-matching", icon: HeartHandshake },
    { label: t("nav_kundli"), href: "/kundli-generator", icon: FileText },
    { label: t("nav_panchang"), href: "/panchang", icon: DiyaIcon },
    { label: t("nav_reels"), href: "/reels", icon: Sparkles },
    { label: t("nav_blog"), href: "/blog", icon: BookOpen },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#E8D8C3] bg-[#FFFDF9]/95 backdrop-blur-md shadow-[0_2px_8px_rgba(59,42,30,0.04)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Left: Brand & Sitewide Live Status */}
          <div className="flex items-center gap-3">
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

            {/* Sitewide Prominent Live Status Indicator */}
            <div className="hidden xl:flex items-center pl-3 border-l border-[#E8D8C3]/80">
              {status === "AVAILABLE" ? (
                <Link
                  href="/consult"
                  className="flex items-center gap-1.5 rounded-full bg-[#6B8E5A]/15 border border-[#6B8E5A]/40 px-3 py-1 text-[11px] font-bold text-[#2A4720] hover:bg-[#6B8E5A]/25 transition-all shadow-2xs"
                  title="Acharya Ji is available for instant live chat/call"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6B8E5A] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6B8E5A]" />
                  </span>
                  <span>Online &bull; Available for Chat/Call</span>
                </Link>
              ) : status === "BUSY" ? (
                <button
                  type="button"
                  onClick={() => setCallbackModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-full bg-[#E8A33D]/15 border border-[#E8A33D]/40 px-3 py-1 text-[11px] font-bold text-[#7B2D26] hover:bg-[#E8A33D]/25 transition-all shadow-2xs"
                  title="In session. Click to request priority callback"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8A33D] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E8A33D]" />
                  </span>
                  <span>In Session &bull; Notify Me</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCallbackModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-full bg-[#C1662F]/15 border border-[#C1662F]/40 px-3 py-1 text-[11px] font-bold text-[#7B2D26] hover:bg-[#C1662F]/25 transition-all shadow-2xs"
                  title="Offline. Click to request callback"
                >
                  <span className="h-2 w-2 rounded-full bg-[#C1662F]" />
                  <span>Offline &bull; Request Callback</span>
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#7B2D26] text-[#FBF3E7] shadow-xs"
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

          {/* Right Actions: Language Toggle, Wallet & Profile */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              className="flex items-center gap-1 rounded-lg border border-[#E8D8C3] bg-[#FBF3E7] px-2 py-1.5 text-xs font-bold text-[#7B2D26] hover:bg-[#E8D8C3]/60 transition-all shadow-2xs"
              title="Toggle Language (English / हिन्दी)"
            >
              <Globe className="h-3 w-3 text-[#C1662F]" />
              <span className="font-hindi">{language === "en" ? "हिन्दी" : "EN"}</span>
            </button>

            {/* Wallet Balance Widget */}
            <Link
              href="/wallet"
              className="flex items-center gap-1.5 rounded-lg border border-[#E8D8C3] bg-[#FBF3E7] px-2.5 py-1.5 text-xs font-bold text-[#3B2A1E] hover:border-[#C1662F] transition-all shadow-2xs"
              title="Your Aapka Astro Wallet Balance"
            >
              <Wallet className="h-3.5 w-3.5 text-[#C1662F]" />
              <span className="font-mono font-black text-[#7B2D26]">₹{walletBalance}</span>
              <span className="hidden sm:inline text-[10px] text-[#7B2D26] font-bold bg-[#E8A33D]/25 px-1.5 py-0.5 rounded">
                {t("nav_top_up")}
              </span>
            </Link>

            {/* User Account / Auth Actions */}
            <Show when="signed-out">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 rounded-lg border border-[#7B2D26] bg-transparent px-2.5 py-1.5 text-xs font-bold text-[#7B2D26] hover:bg-[#7B2D26]/10 transition-all cursor-pointer"
                >
                  <User className="h-3.5 w-3.5" />
                  <span>{t("nav_sign_in")}</span>
                </Link>
                <Link
                  href="/signup"
                  className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[#7B2D26] bg-[#7B2D26] px-3 py-1.5 text-xs font-bold text-[#FBF3E7] hover:bg-[#64221C] transition-all shadow-xs cursor-pointer"
                >
                  <Sparkles className="h-3 w-3 text-[#E8A33D]" />
                  <span>Sign Up</span>
                </Link>
              </div>
            </Show>

            <Show when="signed-in">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  href="/account"
                  className="flex items-center gap-1.5 rounded-lg border border-[#E8D8C3] bg-[#FFFDF9] px-2.5 py-1.5 text-xs font-bold text-[#3B2A1E] hover:bg-[#FBF3E7] transition-all"
                >
                  <User className="h-3.5 w-3.5 text-[#6E5545]" />
                  <span className="hidden md:inline">{t("nav_my_account")}</span>
                </Link>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-7 w-7 rounded-full border border-[#E8D8C3]",
                    },
                  }}
                />
              </div>
            </Show>

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
          <div className="border-t border-[#E8D8C3] bg-[#FFFDF9] px-4 py-4 lg:hidden max-h-[85vh] overflow-y-auto">
            {/* Mobile Status Banner */}
            <div className="mb-4 rounded-xl border border-[#E8D8C3] bg-[#FBF3E7] p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    status === "AVAILABLE"
                      ? "bg-[#6B8E5A]"
                      : status === "BUSY"
                      ? "bg-[#E8A33D]"
                      : "bg-[#C1662F]"
                  }`}
                />
                <span className="text-xs font-bold text-[#7B2D26]">
                  {status === "AVAILABLE"
                    ? "Acharya Ji is Online"
                    : status === "BUSY"
                    ? "In Consultation"
                    : "Currently Offline"}
                </span>
              </div>

              {status !== "AVAILABLE" && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCallbackModalOpen(true);
                  }}
                  className="rounded-lg bg-[#7B2D26] px-2.5 py-1 text-[11px] font-bold text-[#FBF3E7]"
                >
                  Notify Me
                </button>
              )}
            </div>

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

              <div className="border-t border-[#E8D8C3] pt-2 mt-2 flex flex-col gap-2">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 rounded-lg border border-[#7B2D26] bg-transparent px-3 py-2 text-xs font-bold text-[#7B2D26]"
                    >
                      <User className="h-4 w-4" />
                      <span>{t("nav_sign_in")}</span>
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#7B2D26] px-3 py-2 text-xs font-bold text-[#FBF3E7]"
                    >
                      <Sparkles className="h-4 w-4 text-[#E8A33D]" />
                      <span>Sign Up</span>
                    </button>
                  </SignUpButton>
                </Show>

                <Show when="signed-in">
                  <div className="flex items-center justify-between px-1 py-1">
                    <Link
                      href="/account"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 text-xs font-bold text-[#3B2A1E]"
                    >
                      <User className="h-4 w-4 text-[#7B2D26]" />
                      <span>{t("nav_my_account")}</span>
                    </Link>
                    <UserButton />
                  </div>
                </Show>

                {isAstrologer && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-lg border border-[#7B2D26]/20 bg-[#7B2D26]/10 px-3 py-2.5 text-xs font-bold text-[#7B2D26]"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    <span>Operator Cockpit (Admin)</span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Callback / Notify Me Modal */}
      <CallbackRequestModal
        isOpen={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
        astrologerStatus={status}
      />
    </>
  );
};
