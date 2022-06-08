import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Button, Modal } from "react-bootstrap";
import { newContext } from "../App";
function Candidate(props) {
  let context = useContext(newContext);
  console.log(context?.otherData)
  let [state, setState] = useState();

  let options = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh	",
    "Uttarakhand",
    "West Bengal",
  ];
  if (context.boolTrue) {
    var handleSubmit = async (values) => {
      values["state"] = state;
      let res = await axios.post(
        "https://des-ass.herokuapp.com/users/addcandidate",
        values
      );
      if (res.data.statusCode === 200) {
        context?.setOtherModalShow(false);
        window.location.reload();
      }
    };
  } else {
    handleSubmit = async (values) => {
      values["state"] = state;
      let res = await axios.put(
        "https://des-ass.herokuapp.com/users/editcandidate/" + context?.otherData?._id,
        values
      );
      if (res.data.statusCode === 200) {
        console.log(context?.otherData?._id);
        context?.setOtherModalShow(false)
        window.location.reload();
      }
    };
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name:
        context && context?.otherData && context?.otherData?.name
          ? context?.otherData?.name
          : "",
      address:
        context && context?.otherData && context?.otherData?.address
          ? context?.otherData?.address
          : "",
      dateofbirth:
        context && context?.otherData && context?.otherData?.dateofbirth
          ? context?.otherData?.dateofbirth
          : "",
      state:
        context && context?.otherData && context?.otherData?.state
          ? context?.otherData?.state
          : "",
      age:
        context && context?.otherData && context?.otherData?.age
          ? context?.otherData?.age
          : "",
      pincode:
        context && context?.otherData && context?.otherData?.pincode
          ? context?.otherData?.pincode
          : "",
      email:
        context && context?.otherData && context?.otherData?.email
          ? context?.otherData?.email
          : "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      dateofbirth: Yup.string().required("Required"),
      state: "",
      age: Yup.number().required("Required"),
      pincode: Yup.number().required("Required"),
      email: Yup.string().email().required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div className="container">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 className="">
            {context?.boolTrue ? "Create Candidate" : "Edit Candidate"}
          </h4>
          <div className="">
            <form onSubmit={formik.handleSubmit}>
              <div className="row ">
                <div className="col ">
                  <label>Name</label>
                  <br></br>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="enter your name"
                    id="name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div style={{ color: "blue", textAlign: "right" }}>
                      {formik.errors.name}
                    </div>
                  ) : null}
                </div>
                <div className="col">
                  <label>Address</label>
                  <br></br>
                  <input
                    type="text"
                    placeholder="enter your address"
                    className="form-control"
                    id="name"
                    name="address"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div style={{ color: "blue", textAlign: "right" }}>
                      {formik.errors.address}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Date of Birth</label>
                  <br></br>
                  <input
                    type="date"
                    placeholder="enter your Date of Birth"
                    className="form-control"
                    name="dateofbirth"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.dateofbirth}
                  />
                  {formik.touched.dateofbirth && formik.errors.dateofbirth ? (
                    <div style={{ color: "blue", textAlign: "right" }}>
                      {formik.errors.dateofbirth}
                    </div>
                  ) : null}
                </div>
                <div className="col">
                  <label>State</label>
                  <br></br>
                  <select
                    placeholder="select your state"
                    className="form-control"
                    onChange={(e) => setState(e.target.value)}
                  >
                    {options.map((option, i) => (
                      <option value={option.value} key={i}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Age</label>
                  <br></br>
                  <input
                    type="text"
                    placeholder="enter your age"
                    className="form-control"
                    name="age"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.age}
                  />
                  {formik.touched.age && formik.errors.age ? (
                    <div style={{ color: "blue", textAlign: "right" }}>
                      {formik.errors.age}
                    </div>
                  ) : null}
                </div>
                <div className="col">
                  <label>Pin Code</label>
                  <br></br>
                  <input
                    type="text"
                    placeholder="enter your 6-digit pin code"
                    className="form-control"
                    name="pincode"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.pincode}
                  />
                  {formik.touched.pincode && formik.errors.pincode ? (
                    <div style={{ color: "blue", textAlign: "right" }}>
                      {formik.errors.pincode}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="enter your email"
                    className="form-control"
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
                </div>
              </div>
              <div
                className="d-flex  mt-5 cursor-pointer"
                style={{ justifyContent: "flex-end", gap: "5px" }}
              >
                <Button
                  variant="outline-primary"
                  onClick={props.onHide}
                  style={{ height: "50px", width: "100px" }}
                >
                  Close
                </Button>
                {context?.boolTrue ? (
                  <>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      style={{ height: "50px", width: "100px" }}
                      onClick={props.onHide}
                    >
                      Create
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-warning"
                      type="submit"
                      style={{ height: "50px", width: "100px" }}
                      onClick={props.onHide}
                    >
                      Update
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Candidate;
