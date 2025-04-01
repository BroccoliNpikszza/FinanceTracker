import { Account, Transaction, MonthlyData } from "../models/AccountSchema.js";
import User from "../models/UserSchema.js";

export const getAccountInfo = async (req, res) => {
    const id = req.params.id;
    try {
        const userExists = await User.findById(id);
        if (userExists) {
            const transactions = await Transaction.find({user:id})
            res.status(200).json({ success: true, message: "Fetched account info.", data: userExists, transactions:transactions });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch account info." });
    }
}

export const createAccount = async (req, res) => {
    const { type, name, amount } = req.body
    const id = req.params.id;
    if (!req.body) {
        return res.status(400).send("Form data invalid.")
    }
    try {
        const account = await Account.create({ user: id, type, name, amount });
        return res.status(200).json({ success: true, message: "Account created successfully." })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." })
    }
}

export const createMonthlyData = async (req, res) => {
    const { month, year } = req.body
    const id = req.params.id
    if (!req.body) {
        return res.status(400).send("Form data invalid.")
    }
    try {
        const monthlyDataExists = MonthlyData.findOne({ user: id, month, year })
        if (monthlyDataExists) {
            return res.status(400).send("Data already Exists.")
        }
        const monthlyData = await MonthlyData.create({ user: id, month, year });
        return res.status(200).json({ success: true, message: "Monthly data entered." })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." })
    }
}

export const addTransaction = async (req, res) => {
    if (!req.body) {
        return res.status(400).send("Form data invalid.")
    }

    let { status, amount, date } = req.body
    date = new Date(date)
    const month = Number(String(date.getMonth() + 1).padStart(2, '0'));
    const year = Number(date.getFullYear());
    const id = req.params.id

    const transaction = await Transaction.create({user:id, status, amount , date})

    
    try {
        let monthlyData = await MonthlyData.findOneAndUpdate({ user: id, month, year },{$push:{transaction}},{new:true})
        if(!monthlyData)
         {
            console.log("in create")
            monthlyData = await MonthlyData.create({ user: id , month, year, transaction:[transaction]})
            console.log(monthlyData)
        }
        return res.status(200).json({ success: true, message: "Transaction added." })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error." })
    }

}

const getAllTransaction = async (req,res)=>{
    if(!req.body||!req.body.token){
        return res.status(400).send("Access denied")
    }
    try{
    const transactions = await Transaction.find({user:id})
    }catch(error){
        console.log(error)

    }
}