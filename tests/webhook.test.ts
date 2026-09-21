import { test, describe } from "node:test";
import assert from "node:assert/strict";
import crypto from "crypto";

describe("Payment Webhook Signature Verification", () => {
  const secret = "whsec_aapka_astro_test_key";

  function generateRazorpaySignature(payload: string, webhookSecret: string): string {
    return crypto
      .createHmac("sha256", webhookSecret)
      .update(payload)
      .digest("hex");
  }

  function verifyRazorpayWebhook(payload: string, signature: string, webhookSecret: string): boolean {
    const expected = generateRazorpaySignature(payload, webhookSecret);
    const expectedBuf = Buffer.from(expected);
    const sigBuf = Buffer.from(signature);
    if (expectedBuf.length !== sigBuf.length) return false;
    return crypto.timingSafeEqual(expectedBuf, sigBuf);
  }

  test("validates authentic webhook payload and matching signature", () => {
    const payload = JSON.stringify({
      event: "payment.captured",
      payload: {
        payment: {
          entity: {
            id: "pay_test_12345",
            amount: 50000,
            status: "captured",
            notes: { userId: "usr_client_test" },
          },
        },
      },
    });

    const signature = generateRazorpaySignature(payload, secret);
    const isValid = verifyRazorpayWebhook(payload, signature, secret);

    assert.equal(isValid, true);
  });

  test("rejects forged or tampered webhook payload", () => {
    const originalPayload = JSON.stringify({
      event: "payment.captured",
      payload: { payment: { entity: { amount: 50000 } } },
    });

    const signature = generateRazorpaySignature(originalPayload, secret);

    // Attacker tampers amount to 5000000
    const tamperedPayload = JSON.stringify({
      event: "payment.captured",
      payload: { payment: { entity: { amount: 5000000 } } },
    });

    const isMatch = verifyRazorpayWebhook(tamperedPayload, signature, secret);
    assert.equal(isMatch, false);
  });

  test("rejects webhook generated with incorrect secret key", () => {
    const payload = JSON.stringify({ event: "order.paid" });
    const signatureFromWrongSecret = generateRazorpaySignature(payload, "wrong_secret_key");

    const isMatch = verifyRazorpayWebhook(payload, signatureFromWrongSecret, secret);
    assert.equal(isMatch, false);
  });
});
