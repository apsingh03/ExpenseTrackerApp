const { Sequelize, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: "mysql",
    operatorsAliases: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    // console.log("sequelize connected");
  })
  .catch((error) => {
    console.log("Sequelize Error ", error);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// table name
db.users = require("./usersModel.js")(sequelize, DataTypes);
db.category = require("./categoryModel.js")(sequelize, DataTypes);
db.expenses = require("./expensesModel.js")(sequelize, DataTypes);
db.orders = require("./ordersModel.js")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("You are in Sync");
});

// expense -> Foreign Key users
db.users.hasMany(db.expenses, {
  foreignKey: "user_id",
  // as: "expenses",
});
db.expenses.belongsTo(db.users, {
  foreignKey: "user_id",
  // as: "usersID",
});

// category -> Foreign Key expense
db.category.hasMany(db.expenses, {
  foreignKey: "cat_id",
  // as: "expenses",
});
db.expenses.belongsTo(db.category, {
  foreignKey: "cat_id",
  // as: "categoryID",
});

// users -> Foreign Key order
db.users.hasMany(db.orders, {
  foreignKey: "user_id",
  // as: "expenses",
});

db.orders.belongsTo(db.users, {
  foreignKey: "user_id",
  // as: "categoryID",
});

module.exports = db;
