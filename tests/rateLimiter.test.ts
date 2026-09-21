import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { SlidingWindowRateLimiter } from "../src/lib/security/rateLimiter";

describe("SlidingWindowRateLimiter", () => {
  test("allows requests up to the defined limit", () => {
    const limiter = new SlidingWindowRateLimiter(3, 10);
    const phone = "+919876543210";

    const r1 = limiter.check(phone);
    assert.equal(r1.allowed, true);
    assert.equal(r1.remaining, 2);

    const r2 = limiter.check(phone);
    assert.equal(r2.allowed, true);
    assert.equal(r2.remaining, 1);

    const r3 = limiter.check(phone);
    assert.equal(r3.allowed, true);
    assert.equal(r3.remaining, 0);
  });

  test("blocks requests once the threshold is exceeded", () => {
    const limiter = new SlidingWindowRateLimiter(2, 5);
    const phone = "+919999988888";

    limiter.check(phone);
    limiter.check(phone);

    // 3rd attempt exceeds limit
    const blocked = limiter.check(phone);
    assert.equal(blocked.allowed, false);
    assert.equal(blocked.remaining, 0);
    assert.ok(blocked.resetTimeMs > 0);
  });

  test("resets bucket when reset() is called", () => {
    const limiter = new SlidingWindowRateLimiter(2, 5);
    const phone = "+919777766666";

    limiter.check(phone);
    limiter.check(phone);
    assert.equal(limiter.check(phone).allowed, false);

    limiter.reset(phone);

    // Should be allowed again
    const postReset = limiter.check(phone);
    assert.equal(postReset.allowed, true);
    assert.equal(postReset.remaining, 1);
  });

  test("isolates rate limits between different phone numbers", () => {
    const limiter = new SlidingWindowRateLimiter(1, 5);
    const phoneA = "+911111111111";
    const phoneB = "+912222222222";

    assert.equal(limiter.check(phoneA).allowed, true);
    assert.equal(limiter.check(phoneA).allowed, false);

    // Phone B should still have its quota
    assert.equal(limiter.check(phoneB).allowed, true);
  });
});
