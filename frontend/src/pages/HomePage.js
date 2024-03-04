import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Header from "../components/Header";
// import Footer from "../components/Footer";

// import { IoMdNotifications } from "react-icons/io";
// import { MdDarkMode } from "react-icons/md";
// import { FaUser } from "react-icons/fa";
// import { FaTachometerAlt, FaHome, FaRegUser, FaChartBar } from "react-icons/fa";
// import { MdSupportAgent } from "react-icons/md";
// import { IoLogoApple } from "react-icons/io";
// import { FaCircleDollarToSlot } from "react-icons/fa6";

import SideHeader from "../components/SideHeader";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import Dashboard from "../components/Dashboard";

import Expenses from "../components/Expenses";
import Budget from "../components/Budget";
import Category from "../components/Category";

const HomePage = () => {
  return (
    <>
      <div id="homePage">
        <Header />

        <section className="d-flex flex-row">
          <SideHeader />

          <main className="belowRightSide p-5">
            {/* CODE HERE  */}

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/category" element={<Category />} />
            </Routes>

            {/* <Dashboard /> */}
          </main>
        </section>
      </div>
    </>
  );
};

export default HomePage;
