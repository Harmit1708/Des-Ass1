import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  let navigate = useNavigate();

  let handleSubmit = async (values) => {
    let res = await axios.post("http://localhost:5000/users/signin", values);
    if (res.data.statusCode === 200) {
      sessionStorage.setItem("token", res.data.token);
      navigate("/home");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Required"),
      password: Yup.string()
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .required("No Password Provided"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div
      className="d-flex align-items-center justify-content-center "
      style={{ backgroundColor: "whitesmoke", height: "100vh" }}
    >
      <div
        className="rounded"
        style={{
          backgroundColor: "white",
          height: "auto",
          width: "400px",
          boxShadow: "5px 5px 10px lightgrey",
        }}
      >
        <p
          className="text-center mt-3 fw-bold"
          style={{ letterSpacing: "1px", fontSize: "18px" }}
        >
          Login
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="ml-5 mr-5"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <label className="mt-3 fw-bold">Email Id</label>
          <input
            className="form-control"
            type="email"
            placeholder="enter your email id"
            id="email"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "blue", textAlign: "right" }}>
              {formik.errors.email}
            </div>
          ) : null}
          <label className="mt-3 fw-bold">Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="enter your password"
            id="password"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: "blue", textAlign: "right" }}>
              {formik.errors.password}
            </div>
          ) : null}
          <div className="d-flex justify-content-center mt-5 cursor-pointer">
            <Button type="submit" style={{ height: "45px", width: "100px" }}>
              Login
            </Button>
          </div>
          <p className="mt-3 text-center">
            Don't have an Account ? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
