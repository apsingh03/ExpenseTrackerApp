// const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const ForgotPassword = sequelize.define("forgotpassword", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },

    active: DataTypes.BOOLEAN,
    expiryby: DataTypes.DATE,
  });

  return ForgotPassword;
};
