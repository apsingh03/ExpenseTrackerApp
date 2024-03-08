require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const usersRoutes = require("./routes/UsersRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const expenseRoutes = require("./routes/ExpenseRoutes");
const purchaseRoutes = require("./routes/PurchaseRoutes");

app.use("/users", usersRoutes);
app.use("/category", categoryRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
