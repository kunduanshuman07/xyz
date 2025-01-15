import Express from "express";
import { fetchExpenses, getExpenseTaxonomy, submitExpense } from "../controllers/expense.controller.js";

const router = Express.Router();

router.get('/expense-taxonomy', getExpenseTaxonomy);
router.post('/submit-expense', submitExpense);
router.post('/fetch-expenses', fetchExpenses);

export default router;