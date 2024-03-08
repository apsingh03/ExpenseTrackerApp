const router = require("express").Router();
const UserAuthentication = require("../middleware/auth");
const purchaseController = require("../controller/PurchaseController");

router.get(
  "/premiummembership",
  UserAuthentication.authenticate,
  purchaseController.purchasepremium
);
router.post(
  "/updatetransationstatus",
  UserAuthentication.authenticate,
  purchaseController.updateTransactionStatus
);

module.exports = router;
