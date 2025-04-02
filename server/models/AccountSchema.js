import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    user:{
        type:String,
        required: true
    },
    type:{
        type:String,
        required: true
    },
    account:{
        type:String,
        required:true
    },
    amount:{
        type:String
    },
    date:{
        type:Date,
        required: true
    },
    
})

const accountSchema =  new mongoose.Schema({
    user :{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required: true,
    },
    balance:{
        type:Number,
        required: true
    },
    transactions:{
        type:[transactionSchema]
    }
})





const monthlyExpenseSchema = new mongoose.Schema({
    user:{
        type:String,
    },
    month:{
        type:Number,
        required:true,
        min: 1,
        max:12
    },
    year:{
        type:Number,
        required:true,
    },
    transaction:{
        type:[transactionSchema],
    },
})

const Account = mongoose.model('Account', accountSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const MonthlyData = mongoose.model ('MonthlyData', monthlyExpenseSchema);

export {Account , Transaction , MonthlyData}