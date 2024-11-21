import React, { useState } from "react";
import { useFormik } from "formik";
import Modal from "react-bootstrap/Modal";
import InputField from "../product/InputField";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import SelectTag from "../product/SelectTag";
import { Update_Persons } from "../../store/person/actions/actionsCreators";
import { AdminValuesSchemas } from "../../Schemas/Schemas";
const AdminInfoEditModel = ({
  show,
  onClose,
  SetTeamBoxModel,
  setState,
  setEditModel,
}) => {
  const Dispatch = useDispatch();
  const { Persondata } = useSelector((state) => state.person);
  const { user } = useSelector((state) => state.user);
  const userId = user.userId;
  const [roleValue, SetRoleValue] = useState("");
  const Token = user?.access_token;

  const initialValues = {
    email: Persondata.data.email,
    firstName: Persondata?.data.firstName || "",
    lastName: Persondata?.data.lastName || "",
  };

  const { values, handleChange, errors, handleSubmit, touched, resetForm } =
    useFormik({
      initialValues: initialValues,
      validationSchema: AdminValuesSchemas,
      onSubmit: (values, action) => {
        action.resetForm();

        const data = {
          name: values.name,
          email: values.email,
          Password: null,
          role: "ADMIN",
          firstName: values.firstName,
          lastName: values.lastName,
          address1: null,
          address2: null,
          points: null,
          ranking: null,
          division: null,
          city: null,
          state: null,
          zipCode: null,
          mobilePhone: null,
          tournamentsPlayed: null,
          gamesPlayed: null,
          personAPlayer: false,
          playerStatus: "ACTIVE",
          country: "",
        };
        Dispatch(Update_Persons(data, userId, Token));
        setState((prev) => !prev);
        setEditModel(false);
      },
    });
  const playerStatusOptions = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "INACTIVE", label: "INACTIVE" },
    { value: "SUSPENDED", label: "SUSPENDED" },
  ];
  const handleRole = (e) => {
    SetRoleValue(e.target.value);
  };
  const roleOptions = [
    { value: "CO_MANAGER", label: " CO MANAGER" },
    { value: "MANAGER", label: " MANAGER" },
    { value: "PLAYER", label: "PLAYER" },
  ];
  return (
    <Modal show={show} onHide={onClose} size="xl" centered className="py-4 ">
      <Modal.Header closeButton>
        <Modal.Title>Edit User Info</Modal.Title>
      </Modal.Header>

      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="gy-3">
            <Col md={4}>
              <InputField
                type="email"
                name="email"
                label="Email"
                onChange={handleChange}
                value={values.email}
                className="form-control"
                touched={touched.email}
                error={errors.email}
                disabled
              />
            </Col>
            <Col md={4}>
              <InputField
                type="text"
                name="firstName"
                label="First Name"
                onChange={handleChange}
                value={values.firstName}
                className="form-control"
                touched={touched.firstName}
                error={errors.firstName}
              />
            </Col>
            <Col md={4}>
              <InputField
                type="text"
                name="lastName"
                label="Last Name"
                onChange={handleChange}
                value={values.lastName}
                className="form-control"
                touched={touched.lastName}
                error={errors.lastName}
              />
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <button type="submit" className="mt-3 gradient-btn-orange">
              Submit
            </button>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
};

export default AdminInfoEditModel;
