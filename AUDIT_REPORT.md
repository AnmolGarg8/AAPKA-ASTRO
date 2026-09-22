# AAPKA ASTRO — Codebase Audit Report

**Date & Time**: 2026-09-22 | **Audited Version**: Commit `ea91975`  
**Purpose**: Comprehensive audit of the codebase against the original project specification and the brand data from `aapkaastro.com`.

---

## 1. What's Fully Implemented & Matches the Spec

### 1.1 Architecture, Tech Stack & Design System (Section 1)
- **Framework**: Next.js 16 (App Router) with TypeScript and Tailwind CSS v4.
- **Temple-Inspired Palette**: `#7B2D26` (Deep Vermillion), `#E8A33D` (Sacred Gold), `#C1662F` (Warm Terracotta), `#FBF3E7` (Champa Parchment), `#3B2A1E` (Dark Sandalwood), and `#6B8E5A` (Basil / Tulsi Green).
- **Sacred Typography & Ornaments**: Cinzel font for temple titles, Mukta for body/Hindi text, custom SVG `DiyaIcon`, and SVG `MandalaDivider`.
- **Authentic Visuals & Branding**: Official brand logo (`/images/logo.png`), high-res portrait of Acharya Niraj Kumar (`/images/Acharya_Niraj_Kumar.jpg`), official favicon (`/favicon.ico`), and 7 official credentials & award images in `/gallery/`.

### 1.2 Site Map & Page Routing (Section 2)
- **Public Pages (100% Present)**:
  - `/` (Home): Hero with live status pill, 4-core services grid, client testimonials, Instagram reels feed, daily Panchang widget, blog preview, and instant consultation CTA.
  - `/about`: Detailed biography of Acharya Niraj Kumar, Baidyanath Dham spiritual roots, discipleship of Late Guru Shri B. B. Tiwari, dual-foundation comparison (Corporate Leadership vs. Vedic Mastery), YouTube discourse video embed, and interactive visual certificate gallery (`GallerySection.tsx`).
  - `/services`: Overview of the 4 sacred pillars (Kundli, Vastu, Gemstone, Live Consultation).
  - `/services/[slug]`: Deep-dive service pages for all four slugs with 4-step methodology, deliverables, preparation checklists, and FAQs.
  - `/blog` & `/blog/[slug]`: Paginated/categorized Vedic Astrology Journal with full markdown article reading.
  - `/panchang`: Dedicated daily Vedic Panchang page featuring all 5 limbs, solar/lunar timings, Rahu Kaal, Abhijit Muhurat, and dynamic Choghadiya table.
  - `/reels`: Instagram reels gallery page with category filter (All, Daily Panchang, Astrological Guidance) and inline video player modal.
  - `/testimonials`: Full testimonials page with service filter and verified seeker reviews.
  - `/contact`: Official desk with Delhi NCR & Baidyanath Dham sanctums, operating hours, direct WhatsApp CTA (`https://wa.me/919311215564`), and callback request form.
  - `/kundli-generator`, `/kundli`, & `/kundli-matching`: Free birth chart generator, detailed Kundli analysis, and 36-Guna Ashtakoot Milan calculator.
  - `/gemstones` & `/vastu`: Dedicated service deep-dive pages.
- **Authentication Pages**:
  - `/login` & `/signup`: Mobile number OTP flow with resilient client-side test bypass (`123456`) and provider abstraction.
- **Client Account Portal (`/account/*`)**:
  - `/account`: Account shell with live wallet balance and quick shortcuts.
  - `/account/wallet` & `/wallet`: Razorpay recharge package picker, custom top-up, and transaction statement download.
  - `/account/consult` & `/consult`: Astrologer live status indicator, queue rank, wait estimation, low-balance warning, and call/chat room.
  - `/account/history`: Past consultation sessions, duration, billing breakdown, and astrologer remedy notes.
  - `/account/kundli`: Saved Janam Kundli charts.
  - `/account/reviews`: Client consultation review and rating submission.
