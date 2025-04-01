// import { ChartAreaInteractive } from "@/components/chart-area-interactive"
// import { SectionCards } from "@/components/section-cards"
// import { CustomTable } from "@/components/custom-table"
// import { AuthContext } from "@/context/AuthContext"
// import { BASE_URL } from "@/utils/config"
// import React, {useState, useContext, useEffect} from 'react';
// import useFetch from "@/hooks/useFetch"
// import { useParams } from "react-router-dom"


// const transactions = [
//     { id: 1, paymentStatus: "Completed", totalAmount: 50, paymentMethod: "Credit Card" },
//     { id: 2, paymentStatus: "Pending", totalAmount: 75.5, paymentMethod: "PayPal" },
// ]
// export default function Home(){


//   const fetchAccData = async ()=>{
//     const {user} = useContext(AuthContext);
//     if(!user || !user.token) return;
//     try{
//       const response = await fetch(`${BASE_URL}/getAccountInfo/${user.id}`,{
//         headers: { Authorization: `Bearer ${user.token}`},
//       });
//       if(!response.ok){
//         console.log("Error fetching data");
//       }
//       const data = await response.json();
//       return data
//       // console.log(data)
//     }catch(error){
//       console.log("error fetching: ",error);

//     }

//   }

//   const data = 
//     useEffect(()=>{
//       fetchAccData();
//     },[]);
//   console.log(data);


//   const{id} = useParams();
//   console.log(id);
//   // const user = useContext(AuthContext).user;
//   // console.log(user);
//   const {data: accountData} = useFetch(`${BASE_URL}/getAccountInfo/${id}`);
//   console.log(accountData);


//     return (
//         <>
//         <div className="flex flex-1 flex-col">
//           <div className="@container/main flex flex-1 flex-col gap-2">
//             <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
//               <SectionCards balance={accData.balance} expense={accData.expense} savings={accData.savings} growthRate={accData.growthRate}/>
//               <div className="px-4 lg:px-6">
//                 <ChartAreaInteractive />
//               </div>
//               <CustomTable transactions={transactions} />
//             </div>
//           </div>
//         </div> 
//         </>
//     )
// }


import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { CustomTable } from "@/components/custom-table"
import { AuthContext } from "@/context/AuthContext"
import { BASE_URL } from "@/utils/config"
import React, { useState, useContext, useEffect } from 'react';
import transformTransactionData from "@/services/transformTransactionData"



export default function Home() {
  const { user } = useContext(AuthContext);
  const [accData, setAccData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState(Object)

  const data = {
    balance: 12192.12,
    expense: 2192.12,
    savings: 3192.12,
    growthRate: 4,
  }


  useEffect(() => {
    if (!user || !user.token) return;

    const fetchAccData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/getAccountInfo/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!response.ok) throw new Error("Error fetching data");

        const data = await response.json();

        setChartData(transformTransactionData(data.transactions))
        console.log(data)
        setAccData(data); // Store account data
        setTransactions(data.transactions || []); // Store transactions if available
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    fetchAccData();
    const intervalId = setInterval(fetchAccData, 10000);
    return () => clearInterval(intervalId);
  }, [user]);


  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {accData && (
            <SectionCards
              balance={data.balance}
              expense={data.expense}
              savings={data.savings}
              growthRate={data.growthRate}
            />
          )}
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive accounts={[
              {
                accountName:"Checking",
                chartData: chartData,

              },
            ]}/>
          </div>
          <CustomTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
