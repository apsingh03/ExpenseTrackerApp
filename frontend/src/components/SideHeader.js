import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { IoMdNotifications } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaTachometerAlt, FaHome, FaRegUser, FaChartBar } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { IoLogoApple } from "react-icons/io";
import { FaCircleDollarToSlot } from "react-icons/fa6";
// import SideHeader from "../components/SideHeader";



const SideHeader = () => {
  return (
    <>
    

    
    <main className="belowLeftSide d-flex flex-column justify-content-flex-start align-items-center">
          <div>
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

          <nav className="d-flex flex-column justify-content-center align-items-center">
            <div title="One">
              {" "}
              <Link to="#">
                {" "}
                <span className="icon">
                  {" "}
                  <FaHome />{" "}
                </span>{" "}
              </Link>{" "}
            </div>

            <div title="two">
              {" "}
              <Link to="#">
                {" "}
                <span className="icon">
                  {" "}
                  <FaTachometerAlt />{" "}
                </span>{" "}
              </Link>{" "}
            </div>

            <div title="three">
              {" "}
              <Link to="#">
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

            <div title="five">
              {" "}
              <Link to="#">
                {" "}
                <span className="icon">
                  {" "}
                  <FaChartBar />{" "}
                </span>{" "}
              </Link>{" "}
            </div>

            <div title="six">
              {" "}
              <Link to="#">
                {" "}
                <span className="icon">
                  {" "}
                  <MdSupportAgent />{" "}
                </span>{" "}
              </Link>{" "}
            </div>
          </nav>
        </main>
    
    
    
    </>
  )
}

export default SideHeader