import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";

import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const signInRedux = useSelector((state) => state.signIn);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razropay failed to load!!");
      return;
    }

    const HOSTNAME = "http://localhost:8000";
    const token = localStorage.getItem("loggedDataToken");

    const response = await axios.get(
      `${HOSTNAME}/purchase/premiummembership/`,
      {
        headers: { Authorization: `${token}` },
      }
    );

    const { order } = response.data;

    const options = {
      key: "rzp_test_AxRtLSqfBaLNEC", // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: "Expense Tracker APP",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

      // callback_url:`${HOSTNAME}/purchase/updatetransationstatus/`,

      // this handler func will handle the success payment
      handler: async function (response) {
        await axios.post(
          `${HOSTNAME}/purchase/updatetransationstatus/`,
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
            paymentStatus: "SUCCESSFUL",
          },

          {
            headers: { Authorization: `${token}` },
          }
        );

        alert("You are a Premium User Now");
      },

      prefill: {
        name: signInRedux.loggedData.fullName,
        email: signInRedux.loggedData.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", async function (response) {
      const token = localStorage.getItem("loggedDataToken");

      const responseFailed = await axios.post(
        `${HOSTNAME}/purchase/updatetransationstatus/`,
        {
          order_id: options.order_id,
          payment_id: "",
          paymentStatus: "FAILED",
        },

        {
          headers: { Authorization: `${token}` },
        }
      );

      console.log(response);
      alert("Payment Failed something went wrong");
    });
  }

  return (
    <>
      <div className="row cardContainer1 ">
        <div className="col-12 col-md-4 col-lg-3">
          <div className="card">
            <h6>Total Balance</h6>
            <h3>$ 432568</h3>
            <div className="divider">
              <span className="text-success">Loreum </span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 col-lg-3">
          <div className="card">
            <h6>Total Balance</h6>
            <h3>$ 432568</h3>
            <div className="divider">
              <span className="text-success">Loreum </span>
              <span>Ipsum</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 col-lg-3">
          <div className="card">
            <h6>Total Balance</h6>
            <h3>$ 432568</h3>
            <div className="divider">
              <span className="text-success">Loreum </span>
              <span>Ipsum</span>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 col-lg-3">
          <div className="card">
            <h6>Total Balance</h6>
            <h3>$ 432568</h3>
            <div className="divider">
              <span className="text-success">Loreum </span>
              <span>Ipsum</span>
            </div>
          </div>
        </div>
      </div>

      <button
        id="rzp-button1"
        onClick={displayRazorpay}
        className="btn btn-primary btn-lg mx-5"
      >
        {" "}
        BUY PREMIUM{" "}
      </button>

      <div className="row cardContainer2">
        <div className="col-12 col-md-6 col-lg-9">
          <div className="card">
            <h2>Expense Chart</h2>
            <LineChart />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card">
            <h6>Monthly expense breakdown</h6>

            <div className="expenseBreakdown d-flex flex-row justify-content-between  ">
              <div>
                {" "}
                <p>Electricity</p>{" "}
              </div>
              <div>
                {" "}
                <p>$1200</p>{" "}
              </div>
            </div>

            <div className="expenseBreakdown d-flex flex-row justify-content-between  ">
              <div>
                {" "}
                <p>Electricity</p>{" "}
              </div>
              <div>
                {" "}
                <p>$1200</p>{" "}
              </div>
            </div>

            <div className="expenseBreakdown d-flex flex-row justify-content-between  ">
              <div>
                {" "}
                <p>Electricity</p>{" "}
              </div>
              <div>
                {" "}
                <p>$1200</p>{" "}
              </div>
            </div>

            <div className="expenseBreakdown d-flex flex-row justify-content-between  ">
              <div>
                {" "}
                <p>Electricity</p>{" "}
              </div>
              <div>
                {" "}
                <p>$1200</p>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row cardContainer2">
        <div className="col-12 col-md-6 col-lg-9">
          <div className="card">
            <h2>Expense Chart</h2>
            <PieChart />
          </div>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card">
            <h6>Monthly expense breakdown</h6>

            <div className="expenseBreakdown d-flex flex-row justify-content-between  ">
              <div>
                {" "}
                <p>Electricity</p>{" "}
              </div>
              <div>
                {" "}
                <p>$1200</p>{" "}
              </div>
            </div>

            <div className="expenseBreakdown d-flex flex-row justify-content-between  ">
              <div>
                {" "}
                <p>Electricity</p>{" "}
              </div>
              <div>
                {" "}
                <p>$1200</p>{" "}
              </div>
            </div>

            <div className="expenseBreakdown d-flex flex-row justify-content-between  ">
              <div>
                {" "}
                <p>Electricity</p>{" "}
              </div>
              <div>
                {" "}
                <p>$1200</p>{" "}
              </div>
            </div>

            <div className="expenseBreakdown d-flex flex-row justify-content-between  ">
              <div>
                {" "}
                <p>Electricity</p>{" "}
              </div>
              <div>
                {" "}
                <p>$1200</p>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
