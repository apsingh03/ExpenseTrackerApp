import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
// import Footer from "../components/Footer";

// import { IoMdNotifications } from "react-icons/io";
// import { MdDarkMode } from "react-icons/md";
// import { FaUser } from "react-icons/fa";
// import { FaTachometerAlt, FaHome, FaRegUser, FaChartBar } from "react-icons/fa";
// import { MdSupportAgent } from "react-icons/md";
// import { IoLogoApple } from "react-icons/io";
// import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa";

import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";

const Dashboard = () => {
  return (
    <>
      <div className="d-flex flex-row justify-content-between text-white">
        <div>
          <h4>Dashboard</h4>
          <h6>Welcome Expense Management</h6>
        </div>

        <div className="breadcrumbs">
          <Link to="#">Home</Link>
          <span>
            {" "}
            <FaAngleRight />{" "}
          </span>
          <Link to="#">Dashboard</Link>
        </div>
      </div>

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
