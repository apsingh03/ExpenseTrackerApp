/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       required:
 *         - paymentid
 *         - orderid
 *         - status
 *       properties:
 *         paymentid:
 *           type: integer
 *           description: payment id 
 *         orderid:
 *           type: integer
 *           description: razor pay order id
 *         status:
 *           type: string
 *           description: payment transaction status Pending | Failed | Fullfilled
 */
const router = require("express").Router();
const UserAuthentication = require("../middleware/auth");
const purchaseController = require("../controller/PurchaseController");
/**
 * @swagger
 * tags:
 *   name: Purchase
 *   description: The Purchase managing API
 * /purchase/premiummembership:
 *   get:
 *     summary: User can buy membership | Authentication Middleware Required
 *     tags: [Purchase]
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
 *               $ref: '#/components/schemas/'
 *       500:
 *         description: Some server error
 *
 */
router.get(
  "/premiummembership",
  UserAuthentication.authenticate,
  purchaseController.purchasepremium
);
/**
 * @swagger
 * tags:
 *   name: Purchase
 *   description: The Purchase managing API
 * /purchase/updatetransationstatus:
 *   post:
 *     summary: After payment update the transaction | Authentication Middleware Required
 *     tags: [Purchase]
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
 *               $ref: '#/components/schemas/'
 *       500:
 *         description: Some server error
 *
 */
router.post(
  "/updatetransationstatus",
  UserAuthentication.authenticate,
  purchaseController.updateTransactionStatus
);

module.exports = router;
