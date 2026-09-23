import { DISPOSABLE_EMAIL_DOMAINS } from "./disposableDomains";

export type SignupEmailPolicyMode = "blocklist" | "allowlist";

export interface EmailPolicyOptions {
  mode?: SignupEmailPolicyMode;
  allowlist?: string[];
  blocklist?: string[];
}

export interface EmailValidationResult {
  isValid: boolean;
  domain: string;
  reason?: string;
  errorType?: "INVALID_EMAIL" | "DISPOSABLE_DOMAIN" | "NOT_IN_ALLOWLIST";
}

/**
 * Standard trusted public and Indian consumer email providers used as default allowlist.
 */
export const DEFAULT_ALLOWED_DOMAINS: readonly string[] = [
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "yahoo.co.in",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "me.com",
  "mac.com",
  "proton.me",
  "protonmail.com",
  "zoho.com",
  "zoho.in",
  "rediffmail.com",
  "aol.com",
];

/**
 * Retrieves the currently active email signup policy configuration.
 */
export function getEmailPolicyConfig(): {
  mode: SignupEmailPolicyMode;
  allowedDomains: string[];
  customBlockedDomains: string[];
} {
  const envMode = (
    process.env.NEXT_PUBLIC_SIGNUP_EMAIL_POLICY_MODE ||
    process.env.SIGNUP_EMAIL_POLICY_MODE ||
    "blocklist"
  ).toLowerCase().trim();

  const mode: SignupEmailPolicyMode = envMode === "allowlist" ? "allowlist" : "blocklist";

  const rawAllowlist =
    process.env.NEXT_PUBLIC_SIGNUP_EMAIL_ALLOWLIST ||
    process.env.SIGNUP_EMAIL_ALLOWLIST ||
    "";
  const allowedDomains = rawAllowlist
    ? rawAllowlist
        .split(",")
        .map((d) => d.trim().toLowerCase())
        .filter(Boolean)
    : [...DEFAULT_ALLOWED_DOMAINS];

  const rawBlocklist =
    process.env.NEXT_PUBLIC_SIGNUP_EMAIL_BLOCKLIST ||
    process.env.SIGNUP_EMAIL_BLOCKLIST ||
    "";
  const customBlockedDomains = rawBlocklist
    ? rawBlocklist
        .split(",")
        .map((d) => d.trim().toLowerCase())
        .filter(Boolean)
    : [];

  return { mode, allowedDomains, customBlockedDomains };
}

/**
 * Validates an email address against the active signup policy.
 * Returns isValid: true or a clear, friendly error explanation.
 */
export function validateSignupEmail(
  email: string,
  options?: EmailPolicyOptions
): EmailValidationResult {
  if (!email || typeof email !== "string") {
    return {
      isValid: false,
      domain: "",
      errorType: "INVALID_EMAIL",
      reason: "Please enter an email address.",
    };
  }

  const trimmed = email.trim().toLowerCase();
  const atIndex = trimmed.lastIndexOf("@");

  if (atIndex <= 0 || atIndex === trimmed.length - 1) {
    return {
      isValid: false,
      domain: "",
      errorType: "INVALID_EMAIL",
      reason: "Please enter a valid email address (e.g., yourname@gmail.com).",
    };
  }

  const domain = trimmed.slice(atIndex + 1);

  // Validate basic domain structure (must have dot and valid characters)
  if (!domain.includes(".") || domain.startsWith(".") || domain.endsWith(".")) {
    return {
      isValid: false,
      domain,
      errorType: "INVALID_EMAIL",
      reason: "Please enter an email with a valid domain name.",
    };
  }

  const config = getEmailPolicyConfig();
  const activeMode: SignupEmailPolicyMode = options?.mode || config.mode;
  const allowedDomains = options?.allowlist || config.allowedDomains;
  const customBlockedDomains = options?.blocklist || config.customBlockedDomains;

  // 1. ALLOW-LIST MODE
  if (activeMode === "allowlist") {
    const isAllowed = allowedDomains.some((allowed) => {
      return domain === allowed || domain.endsWith("." + allowed);
    });

    if (!isAllowed) {
      const sample = allowedDomains.slice(0, 4).map((d) => `@${d}`).join(", ");
      return {
        isValid: false,
        domain,
        errorType: "NOT_IN_ALLOWLIST",
        reason: `Sign-up is currently restricted to approved providers (${sample}...). If you represent an organization or need access with this domain, please contact support.`,
      };
    }

    return { isValid: true, domain };
  }

  // 2. BLOCK-LIST MODE (Recommended Default)
  // Check custom blocked domains first
  if (customBlockedDomains.includes(domain)) {
    return {
      isValid: false,
      domain,
      errorType: "DISPOSABLE_DOMAIN",
      reason: `Email addresses from @${domain} are not accepted. Please use a permanent email address (such as Gmail, Yahoo, Outlook, or iCloud) to receive your Janam Kundli charts and consultation updates.`,
    };
  }

  // Check bundled disposable domains database
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      isValid: false,
      domain,
      errorType: "DISPOSABLE_DOMAIN",
      reason: `Temporary or disposable email addresses (@${domain}) are not permitted for security reasons. Please use a permanent email address (such as Gmail, Yahoo, Outlook, or iCloud) to receive your Janam Kundli charts and consultation updates.`,
    };
  }

  // Check if any parent domain is disposable (e.g. sub.mailinator.com)
  const parts = domain.split(".");
  for (let i = 1; i < parts.length - 1; i++) {
    const parentDomain = parts.slice(i).join(".");
    if (DISPOSABLE_EMAIL_DOMAINS.has(parentDomain)) {
      return {
        isValid: false,
        domain,
        errorType: "DISPOSABLE_DOMAIN",
        reason: `Temporary or disposable email addresses (@${domain}) are not permitted for security reasons. Please use a permanent email address to receive your Janam Kundli charts and consultation updates.`,
      };
    }
  }

  return { isValid: true, domain };
}
