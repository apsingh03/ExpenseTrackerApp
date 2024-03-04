const db = require("../model");

// models
const Category = db.category;

const getCategory = async (req, res) => {
  let query = await Category.findAll({});
  res.status(200).send(query);
};

const createCategory = async (req, res) => {
  try {
    let categoryExistQuery = await Category.findAll({
      where: { catName: req.body.catName },
    });

    // console.log(" emailExistQuery - ", emailExistQuery.length  , req.body.fullName , req.body.email , req.body.password );

    if (categoryExistQuery.length > 0) {
      const category = categoryExistQuery[0];

      if (category.catName === req.body.catName) {
        res
          .status(200)
          .send({ success: false, msg: "Category Name Already Exist" });
      }
    } else {
      const data = {
        catName: req.body.catName,
        budget: req.body.budget,
      };

      let query = await Category.create(data);

      res
        .status(200)
        .send({ success: true, msg: "Category Added", category: query });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const deleteId = req.params.categoryId;

    const query = await Category.destroy({ where: { id: deleteId } });
    const result = query === 1 ? true : false;
    res.status(200).send({ success: result, msg: "Category Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getCategory,
  createCategory,
  deleteCategory,
};
