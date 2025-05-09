export type TransactionType = "debit" | "credit";

export type Transaction = {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: TransactionType;
};

export const sampleTransactions: Transaction[] = [
  {
    id: "1",
    amount: 50.75,
    date: "2025-05-01T10:00:00Z",
    description: "Grocery Store",
    type: "debit",
  },
  {
    id: "2",
    amount: 150.0,
    date: "2025-05-02T14:23:00Z",
    description: "Freelance Payment",
    type: "credit",
  },
  {
    id: "3",
    amount: 20.0,
    date: "2025-05-03T08:30:00Z",
    description: "Coffee Shop",
    type: "debit",
  },
];

export function generateSampleTransactions(count: number = 20): Transaction[] {
  const txs = [...sampleTransactions];
  const getTotal = (arr: Transaction[]) =>
    arr.reduce((sum, t) => sum + t.amount, 0);

  while (txs.length < count) {
    const id = (txs.length + 1).toString();
    const base = Math.round(Math.random() * 500 * 100) / 100;
    const sign = Math.random() > 0.5 ? 1 : -1;
    let amount = base * sign;

    if (getTotal(txs) + amount < 0) {
      amount = base;
    }

    txs.push({
      id,
      amount,
      date: new Date(Date.now() - Math.random() * 1e10).toISOString(),
      description: `Random Transaction ${id}`,
      type: amount >= 0 ? "credit" : "debit",
    });
  }

  return txs;
}
