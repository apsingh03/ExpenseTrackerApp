require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.CORS_FRONTEND_ORIGIN,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

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

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Expense Tracker Rest Api docs",
      version: "1.0.0",
      description: `Its an Expense Tracker Platform <br/> <br/> 
      Developed By <b> Ajay Pratap Singh</b>  <br/> <br/> 
      Github  - <b> <a href="https://github.com/apsingh03" target="_blank" >Click Here</a></b>  <br/> <br/> 
      LinkedIn - <b> <a href="https://www.linkedin.com/in/apsingh03/" target="_blank" >Click Here</a></b>  <br/> <br/> 
      Developer Website - <b> <a href="https://ajaypratapsingh.online/" target="_blank" >Click Here</a></b>
      `,

      contact: {
        name: "Ajay pratap Singh",
        // url: "ajaypratapsingh.online",
        email: "apsinghjobs@gmail.com",
      },
    },
    servers: [
      {
        url: "https://expensetrackerbackend-v2i9.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
