import { Account, Transaction, MonthlyData } from "../models/AccountSchema.js";
import User from "../models/UserSchema.js";

export const getAccountInfo = async (req, res) => {
    const id = req.params.id;
    try {
        const accounts = await Account.find({ user: id });
        if (accounts) {
            console.log(accounts)
            res.status(200).json({ success: true, message: "Fetched account info.", data: accounts });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch account info." });
    }
}

export const createAccount = async (req, res) => {
    const { type, name, balance } = req.body
    console.log(type, name, balance)
    const id = req.params.id;
    if (!req.body) {
        return res.status(400).send("Form data invalid.")
    }
    try {
        let account = await Account.findOne({ user: id , name})
        if (account) {
            console.log(account)
            return res.status(400).send("Account already exists");
        }
        await Account.create({ user: id, type, name, balance, transactions: [] });
        return res.status(200).json({ success: true, message: "Account created successfully." })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal server error." })
    }
}



export const addTransaction = async (req, res) => {
    if (!req.body) {
        return res.status(400).send("Form data invalid.")
    }

    console.log(req.body)
    let { type, amount, account, date } = req.body
    console.log(type, amount, account, date)
    date = new Date(date)
    // const month = Number(String(date.getMonth() + 1).padStart(2, '0'));
    // const year = Number(date.getFullYear());
    const id = req.params.id


    try {
        let foundAccount = await Account.findOne({ name: account })
        console.log("_______account: ", foundAccount)
        if (foundAccount) {
            let transaction = await Transaction.create({ user: id, type, account, amount, date })
            foundAccount = await Account.findOneAndUpdate({ name: account }, { $push: { transactions:transaction } }, { new: true })
            await foundAccount.save();
            return res.status(200).json({ success: true, message: "Transaction added." })
        }
        else{
            return res.status(400).json({success:false, message:"Account does not exist"})
        }
    } catch (error) {
        console.log(error)
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

const getAllTransaction = async (req, res) => {
    if (!req.body || !req.body.token) {
        return res.status(400).send("Access denied")
    }
    try {
        const transactions = await Transaction.find({ user: id })
    } catch (error) {
        console.log(error)

    }
}