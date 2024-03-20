/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - fullName
 *         - email
 *         - password
 *         - isPremiumuser
 *         - totalExpense
 *       properties:
 *         fullName:
 *           type: string
 *           description: User Full Name
 *         email:
 *           type: integer
 *           description: User Email address
 *         password:
 *           type: integer
 *           description: User Password
 *         isPremiumuser:
 *           type: boolean
 *           description: User bought premium or not
 *         totalExpense:
 *           type: boolean
 *           description: when user create an expense money added with total expense
 *       example:
 *         id: 1
 *         fullName: ajay pratap singh
 *         email: admin@gmail.com
 *         password: 2b$10$4TJDxjHLUhlLBCl5sNBW5uL.tgbi95tLfDIiP5RCEi5N1wiru66dy"
 *         isPremiumuser : true
 *         totalExpense : 11374
 *         createdAt: 2024-03-15T07:54:43.000Z
 *         updatedAt: 2024-03-15T07:54:43.000Z
 */
// Forgot PAssword Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     ForgotPassword:
 *       type: object
 *       required:
 *         - requestId
 *         - isActive
 *         - expiryby
 *       properties:
 *         requestId:
 *           type: string
 *           description: uuid request Id
 *         isActive:
 *           type: boolean
 *           description: true or false
 *         expiryby:
 *           type: date
 *           description: token expiry date
 */
const usersController = require("../controller/UsersController.js");
const ExpenseController = require("../controller/ExpenseController");
const userAuthentication = require("../middleware/auth");
const router = require("express").Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/getUsers:
 *   get:
 *     summary: Get all Users
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */
router.get("/getUsers", usersController.getRequest);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/getUsers/:userId:
 *   get:
 *     summary: Get all Category
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */
router.get("/getUsers/:userId", usersController.getRequestByUserId);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/createUser:
 *   post:
 *     summary: creates a user
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */
router.post("/createUser", usersController.createUser);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/loginUser:
 *   post:
 *     summary: user login
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */
router.post("/loginUser", usersController.loginUser);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/forgotPassword:
 *   post:
 *     summary: user can forgot password
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */
router.post("/forgotPassword", usersController.forgotPasswordd);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/forgotPassword/resetPassword:
 *   post:
 *     summary: via email user can reset their password
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */
router.post("/forgotPassword/resetPassword", usersController.resetPassword);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/downloadFile:
 *   get:
 *     summary: user can download their expese file | Authentication Middleware Required
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/downloadFile",
  userAuthentication.authenticate,
  ExpenseController.downloadExpenseFile
);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /users/downloadHistory:
 *   get:
 *     summary: user can get their expenses downloadHistory | Authentication Middleware Required
 *     tags: [Users]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/downloadHistory",
  userAuthentication.authenticate,
  ExpenseController.getDownloadHistory
);

module.exports = router;
