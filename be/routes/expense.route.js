import Express from "express";
import { approveExpense, fetchDrafts, fetchExpenseDetails, fetchExpenses, financeApprovals, getExpenseTaxonomy, managerApprovals, rejectExpense, saveExpense, submitExpense, submitSavedExpense, updateExpense } from "../controllers/expense.controller.js";

const router = Express.Router();

router.get('/expense-taxonomy', getExpenseTaxonomy);
router.post('/submit-expense', submitExpense);
router.post('/submit-saved-expense', submitSavedExpense);
router.post('/save-expense', saveExpense);
router.post('/update-expense', updateExpense);
router.post('/fetch-expenses', fetchExpenses);
router.post('/fetch-drafts', fetchDrafts);
router.post('/fetch-approvals', managerApprovals);
router.get('/fetch-finance-approvals', financeApprovals);
router.post('/fetch-expense-details', fetchExpenseDetails)
router.post('/approve-expense', approveExpense)
router.post('/reject-expense', rejectExpense)

export default router;