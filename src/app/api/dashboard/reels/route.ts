import { NextRequest, NextResponse } from "next/server";
import { getAuthFromRequest, hasStaffSectionAccess } from "@/lib/auth/serverAuth";
import { ReelsStore } from "@/lib/store/reelsStore";

/**
 * GET /api/dashboard/reels
 * Lists reels. Requires VIEW access on "reels".
 */
export async function GET(req: NextRequest) {
  const auth = getAuthFromRequest(req);

  if (!auth.isAuthenticated) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Authentication required." },
      { status: 401 }
    );
  }

  if (!hasStaffSectionAccess(auth, "reels", "VIEW")) {
    return NextResponse.json(
      { success: false, message: "Forbidden: VIEW access required for Instagram Reels." },
      { status: 403 }
    );
  }

  try {
    const reels = ReelsStore.getAllReels();
    return NextResponse.json({ success: true, reels });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to load reels." },
      { status: 500 }
    );
  }
}

/**
 * POST /api/dashboard/reels
 * Toggles pin or hide status on a reel. Requires MANAGE access on "reels".
 */
export async function POST(req: NextRequest) {
  const auth = getAuthFromRequest(req);

  if (!auth.isAuthenticated) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Authentication required." },
      { status: 401 }
    );
  }

  if (!hasStaffSectionAccess(auth, "reels", "MANAGE")) {
    return NextResponse.json(
      { success: false, message: "Forbidden: MANAGE access required to modify reels curation." },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { action, reelId } = body;

    if (!reelId) {
      return NextResponse.json(
        { success: false, message: "Reel ID is required." },
        { status: 400 }
      );
    }

    if (action === "togglePin") {
      ReelsStore.togglePin(reelId);
    } else if (action === "toggleHide") {
      ReelsStore.toggleHide(reelId);
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid action specified." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Reel ${action} successful.`,
      reels: ReelsStore.getAllReels(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update reel." },
      { status: 500 }
    );
  }
}
