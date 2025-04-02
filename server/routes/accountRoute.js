import express from "express";

import { createAccount, getAccountInfo } from "../controllers/accountController.js";
import {authenticate} from "../auth/verifyToken.js";


const router = express.Router();

router.get("/:id",getAccountInfo);
router.post("/add/:id",createAccount)


export default router;
