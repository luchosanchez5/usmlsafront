import React, { useState, useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import SelectTag from "../product/SelectTag";
import { changeRole } from "../../store/user/actions/actionCreators";

const SelectRoleForm = () => {
  const [roleValue, setRoleValue] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // Extract token from URL params
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get("xbyd");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [location.search]);

  const initialValues = {
    email: "",
  };

  const handleSubmit = (values, action) => {
    action.resetForm();
    if (!roleValue || !token) {
      console.error("Role or token is missing.");
      return;
    }
    dispatch(changeRole(roleValue, token, navigate));
  };

  const roleOptions = [
    { value: "MANAGER", label: "MANAGER" },
    { value: "CO_MANAGER", label: "CO MANAGER" },
  ];

  const handleRoleChange = (e) => {
    setRoleValue(e.target.value);
  };

  return (
    <div className="form-space px-lg-5 mx-xl-5 d-flex flex-column align-items-center mt-5 pt-5 justify-content-center ">
      <Image
        fluid
        className="field-icon my-4"
        src="https://usmlsa.com/wp-content/uploads/2023/10/usmlsa_new_png-Copy.png"
        loading="lazy"
        width={200}
        height={100}
      />
      <h5 className="text-white">Select Role</h5>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {(formik) => (
          <Form>
            <Row>
              <Col>
                <SelectTag
                  deFaultValue="Select Your Role"
                  options={roleOptions}
                  className="d-flex flex-grow-1 bg-white form-control"
                  name="role"
                  onChange={handleRoleChange}
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
