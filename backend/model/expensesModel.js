module.exports = (sequelize, DataTypes) => {
  const Expenses = sequelize.define("expenses", {
    money: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Expenses;
};
