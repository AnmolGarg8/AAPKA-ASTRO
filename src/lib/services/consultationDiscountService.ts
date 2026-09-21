import { prisma } from "@/lib/db/prisma";
import { ADMIN_CONFIGURABLE_PRICING, FIRST_CONSULTATION_OFFER } from "@/config/placeholderContent";

export interface ConsultationRateCalculation {
  userId: string;
  consultationType: "chat" | "voice" | "video";
  baseRatePerMin: number;
  effectiveRatePerMin: number;
  isFirstConsultation: boolean;
  discountPercentage: number;
  discountReason: string;
}

/**
 * Server-side determination of user consultation rate.
 * Guarantees that first-time 50% discount is applied ONLY if the user has
 * zero prior completed sessions in the database. Never trusts client claims.
 */
export async function calculateUserConsultationRate(
  userId: string,
  type: "chat" | "voice" | "video"
): Promise<ConsultationRateCalculation> {
  const baseRate = ADMIN_CONFIGURABLE_PRICING[type].ratePerMinute;

  let isFirstConsultation = true;

  try {
    if (userId && userId !== "guest") {
      const priorSessionCount = await prisma.session.count({
        where: {
          clientId: userId,
          status: "COMPLETED",
        },
      });

      isFirstConsultation = priorSessionCount === 0;
    }
  } catch {
    // If DB is offline in preview, default to first consultation promo
    isFirstConsultation = true;
  }

  const discountPercentage = isFirstConsultation ? FIRST_CONSULTATION_OFFER.discountPercentage : 0;
  const effectiveRate = isFirstConsultation
    ? Math.round(baseRate * (1 - discountPercentage / 100))
    : baseRate;

  return {
    userId,
    consultationType: type,
    baseRatePerMin: baseRate,
    effectiveRatePerMin: effectiveRate,
    isFirstConsultation,
    discountPercentage,
    discountReason: isFirstConsultation
      ? "Welcome Shubh Aarambh: 50% discount on first live consultation"
      : "Standard Vedic Consultation Tariff",
  };
}
