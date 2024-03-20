/**
 * @swagger
 * components:
 *   schemas:
 *     Expenses:
 *       type: object
 *       required:
 *         - money
 *         - description
 *         - date
 *       properties:
 *         money:
 *           type: integer
 *           description: expense money
 *         description:
 *           type: integer
 *           description: expense description
 *         date:
 *           type: integer
 *           description: expense created date
 */
const ExpenseController = require("../controller/ExpenseController");

const router = require("express").Router();
const userAuthentication = require("../middleware/auth");
/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: The Expenses managing API
 * /expense/getExpenses:
 *   get:
 *     summary: Get all Expenses with Pagination | Authentication Middleware Required
 *     tags: [Expenses]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expenses'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/getExpenses",
  userAuthentication.authenticate,
  ExpenseController.getExpensesWithPagination
);
/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: The Expenses managing API
 * /expense/getExpensesByDates:
 *   get:
 *     summary: Get all Expenses within Date Range
 *     tags: [Expenses]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expenses'
 *       500:
 *         description: Some server error
 *
 */
router.get("/getExpensesByDates", ExpenseController.getExpensesByDates);
/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: The Expenses managing API
 * /expense/createExpense:
 *   post:
 *     summary: create a expense | Authentication Middleware Required
 *     tags: [Expenses]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expenses'
 *       500:
 *         description: Some server error
 *
 */
router.post(
  "/createExpense",
  userAuthentication.authenticate,
  ExpenseController.createExpense
);
/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: The Expenses managing API
 * /expense/delete/:expenseId:
 *   delete:
 *     summary: deletes expense | Authentication Middleware Required
 *     tags: [Expenses]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expenses'
 *       500:
 *         description: Some server error
 *
 */
router.delete(
  "/delete/:expenseId",
  userAuthentication.authenticate,
  ExpenseController.deleteExpense
);

module.exports = router;
