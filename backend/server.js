require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const helmet = require('helmet'); 
var compression = require('compression')

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet()); 
// The middleware will attempt to compress response bodies for all request that traverse through the middleware,
// compress all responses
// app.use( compression() )

const usersRoutes = require("./routes/UsersRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const expenseRoutes = require("./routes/ExpenseRoutes");
const purchaseRoutes = require("./routes/PurchaseRoutes");
const premiumRoutes = require("./routes/PremiumRoutes");

app.use("/users", usersRoutes);
app.use("/category", categoryRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
