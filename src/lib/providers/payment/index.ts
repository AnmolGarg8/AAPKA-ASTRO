import { PaymentProvider } from "./PaymentProvider";
import { RazorpayPaymentProvider } from "./RazorpayPaymentProvider";
import { MockPaymentProvider } from "./MockPaymentProvider";
import { env } from "@/config/env";

export * from "./PaymentProvider";

function createPaymentProvider(): PaymentProvider {
  if (env.PAYMENT_PROVIDER === "razorpay" && env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET) {
    return new RazorpayPaymentProvider();
  }
  return new MockPaymentProvider();
}

export const paymentProvider: PaymentProvider = createPaymentProvider();
