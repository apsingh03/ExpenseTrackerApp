const Razorpay = require("razorpay");

const db = require("../model");
const Users = db.users;
const Order = db.orders;

const purchasepremium = async (req, res) => {
  try {
    let rzp = new Razorpay({
      key_id: "rzp_test_AxRtLSqfBaLNEC",
      key_secret: "0rphqWLqFIOsbiLBYVxWukBx",
    });

    const amount = 399;

    const paymentGateway = rzp.orders.create(
      { amount, currency: "INR" },
      (err, order) => {
        if (err) {
          throw new Error(JSON.stringify(err));
        }

        // res.status(201).json({ msg : "payment gateway"  , order : order  });
        // console.log("paymentGateway - " , order );
        // console.log("req - " , req  );

        req.user
          .createOrder({ orderid: order.id, status: "PENDING" })
          .then(() => {
            return res.status(201).json({ order, key_id: rzp.key_id });
          })
          .catch((err) => {
            // throw new Error(err);
            return res.status(500).json({ error: err });
          });
      }
    );

    // res.status(201).json({ msg : "payment gateway"  , payment : paymentGateway  });
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: "something went wrong", error: error });
  }
};

const updateTransactionStatus = async (req, res) => {
  try {
    // console.log("updateTransactionStatus - " , req.body );
    // { order_id: 'order_NjogbCPiuYMPSu', payment_id: 'pay_Njoi50ChXeW55W' }
    const { payment_id, order_id, paymentStatus } = req.body;

    if (paymentStatus === "FAILED") {
      const order = await Order.findOne({ where: { orderid: order_id } });

      const promise1 = await order.update({
        paymentid: payment_id,
        status: paymentStatus,
      });
      const promise2 = await req.user.update({ isPremiumuser: false });

      Promise.all([promise1, promise2])
        .then((result) => {
          return res
            .status(202)
            .json({ success: true, message: "Transaction successfull " });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      const order = await Order.findOne({ where: { orderid: order_id } });

      const promise1 = await order.update({
        paymentid: payment_id,
        status: paymentStatus,
      });
      const promise2 = await req.user.update({ isPremiumuser: true });

      Promise.all([promise1, promise2])
        .then((result) => {
          return res
            .status(202)
            .json({ success: true, message: "Transaction successfull " });
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  } catch (error) {
    res.status(403).json({ error: error, message: "Something went wrong" });
  }
};

module.exports = {
  purchasepremium,
  updateTransactionStatus,
};
