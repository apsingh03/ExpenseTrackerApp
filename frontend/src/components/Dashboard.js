import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import { getLeaderBoardAsync } from "../redux/slice/getLeaderBoardSlice";
import { getCategoryAsync } from "../redux/slice/CategorySlice";
import {
  getDownloadHistoryAsync,
  getReportDownloadAsync,
} from "../redux/slice/FileDownloadHistorySlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const signInRedux = useSelector((state) => state.signIn);
  const leaderboardRedux = useSelector((state) => state.leaderboard);
  const usersRedux = useSelector((state) => state.users);
  const categoryRedux = useSelector((state) => state.category);
  const fileDownloadHistoryRedux = useSelector(
    (state) => state.fileDownloadHistory
  );

  // console.log( "leaderboardRedux - ",  usersRedux )

  useEffect(() => {
    // console.log("dashboard")
    dispatch(getLeaderBoardAsync());
    dispatch(getCategoryAsync());
    dispatch(getDownloadHistoryAsync());
  }, []);

  return (
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

      <div>
        {signInRedux.loggedData &&
        signInRedux.loggedData.isUserLogged === true ? (
          <>
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
          </>
        ) : null}
      </div>

      <div>
        {signInRedux.loggedData &&
        signInRedux.loggedData.isUserLogged === true ? (
          <>
            {usersRedux.data &&
              usersRedux.data.map((data, index) => {
                if (data.isPremiumuser === true) {
                  return (
                    <div key={index} className="row cardContainer2">
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
          </>
        ) : null}
      </div>

      <div className="row cardContainer2">
        <div className="col-12 col-md-6 col-lg-9">
          <div className="card">
            <h2>Expense Chart</h2>
            {/* <LineChart /> */}
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
