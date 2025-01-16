import React, { useContext } from "react";
import InputField from "./InputField";
import { useFormik } from "formik";
import SelectField from "./SelectField";
import { useDispatch } from "react-redux";
import { getTournamentsbyFilter } from "../../store/tournament/actions/actionsCreators";
import { GlobalInfo } from "../../App";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Col, Row } from "react-bootstrap";

const FindEvents = () => {
  const Dispatch = useDispatch();
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
      Dispatch(getTournamentsbyFilter(searchParams));
      setIsSidebarOpen(false);
    },
  });

  return (
    <Row
      className="event-data-container px-0 mt-2 pt-0 "
    >
      <div
        className={` d-none d-lg-flex flex-column text-white mx-3 mx-lg-3 `}
        style={{
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h2
          className="text-center text-uppercase  py-2 fw-bold py-2 px-4 text-black Login-btn text-white"
        >
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
          <Row className="row-cols-4   gap-1 ms-4 mt-2">
            <div className="d-flex flex-column  px-0">
              <InputField
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Name"
                label="Name"
                labelClassName="text-black"
                className="py-1 px-2 form-control"
              />
            </div>
            <div className="d-flex flex-column justify-content-center px-0">
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
            </div>
            <div className="d-flex flex-column px-0">
              <InputField
                type="text"
                name="venueName"
                onChange={handleChange}
                value={values.venueName}
                placeholder="Venue Name"
                labelClassName="text-black"
                label="Venue Name"
                className="py-1 px-2 form-control"
              />
            </div>
            <div className="d-flex flex-column px-0">
              <InputField
                type="text"
                name="division"
                onChange={handleChange}
                value={values.division}
                placeholder="Division Name"
                labelClassName="text-black"
                label="Division Name"
                className="py-1 px-2 form-control"
              />
            </div>
            <div className="d-flex flex-column px-0">
              <InputField
                type="date"
                name="startDate"
                label="End Date"
                labelClassName="text-black"
                onChange={handleChange}
                className="py-1 px-2 form-control"
                value={values.startDate}
              />
            </div>
            <div className="d-flex flex-column px-0">
              <InputField
                type="date"
                name="endDate"
                label="End Date"
                labelClassName="text-black"
                className="py-1 px-2 form-control"
                onChange={handleChange}
                value={values.endDate}
              />
            </div>
            <div className="d-flex px-0">
              <button className="Login-btn text-white mt-3 px-5" type="submit">
                Search
              </button>
            </div>
          </Row>
        </form>
      </div>
    </Row>
  );
};

export default FindEvents;
