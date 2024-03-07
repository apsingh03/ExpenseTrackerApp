const categoryController = require("../controller/CategoryController.js");
const userAuthentication = require("../middleware/auth.js");

const router = require("express").Router();

router.get(
  "/getCategory",
  userAuthentication.authenticate,
  categoryController.getCategory
);
router.post("/createCategory", categoryController.createCategory);
router.delete("/delete/:categoryId", categoryController.deleteCategory);

module.exports = router;
