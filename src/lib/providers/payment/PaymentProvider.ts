export interface PaymentOrder {
  id: string; // Razorpay order_id or mock order id
  amount: number; // In Paise (e.g. 49900 for ₹499)
  currency: string;
  receipt: string;
  status: string;
  notes?: Record<string, string>;
}

export interface VerifyPaymentParams {
  orderId: string;
  paymentId: string;
  signature: string;
}

export interface PaymentProvider {
  readonly name: string;
  createOrder(
    amountINR: number,
    receiptId: string,
    notes?: Record<string, string>
  ): Promise<PaymentOrder>;
  verifyPaymentSignature(params: VerifyPaymentParams): Promise<boolean>;
}
