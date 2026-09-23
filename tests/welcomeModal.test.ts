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

  test("reflects client's authentic single-practitioner reality, credentials & lineage", () => {
    // Practitioner name
    assert.match(
      modalCode,
      /Acharya Niraj Kumar|PLACEHOLDER_ASTROLOGER\.displayName/,
      "Must feature Acharya Niraj Kumar as the primary consultant"
    );

    // Authentic Baidyanath Dham heritage
    assert.match(
      modalCode,
      /Baidyanath Dham/,
      "Must showcase the Baidyanath Dham lineage"
    );

    // Authentic 24+ years experience & 15,000+ consultations
    assert.match(
      modalCode,
      /24\+\s*Yrs/,
      "Must highlight authentic 24+ years experience"
    );
    assert.match(
      modalCode,
      /15,000\+/,
      "Must highlight 15,000+ authentic consultations"
    );

    // High rating
    assert.match(
      modalCode,
      /4\.9/,
      "Must highlight 4.9 client satisfaction rating"
    );

    // No marketplace-scale false claims
    assert.doesNotMatch(
      modalCode,
      /5000\+\s*astrologers/i,
      "Must not mimic marketplace-scale claims of thousands of astrologers"
    );
  });

  test("contains simulated Vedic consultation chat dialogue with authentic topics", () => {
    // Seeker dialogue
    assert.match(
      modalCode,
      /Seeking clarity on my career transition/i,
      "Simulated chat must depict a realistic seeker consultation topic"
    );

    // Astrologer response demonstrating Vedic insight
    assert.match(
      modalCode,
      /karmic restructuring|D1 and D9 charts/i,
      "Acharya's simulated reply must demonstrate authentic Vedic astrological depth"
    );

    // Consultation topics
    assert.match(modalCode, /Career & Job/i);
    assert.match(modalCode, /Kundli Milan/i);
    assert.match(modalCode, /Devta Vastu/i);
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
