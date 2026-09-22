import { z } from "zod";

const envSchema = z.object({
  // Node Environment
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3000),
  APP_URL: z.string().url().default("http://localhost:3000"),

  // PostgreSQL Database
  DATABASE_URL: z
    .string()
    .default("postgresql://postgres:postgres@localhost:5432/aapka_astro?schema=public"),

  // Redis Cache & Presence
  REDIS_URL: z.string().default("redis://localhost:6379"),

  // Auth & JWT
  JWT_SECRET: z.string().default("aapka-astro-super-secure-jwt-secret-key-change-in-production"),
  JWT_EXPIRES_IN: z.string().default("30d"),

  // Swappable OTP Provider
  OTP_PROVIDER: z.enum(["mock", "msg91", "twilio", "firebase"]).default("mock"),
  // MSG91 Configuration
  MSG91_AUTH_KEY: z.string().optional(),
  MSG91_TEMPLATE_ID: z.string().optional(),
  MSG91_SENDER_ID: z.string().default("APASTRO"),
  // Twilio Configuration
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_SERVICE_SID: z.string().optional(),

  // Swappable Payments (Razorpay)
  PAYMENT_PROVIDER: z.enum(["razorpay", "mock"]).default("mock"),
  RAZORPAY_KEY_ID: z.string().optional().default("rzp_test_mock_key_id"),
  RAZORPAY_KEY_SECRET: z.string().optional().default("rzp_test_mock_secret"),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),

  // Swappable Call Provider (Agora / ZegoCloud)
  CALL_PROVIDER: z.enum(["agora", "zegocloud", "mock"]).default("mock"),
  AGORA_APP_ID: z.string().optional().default("agora_mock_app_id"),
  AGORA_APP_CERTIFICATE: z.string().optional().default("agora_mock_certificate"),
  ZEGOCLOUD_APP_ID: z.string().optional(),
  ZEGOCLOUD_SERVER_SECRET: z.string().optional(),

  // Swappable File Storage (Cloudflare R2 / AWS S3)
  STORAGE_PROVIDER: z.enum(["r2", "s3", "mock"]).default("mock"),
  S3_BUCKET: z.string().optional().default("aapka-astro-assets"),
  S3_REGION: z.string().optional().default("auto"),
  S3_ENDPOINT: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),

  // Scheduled Automation & Cron Secret
  CRON_SECRET: z.string().optional().default("aapka_astro_cron_secret_token_change_in_production"),

  // Instagram Graph API
  INSTAGRAM_ACCESS_TOKEN: z.string().optional(),

  // Self-hosted Socket.io Server Port
  SOCKET_PORT: z.coerce.number().default(3001),
});

export type EnvConfig = z.infer<typeof envSchema>;

function loadEnv(): EnvConfig {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Environment configuration validation failed:");
    console.error(result.error.format());
    // In dev mode, return safe fallback with defaults; in production throw
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment configuration. Check server environment variables.");
    }
    return envSchema.parse({});
  }
  return result.data;
}

export const env = Object.freeze(loadEnv());
