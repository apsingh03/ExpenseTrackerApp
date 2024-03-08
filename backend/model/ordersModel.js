module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("orders", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   primaryKey: true,
    // },

    paymentid: DataTypes.STRING,
    orderid: DataTypes.STRING,
    status: DataTypes.STRING,
  });

  return Orders;
};
