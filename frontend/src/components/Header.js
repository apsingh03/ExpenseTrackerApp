import React from "react";

// icons
import { IoMdNotifications } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { FaTachometerAlt, FaHome, FaRegUser, FaChartBar } from "react-icons/fa";
// import { MdSupportAgent } from "react-icons/md";
// import { IoLogoApple } from "react-icons/io";
// import { FaCircleDollarToSlot } from "react-icons/fa6";

const Header = () => {
  return (
    <>
      <header className="d-flex flex-row justify-content-between  ">
        <div>
          <input
            type="text"
            placeholder="Search box"
            className="form-control"
          />
        </div>

        <div className="iconContainer d-flex flex-row justify-content-between ailign-items-center">
          <div className="icon ">
            <MdDarkMode />
          </div>

          <div className="icon notification ">
            <IoMdNotifications />
            <div className="notificationContent">
              <div>
                {" "}
                <Link>One</Link>{" "}
              </div>
              <div>
                {" "}
                <Link>Two</Link>{" "}
              </div>
              <div>
                {" "}
                <Link>Three</Link>{" "}
              </div>
              <div>
                {" "}
                <Link>Four</Link>{" "}
              </div>
            </div>
          </div>

          <div className="icon  ">
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
