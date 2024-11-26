import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import SelectTag from "./SelectTag";
import { useFormik } from "formik";
import SelectField from "./SelectField";
import { useDispatch, useSelector } from "react-redux";
import { getTournamentsbyFilter } from "../../store/tournament/actions/actionsCreators";
import { useSearchParams } from "react-router-dom";

const FindEvents = () => {
  const Dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const tournamentStatusOptions = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "COMPLETED", label: "COMPLETED" },
    { value: "CANCELED", label: "CANCELED" },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    onSubmit: (values, action) => {
      const searchParams = new URLSearchParams();

      Object.entries(values)
        .filter(([key, value]) => value)
        .forEach(([key, value]) => {
          searchParams.append(key, value);

          searchParams.append("page", 0);
          searchParams.append("size", 10);
        });
      Dispatch(getTournamentsbyFilter(searchParams));
    },
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="d-flex">
      <div
        className={`d-flex flex-column bg-dark text-white pb-5 pt-2 px-3 ${
          isSidebarOpen ? "d-flex flex-column" : "d-none d-md-flex"
        }`}
        style={{
          height: "100vh",
          width: "250px",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <span
          className="text-uppercase py-2 px-4"
          style={{ background: "silver" }}
        >
          Find Tournaments
        </span>
        <span className="py-2 fw-bold">Search By</span>

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
      </div>
      <div className="d-flex">
        <button
          className="d-md-none bg-dark text-white p-2"
          onClick={toggleSidebar}
          type="submit"
          style={{ position: "absolute", zIndex: 100, left: "" }}
        >
          {isSidebarOpen ? "Close" : "Menu"}
        </button>
      </div>
    </div>
  );
};

export default FindEvents;