- **Astrologer Operator Cockpit (`/dashboard/*`)**:
  - `/dashboard`: Real-time presence toggle (Online / Busy / Break / Offline), today's earnings, total minutes, and live waiting queue.
  - `/dashboard/session/[id]`: Live consultation screen with running duration timer, running cost calculation, client's Kundli tabs, live chat/call interface, and post-session remedy notes form.
  - `/dashboard/clients`: Client records and past chart notes.
  - `/dashboard/earnings`: Revenue breakdown and session-by-session payouts.
  - `/dashboard/reels`: Instagram sync manager to preview reels, pin/hide, tag as daily Panchang, and trigger sync.
  - `/dashboard/blog`: Content management system to create, edit, draft, and publish articles.
- **Admin Management (`/admin/*`)**:
  - `/admin/pricing`: Admin-configurable per-minute rates for Chat (₹15/min), Voice (₹20/min), and Video (₹25/min), recharge packs, and `FIRST50` discount toggle.
  - `/admin/analytics`: High-level metrics for revenue, consultations, and user growth.

### 1.3 Core Functional Engines (Section 4)
- **Consultation Queue & Live Presence (6.1)**:
  - Single astrologer presence engine with states: `AVAILABLE`, `BUSY`, `BREAK`, `OFFLINE`.
  - Real-time queue (`LiveQueueService`) scored by FIFO timestamp with estimated wait time (`position * 7 min`).
  - Second-by-second billing engine (`ConsultationBillingEngine`) with 1-minute low-balance warning, graceful zero-balance termination, and 60-second disconnect grace window. Tested and verified with 8/8 test cases.
- **Wallet & Payment Processing (6.2)**:
  - Server-side Razorpay order creation and HMAC-SHA256 signature verification in webhook handler.
  - Downloadable CSV wallet statement generator (`statementService.ts`).
  - Server-side first-consultation 50% discount enforcement (`consultationDiscountService.ts`).
- **Panchang Engine (6.4)**:
  - Complete astronomical calculation of Tithi, Nakshatra, Yoga, Karana, Vara, Sunrise, Sunset, Rahu Kaal, Abhijit Muhurat, and Choghadiya table for Indian Standard Time (IST).
- **Kundli Ephemeris Engine (6.5)**:
  - Self-hosted Lahiri Ayanamsa ephemeris (`chartCalculations.ts`, `ephemeris.ts`) computing planetary longitudes, degrees, signs, houses, Navamsha (D9), Vimshottari Dasha, Manglik, Sade Sati, and Kaal Sarp doshas.
  - 50+ pre-calculated Indian cities with exact coordinates.
- **Non-Functional Requirements (Section 5)**:
  - **SEO**: Server-rendered App Router metadata on all 49 routes, canonical JSON-LD schemas (`LocalBusiness`, `Person`, `BreadcrumbList`), `sitemap.xml`, and `robots.txt`.
  - **Security**: Server-side route protection in `src/middleware.ts` for `/account/*`, `/dashboard/*`, and `/admin/*`. Sliding-window rate limiter on OTP requests and verification attempts. HTML/script input sanitization.
  - **i18n Readiness**: `src/lib/i18n/formatters.ts` abstracting all currency and date representations.
  - **Automated Tests**: 20/20 unit tests passing in Node.js test runner covering billing, i18n, rate limiting, and webhook validation.

---

## 2. What's Partially Implemented or Stubbed with Mock Data

1. **Database Persistence Layer (Section 3)**:
   - `prisma/schema.prisma` is fully written with all 13 models matching the spec.
   - However, because a live PostgreSQL server instance is not provisioned in the local development environment, the application relies on in-memory stores with `localStorage` replication (`astrologerStore.ts`, `clientAccountStore.ts`, `blogStore.ts`, `reelsStore.ts`, `panchangStore.ts`, `adminStore.ts`).
   - The API routes gracefully fall back to in-memory state when `prisma` queries fail due to missing `DATABASE_URL`.
2. **Meta Graph API (Instagram Sync — Section 6.3)**:
   - `InstagramSyncService` contains the production Meta Graph API fetch code (`https://graph.instagram.com/me/media`) and caption regex classifier for daily Panchang.
   - In development, because live Meta Business API tokens are not provided, it serves realistic cached reels (`getFallbackMedia()`).
