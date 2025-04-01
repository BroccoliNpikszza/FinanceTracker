import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

  interface Transaction{
    _id: number;
    status: string;
    amount: string;
    date:string
  }

  interface TransactionProps{
    transactions: Transaction[];
  };

  
  export function CustomTable({transactions}:TransactionProps) {
    const total = () =>{
        return transactions.reduce((sum, transaction)=>sum + Number(transaction.amount),0)
    };
    return (

        <>
        <Separator className="my-4"/>
        <Badge className="badge-table" variant="secondary">Transactions</Badge>
      <Table>
        <TableCaption>A list of recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>PaymentStatus</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell className="font-medium">{transaction._id}</TableCell>
              <TableCell>{transaction.status}</TableCell>
              <TableCell>{transaction.date}</TableCell>
              <TableCell className="text-right">{transaction.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{total().toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      </>
    )
  }
  