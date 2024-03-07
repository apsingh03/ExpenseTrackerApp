const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const db = require("../model");

// models
const Users = db.users;

const getRequest = async (req, res) => {
  let query = await Users.findAll({});
  res.status(200).send(query);
};

const createUser = async (req, res) => {
  try {
    let emailExistQuery = await Users.findAll({
      where: { email: req.body.email },
    });

    // console.log(" emailExistQuery - ", emailExistQuery.length  , req.body.fullName , req.body.email , req.body.password );

    if (emailExistQuery.length > 0) {
      const user = emailExistQuery[0];

      if (user.email === req.body.email) {
        res.status(200).send({ success: false, msg: "User Already Exist" });
      }
    } else {
      const saltRounds = 10;
      bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
        // Store hash in your password DB.

        const data = {
          fullName: req.body.fullName,
          email: req.body.email,
          password: hash,
        };

        let query = await Users.create(data);

        res.status(200).send({ success: true, msg: "Sign Up Successful" });
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const user = await Users.findAll({ where: { email: req.body.email } });

  if (user.length > 0) {
    const currentUser = user[0];

    bcrypt.compare(
      req.body.password,
      currentUser.password,
      function (err, result) {
        if (err) {
          return res
            .status(500)
            .send({ success: false, msg: "Something went wrong" });
        }

        const userObject = {
          isUserLogged: true,
          id: currentUser.id,
          fullName: currentUser.fullName,
          email: currentUser.email,
        };

        var token = jwt.sign(userObject, "itsASecretKey");

        // console.log( "token - "  , token )

        if (result === true) {
          res.status(200).send({
            success: true,
            msg: "Logged In Successfully",
            token: token,
          });
        } else {
          return res
            .status(200)
            .send({ success: false, msg: "Password Wrong" });
        }
      }
    );
  } else {
    res.status(200).send({ success: false, msg: "User Does Not Exist" });
  }
};

module.exports = {
  getRequest,
  createUser,
  loginUser,
};
