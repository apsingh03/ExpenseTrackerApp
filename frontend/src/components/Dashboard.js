import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import { getLeaderBoardAsync } from "../redux/slice/getLeaderBoardSlice";
import { getCategoryAsync } from "../redux/slice/CategorySlice";
import {
  getDownloadHistoryAsync,
  getReportDownloadAsync,
} from "../redux/slice/FileDownloadHistorySlice";
import { DateRangePicker } from "react-date-range";
import { getExpensesByDatesAsync } from "../redux/slice/ExpensesSlice";
import { FaLink } from "react-icons/fa";

const Dashboard = () => {
  const dispatch = useDispatch();
  const signInRedux = useSelector((state) => state.signIn);
  const leaderboardRedux = useSelector((state) => state.leaderboard);
  const usersRedux = useSelector((state) => state.users);
  const categoryRedux = useSelector((state) => state.category);
  const fileDownloadHistoryRedux = useSelector(
    (state) => state.fileDownloadHistory
  );
  const expensesRedux = useSelector((state) => state.expenses);

  // console.log("expensesRedux - ", );

  const [startDatee, setstartDate] = useState(new Date());
  const [endDatee, setendDate] = useState(new Date());

  // pagination
  const totalPagesRedux = expensesRedux.data?.totalPages;
  const paginationArray = Array.from(Array(totalPagesRedux).keys()).splice(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageSize, setpageSize] = useState(8);

  function loadTotalPagesFromExpenses() {
    if (expensesRedux.isLoading !== true) {
      setTotalPages(expensesRedux.data?.totalPages);
    }
  }

  const selectionRange = {
    startDate: startDatee,
    endDate: endDatee,
    key: "selection",
  };

  const handleSelect = (date) => {
    setstartDate(date.selection.startDate);
    setendDate(date.selection.endDate);
  };

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage() {
    console.log("prev page");
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    // console.log("dashboard")
    dispatch(getLeaderBoardAsync());
    dispatch(getCategoryAsync());
    dispatch(getDownloadHistoryAsync());
    loadTotalPagesFromExpenses();
    dispatch(
      getExpensesByDatesAsync({
        startDate: startDatee,
        endDate: endDatee,
        currentPage,
        pageSize,
        user_id: signInRedux.loggedData.id,
      })
    );
  }, [currentPage, pageSize, totalPagesRedux]);

  return (
    <>
      <div>
        {signInRedux.loggedData &&
        signInRedux.loggedData.isUserLogged === true ? (
          <>
            <div className="row cardContainer1 ">
              <div className="col-12 col-sm-4 mb-2">
                <div className="card">
                  <h6>Total Categories</h6>
                  <h3> {categoryRedux.data && categoryRedux.data.length} </h3>
                  <div className="divider">
                    <span className="text-success">Loreum </span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-4 mb-2">
                <div className="card">
                  <h6>Your Expense Sum</h6>
                  <h3>
                    {" "}
                    &#8377;{" "}
                    {usersRedux.data &&
                      usersRedux.data.map((data, index) => (
                        <span key={index}> {data.totalExpense} </span>
                      ))}{" "}
                  </h3>
                  <div className="divider">
                    <span className="text-success">Loreum </span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-4 mb-2">
                <div className="card">
                  <h6>Total Users</h6>
                  <h3> {usersRedux.data && usersRedux.data.length} </h3>
                  <div className="divider">
                    <span className="text-success">Loreum </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ overflowX: "scroll" }}>
              {usersRedux.data &&
                usersRedux.data.map((data, index) => {
                  if (data.isPremiumuser === true) {
                    return (
                      <div key={index} className="cardContainer2">
                        <div className="col-12">
                          <div className="card">
                            <div className="d-flex flex-row justify-content-between my-3">
                              <h6 className="text-center ">
                                Premium Users Download History
                              </h6>
                              <div className=" text-center">
                                {fileDownloadHistoryRedux &&
                                fileDownloadHistoryRedux.isLoading === true ? (
                                  <>
                                    <RotatingLines
                                      visible={true}
                                      height="20"
                                      width="20"
                                      // color= '#fff'
                                      strokeWidth="5"
                                      animationDuration="0.75"
                                      ariaLabel="rotating-lines-loading"
                                      wrapperStyle={{ color: "white" }}
                                      wrapperClass=""
                                    />
                                  </>
                                ) : null}
                              </div>
                            </div>

                            <table className="table table-striped table-hover  ">
                              <thead>
                                <tr className="text-center">
                                  <th scope="col">S.No</th>
                                  <th scope="col">Download Link</th>
                                  <th scope="col">Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {fileDownloadHistoryRedux &&
                                  fileDownloadHistoryRedux.data.map(
                                    (data, index) => {
                                      // console.log( "url " , data )

                                      return (
                                        <tr key={index} className="text-center">
                                          <th> {index + 1} </th>
                                          <td className="text-dark fw-bold">
                                            {data.url &&
                                              data.url.substring(0, 30) + "..."}
                                          </td>

                                          <td className="text-dark fw-bold">
                                            <Link
                                              className=" btn btn-primary btn-sm text-white"
                                              style={{
                                                color: "#fff",
                                                textDecoration: "none",
                                              }}
                                              target="_blank"
                                              to={data.url}
                                              download
                                              title="Download It"
                                            >
                                              Download
                                            </Link>
                                          </td>
                                        </tr>
                                      );
                                    }
                                  )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>

            <div style={{ overflowX: "scroll" }}>
              {usersRedux.data &&
                usersRedux.data.map((data, index) => {
                  if (data.isPremiumuser === true) {
                    return (
                      <div key={index} className="row cardContainer2">
                        <div className="col-12">
                          <div className="card">
                            <div className="d-flex flex-row justify-content-between my-3">
                              <h6 className="text-center ">
                                Premium Users LeaderBoard
                              </h6>
                              <div>
                                {signInRedux.loggedData &&
                                signInRedux.loggedData.isUserLogged === true ? (
                                  <>
                                    {usersRedux.data &&
                                      usersRedux.data.map((data, index) => {
                                        if (data.isPremiumuser === true) {
                                          return (
                                            <button
                                              key={index}
                                              style={{ fontSize: "15px" }}
                                              className=" btn btn-primary btn-sm text-white d-flex"
                                              id="downloadexpense"
                                              onClick={() => [
                                                dispatch(
                                                  getReportDownloadAsync()
                                                ),
                                              ]}
                                            >
                                              Download Report File
                                              <div className=" mx-3 text-center">
                                                {fileDownloadHistoryRedux &&
                                                fileDownloadHistoryRedux.isLoading ===
                                                  true ? (
                                                  <RotatingLines
                                                    visible={true}
                                                    height="20"
                                                    width="20"
                                                    // color= '#fff'
                                                    strokeWidth="5"
                                                    animationDuration="0.75"
                                                    ariaLabel="rotating-lines-loading"
                                                    wrapperStyle={{
                                                      color: "white",
                                                    }}
                                                    wrapperClass=""
                                                  />
                                                ) : null}
                                              </div>
                                            </button>
                                          );
                                        }
                                      })}
                                  </>
                                ) : null}
                              </div>
                            </div>

                            <table className="table table-striped table-hover  ">
                              <thead>
                                <tr className="text-center">
                                  <th scope="col">S.No</th>
                                  <th scope="col">Full Name</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Total Expense</th>
                                </tr>
                              </thead>

                              <tbody>
                                {leaderboardRedux.data &&
                                  leaderboardRedux.data.map((data, index) => {
                                    return (
                                      <tr key={index} className="text-center">
                                        <th> {index + 1} </th>
                                        <td className="text-dark fw-bold">
                                          {data.fullname && data.fullname}{" "}
                                        </td>
                                        <td className="text-dark fw-bold ">
                                          {data.email && data.email}
                                        </td>

                                        <td className="text-dark fw-bold">
                                          &#8377; {data.totalExpense}{" "}
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>

            <div className=" row cardContainer2">
              <div className="col-12 col-lg-6 mb-3">
                <div className="card text-dark table-responsive">
                  <DateRangePicker
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                  />

                  <div className="d-flex flex-row justify-content-between my-3">
                    <div className="d-flex flex-row justify-content-between">
                      <div>
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ marginRight: "15px" }}
                          onClick={() =>
                            dispatch(
                              getExpensesByDatesAsync({
                                startDate: startDatee,
                                endDate: endDatee,
                                currentPage,
                                pageSize,
                                user_id: signInRedux.loggedData.id,
                              })
                            )
                          }
                        >
                          {" "}
                          Click Here to fetch Data{" "}
                        </button>
                      </div>

                      <div>
                        <Link
                          to={`http://localhost:8000/expense/getExpensesByDates?user_id=${signInRedux.loggedData.id}&startDate=${startDatee}&endDate=${endDatee}&page=${currentPage}&pageSize=${pageSize}`}
                          target="_blank"
                          className="btn btn-primary btn-sm"
                        >
                          {" "}
                          <span className="mx-1">
                            <FaLink size={18} color="white" />{" "}
                          </span>
                          Share Data URL{" "}
                        </Link>
                      </div>
                    </div>

                    <div>
                      <div className="text-center">
                        {expensesRedux.isLoading === true ? (
                          <RotatingLines
                            visible={true}
                            height="25"
                            width="25"
                            color="red"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6" style={{ overflowX: "scroll" }}>
                <div className="card">
                  <table className="table table-striped table-hover  ">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">S.No</th>
                        <th scope="col">Category Name</th>

                        <th scope="col">Money</th>

                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expensesRedux.data.expenses &&
                        expensesRedux.data.expenses.map((data, index) => {
                          return (
                            <tr key={index} className="text-center">
                              <th> {index + 1} </th>
                              <td>
                                {" "}
                                {data?.id}{" "}
                                {data.category && data.category.catName}
                              </td>

                              <td className="text-danger fw-bold">
                                {data.money}
                              </td>

                              <td className="text-start">
                                {data.description.substring(0, 30) + "..."}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                  <div className="bg-white py-3 d-flex flex-row justify-content-evenly align-items-baseline ">
                    <nav aria-label="Page navigation">
                      <ul className="pagination justify-content-center  ">
                        <li className="page-item">
                          <button
                            className="page-link bg-dark text-white"
                            onClick={() => prevPage()}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>

                        {paginationArray &&
                          paginationArray.map((page) => {
                            return (
                              <li
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className="page-item"
                              >
                                <Link
                                  className={`page-link ${
                                    currentPage === page ? "active" : ""
                                  } `}
                                  href="#"
                                >
                                  {page}
                                </Link>
                              </li>
                            );
                          })}

                        <li className="page-item ">
                          <button
                            className="page-link bg-dark text-white"
                            onClick={() => nextPage()}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>

                    <select
                      className="form-select w-25"
                      onChange={(e) => setpageSize(e.target.value)}
                    >
                      <option value="8">8</option>
                      <option value="16">16</option>
                      <option value="24">24</option>
                      <option value="32">32</option>
                    </select>
                  </div>

                  {(function () {
                    if (expensesRedux.data.length === 0) {
                      return (
                        <h5 className="text-center">
                          Please Select the Range ...{" "}
                        </h5>
                      );
                    }
                  })()}
                </div>
              </div>
            </div>

            <div className="row cardContainer2 mb-5 mb-lg-0">
              <div className="col-12 col-md-6 mb-3 ">
                <div className="card">
                  <LineChart apiData={expensesRedux} />
                </div>
              </div>

              <div className="col-12 col-md-6 ">
                <div className="card">
                  <BarChart apiData={expensesRedux} />
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Dashboard;
