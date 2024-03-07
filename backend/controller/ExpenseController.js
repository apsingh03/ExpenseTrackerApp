const db = require("../model");

const Expenses = db.expenses;
const Category = db.category;
const Users = db.users;

// const

const getExpenses = async (req, res) => {
  // console.log( "----> req.user.id - " , req.user.id)

  let query = await Expenses.findAll({
    include: [
      {
        model: Users,
        model: Category,
      },
    ],

    where: { user_id: req.user.id },
  });

  res.status(200).send(query);
};

const createExpense = async (req, res) => {
  // console.log("create expense - " , req.user)

  try {
    const data = {
      money: req.body.money,
      description: req.body.description,
      user_id: req.user.id,
      cat_id: req.body.cat_id,
    };

    let detuctBudgetQuery = await Category.findByPk(req.body.cat_id);

    if (detuctBudgetQuery.budget > 0) {
      detuctBudgetQuery.budget = detuctBudgetQuery.budget - req.body.money;
      let updateDetuctBudgetQuery = await detuctBudgetQuery.save();

      let query = await Expenses.create(data);
      // console.log("updateDetuctBudgetQuery - ", updateDetuctBudgetQuery);

      res
        .status(200)
        .send({ success: true, msg: "Expenses Added", expenses: data });
    } else {
      res.status(200).send({ success: true, msg: "Category Budget is over" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteExpense = async (req, res) => {
  try {
    console.log;

    const expenseId = req.params.expenseId;

    // console.log("delete userId - ", req.user.id);
    // console.log("delete expenseId - ", expenseId);

    let query = await Expenses.destroy({
      where: { id: expenseId, user_id: req.user.id },
    });

    res
      .status(200)
      .send({ success: true, msg: "Expense Deleted", expense: query });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getExpenses,
  createExpense,
  deleteExpense,
};
