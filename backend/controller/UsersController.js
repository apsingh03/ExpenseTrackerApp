const db = require("../model");

// models
const Users = db.users;

const getRequest = async (req, res) => {
  await res.status(200).send({ msg: "welcome to my express app" });
};

module.exports = {
  getRequest,
};
