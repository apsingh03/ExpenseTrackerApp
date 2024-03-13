import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Formik, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import {
  createCategoryAsync,
  deleteCategoryAsync,
  getCategoryAsync,
} from "../redux/slice/CategorySlice";
import {
  createExpensesAsync,
  deleteExpensesAsync,
  getExpensesAsync,
} from "../redux/slice/ExpensesSlice";
// import {Date} from ""

const Expenses = () => {
  const dispatch = useDispatch();
  const categoryRedux = useSelector((state) => state.category);
  const expensesRedux = useSelector((state) => state.expenses);
  const signinRedux = useSelector((state) => state.signIn);

  const categorySchema = Yup.object().shape({
    catId: Yup.string().required("Please Select"),

    description: Yup.string()
      .min(5, "Too Short!")
      .max(30, "Too Long!")
      .required("Description Required"),

    money: Yup.number().min(10, "Greater than 10").required("Money  Required"),
  });

  // pagination
  const totalPagesRedux = expensesRedux.data?.totalPages;
  const paginationArray = Array.from(Array(totalPagesRedux).keys()).splice(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [pageSize, setpageSize] = useState(5);

  function loadTotalPagesFromExpenses() {
    if (expensesRedux.isLoading !== true) {
      setTotalPages(expensesRedux.data?.totalPages);
    }
  }

  useEffect(() => {
    dispatch(getCategoryAsync());
    dispatch(
      getExpensesAsync({
        currentPage,
        pageSize,
      })
    );

    loadTotalPagesFromExpenses();
  }, [currentPage, pageSize, totalPagesRedux]);

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

  return (
    <>
      <div className="d-flex flex-row justify-content-between text-white">
        <div>
          <h4>Your Expenses</h4>
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

      <div className="  text-white">
        <div className=" bg-white mt-4">
          <Formik
            initialValues={{ catId: "", money: "", description: "" }}
            validationSchema={categorySchema}
            onSubmit={(values) => {
              // console.log(values);

              dispatch(
                createExpensesAsync({
                  money: values.money,
                  description: values.description,
                  cat_id: values.catId,
                })
              );

              values.catId = "";
              values.money = "";
              values.description = "";
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} className="p-3">
                <div className="d-flex flex-row justify-content-between  ">
                  <div className="col-4 mt-2">
                    <div className="form-group">
                      <label
                        htmlFor="catId"
                        className="text-dark"
                        style={{ fontWeight: "bold" }}
                      >
                        Select Budget Category
                      </label>

                      {/* <Field 
                      name="catId"
                      as="select"

                      >

{categoryRedux.data &&
                          categoryRedux.data.map((data) => {
                            return (
                              <option key={data.id} value={data.id}>
                                {" "}
                                {data.catName} - Total Budget &#x20B9;{data.budget}{" "}
                              </option>
                            );
                          })}

                      </Field> */}

                      <select
                        className="form-control"
                        id="catId"
                        name="catId"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.catId}
                      >
                        {categoryRedux.data &&
                          categoryRedux.data.map((data) => {
                            return (
                              <option key={data.id} value={data.id}>
                                {" "}
                                {data.catName} - Total Budget &#x20B9;
                                {data.budget}{" "}
                              </option>
                            );
                          })}
                      </select>

                      <p className="error text-danger fw-bold mt-2">
                        {" "}
                        {errors.catId && touched.catId && errors.catId}{" "}
                      </p>
                    </div>
                  </div>

                  <div className="col-4 mx-2">
                    <label
                      htmlFor="money"
                      className="form-label  text-dark "
                      style={{ fontWeight: "bold" }}
                    >
                      Money
                    </label>

                    <input
                      type="number"
                      name="money"
                      id="money"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.money}
                    />
                    <p className="error text-danger fw-bold mt-2">
                      {" "}
                      {errors.money && touched.money && errors.money}{" "}
                    </p>
                  </div>

                  <div className="mt-4 col-2">
                    <button
                      type="submit"
                      className="btn btn-md w-100 text-white mt-2  "
                      style={{ backgroundColor: "#2F2CD8" }}
                      // disabled={isSubmitting}
                    >
                      Add Expense
                    </button>
                  </div>

                  <div className="col-2 mt-4">
                    <div className="text-center">
                      {expensesRedux.isLoading ||
                      categoryRedux.isLoading === true ? (
                        <RotatingLines
                          visible={true}
                          height="50"
                          width="50"
                          //   color="blue"
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

                <div className="col-12 ">
                  <label
                    htmlFor="description"
                    className="form-label  text-dark "
                    style={{ fontWeight: "bold" }}
                  >
                    Description
                  </label>

                  <input
                    type="text"
                    name="description"
                    id="description"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <p className="error text-danger fw-bold mt-2">
                    {" "}
                    {errors.description &&
                      touched.description &&
                      errors.description}{" "}
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>

      <div className="mt-3 ">
        <table className="table table-striped table-hover  ">
          <thead>
            <tr className="text-center">
              <th scope="col">S.No</th>
              <th scope="col">Category Name</th>
              <th scope="col">Category Budget</th>
              <th scope="col">Money</th>

              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expensesRedux.data?.expenses &&
              expensesRedux.data?.expenses.map((data, index) => {
                return (
                  <tr key={index} className="text-center">
                    <th> {index + 1} </th>
                    <td>
                      {" "}
                      {data?.id} {data.category && data.category.catName}
                    </td>
                    <td className="text-success fw-bold ">
                      {data.category && data.category.budget}
                    </td>
                    <td className="text-danger fw-bold">{data.money}</td>

                    <td>{data.description.substring(0, 30) + "..."}</td>

                    <td>
                      <button
                        className="btn btn-danger btn-md"
                        onClick={() =>
                          dispatch(deleteExpensesAsync({ id: data.id }))
                        }
                      >
                        Delete
                      </button>
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
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Expenses;
