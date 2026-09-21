import { PaymentOrder, PaymentProvider, VerifyPaymentParams } from "./PaymentProvider";

export class MockPaymentProvider implements PaymentProvider {
  readonly name = "mock";

  async createOrder(
    amountINR: number,
    receiptId: string,
    notes?: Record<string, string>
  ): Promise<PaymentOrder> {
    return {
      id: `order_mock_${Date.now()}`,
      amount: Math.round(amountINR * 100),
      currency: "INR",
      receipt: receiptId,
      status: "created",
      notes: notes || {},
    };
  }

  async verifyPaymentSignature(params: VerifyPaymentParams): Promise<boolean> {
    // In mock mode, any signature or 'mock_signature' is valid
    return Boolean(params.orderId && params.paymentId);
  }
}
