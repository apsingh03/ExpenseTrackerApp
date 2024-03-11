const usersController = require("../controller/UsersController.js");
const ExpenseController = require("../controller/ExpenseController");
const userAuthentication = require("../middleware/auth");
const router = require("express").Router();

router.get("/getUsers", usersController.getRequest);
router.get("/getUsers/:userId", usersController.getRequestByUserId);
router.post("/createUser", usersController.createUser);
router.post("/loginUser", usersController.loginUser);
router.post("/forgotpassword", usersController.forgotPasswordd);
router.get(
  "/downloadFile",
  userAuthentication.authenticate,
  ExpenseController.downloadExpenseFile
);

router.get(
  "/downloadHistory",
  userAuthentication.authenticate,
  ExpenseController.getDownloadHistory
);

module.exports = router;
