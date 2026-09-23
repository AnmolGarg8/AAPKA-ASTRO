import { test, describe } from "node:test";
import assert from "node:assert/strict";
import {
  validateSignupEmail,
  getEmailPolicyConfig,
  DEFAULT_ALLOWED_DOMAINS,
} from "../src/lib/auth/emailPolicy";
import { DISPOSABLE_EMAIL_DOMAINS } from "../src/lib/auth/disposableDomains";

describe("Configurable Email Sign-Up Policy - Block-List Mode (Recommended Default)", () => {
  test("allows legitimate global consumer email providers", () => {
    const legitimateEmails = [
      "aarav.sharma@gmail.com",
      "priya.verma@yahoo.com",
      "vikram.singh@outlook.com",
      "ananya@icloud.com",
      "rohit@hotmail.com",
      "kavita@proton.me",
      "deepak@zoho.com",
      "arun@rediffmail.com",
    ];

    for (const email of legitimateEmails) {
      const res = validateSignupEmail(email, { mode: "blocklist" });
      assert.strictEqual(
        res.isValid,
        true,
        `Expected ${email} to be permitted in blocklist mode`
      );
      assert.strictEqual(res.reason, undefined);
    }
  });

  test("allows legitimate corporate, institutional, and custom domains", () => {
    const corporateEmails = [
      "dr.kapoor@aiims.edu",
      "consultant@dowconsulting.in",
      "founder@viar.in",
      "engineer@tcs.com",
      "rahul@alumni.iitd.ac.in",
      "contact@myfamilyfirm.co.uk",
    ];

    for (const email of corporateEmails) {
      const res = validateSignupEmail(email, { mode: "blocklist" });
      assert.strictEqual(
        res.isValid,
        true,
        `Expected corporate domain ${email} to be permitted in blocklist mode`
      );
    }
  });

  test("strictly blocks known disposable/throwaway email domains with friendly error", () => {
    const disposableEmails = [
      "throwaway123@mailinator.com",
      "anon@tempmail.com",
      "bot@10minutemail.com",
      "fake@guerrillamail.com",
      "spam@yopmail.com",
      "temp@sharklasers.com",
      "tester@dispostable.com",
      "burner@trashmail.com",
      "junk@fakeinbox.com",
    ];

    for (const email of disposableEmails) {
      const res = validateSignupEmail(email, { mode: "blocklist" });
      assert.strictEqual(
        res.isValid,
        false,
        `Expected disposable domain ${email} to be rejected`
      );
      assert.strictEqual(res.errorType, "DISPOSABLE_DOMAIN");
      assert.ok(res.reason, "Must include a friendly explanatory reason");
      assert.match(
        res.reason,
        /disposable|temporary/i,
        "Error message must clearly explain disposable nature"
      );
      assert.match(
        res.reason,
        /permanent email/i,
        "Error message must provide constructive recommendation (Gmail, Yahoo, etc.)"
      );
    }
  });

  test("blocks subdomains of disposable services (e.g. user@box1.mailinator.com)", () => {
    const res = validateSignupEmail("spammer@sub.mailinator.com", { mode: "blocklist" });
    assert.strictEqual(res.isValid, false);
    assert.strictEqual(res.errorType, "DISPOSABLE_DOMAIN");
  });

  test("supports custom blocked domains dynamically via options", () => {
    const customBlocked = ["badactorzone.org", "scamastro.net"];
    const res = validateSignupEmail("client@badactorzone.org", {
      mode: "blocklist",
      blocklist: customBlocked,
    });
    assert.strictEqual(res.isValid, false);
    assert.strictEqual(res.errorType, "DISPOSABLE_DOMAIN");
    assert.match(res.reason!, /badactorzone\.org/);
  });
});

describe("Configurable Email Sign-Up Policy - Allow-List Mode", () => {
  const allowlist = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com"];

  test("permits emails explicitly present on the allowlist", () => {
    const res1 = validateSignupEmail("seeker@gmail.com", { mode: "allowlist", allowlist });
    assert.strictEqual(res1.isValid, true);

    const res2 = validateSignupEmail("seeker@outlook.com", { mode: "allowlist", allowlist });
    assert.strictEqual(res2.isValid, true);
  });

  test("rejects valid email domains not present on the allowlist with supportive error", () => {
    const res = validateSignupEmail("director@unlistedfirm.com", {
      mode: "allowlist",
      allowlist,
    });
    assert.strictEqual(res.isValid, false);
    assert.strictEqual(res.errorType, "NOT_IN_ALLOWLIST");
    assert.ok(res.reason);
    assert.match(res.reason, /approved providers/i);
    assert.match(res.reason, /contact support/i);
  });

  test("rejects disposable emails in allowlist mode", () => {
    const res = validateSignupEmail("bot@mailinator.com", { mode: "allowlist", allowlist });
    assert.strictEqual(res.isValid, false);
    assert.strictEqual(res.errorType, "NOT_IN_ALLOWLIST");
  });
});

describe("Configurable Email Sign-Up Policy - Input Sanitation & Edge Cases", () => {
  test("rejects empty, null, or malformed email strings", () => {
    assert.strictEqual(validateSignupEmail("").isValid, false);
    assert.strictEqual(validateSignupEmail("   ").isValid, false);
    assert.strictEqual(validateSignupEmail("notanemail").isValid, false);
    assert.strictEqual(validateSignupEmail("@nodomain.com").isValid, false);
    assert.strictEqual(validateSignupEmail("missingdomain@").isValid, false);
    assert.strictEqual(validateSignupEmail("no-dot@domain").isValid, false);
  });

  test("handles case insensitivity cleanly", () => {
    const upperRes = validateSignupEmail("SEEKER@GMAIL.COM", { mode: "blocklist" });
    assert.strictEqual(upperRes.isValid, true);
    assert.strictEqual(upperRes.domain, "gmail.com");

    const upperBlocked = validateSignupEmail("BOT@MAILINATOR.COM", { mode: "blocklist" });
    assert.strictEqual(upperBlocked.isValid, false);
    assert.strictEqual(upperBlocked.errorType, "DISPOSABLE_DOMAIN");
  });

  test("handles whitespace trimming cleanly", () => {
    const res = validateSignupEmail("   seeker@yahoo.com   ", { mode: "blocklist" });
    assert.strictEqual(res.isValid, true);
    assert.strictEqual(res.domain, "yahoo.com");
  });

  test("verifies bundled disposable domain list completeness", () => {
    assert.ok(DISPOSABLE_EMAIL_DOMAINS.size >= 80);
    assert.strictEqual(DISPOSABLE_EMAIL_DOMAINS.has("mailinator.com"), true);
    assert.strictEqual(DISPOSABLE_EMAIL_DOMAINS.has("tempmail.com"), true);
    assert.strictEqual(DISPOSABLE_EMAIL_DOMAINS.has("10minutemail.com"), true);
    assert.strictEqual(DISPOSABLE_EMAIL_DOMAINS.has("guerrillamail.com"), true);
    assert.strictEqual(DISPOSABLE_EMAIL_DOMAINS.has("yopmail.com"), true);
  });

  test("verifies default allowlist contains top reputable providers", () => {
    assert.ok(DEFAULT_ALLOWED_DOMAINS.includes("gmail.com"));
    assert.ok(DEFAULT_ALLOWED_DOMAINS.includes("yahoo.com"));
    assert.ok(DEFAULT_ALLOWED_DOMAINS.includes("outlook.com"));
    assert.ok(DEFAULT_ALLOWED_DOMAINS.includes("icloud.com"));
    assert.ok(DEFAULT_ALLOWED_DOMAINS.includes("proton.me"));
  });
});
