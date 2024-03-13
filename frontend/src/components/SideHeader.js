import React from "react";
import { Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaTachometerAlt, FaHome, FaRegUser, FaChartBar } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { IoLogoApple } from "react-icons/io";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";

// import SideHeader from "../components/SideHeader";

const SideHeader = () => {
  return (
    <>
      <main className="belowLeftSide">
        {/* d-sm-none d-md-block */}
        <div className="firstContainer">
          <div title="Logo">
            {" "}
            <Link to="#">
              {" "}
              <span className="icon">
                {" "}
                <IoLogoApple size={60} />{" "}
              </span>{" "}
            </Link>{" "}
          </div>
        </div>

        <div className="secondContainer">
          <nav>
            <div title="Dashboard">
              {" "}
              <Link to="/">
                {" "}
                <span className="icon">
                  {" "}
                  <FaHome />{" "}
                </span>{" "}
              </Link>{" "}
            </div>

            <div title="Category">
              {" "}
              <Link to="/category">
                {" "}
                <span className="icon">
                  {" "}
                  <BiSolidCategoryAlt />{" "}
                </span>{" "}
              </Link>{" "}
            </div>

            <div title="Expenses">
              {" "}
              <Link to="/expenses">
                {" "}
                <span className="icon">
                  {" "}
                  <FaCircleDollarToSlot />{" "}
                </span>{" "}
              </Link>{" "}
            </div>

            <div title="four">
              {" "}
              <Link to="#">
                {" "}
                <span className="icon">
                  {" "}
                  <FaRegUser />{" "}
                </span>{" "}
              </Link>{" "}
            </div>
          </nav>
        </div>
      </main>
    </>
  );
};

export default SideHeader;
