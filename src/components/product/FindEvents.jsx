import React, { useContext } from "react";
import InputField from "./InputField";
import { useFormik } from "formik";
import SelectField from "./SelectField";
import { useDispatch, useSelector } from "react-redux";
import { getTournamentsFilter } from "../../store/tournament/actions/actionsCreators";
import { GlobalInfo } from "../../App";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Col, Row } from "react-bootstrap";
import SpinNer from "../LoadingSpinner/SpinNer";

const FindEvents = () => {
  const Dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.tournament);
  const tournamentStatusOptions = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "COMPLETED", label: "COMPLETED" },
    { value: "CANCELED", label: "CANCELED" },
  ];

  const { isSidebarOpen, setIsSidebarOpen } = useContext(GlobalInfo);

  const initialValues = {
    name: "",
    venueName: "",
    status: "",
    division: "",
    startDate: "",
    endDate: "",
    venueZipCode: "",
  };
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const searchParams = new URLSearchParams();

      Object.entries(values)
        .filter(([key, value]) => value)
        .forEach(([key, value]) => {
          searchParams.append(key, value);
          searchParams.append("page", 0);
          searchParams.append("size", 10);
        });
      Dispatch(getTournamentsFilter(searchParams));
      setIsSidebarOpen(false);
    },
  });

  return (
    <div className="p-2 mt-2">
      <div
        className={`d-none d-lg-flex flex-column text-white mx-3 mx-lg-3 `}
        style={{
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h2 className="text-center text-uppercase py-2 fw-bold Login-btn text-white rounded">
          Find Tournaments
        </h2>
        <Offcanvas
          show={isSidebarOpen}
          onHide={() => setIsSidebarOpen(false)}
          className="bg-black text-white"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title> Find Tournaments</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-column gap-1">
                <InputField
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="py-2 px-2"
                />
                <SelectField
                  options={tournamentStatusOptions}
                  value={values.status}
                  name="status"
                  deFaultValue="Select Status"
                  className="py-2 px-2 d-flex flex-grow-1"
                  onChange={handleChange}
                />

                <InputField
                  type="text"
                  name="venueName"
                  onChange={handleChange}
                  value={values.venueName}
                  placeholder="Venue Name"
                  className="py-2 px-2"
                />
                <InputField
                  type="text"
                  name="division"
                  onChange={handleChange}
                  value={values.division}
                  placeholder="Division Name"
                  className="py-2 px-2"
                />

                <InputField
                  type="date"
                  name="startDate"
                  label="Start Date"
                  onChange={handleChange}
                  className="py-2"
                  value={values.startDate}
                />
                <InputField
                  type="date"
                  name="endDate"
                  label="End Date"
                  className="py-2"
                  onChange={handleChange}
                  value={values.endDate}
                />

                <button className="Login-btn text-white mt-3" type="submit">
                  Search
                </button>
              </div>
            </form>
          </Offcanvas.Body>
        </Offcanvas>
        <form onSubmit={handleSubmit}>
          <Row
            className="gx-3 gy-2"
            style={{ overflowX: "auto", whiteSpace: "nowrap" }}
          >
            <Col xs={12} sm={6} md={4} className="d-flex flex-column">
              <InputField
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Tournament Name"
                label="Tournament Name"
                labelClassName="text-black"
                className="py-1 px-2 form-control"
              />
            </Col>
            <Col xs={12} sm={6} md={4} className="d-flex flex-column">
              <SelectField
                options={tournamentStatusOptions}
                value={values.status}
                name="status"
                deFaultValue="Select Status"
                className="py-1 px-2 form-control"
                label="Select Status"
                labelClassName="text-black"
                onChange={handleChange}
              />
            </Col>
            <Col xs={12} sm={6} md={4} className="d-flex flex-column">
              <InputField
                type="text"
                name="venueName"
                onChange={handleChange}
                value={values.venueName}
                placeholder="Location"
                labelClassName="text-black"
                label="Location"
                className="py-1 px-2 form-control"
              />
            </Col>
            <Col xs={12} sm={6} md={4} className="d-flex flex-column">
              <InputField
                type="text"
                name="venueZipCode"
                onChange={handleChange}
                value={values.venueZipCode}
                placeholder="Zip Code"
                labelClassName="text-black"
                label="Zip Code"
                className="py-1 px-2 form-control"
              />
            </Col>
            <Col xs={12} sm={6} md={4} className="d-flex flex-column">
              <InputField
                type="date"
                name="startDate"
                label="Start Date"
                labelClassName="text-black"
                onChange={handleChange}
                className="py-1 px-2 form-control"
                value={values.startDate}
              />
            </Col>
            <Col xs={12} sm={6} md={4} className="d-flex flex-column">
              <InputField
                type="date"
                name="endDate"
                label="End Date"
                labelClassName="text-black"
                className="py-1 px-2 form-control"
                onChange={handleChange}
                value={values.endDate}
              />
            </Col>
            <Col xs={12} className="d-flex">
              <button
                className="bg-dark text-white mt-3 px-2 py-2 d-flex align-items-center justify-content-center rounded"
                type="submit"
                style={{ minWidth: "180px" }}
              >
                {isLoading ? <SpinNer /> : <span>Search Tournament</span>}
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default FindEvents;
