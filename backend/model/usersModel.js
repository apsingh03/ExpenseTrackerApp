module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPremiumuser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    totalExpense: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Users;
};
