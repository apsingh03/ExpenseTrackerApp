const usersController = require("../controller/UsersController.js");

const router = require("express").Router();

router.get("/getUsers", usersController.getRequest);

module.exports = router;
