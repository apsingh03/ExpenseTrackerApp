const usersController = require("../controller/UsersController.js");

const router = require("express").Router();

router.get("/getUsers", usersController.getRequest);
router.get("/getUsers/:userId", usersController.getRequestByUserId);
router.post("/createUser", usersController.createUser);
router.post("/loginUser", usersController.loginUser);

module.exports = router;
