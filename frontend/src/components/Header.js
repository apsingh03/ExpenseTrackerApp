import React, { useEffect } from "react";

// icons
import { IoMdNotifications } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoLogOut } from "react-icons/io5";
import axios from "axios";
import { getUserByUserIdAsync } from "../redux/slice/UsersSlice";

const Header = () => {
  const dispatch = useDispatch();
  const signInRedux = useSelector((state) => state.signIn);
  const usersRedux = useSelector((state) => state.users);
  // console.log("usersRedux - ", usersRedux.data[0]);

  useEffect(() => {
    dispatch(getUserByUserIdAsync({ userId: signInRedux.loggedData.id }));
  }, [dispatch]);

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

    const HOSTNAME = process.env.REACT_APP_HOSTNAME;
    const token = localStorage.getItem("loggedDataToken");

    const response = await axios.get(
      `${HOSTNAME}/purchase/premiummembership/`,
      {
        headers: { Authorization: `${token}` },
      }
    );

    const { order } = response.data;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
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
        dispatch(getUserByUserIdAsync({ userId: signInRedux.loggedData.id }));
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
      dispatch(getUserByUserIdAsync({ userId: signInRedux.loggedData.id }));
    });
  }

  // console.log(signInRedux.loggedData.isUserLogged );

  return (
    <>
      <header className="d-flex flex-row justify-content-between  ">
        <div>
          <Link to="/" className="d-sm-inline-block d-md-none ">
            <span className="icon">Logo</span>
          </Link>
          <Link
            to="/signup"
            style={{ fontSize: "15px" }}
            className="text-white text-decoration-underline mx-2 "
          >
            Sign Up
          </Link>

          {signInRedux.loggedData &&
          signInRedux.loggedData.isUserLogged === true ? (
            <Link
              to="#"
              style={{ fontSize: "15px" }}
              className="text-white text-decoration-underline "
            >
              {signInRedux.loggedData.email.substring(0, 8)}
            </Link>
          ) : (
            <Link
              to="/signin"
              style={{ fontSize: "15px" }}
              className="text-white text-decoration-underline "
            >
              Sign In
            </Link>
          )}

          {signInRedux.loggedData &&
          signInRedux.loggedData.isUserLogged === true ? (
            <>
              {usersRedux.data &&
                usersRedux.data.map((user) => {
                  if (user.isPremiumuser === true) {
                    return (
                      <p
                        style={{ fontSize: "15px" }}
                        className=" btn btn-primary btn-sm text-white text-decoration-none mx-3"
                      >
                        Premium User
                      </p>
                    );
                  } else {
                    return (
                      <Link
                        to="#"
                        style={{ fontSize: "15px" }}
                        className=" btn btn-primary btn-sm text-white text-decoration-underline mx-4"
                        onClick={displayRazorpay}
                      >
                        Buy Premium
                      </Link>
                    );
                  }
                })}
            </>
          ) : null}
        </div>

        <div className="iconContainer d-flex flex-row justify-content-between ailign-items-center">
          {signInRedux.loggedData &&
          signInRedux.loggedData.isUserLogged === true ? (
            <div
              className="icon "
              title="Logout"
              style={{ cursor: "pointer" }}
              onClick={() => [
                localStorage.removeItem("loggedDataToken"),
                window.location.reload(),
              ]}
            >
              <IoLogOut />
            </div>
          ) : null}

          <div className="icon notification ">
            <IoMdNotifications />
            <div className="notificationContent">
              <Link>One</Link> <Link>Two</Link> <Link>Three</Link>
              <Link>Four</Link>
            </div>
          </div>

          <div className="icon userProfile ">
            <div className="userContainer">
              <FaUser size={15} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
