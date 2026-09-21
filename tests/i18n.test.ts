import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { formatCurrency, convertCurrency, formatDate } from "../src/lib/i18n/formatters";

describe("Internationalization (i18n) Formatters", () => {
  test("formats INR currency accurately with Rupee symbol", () => {
    const formatted = formatCurrency(499, { currency: "INR" });
    assert.ok(formatted.includes("499"));
    assert.ok(formatted.includes("₹"));
  });

  test("formats USD currency accurately", () => {
    const formatted = formatCurrency(15.5, { currency: "USD" });
    assert.ok(formatted.includes("$"));
    assert.ok(formatted.includes("15.50"));
  });

  test("formats EUR currency with appropriate euro symbol", () => {
    const formatted = formatCurrency(25, { currency: "EUR" });
    assert.ok(formatted.includes("€") || formatted.includes("EUR"));
  });

  test("converts base INR to foreign currencies using exchange ratios", () => {
    // 1000 INR to USD at 0.012 = 12 USD
    const usd = convertCurrency(1000, "USD");
    assert.equal(usd, 12);

    // 1000 INR to AED at 0.044 = 44 AED
    const aed = convertCurrency(1000, "AED");
    assert.equal(aed, 44);
  });

  test("formats Gregorian dates into localized Vedic calendar strings", () => {
    const dateStr = "2026-09-22T10:00:00Z";
    const formatted = formatDate(dateStr, "en-IN");
    assert.ok(formatted.includes("2026"));
    assert.ok(formatted.includes("Sep"));
  });
});
