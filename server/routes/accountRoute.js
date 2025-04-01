import express from "express";

import { getAccountInfo } from "../controllers/accountController.js";
import {authenticate} from "../auth/verifyToken.js";


const router = express.Router();

router.get("/:id",getAccountInfo);


export default router;
