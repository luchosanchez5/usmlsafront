import React, { useState } from "react";
import { Row, Col, Image } from "react-bootstrap";
import TextField from "../../shared/TextField";
import { Link, useNavigate } from "react-router-dom";
import { ForgetPasswordSchema } from "../../Schemas/Schemas";
import { Formik, Form } from "formik";
import { FaEnvelope, FaUserTie } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { ForgetPassword } from "../../store/person/actions/actionsCreators";
import SelectTag from "../product/SelectTag";
const SelectRoleForm = () => {
  const [roleValue, SetRoleValue] = useState("");

  const Navigate = useNavigate();
  const initialValues = {
    email: "",
  };
  const Dispatch = useDispatch();
  const handlesubmit = (values, action) => {
    action.resetForm();
    // Add the logic to handle the password reset here.

    localStorage.setItem(
      "forget-password-email",
      JSON.stringify(values?.email)
    );
    Dispatch(ForgetPassword(values.email, Navigate));

    console.log("Email Submitted: ", values);
  };
  const roleOptions = [
    { value: "MANAGER", label: "MANAGER" },
    // { value: 'CO_MANAGER', label: ' CO MANAGER' },
    // { value: 'ADMIN', label: ' ADMIN' },
    { value: "PLAYER", label: "PLAYER" },
  ];
  const handleRole = (e) => {
    SetRoleValue(e.target.value);
  };

  return (
    <div className="form-space px-lg-5 mx-xl-5 d-flex flex-column align-items-center mt-5 pt-5 justify-content-center ">
      <Image
        fluid
        className="field-icon"
        src="https://usmlsa.com/wp-content/uploads/2023/10/usmlsa_new_png-Copy.png"
        loading="lazy"
        width={200}
        height={100}
      />
      <h5 className="text-white">Forget Password</h5>
      <small className="text-white py-2">
        Don't worry! it happens. Please enter your email address to get code.
      </small>
      <Formik
        onSubmit={handlesubmit}
        initialValues={initialValues}
        validationSchema={ForgetPasswordSchema}
      >
        {(formik) => (
          <Form>
            <Row>
              <Col className="">
                <SelectTag
                  deFaultValue="Select Your Role"
                  icon={<FaUserTie className="me-2" size={20} />}
                  options={roleOptions}
                  className="d-flex flex-grow-1 bg-white"
                  name="role"
                  onChange={handleRole}
                />
              </Col>
              <div className="d-flex justify-content-center mb-3 px-0">
                <button type="submit" className="mt-3 gradient-btn-orange">
                  Send
                </button>
              </div>
            </Row>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SelectRoleForm;
