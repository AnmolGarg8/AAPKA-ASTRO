import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  WELCOME_MODAL_STORAGE_KEY,
} from "../src/components/home/WelcomeConsultationModal";
import {
  PLACEHOLDER_ASTROLOGER,
  ADMIN_CONFIGURABLE_PRICING,
  FIRST_CONSULTATION_OFFER,
} from "../src/config/placeholderContent";

describe("Welcome Consultation Modal Policy & Content Compliance", () => {
  const modalFilePath = path.join(
    process.cwd(),
    "src/components/home/WelcomeConsultationModal.tsx"
  );
  const modalCode = fs.readFileSync(modalFilePath, "utf8");

  const homePageFilePath = path.join(
    process.cwd(),
    "src/app/page.tsx"
  );
  const homePageCode = fs.readFileSync(homePageFilePath, "utf8");

  test("headline strictly adheres to client policy: 50% Off First Consultation (no free claims)", () => {
    // 1. Headline must state 50% Off Your First Consultation
    assert.match(
      modalCode,
      /50% Off Your First Consultation/,
      "Modal headline must clearly state '50% Off Your First Consultation'"
    );

    // 2. Must never use 'Free', 'First Chat Free', or imply zero cost
    const forbiddenPhrases = [
      "First Chat Free",
      "Free First Chat",
      "Free Consultation",
      "Free Chat",
      "Chat for Free",
      "Start Free",
      "Get Free",
    ];

    for (const phrase of forbiddenPhrases) {
      const regex = new RegExp(`\\b${phrase}\\b`, "i");
      assert.doesNotMatch(
        modalCode,
        regex,
        `Modal must strictly avoid forbidden free claim: "${phrase}"`
      );
    }
  });

  test("CTA button complies with approved non-Astrotalk copy", () => {
    // 1. Must use 'Claim 50% Off' or 'Start Consultation'
    assert.match(
      modalCode,
      /Claim 50% Off/,
      "CTA button must include 'Claim 50% Off'"
    );

    // 2. Must NOT copy Astrotalk's 'Chat Now' verbatim as the primary CTA
    assert.doesNotMatch(
      modalCode,
      />\s*Chat Now\s*</,
      "CTA must not copy Astrotalk's 'Chat Now' verbatim"
    );
  });

  test("strictly adheres to the Aapka Astro brand system (not Astrotalk's yellow-and-black)", () => {
    // Brand Tokens Present:
    assert.match(modalCode, /#7B2D26/, "Must use Deep Maroon (#7B2D26)");
    assert.match(modalCode, /#E8A33D/, "Must use Marigold Gold (#E8A33D)");
    assert.match(modalCode, /#FBF3E7/, "Must use Warm Ivory (#FBF3E7)");
    assert.match(modalCode, /#FFFDF9/, "Must use Ivory Card (#FFFDF9)");
    assert.match(modalCode, /#3B2A1E/, "Must use Sandalwood text (#3B2A1E)");

    // Typography:
    assert.match(modalCode, /font-temple/, "Must use font-temple (Cinzel) for sacred headings");
    assert.match(modalCode, /font-body/, "Must use font-body (Mukta) for readable body text");

    // Strictly NOT Astrotalk's electric yellow & black theme:
    const astrotalkColorPatterns = [
      /#FFD700/i,
      /#FFF000/i,
      /bg-yellow-400/i,
      /text-yellow-400/i,
    ];
    for (const pattern of astrotalkColorPatterns) {
      assert.doesNotMatch(
        modalCode,
        pattern,
        `Modal must not use Astrotalk yellow-black theme: ${pattern}`
      );
    }
  });

  test("includes verified astrologer photo and avatar presentation", () => {
    assert.match(
      modalCode,
      /PLACEHOLDER_ASTROLOGER\.avatarUrl/,
      "Must render the astrologer's photo via avatarUrl"
    );
    assert.match(
      modalCode,
      /<Image\b/,
      "Must use Next.js Image component for optimized portrait rendering"
    );
  });

  test("contains a freshly written, realistic 3-message simulated chat preview", () => {
    // Fresh Q&A exchange (Bubble 1: Seeker Career Query)
    assert.match(
      modalCode,
      /career stagnation|switch jobs or focus on business/i,
      "Simulated chat must depict a realistic, fresh seeker consultation query"
    );

    // Bubble 2: Acharya Niraj Kumar Vedic Insight
    assert.match(
      modalCode,
      /10th lord|Saturn transit|karmic turning point|D1 &amp; D9 charts/i,
      "Acharya's simulated reply must demonstrate fresh authentic Vedic astrological depth"
    );

    // Bubble 3: Seeker Confirmation
    assert.match(
      modalCode,
      /Ready with my exact birth time and Kundli details/i,
      "Must show 3-message dialogue completion with seeker confirmation"
    );

    // Consultation topics
    assert.match(modalCode, /Career &amp; Job|Career & Job/i);
    assert.match(modalCode, /Kundli Milan/i);
    assert.match(modalCode, /Devta Vastu/i);
  });

  test("strictly avoids Astrotalk-scale marketplace statistics and flagged inconsistent numbers", () => {
    // 1. Reject Astrotalk marketplace scale stats
    const marketplacePatterns = [
      /5Cr\+?/i,
      /50,?000\+?\s*astrologers/i,
      /thousands of astrologers/i,
      /largest astrology platform/i,
    ];

    for (const pattern of marketplacePatterns) {
      assert.doesNotMatch(
        modalCode,
        pattern,
        `Modal must strictly avoid Astrotalk marketplace-scale statistic: ${pattern}`
      );
    }

    // 2. Reject previously flagged inconsistent numbers (15,000+ vs 35,000+) pending client confirmation
    const flaggedDiscrepancyNumbers = [
      /15,000\+/,
      /35,000\+/,
    ];

    for (const pattern of flaggedDiscrepancyNumbers) {
      assert.doesNotMatch(
        modalCode,
        pattern,
        `Modal must not reuse previously flagged inconsistent count: ${pattern}`
      );
    }
  });

  test("uses honest solo-practitioner credentials and qualitative community trust line with placeholder note", () => {
    // Practitioner name & lineage
    assert.match(
      modalCode,
      /Acharya Niraj Kumar|PLACEHOLDER_ASTROLOGER\.displayName/,
      "Must feature Acharya Niraj Kumar as the primary consultant"
    );
    assert.match(
      modalCode,
      /Baidyanath Dham/,
      "Must showcase the Baidyanath Dham lineage"
    );

    // Modest, honest experience & credentials
    assert.match(
      modalCode,
      /20\+\s*Yrs/,
      "Must highlight honest 20+ years traditional experience"
    );
    assert.match(
      modalCode,
      /Jyotish Acharya|BVB Scholar/,
      "Must showcase authentic Jyotish Acharya / BVB certification"
    );
    assert.match(
      modalCode,
      /100%\s*Solo/,
      "Must highlight direct 1-on-1 solo practitioner access"
    );

    // Qualitative trust line clearly marked as placeholder pending client confirmation
    assert.match(
      modalCode,
      /Trusted by a growing community across India/i,
      "Must feature qualitative trust line"
    );
    assert.match(
      modalCode,
      /pending client confirmation/i,
      "Must explicitly note that exact counts are pending client confirmation"
    );
  });

  test("includes transparent 50% off pricing breakdown and promo code", () => {
    // Check that FIRST_CONSULTATION_OFFER is wired in
    assert.equal(FIRST_CONSULTATION_OFFER.discountPercentage, 50);
    assert.equal(FIRST_CONSULTATION_OFFER.code, "FIRST50");

    // Pricing calculation check
    assert.equal(
      ADMIN_CONFIGURABLE_PRICING.chat.effectiveFirstTimeRate,
      ADMIN_CONFIGURABLE_PRICING.chat.ratePerMinute * 0.5
    );
    assert.equal(
      ADMIN_CONFIGURABLE_PRICING.voice.effectiveFirstTimeRate,
      ADMIN_CONFIGURABLE_PRICING.voice.ratePerMinute * 0.5
    );
  });

  test("persists dismissal in localStorage to avoid recurring intrusive popups", () => {
    assert.equal(WELCOME_MODAL_STORAGE_KEY, "aapka_welcome_modal_dismissed");
    assert.match(
      modalCode,
      /localStorage\.setItem\(WELCOME_MODAL_STORAGE_KEY,\s*"true"\)/,
      "Must save dismissal flag to localStorage"
    );
    assert.match(
      modalCode,
      /localStorage\.getItem\(WELCOME_MODAL_STORAGE_KEY\)/,
      "Must check localStorage before auto-triggering"
    );
  });

  test("is mounted on HomePage (src/app/page.tsx)", () => {
    assert.match(
      homePageCode,
      /import\s*{\s*WelcomeConsultationModal\s*}\s*from\s*["']@\/components\/home\/WelcomeConsultationModal["']/,
      "HomePage must import WelcomeConsultationModal"
    );
    assert.match(
      homePageCode,
      /<WelcomeConsultationModal\s*\/>/,
      "HomePage must render WelcomeConsultationModal"
    );
  });
});
