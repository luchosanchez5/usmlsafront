import React, { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import TextField from "../../shared/TextField";
import { Link } from "react-router-dom";
import { ForgetPasswordSchema } from "../../Schemas/Schemas";
import { Formik, Form } from "formik";
import { FaEnvelope } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { FaLock } from "react-icons/fa";
import { ResetPassword } from "../../store/person/actions/actionsCreators.js";
const ResetPasswordForm = () => {
  const initialValues = {
    password: "",
    otp: "",
  };
  const Dispatch = useDispatch();
  const handlesubmit = (values, action) => {
    action.resetForm();
    // Add the logic to handle the password reset here.
    const jsonemail = localStorage?.getItem("forget-password-email");
    const email = jsonemail && JSON?.parse(jsonemail);
    const pass = values?.password;
    const otp = values?.otp;
    Dispatch(ResetPassword(email, pass, otp));
    console.log("Email Submitted: ", values);
  };

  return (
    <div className="form-space px-lg-5 mx-xl-5 d-flex flex-column align-items-center mt-5 pt-5 justify-content-center">
      <Image
        fluid
        className="field-icon"
        src="https://usmlsa.com/wp-content/uploads/2023/10/usmlsa_new_png-Copy.png"
        loading="lazy"
        width={200}
        height={100}
      />
      <h5 className="text-white pt-3">Reset Your Password</h5>
      <small className="text-white py-2">
        Don't worry! it happens. Please enter your email address to get code.
      </small>
      <Formik onSubmit={handlesubmit} initialValues={initialValues}>
        {(formik) => (
          <Form>
            <Row className="row-cols-1">
              <Col className="d-flex flex-column">
                <TextField
                  icon={<FaLock />}
                  placeholder="Enter Your Otp"
                  name="otp"
                  type="text"
                />
              </Col>
              <Col className="d-flex flex-column">
                <TextField
                  icon={<FaLock />}
                  placeholder="Enter Your New Password"
                  type="password"
                  name="password"
                />
              </Col>
              <div className="d-flex justify-content-center mb-3 px-0">
                <button type="submit" className="mt-3 gradient-btn-orange">
                  Submit
                </button>
              </div>
            </Row>
          </Form>
        )}
      </Formik>
      {/* <small className="auth-subheading fw-bold text-end text-white">
              Already have an account?
              <Link to="/auth/login" className="text-decoration-none fs-6">
                <span className="forget ps-1">Login</span>
              </Link>
            </small> */}
    </div>
  );
};

// const ResetPasswordForm=()=>{
// return(
//     <h2>helo</h2>
// )
// }
export default ResetPasswordForm;
