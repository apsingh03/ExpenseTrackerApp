const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const db = require("../model");

const { v4: uuidv4 } = require("uuid");
const Sib = require("sib-api-v3-sdk");

// models
const Users = db.users;
const ForgotPassword = db.forgotpassword;
const sequelize = db.sequelize;

const getRequest = async (req, res) => {
  let query = await Users.findAll({});
  res.status(200).send(query);
};

const getRequestByUserId = async (req, res) => {
  let query = await Users.findAll({ where: { id: req.params.userId } });
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
          isPremiumuser: currentUser.isPremiumuser,
        };

        var token = jwt.sign(userObject, "itsASecretKey");

        // console.log( "token - "  , token )

        if (result === true) {
          res.status(200).send({
            success: true,
            msg: "Logged In Successfully",
            token: token,
            userObject : {
              isUserLogged: true,
              id: currentUser.id,
              fullName: currentUser.fullName,
              email: currentUser.email,
              isPremiumuser: currentUser.isPremiumuser,
            }
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

const forgotPasswordd = async (req, res) => {
  try {
    const { email } = req.body;

    let findEmailQuery = await Users.findOne({ where: { email } });

    if (findEmailQuery) {
      const uuidRequestId = uuidv4();

      const userId = findEmailQuery.dataValues.id;

      const resetRequest = await ForgotPassword.create({
        requestId: uuidRequestId,
        isActive: true,
        expiryby: Date.now() + 3600000,
        user_id: userId,
      });

      //Set up Sendinblue API client
      const client = Sib.ApiClient.instance;
      const apiKey = client.authentications["api-key"];
      apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

      //Set up TransactionalEmailsApi
      const transEmailApi = new Sib.TransactionalEmailsApi();

      //define sender and receiver information
      const sender = {
        email: "singhajaypratap606@gmail.com",
        name: "Ajay Pratap Singh",
      };
      const receivers = [
        {
          email,
        },
      ];

      //Send a transactional email using Sendinblue
      const emailResponse = await transEmailApi.sendTransacEmail({
        sender,
        To: receivers,
        subject: "Expense Tracker Reset Password",
        textContent: "link Below",
        htmlContent: `
      <h1 style="text-align : center , " > Welcome to Expense Tracker App </h1>
      <h3>Hi! We got the request from you for reset the password. Here is the link below </h3>
      <a href="http://localhost:3000/forgotPassword/resetPasswordPage/{{params.requestId}}" target="_blank" > Click Here</a>`,
        params: {
          requestId: uuidRequestId,
        },
      });

      // console.log( "emailResponse - " , emailResponse )
      // console.log( "userId - " , userId , requestId  );
      res.status(200).send({
        success: true,
        msg: "Link for reset the password is successfully send on your Mail Id!",
      });
    } else {
      res.status(200).send({ success: false, msg: "User Doesn't Exist" });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
};

const resetPassword = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { requestToken, newPassword } = req.body;

    // console.log(" req.body  " , req.body );

    const checkTokenExistQuery = await ForgotPassword.findOne({
      where: { requestId: requestToken, isActive: 1 },
    });

    if (checkTokenExistQuery) {
      const user_id = checkTokenExistQuery.dataValues.user_id;

      // console.log("user_id ---->  " , user_id , newPassword , requestToken , );

      const saltRounds = 10;
      bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
        // Store hash in your password DB.

        await Users.update(
          { password: hash },
          { where: { id: user_id }, transaction: t }
        );
        await ForgotPassword.update(
          { isActive: 0 },
          { where: { requestId: requestToken }, transaction: t }
        );

        await t.commit();
        res.status(200).send({ success: true, msg: "Password Changed" });
      });
    } else {
      res.status(200).send({ success: false, msg: "Invalid Token" });
    }
  } catch (error) {
    await t.rollback();
    res.status(500).send(error);
  }
};

module.exports = {
  getRequest,
  createUser,
  loginUser,
  getRequestByUserId,
  forgotPasswordd,
  resetPassword,
};
