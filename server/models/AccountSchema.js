import mongoose from "mongoose";

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
    amount:{
        type:Number,
        required: true
    }

})


const transactionSchema = new mongoose.Schema({
    user:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required: true
    },
    amount:{
        type:String
    },
    date:{
        type:Date,
        required: true
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