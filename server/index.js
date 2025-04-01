import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js"
import getAccountInfoRoute from "./routes/accountRoute.js"
import montlyDataRoute from "./routes/monthlyDataRoute.js"


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
}));

app.use('/api/auth',authRoute);
app.use('/api/getAccountInfo',getAccountInfoRoute);
app.use('/api/monthlyData/',montlyDataRoute);


const uri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri)
        console.log("connected to db.")
    }
    catch (err) {
        console.log(err)
    }
}


app.get('/',(req,res)=>{
    res.send("API running...");
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000...");
    connectDB();
})
