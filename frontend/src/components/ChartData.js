import React, { useEffect, useState } from "react";

import { DateRangePicker } from "react-date-range";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import LineChart from "./charts/LineChart";
import { useSelector, useDispatch } from "react-redux";
import { getExpensesAsync } from "../redux/slice/ExpensesSlice";

const ChartData = () => {
  const dispatch = useDispatch();
  const [startDatee, setstartDate] = useState(new Date());
  const [endDatee, setendDate] = useState(new Date());

  const [filteredData, setfilteredData] = useState([]);

  const expensesRedux = useSelector((state) => state.expenses);

  //   console.log( expensesRedux )

  useEffect(() => {
    dispatch(getExpensesAsync());
  }, []);

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const handleSelect = (date) => {
    // console.log(date);

    let filtered = expensesRedux.data.filter((data) => {
      //  console.log(data.Day)
      let apiDate = new Date(data.Day);
      return (
        apiDate >= date.selection.startDate && apiDate <= date.selection.endDate
      );
    });

    setstartDate(date.selection.startDate);
    setendDate(date.selection.endDate);

    setfilteredData(filtered);

    // console.log("filtered" , filtered )
  };

  //   console.log("startDatee - " , startDatee )
  //   console.log("endDatee - " , endDatee )

  return (
    <>
      <div className="d-flex flex-row justify-content-between text-white">
        <div>
          <h4>Premium Report Generation</h4>
        </div>

        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>
            {" "}
            <FaAngleRight />{" "}
          </span>
          <Link to="/expenses"> Expenses</Link>
        </div>
      </div>

      <div className="row cardContainer2">
        <div className="col-12">
          <div className="card text-center ">
            <h6 className="mx-3">Select Data Range</h6>
            <div className="row">
              <div className="col-12">
                <div>
                  {/* <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row cardContainer2">
        <div className="col-12">
          <div className="card text-center ">
            <h6 className="mx-3">Report</h6>
            <div className="row">
              <div className="col-12">
                <div>{/* <LineChart /> */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartData;
