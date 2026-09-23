import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest, hasStaffSectionAccess } from "@/lib/auth/serverAuth";
import { AdminStore, PricingSettings } from "@/lib/store/adminStore";

/**
 * GET /api/admin/pricing
 * Reads current consultation pricing settings. Requires VIEW on "pricing".
 */
export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);

  if (!auth.isAuthenticated) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Authentication required." },
      { status: 401 }
    );
  }

  if (!auth.isOwner && !hasStaffSectionAccess(auth, "pricing", "VIEW")) {
    return NextResponse.json(
      { success: false, message: "Forbidden: VIEW access required for pricing settings." },
      { status: 403 }
    );
  }

  try {
    const pricing = AdminStore.getPricing();
    return NextResponse.json({ success: true, pricing });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to load pricing settings." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/pricing
 * Updates consultation pricing rules. Requires MANAGE on "pricing".
 */
export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);

  if (!auth.isAuthenticated) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Authentication required." },
      { status: 401 }
    );
  }

  if (!auth.isOwner && !hasStaffSectionAccess(auth, "pricing", "MANAGE")) {
    return NextResponse.json(
      { success: false, message: "Forbidden: MANAGE access required to modify pricing rules." },
      { status: 403 }
    );
  }

  try {
    const body = (await req.json()) as PricingSettings;
    AdminStore.updatePricing(body);
    return NextResponse.json({
      success: true,
      message: "Pricing updated successfully.",
      pricing: AdminStore.getPricing(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update pricing." },
      { status: 500 }
    );
  }
}
