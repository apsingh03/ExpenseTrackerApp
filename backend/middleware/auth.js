const jwt = require("jsonwebtoken");
const db = require("../model");
const Users = db.users;

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // console.log("Header token - ", token);

    const userObject = jwt.verify(token, "itsASecretKey");
    // console.log( "Header token - " , userObject);
    Users.findByPk(userObject.id).then((user) => {
      // console.log(" Users.findByPk --- ", user.id);
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({ success: false });
    // throw new Error(error);
  }
};

module.exports = {
  authenticate,
};
