/**
 * @swagger
 * components:
 *   schemas:
 *     FileDownload:
 *       type: object
 *       required:
 *         - url
 *       properties:
 *         url:
 *           type: string
 *           description: User Expenses Download Link
 */
const router = require("express").Router();
const premiumController = require("../controller/PremiumController");
/**
 * @swagger
 * tags:
 *   name: Premium
 *   description: The premium managing API
 * /premium/getUserLeaderboard:
 *   get:
 *     summary: All users Leaderboard for premium users
 *     tags: [Premium]
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
router.get("/getUserLeaderboard", premiumController.getUserLeaderBoard);

module.exports = router;
