import React, { useContext, useEffect, FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config"
import { AuthContext } from "@/context/AuthContext";


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/date-picker";

export function Transaction({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const [selectedDate, setSelectedDate] = useState<Date|undefined>(undefined)
    const statusRef = useRef<HTMLInputElement|null>(null)
    const amountRef = useRef<HTMLInputElement|null>(null)
    const {user} = useContext(AuthContext);
    const navigate = useNavigate()
  



    const handleFormSubmit = async (event:FormEvent)=>{
        event.preventDefault();
        if(!statusRef.current||!amountRef.current||!selectedDate){
          return
        }
        const formData = {
          status: statusRef.current.value,
          amount: parseFloat(amountRef.current.value),
          date : selectedDate
        }
        console.log(formData)

        if (!user || !user.token){
          return
        }
        try{
          const response = await fetch(`${BASE_URL}/monthlyData/addTransaction/${user.id}`,{
            method:"POST",
            headers:{
              "Content-Type": "application/json",
              Authorization:`Bearer ${user.token}`
            },
            body:JSON.stringify(formData)
          })
          if(response.ok){
            statusRef.current.value = "";
            amountRef.current.value = "";
            setSelectedDate(undefined);
          }else{
            const error = await response.json()
            console.log(error)
          }
        }catch(error){
          console.log(error)
        }
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add Transaction</CardTitle>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleFormSubmit} >
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                <DatePicker onSelect={setSelectedDate}/>
                </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Input
                ref = {statusRef}
                  id="status"
                  type="text"
                  placeholder="pending | posted"
                  required
                />
              </div>
              </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                ref ={amountRef}
                  id="amount"
                  type="number"
                  placeholder="$100.00"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Add Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
