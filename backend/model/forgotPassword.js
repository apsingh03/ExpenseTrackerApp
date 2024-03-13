// const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const ForgotPassword = sequelize.define("forgotpassword", {

    requestId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    isActive: DataTypes.BOOLEAN,
    expiryby: DataTypes.DATE,
  });

  return ForgotPassword;
};
