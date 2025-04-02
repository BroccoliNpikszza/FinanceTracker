// interface Transaction {
//   type:string,
//   amount: number;
//   date: string;
// }

// interface DailyData {
//   date: string;
//   debited: number;
//   credited: number;
// }

// function transformTransactionData(transactions: Transaction[]): DailyData[] {
//   const dailyData: { [date: string]: DailyData } = {};

//   transactions.forEach((transaction) => {
//     const date = transaction.date.split("T")[0]; // Extract YYYY-MM-DD
//     const amount = transaction.amount;
//     const type = transaction.type;

//     if (!dailyData[date]) {
//       dailyData[date] = {
//         date: date,
//         debited: 0,
//         credited: 0,
//       };
//     }

//     if (type === "Debited") {
//       dailyData[date].debited += amount;
//       dailyData[date].debited = Number(dailyData[date].debited)
//     } else if (type === "Credited") {
//       dailyData[date].credited += amount;
//       dailyData[date].credited = Number(dailyData[date].credited)
//     }
//   });

//   return Object.values(dailyData);
// }

// export default transformTransactionData

interface Transaction {
  type: string;
  amount: number;
  date: string;
}

interface DailyData {
  date: string;
  debited: number;
  credited: number;
}

// function transformTransactionData(transactions: Transaction[]): DailyData[] {
//   const dailyData: Record<string, DailyData> = {};

//   transactions.forEach((transaction) => {
//     const date = transaction.date?.split("T")[0]; // Extract YYYY-MM-DD
//     const amount = transaction.amount ?? 0; // Default to 0 if amount is undefined
//     const type = transaction.type?.toLowerCase(); // Normalize case

//     if (!date) return; // Skip if date is missing

//     if (!dailyData[date]) {
//       dailyData[date] = { date, debited: 0, credited: 0 };
//     }

//     if (type === "debited") {
//       dailyData[date].debited += amount;
//     } else if (type === "credited") {
//       dailyData[date].credited += amount;
//     }
//   });

//   return Object.values(dailyData);
// }

// export default transformTransactionData;

function transformTransactionData(transactions: Transaction[]): DailyData[] {
  const dailyData: Record<string, DailyData> = {};

  transactions.forEach((transaction) => {
    const date = transaction.date?.split("T")[0]; // Extract YYYY-MM-DD
    const amount = transaction.amount ?? 0; // Default to 0 if amount is undefined
    const type = transaction.type?.toLowerCase(); // Normalize case

    if (!date) return; // Skip if date is missing

    if (!dailyData[date]) {
      dailyData[date] = { date, debited: 0, credited: 0 };
    }

    if (type === "debited") {
      dailyData[date].debited += amount;
    } else if (type === "credited") {
      dailyData[date].credited += amount;
    }
  });

  // Convert object to array and sort by date
  let sortedData = Object.values(dailyData).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Remove leading zero entries (debited === 0 && credited === 0)
  while (sortedData.length > 0 && sortedData[0].debited === 0 && sortedData[0].credited === 0) {
    sortedData.shift();
  }

  return sortedData;
}

export default transformTransactionData;
