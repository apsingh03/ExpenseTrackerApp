const { Sequelize } = require("sequelize");
const db = require("../model");

const Expenses = db.expenses;
const Users = db.users;

const getUserLeaderBoard = async (req, res) => {
  const userTableJoiningExpenseTable = await Users.findAll({
    attributes: [
      "id",
      "fullname",
      [Sequelize.fn("sum", Sequelize.col("expenses.money")), "total_cost"],
    ],
    include: [
      {
        model: Expenses,
        attributes: [],
      },
    ],
    group: ["users.id"],
    order: [["total_cost", "DESC"]],
    // order : [[Sequelize.col("total_cost") , "DESC" ]]
  });

  const expensesQuery = await Expenses.findAll({
    attributes: [
      "user_id",
      [Sequelize.fn("sum", Sequelize.col("money")), "total_cost"],
    ],
    include: [
      {
        model: Users,
        attributes: ["id", "fullname", "email"],
      },
    ],
    group: ["user_id"],
    order: [[Sequelize.col("total_cost"), "DESC"]],
  });

  const usersQuery = await Users.findAll({
    attributes: ["id", "fullname", "email", "totalExpense"],
    order: [["totalExpense", "DESC"]],
  });

  res.status(200).send(usersQuery);
};

module.exports = {
  getUserLeaderBoard,
};
