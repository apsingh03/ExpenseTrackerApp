import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import Header from "../components/Header";
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
