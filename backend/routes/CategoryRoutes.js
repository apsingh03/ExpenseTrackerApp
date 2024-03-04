const categoryController = require("../controller/CategoryController.js");

const router = require("express").Router();

router.get("/getCategory", categoryController.getCategory);
router.post("/createCategory", categoryController.createCategory);
router.delete("/delete/:categoryId", categoryController.deleteCategory);

module.exports = router;
