interface Transaction {
  date: string;
  amount: number;
  status: "pending" | "posted";
}

interface DailyData {
  date: string;
  debited: number;
  credited: number;
}

function transformTransactionData(transactions: Transaction[]): DailyData[] {
  const dailyData: { [date: string]: DailyData } = {};

  transactions.forEach((transaction) => {
    const date = transaction.date.split("T")[0]; // Extract YYYY-MM-DD
    const amount = transaction.amount;
    const type = transaction.status;

    if (!dailyData[date]) {
      dailyData[date] = {
        date: date,
        debited: 0,
        credited: 0,
      };
    }

    if (type === "pending") {
      dailyData[date].debited += amount;
    } else if (type === "posted") {
      dailyData[date].credited += amount;
    }
  });

  return Object.values(dailyData);
}

export default transformTransactionData

