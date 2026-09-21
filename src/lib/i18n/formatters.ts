/**
 * ============================================================================
 * INTERNATIONALIZATION (i18n) & CURRENCY ABSTRACTION UTILITIES
 * ============================================================================
 * Abstracted formatting layer decoupling UI components from hardcoded currency
 * symbols and locale assumptions. Enables smooth multi-currency global support.
 */

export type SupportedCurrency = "INR" | "USD" | "EUR" | "GBP" | "AED" | "CAD" | "AUD";

export interface FormatCurrencyOptions {
  currency?: SupportedCurrency;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  showCurrencyCode?: boolean;
}

// Exchange rates relative to INR (base rate)
export const DEFAULT_EXCHANGE_RATES: Record<SupportedCurrency, number> = {
  INR: 1.0,
  USD: 0.012, // 1 INR = ~0.012 USD (~₹83.3 / $)
  EUR: 0.011,
  GBP: 0.0095,
  AED: 0.044,
  CAD: 0.016,
  AUD: 0.018,
};

const CURRENCY_LOCALE_MAP: Record<SupportedCurrency, string> = {
  INR: "en-IN",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  AED: "ar-AE",
  CAD: "en-CA",
  AUD: "en-AU",
};

/**
 * Formats a monetary amount using standard internationalization API
 */
export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {}
): string {
  const currency: SupportedCurrency = options.currency || "INR";
  const locale = options.locale || CURRENCY_LOCALE_MAP[currency] || "en-IN";
  const minDigits = options.minimumFractionDigits ?? (currency === "INR" && Number.isInteger(amount) ? 0 : 2);
  const maxDigits = options.maximumFractionDigits ?? (currency === "INR" && Number.isInteger(amount) ? 0 : 2);

  try {
    const formatted = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    }).format(amount);

    if (options.showCurrencyCode && !formatted.includes(currency)) {
      return `${formatted} ${currency}`;
    }

    return formatted;
  } catch {
    // Fallback if Intl format fails
    const symbols: Record<SupportedCurrency, string> = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£",
      AED: "AED ",
      CAD: "CA$",
      AUD: "A$",
    };
    return `${symbols[currency] || currency + " "}${amount.toFixed(minDigits)}`;
  }
}

/**
 * Converts a base INR rate into the requested target currency
 */
export function convertCurrency(
  amountInINR: number,
  targetCurrency: SupportedCurrency = "INR",
  customRates?: Partial<Record<SupportedCurrency, number>>
): number {
  const rates = { ...DEFAULT_EXCHANGE_RATES, ...customRates };
  const rate = rates[targetCurrency] || 1.0;
  return Math.round(amountInINR * rate * 100) / 100;
}

/**
 * Formats standard Vedic dates in localized text
 */
export function formatDate(
  dateInput: Date | string | number,
  locale: string = "en-IN",
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = new Date(dateInput);
  if (isNaN(dateObj.getTime())) return String(dateInput);

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options,
  };

  return new Intl.DateTimeFormat(locale, defaultOptions).format(dateObj);
}

/**
 * Returns canonical time in IST
 */
export function formatTimeIST(dateInput: Date | string | number = new Date()): string {
  const dateObj = new Date(dateInput);
  return dateObj.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
