import { Router } from "express";
import { getExpensesData } from "../controllers/expensesController";

const router = Router();

router.get("/", getExpensesData);

export default router;
