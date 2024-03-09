const db = require("../model");

const Expenses = db.expenses;
const Category = db.category;
const Users = db.users;
const sequelize = db.sequelize;

// const
const getExpenses = async (req, res) => {
  // console.log( "----> req.user.id - " , req.user.id)

  if (req.user.id === null) {
    let query = await Expenses.findAll({
      include: [
        {
          model: Users,
          model: Category,
        },
      ],
    });
    res.status(200).send(query);
  } else {
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
  }
};

const createExpense = async (req, res) => {
  // console.log("create expense - " , req.user)

  const t = await sequelize.transaction();

  try {
    let detuctBudgetQuery = await Category.findByPk(req.body.cat_id);

    if (detuctBudgetQuery.budget > 0) {
      detuctBudgetQuery.budget = detuctBudgetQuery.budget - req.body.money;
      await detuctBudgetQuery.save({ transaction: t });
    } else {
      return res
        .status(200)
        .send({ success: true, msg: "Category Budget is over" });
    }

    const sumOfTotalExpenses =
      Number(req.user.totalExpense) + Number(req.body.money);

    const updateUsersSumQuery = await Users.update(
      { totalExpense: sumOfTotalExpenses },
      { where: { id: req.user.id }, transaction: t }
    );

    const data = {
      money: req.body.money,
      description: req.body.description,
      user_id: req.user.id,
      cat_id: req.body.cat_id,
    };

    const expenseQuery = await Expenses.create(data, { transaction: t });

    await t.commit();
    res
      .status(200)
      .send({ success: true, msg: "Expenses Added", expenses: data });

    // let sumTotalExpenseQuery = await Users.findByPk(req.user.id , { transaction: t } );
    // sumTotalExpenseQuery.totalExpense += req.body.money;
    // await sumTotalExpenseQuery.save( { transaction: t });

    // let detuctBudgetQuery = await Category.findByPk(req.body.cat_id , { transaction: t } );

    // if (detuctBudgetQuery.budget > 0) {
    //   detuctBudgetQuery.budget = detuctBudgetQuery.budget - req.body.money;
    //   let updateDetuctBudgetQuery = await detuctBudgetQuery.save( { transaction: t });

    //   await Expenses.create(data , { transaction: t } );
    //   // console.log("updateDetuctBudgetQuery - ", updateDetuctBudgetQuery);
    //   await t.commit();
    //   res
    //     .status(200)
    //     .send({ success: true, msg: "Expenses Added", expenses: data });
    // } else {
    //   res.status(200).send({ success: true, msg: "Category Budget is over" });
    // }
  } catch (error) {
    await t.rollback();
    res.status(500).json(error);
  }
};

const deleteExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const expenseId = req.params.expenseId;

    let expenseDetails = await Expenses.findOne({
      where: { id: expenseId, user_id: req.user.id },
      transaction: t,
    });

    let differenceOfTotalExpenses =
      Number(req.user.totalExpense) - Number(expenseDetails.money);

    let updateExpenseFromUsers = await Users.update(
      { totalExpense: differenceOfTotalExpenses },
      { where: { id: req.user.id }, transaction: t }
    );

    // console.log( "expense - " , expenseDetails.money , " final  " ,  differenceOfTotalExpenses  )

    // console.log("delete userId - ", req.user.id);
    // console.log("delete expenseId - ", expenseId);

    let query = await Expenses.destroy({
      where: { id: expenseId, user_id: req.user.id },
      transaction: t,
    });

    await t.commit();

    res
      .status(200)
      .send({ success: true, msg: "Expense Deleted", expense: query });
  } catch (error) {
    await t.rollback();
    res.status(500).json(error);
  }
};

module.exports = {
  getExpenses,
  createExpense,
  deleteExpense,
};
