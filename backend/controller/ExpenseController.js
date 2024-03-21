const { Sequelize } = require("sequelize");
const db = require("../model");
const AWS = require("aws-sdk");

const Expenses = db.expenses;
const Category = db.category;
const Users = db.users;
const sequelize = db.sequelize;
const fileDownload = db.fileDownload;

const getExpensesWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const itemsPerPage = parseInt(req.query.pageSize);

    let expenseQuery = await Expenses.findAndCountAll({
      include: [
        {
          model: Users,
          required: true,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Category,
          required: true,
        },
      ],

      where: { user_id: req.user.id },
      // page no
      offset: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
    });

    const totalPages = Math.ceil(expenseQuery.count / itemsPerPage);

    res.status(200).send({
      totalPages,
      expenses: expenseQuery.rows,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getExpensesByDates = async (req, res) => {
  try {
    // console.log(req.query.startDate , req.query.endDate)
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.pageSize) || 5;

    let expenseQuery = await Expenses.findAndCountAll({
      include: [
        {
          model: Users,
          required: true,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Category,
          required: true,
        },
      ],

      where: {
        user_id: req.query.user_id,
        date: {
          [Sequelize.Op.between]: [req.query.startDate, req.query.endDate],
        },
      },

      // page no
      offset: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
    });

    const totalPages = Math.ceil(expenseQuery.count / itemsPerPage);
    // console.log("expenseQuery - ", expenseQuery);

    res.status(200).send({ totalPages, expenses: expenseQuery.rows });
  } catch (error) {
    res.status(500).send(error);
  }
};

const createExpense = async (req, res) => {
  // console.log("create expense - " , req.user)

  const t = await sequelize.transaction();

  try {
    let detuctBudgetQuery = await Category.findByPk(req.body.cat_id);

    if (detuctBudgetQuery.budget > 0) {
      detuctBudgetQuery.budget = detuctBudgetQuery.budget - req.body.money;
      await detuctBudgetQuery.save({ transaction: t });
    } else {
      return res
        .status(200)
        .send({ success: true, msg: "Category Budget is over" });
    }

    const sumOfTotalExpenses =
      Number(req.user.totalExpense) + Number(req.body.money);

    const updateUsersSumQuery = await Users.update(
      { totalExpense: sumOfTotalExpenses },
      { where: { id: req.user.id }, transaction: t }
    );

    const data = {
      money: req.body.money,
      description: req.body.description,
      user_id: req.user.id,
      cat_id: req.body.cat_id,
      date: Date.now(),
    };

    const expenseQuery = await Expenses.create(data, { transaction: t });

    const categoryFetch = await Category.findOne({
      where: { id: expenseQuery.cat_id },
    });
    // console.log("sdaaf - " , categoryFetch )
    await t.commit();

    const {
      cat_id,
      createdAt,
      date,
      description,
      id,
      money,
      updatedAt,
      user_id,
    } = expenseQuery;

    const resultData = {
      cat_id,
      createdAt,
      date,
      description,
      id,
      money,
      updatedAt,
      user_id,
      category: categoryFetch,
    };

    res
      .status(200)
      .send({ success: true, msg: "Expenses Added", expenses: resultData });

    // let sumTotalExpenseQuery = await Users.findByPk(req.user.id , { transaction: t } );
    // sumTotalExpenseQuery.totalExpense += req.body.money;
    // await sumTotalExpenseQuery.save( { transaction: t });

    // let detuctBudgetQuery = await Category.findByPk(req.body.cat_id , { transaction: t } );

    // if (detuctBudgetQuery.budget > 0) {
    //   detuctBudgetQuery.budget = detuctBudgetQuery.budget - req.body.money;
    //   let updateDetuctBudgetQuery = await detuctBudgetQuery.save( { transaction: t });

    //   await Expenses.create(data , { transaction: t } );
    //   // console.log("updateDetuctBudgetQuery - ", updateDetuctBudgetQuery);
    //   await t.commit();
    //   res
    //     .status(200)
    //     .send({ success: true, msg: "Expenses Added", expenses: data });
    // } else {
    //   res.status(200).send({ success: true, msg: "Category Budget is over" });
    // }
  } catch (error) {
    await t.rollback();
    res.status(500).json(error);
  }
};

const deleteExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const expenseId = req.params.expenseId;

    let expenseDetails = await Expenses.findOne({
      where: { id: expenseId, user_id: req.user.id },
      transaction: t,
    });

    let differenceOfTotalExpenses =
      Number(req.user.totalExpense) - Number(expenseDetails.money);

    let updateExpenseFromUsers = await Users.update(
      { totalExpense: differenceOfTotalExpenses },
      { where: { id: req.user.id }, transaction: t }
    );

    // console.log( "expense - " , expenseDetails.money , " final  " ,  differenceOfTotalExpenses  )
    // console.log("delete userId - ", req.user.id);
    // console.log("delete expenseId - ", expenseId);

    let query = await Expenses.destroy({
      where: { id: expenseId, user_id: req.user.id },
      transaction: t,
    });

    await t.commit();

    res
      .status(200)
      .send({ success: true, msg: "Expense Deleted", expense: query });
  } catch (error) {
    await t.rollback();
    res.status(500).json(error);
  }
};

const uploadToS3 = async (stringifiedExpenses, fileName) => {
  try {
    const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
    const IAM_USER_KEY = process.env.AWS_IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.AWS_IAM_USER_SECRET;

    let s3Bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      // Bucket : BUCKET_NAME
    });

    // we already have bucket
    // s3Bucket.createBucket( () => {

    var params = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: stringifiedExpenses,
      ACL: "public-read",
    };

    return new Promise((resolve, reject) => {
      s3Bucket.upload(params, (err, s3response) => {
        if (err) {
          console.log(`somethong went wrong  -- \n`, err);
          reject(err);
          // throw new Error(err);
        } else {
          // console.log(`success `, s3response);
          resolve(s3response.Location);
        }
      });
    });

    // } )
  } catch (error) {
    // return error;
  }
};

const downloadExpenseFile = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    let query = await req.user.getExpenses();
    const stringifiedExpenses = JSON.stringify(query);
    const fileName = `expense${req.user.id}/${new Date()}/.txt`;
    const fileUrl = await uploadToS3(stringifiedExpenses, fileName);

    await fileDownload.create(
      { url: fileUrl, user_id: req.user.id },
      { transaction: t }
    );
    await t.commit();
    res.status(200).json({ success: true, fileUrl });
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).json({ success: false, fileUrl: "" });
  }
};

const getDownloadHistory = async (req, res) => {
  let query = await fileDownload.findAll({ user_id: req.user.id });
  res.status(200).json(query);
};

module.exports = {
  getExpensesWithPagination,
  getExpensesByDates,
  createExpense,
  deleteExpense,
  downloadExpenseFile,
  getDownloadHistory,
};
