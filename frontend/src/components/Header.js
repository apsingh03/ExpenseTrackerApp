import React from "react";

// icons
import { IoMdNotifications } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { FaTachometerAlt, FaHome, FaRegUser, FaChartBar } from "react-icons/fa";
// import { MdSupportAgent } from "react-icons/md";
// import { IoLogoApple } from "react-icons/io";
// import { FaCircleDollarToSlot } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";

const Header = () => {
  const dispatch = useDispatch();
  const signInRedux = useSelector((state) => state.signIn);

  // console.log(signInRedux.loggedData.isUserLogged);

  return (
    <>
      <header className="d-flex flex-row justify-content-between  ">
        <div>
          <Link
            to="/signup"
            style={{ fontSize: "20px" }}
            className="text-white text-decoration-underline mx-4"
          >
            Sign Up
          </Link>

          {signInRedux.loggedData &&
          signInRedux.loggedData.isUserLogged === true ? (
            <Link
              to="#"
              style={{ fontSize: "20px" }}
              className="text-white text-decoration-underline "
            >
              {signInRedux.loggedData.fullName} {" , "}{" "}
              {signInRedux.loggedData.email}
            </Link>
          ) : (
            <Link
              to="/signin"
              style={{ fontSize: "20px" }}
              className="text-white text-decoration-underline "
            >
              Sign In
            </Link>
          )}
        </div>

        <div className="iconContainer d-flex flex-row justify-content-between ailign-items-center">
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

          <div className="icon notification ">
            <IoMdNotifications />
            <div className="notificationContent">
              {" "}
              <Link>One</Link> <Link>Two</Link> <Link>Three</Link>{" "}
              <Link>Four</Link>{" "}
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
