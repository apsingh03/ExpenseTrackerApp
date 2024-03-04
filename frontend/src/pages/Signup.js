import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { createUserAsync, getAllUsersAsync } from "../redux/slice/UsersSlice";
import { RotatingLines } from "react-loader-spinner";

const Signup = () => {
  const dispatch = useDispatch();

  const usersRedux = useSelector( (state) => state.users );

  const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .required("Full Name Required"),
    email: Yup.string().email("Invalid email").required("Email Required"),

    password: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Password Required"),
  });

  // console.log( getAllUsersRedux )

  useEffect(() => {
    
dispatch( getAllUsersAsync() )

  }, [])
  

  return (
    <div id="signup">
      <div className="container row">
        <div className="leftSide col-12 col-md-6 d-flex flex-column justify-content-between">
          <div>
            <h6 className="text-white">Welcome to</h6>
            <h3 className="text-white">Expense Tracker</h3>
          </div>

          <div className="text-white">
            <span className="mx-2">
              <FaFacebook size={25} color="#fff" />
            </span>

            <span className="mx-2">
              {" "}
              <FaInstagramSquare size={25} color="#fff" />{" "}
            </span>

            <span className="mx-2">
              <FaLinkedin size={25} color="#fff" />
            </span>
          </div>

          {/* <div className="leftSide" >
          
          
        </div> */}
        </div>

        <div className="rightSide col-12 col-md-6 bg-white">
          <Formik
            initialValues={{ fullName: "", email: "", password: "" }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              // console.log(values);

              dispatch( createUserAsync({
                fullName : values.fullName,
                email : values.email,
                password : values.password,
              }) )

              values.fullName = "";
              values.email = ""
              values.password = ""

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
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label ">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    id="fullName"
                  />
                  <p className="error">
                    {" "}
                    {errors.fullName &&
                      touched.fullName &&
                      errors.fullName}{" "}
                  </p>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <p className="error">
                    {" "}
                    {errors.email && touched.email && errors.email}{" "}
                  </p>
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <p className="error">
                    {" "}
                    {errors.password &&
                      touched.password &&
                      errors.password}{" "}
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-md w-100 text-white mt-2 "
                  style={{ backgroundColor: "#2F2CD8" }}
                  // disabled={isSubmitting}
                >
                  Submit
                </button>
              </form>
            )}
          </Formik>

          <div className="mt-4 alreadyHaveAccount d-flex flex-row justify-content-between ">
            <p>
              {" "}
              Already have an account? <Link to="/signin"> Sign In </Link>{" "}
            </p>

            <div className="text-center" style={{ height: "25px" }}>
        {usersRedux.isLoading === true ? (
          <RotatingLines
            visible={true}
            height="25"
            width="25"
            color="blue"
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
  );
};

export default Signup;
