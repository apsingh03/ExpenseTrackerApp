/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - catName
 *         - budget
 *       properties:
 *         catName:
 *           type: string
 *           description: Category Name
 *         budget:
 *           type: integer
 *           description: Category Budget
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

const categoryController = require("../controller/CategoryController.js");
const userAuthentication = require("../middleware/auth.js");
const router = require("express").Router();
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The Category managing API
 * /category/getCategory:
 *   get:
 *     summary: Get all Category | Authentication Middleware Required
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/getCategory",
  userAuthentication.authenticate,
  categoryController.getCategory
);
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The Category managing API
 * /category/createCategory:
 *   post:
 *     summary: creates new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Some server error
 *
 */
router.post("/createCategory", categoryController.createCategory);
/**
 * @swagger
 * tags:
 *   name: Category
 *   description: The Category managing API
 * /category/delete/:categoryId:
 *   delete:
 *     summary: deletes category
 *     tags: [Category]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: .
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Some server error
 *
 */
router.delete("/delete/:categoryId", categoryController.deleteCategory);

module.exports = router;
