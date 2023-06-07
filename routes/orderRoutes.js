import { Router } from "express";
import { receipt } from "../controllers/orderController.js";

const router = Router();

router.post("/receipt/:email", receipt);

export default router;
