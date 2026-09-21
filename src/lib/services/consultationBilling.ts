/**
 * ============================================================================
 * CONSULTATION BILLING & DISCONNECT RESILIENCE ENGINE
 * ============================================================================
 * Handles second-by-second wallet deductions, 1-minute low-balance countdown,
 * graceful zero-balance termination, and 60-second network disconnect grace windows.
 */

export interface BillingState {
  sessionId: string;
  ratePerMin: number;
  walletBalance: number;
  sessionSeconds: number;
  billedAmount: number;
  isLowBalance: boolean;
  secondsRemaining: number;
  isGracePeriod: boolean;
  graceSecondsRemaining: number;
  isTerminated: boolean;
  terminationReason?: "user_ended" | "zero_balance" | "grace_expired";
}

export class ConsultationBillingEngine {
  private sessionId: string;
  private ratePerMin: number;
  private walletBalance: number;
  private sessionSeconds: number = 0;
  private isGracePeriod: boolean = false;
  private graceSecondsRemaining: number = 60;
  private isTerminated: boolean = false;
  private terminationReason?: "user_ended" | "zero_balance" | "grace_expired";

  constructor(sessionId: string, ratePerMin: number, initialBalance: number) {
    this.sessionId = sessionId;
    this.ratePerMin = Math.max(1, ratePerMin);
    this.walletBalance = initialBalance;
  }

  public tick(): BillingState {
    if (this.isTerminated) {
      return this.getState();
    }

    // If in disconnect grace period, billing is paused; only grace timer counts down
    if (this.isGracePeriod) {
      this.graceSecondsRemaining -= 1;
      if (this.graceSecondsRemaining <= 0) {
        this.isTerminated = true;
        this.terminationReason = "grace_expired";
      }
      return this.getState();
    }

    // Active session billing increment
    this.sessionSeconds += 1;

    // Deduct per minute equivalent second-by-second
    const perSecondRate = this.ratePerMin / 60;
    this.walletBalance = Math.max(0, this.walletBalance - perSecondRate);

    // Auto-terminate gracefully if balance completely depleted
    if (this.walletBalance <= 0) {
      this.isTerminated = true;
      this.terminationReason = "zero_balance";
    }

    return this.getState();
  }

  public notifyDisconnect(): void {
    if (!this.isTerminated) {
      this.isGracePeriod = true;
      this.graceSecondsRemaining = 60; // 60s grace window to reconnect
    }
  }

  public notifyReconnect(): void {
    if (!this.isTerminated && this.isGracePeriod) {
      this.isGracePeriod = false;
      this.graceSecondsRemaining = 60;
    }
  }

  public addFunds(amount: number): void {
    this.walletBalance += amount;
  }

  public terminate(reason: "user_ended" = "user_ended"): BillingState {
    this.isTerminated = true;
    this.terminationReason = reason;
    return this.getState();
  }

  public getState(): BillingState {
    const ratePerSec = this.ratePerMin / 60;
    const secondsRemaining = Math.floor(this.walletBalance / ratePerSec);
    const billedAmount = Math.ceil((this.sessionSeconds / 60) * this.ratePerMin);

    return {
      sessionId: this.sessionId,
      ratePerMin: this.ratePerMin,
      walletBalance: Math.round(this.walletBalance * 100) / 100,
      sessionSeconds: this.sessionSeconds,
      billedAmount,
      isLowBalance: secondsRemaining <= 60 && !this.isTerminated,
      secondsRemaining: Math.max(0, secondsRemaining),
      isGracePeriod: this.isGracePeriod,
      graceSecondsRemaining: this.graceSecondsRemaining,
      isTerminated: this.isTerminated,
      terminationReason: this.terminationReason,
    };
  }
}
