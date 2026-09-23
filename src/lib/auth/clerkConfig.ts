/**
 * Clerk Configuration Validator
 *
 * Checks if real, configured Clerk credentials have been provided.
 * The dummy placeholder "pk_test_Y2xlcmsuYWFwa2Fhc3Ryby5jb20k" points to an
 * unconfigured custom domain (clerk.aapkaastro.com) without Clerk DNS CNAME records,
 * which causes browser redirects to 404 on LiteSpeed.
 */
export const isClerkConfigured = (): boolean => {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!key) return false;
  if (
    key.includes("Y2xlcmsuYWFwa2Fhc3Ryby5jb20k") ||
    key.includes("change_in_production") ||
    key === "pk_test_placeholder"
  ) {
    return false;
  }
  return key.startsWith("pk_test_") || key.startsWith("pk_live_");
};
