module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("category", {
    catName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    budget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Category;
};