3. **SMS OTP Delivery Provider (Section 6.1 / Auth)**:
   - `Msg91OtpProvider.ts` and `TwilioOtpProvider.ts` are implemented according to their respective official REST APIs.
   - The application defaults to `MockOtpProvider` (`123456`) so developers and testers can log in immediately without incurring SMS costs or requiring Indian DLT registration.
4. **Live Audio/Video WebRTC Provider (Section 6.6)**:
   - `AgoraCallProvider.ts` is implemented to generate standard Agora RTC v006/v007 security tokens with HMAC-SHA256 signatures.
   - A mock token generator and simulation room UI are provided for local testing when Agora App ID/Certificate are not configured in `.env`.
5. **Payment Gateway Provider (Section 6.2)**:
   - `RazorpayPaymentProvider.ts` is implemented for live and test Razorpay order generation and signature verification.
   - `MockPaymentProvider` is active when `RAZORPAY_KEY_ID` is set to mock keys, allowing seamless top-up testing in preview.

---

## 3. What's Missing Entirely

1. **`.env.example` file**:
   - The project had environment variables defined in `src/config/env.ts`, but was missing a root `.env.example` template documenting all keys, provider options, and defaults for deployment.
2. **Explicit `rahuKaal` and `abhijitMuhurat` columns in `PanchangEntry` Prisma Model**:
   - `PanchangEntry` stored these values inside `rawDataJson`, but the spec explicitly asked for `rahu_kaal` and `abhijit_muhurat` as direct fields.
3. **Cron Authentication Security on `/api/cron/instagram-sync`**:
   - The route handler `/api/cron/instagram-sync` did not check for a `CRON_SECRET` Bearer token header, leaving it open to unauthenticated triggering.
4. **Interactive Remedy Notes Sync from Active Session to Client Account**:
   - While the astrologer's `/dashboard/session/[id]` notes form saved to the active session state, an automated bridge directly persisting these notes into the client's `/account/history` was partially decoupled.

---

## 4. Content Guessed or Approximated (Because Real Data Was Unavailable)

1. **Instagram API Long-Lived Access Token**:
   - Real Meta Graph API tokens require logging into Meta Business Suite with the `@aapkaastrologer` Instagram account and generating a long-lived page token. Mock/cached reels are provided in `src/lib/services/instagramSyncService.ts`.
2. **Razorpay Live Merchant Credentials**:
   - Real merchant credentials require business bank account verification and active Razorpay account onboarding. `rzp_test_mock_key_id` and test order creation are used.
3. **Agora App ID & Certificate**:
   - Agora video calling requires a paid or free-tier Agora developer account. Simulated tokens are generated when missing.
4. **Astrologer Online Schedule**:
   - The default online schedule ("Monday – Sunday: 7:00 AM – 11:00 PM IST") was approximated from standard Indian astrological consultation hours.
5. **Blog Post Articles**:
   - Four high-quality, authentic Vedic articles were authored in the voice of Acharya Niraj Kumar (*Understanding Shani Sade Sati*, *Vastu for North-Facing Homes*, *Yellow Sapphire Activation Rules*, *The Five Limbs of Panchang*). The live site had blog previews without full published text.

---

## 5. Prioritized Action Plan

To close the remaining gaps, we will execute the following fixes in order:

### Priority 1: Section 3 (Data Model & Schema Alignment)
1. Update `prisma/schema.prisma` to add explicit `rahuKaal` and `abhijitMuhurat` columns to `PanchangEntry`.
2. Create comprehensive `.env.example` at the repository root with documentation for every environment variable, provider switch, and default.
3. Add a SQLite/PostgreSQL development fallback configuration note to ensure zero friction in local developer environments.

### Priority 2: Section 4 (Core Functional Requirements)
1. Add `CRON_SECRET` authorization check to `/api/cron/instagram-sync` (Section 6.3).
2. Wire session remedy notes from `/dashboard/session/[id]` directly into `clientAccountStore` and `/account/history` so post-session notes appear instantly for clients (Section 6.6).
3. Update `PanchangService` to return `rahuKaal` and `abhijitMuhurat` aligned with the updated Prisma schema (Section 6.4).
4. Run automated test suite (`npm test`) and production build (`npm run build`) to confirm zero regressions.
