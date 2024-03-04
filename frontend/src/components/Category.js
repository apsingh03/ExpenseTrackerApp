import React, { useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import {
  createCategoryAsync,
  deleteCategoryAsync,
  getCategoryAsync,
} from "../redux/slice/CategorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const categoryRedux = useSelector((state) => state.category);

  // console.log( categoryRedux )

  const categorySchema = Yup.object().shape({
    catName: Yup.string()
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .required("Category Name Required"),

    budget: Yup.number()
      .min(1000, "Greater than 1000")
      .required("Budget  Required"),
  });

  useEffect(() => {
    dispatch(getCategoryAsync());
  }, []);

  return (
    <>
      <div className="d-flex flex-row justify-content-between text-white">
        <div>
          <h4>Categories</h4>
        </div>

        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>
            {" "}
            <FaAngleRight />{" "}
          </span>
          <Link to={window.location.href.split("/")[3]}>
            {" "}
            {window.location.href.split("/")[3]}{" "}
          </Link>
        </div>
      </div>

      <div className="  text-white">
        <div className=" bg-white mt-4">
          <Formik
            initialValues={{ catName: "", budget: "" }}
            validationSchema={categorySchema}
            onSubmit={(values) => {
              console.log(values);
              dispatch(
                createCategoryAsync({
                  catName: values.catName,
                  budget: values.budget,
                })
              );

              values.catName = "";
              values.budget = "";
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
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row justify-content-between p-3 ">
                  <div className="col-4 mx-2">
                    <label
                      htmlFor="catName"
                      className="form-label  text-dark "
                      style={{ fontWeight: "bold" }}
                    >
                      Category Name
                    </label>

                    <input
                      type="text"
                      name="catName"
                      id="catName"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.catName}
                    />
                    <p className="error text-danger fw-bold mt-2">
                      {" "}
                      {errors.catName && touched.catName && errors.catName}{" "}
                    </p>
                  </div>

                  <div className="col-4 mx-2">
                    <label
                      htmlFor="budget"
                      className="form-label  text-dark "
                      style={{ fontWeight: "bold" }}
                    >
                      Your Budget
                    </label>

                    <input
                      type="number"
                      name="budget"
                      id="budget"
                      className="form-control"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.budget}
                    />
                    <p className="error text-danger fw-bold mt-2">
                      {" "}
                      {errors.budget && touched.budget && errors.budget}{" "}
                    </p>
                  </div>

                  <div className="mt-4 col-2">
                    <button
                      type="submit"
                      className="btn btn-md w-100 text-white mt-2  "
                      style={{ backgroundColor: "#2F2CD8" }}
                      // disabled={isSubmitting}
                    >
                      Add Category
                    </button>
                  </div>

                  <div className="col-2 mt-4">
                    <div className="text-center">
                      {categoryRedux.isLoading === true ? (
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
              </form>
            )}
          </Formik>
        </div>
      </div>

      <div className="mt-3 ">
        <table className="table table-striped table-hover  ">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Category Name</th>
              <th scope="col">Total Expense Budget</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoryRedux.data &&
              categoryRedux.data.map((data, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.catName}</td>
                    <td>{data.budget}</td>

                    <td>
                      <button
                        className="btn btn-danger btn-md"
                        onClick={() =>
                          dispatch(deleteCategoryAsync({ id: data.id }))
                        }
                      >
                        {" "}
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Category;
