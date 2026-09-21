/**
 * ============================================================================
 * WALLET STATEMENT GENERATION SERVICE
 * ============================================================================
 * Generates downloadable accounting statements in standard CSV format
 * for client wallet recharge, session debits, and promotional credits.
 */

export interface StatementItem {
  id: string;
  date: string;
  type: "RECHARGE" | "CONSULTATION_DEBIT" | "DISCOUNT_CREDIT" | "REFUND";
  description: string;
  amount: number;
  balanceAfter: number;
  referenceId: string;
}

export function generateWalletStatementCSV(
  userName: string,
  userPhone: string,
  transactions: StatementItem[]
): string {
  const generatedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const headers = [
    "AAPKA ASTRO - ACCOUNT WALLET STATEMENT",
    `Account Holder: ${userName}`,
    `Phone: ${userPhone}`,
    `Generated On: ${generatedAt} IST`,
    `Currency: INR (₹)`,
    "",
    "Transaction ID,Date & Time (IST),Type,Description,Amount (₹),Balance After (₹),Reference ID",
  ];

  const rows = transactions.map((tx) => {
    const formattedAmount = tx.type === "CONSULTATION_DEBIT" ? `-${tx.amount}` : `+${tx.amount}`;
    return [
      `"${tx.id}"`,
      `"${tx.date}"`,
      `"${tx.type}"`,
      `"${tx.description.replace(/"/g, '""')}"`,
      `"${formattedAmount}"`,
      `"${tx.balanceAfter}"`,
      `"${tx.referenceId}"`,
    ].join(",");
  });

  return [...headers, ...rows].join("\r\n");
}
