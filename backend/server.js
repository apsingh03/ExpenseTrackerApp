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

app.use("/users", usersRoutes);
app.use("/category", categoryRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
