import { z } from "zod";

/**
 * Strips dangerous HTML tags and escapes special characters to prevent XSS.
 */
export function sanitizeString(input: string): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim();
}

/**
 * Canonical E.164 or 10-digit Indian mobile number normalizer
 */
export function normalizePhoneNumber(phone: string): string {
  const digitsOnly = phone.replace(/\D/g, "");
  if (digitsOnly.length === 10) {
    return `+91${digitsOnly}`;
  }
  if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
    return `+${digitsOnly}`;
  }
  return phone.trim();
}

/**
 * Validation Schemas using Zod
 */

export const KundliInputSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  gender: z.enum(["male", "female", "other"]),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Birth date must be YYYY-MM-DD"),
  birthTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Birth time must be HH:MM"),
  birthPlace: z.string().min(2).max(100),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  timezone: z.number().default(5.5),
});

export const ReviewSubmissionSchema = z.object({
  consultationId: z.string().min(3),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5, "Review comment must be at least 5 characters").max(1000),
  consentPublic: z.boolean().default(true),
});

export const PaymentOrderSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  userId: z.string().optional(),
  serviceType: z.string().max(50).optional(),
});
