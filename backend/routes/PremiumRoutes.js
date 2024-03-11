const router = require("express").Router();
const premiumController = require("../controller/PremiumController");

router.get("/getUserLeaderboard", premiumController.getUserLeaderBoard);

module.exports = router;
