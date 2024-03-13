const ExpenseController = require("../controller/ExpenseController");

const router = require("express").Router();
const userAuthentication = require("../middleware/auth");

router.get(
  "/getExpenses",
  userAuthentication.authenticate,
  ExpenseController.getExpensesWithPagination
);
router.get(
  "/getExpensesByDates",
  ExpenseController.getExpensesByDates
);
router.post(
  "/createExpense",
  userAuthentication.authenticate,
  ExpenseController.createExpense
);
router.delete(
  "/delete/:expenseId",
  userAuthentication.authenticate,
  ExpenseController.deleteExpense
);

module.exports = router;
