import React from "react";
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";

const EventData = ({ title, subtitle, ranking, startDate, endDate, img }) => {
  console.log(img, "alsjndbkasd");
  const getitem = localStorage.getItem("Login");
  const IsLoggedIn = JSON.parse(getitem);
  const Navigate = useNavigate();

  const handleRegister = () => {
    if (!IsLoggedIn) {
      Navigate("/auth/login");
    } else {
      Navigate("/myaccount");
    }
  };

  return (
    <div className="event-card">
      <div className="event-card-img">
        <img src={img} alt="tournament" />
      </div>
      <div className="event-card-body">
        <div>
          <span
            className="event-location p-1 text-white rounded fs-6"
            style={{ background: title === "ACTIVE" ? "green" : "red" }}
          >
            {title}
          </span>
        </div>
        <h6 className="text-black fs-6">
          <CiLocationOn color="black" />
          {subtitle}
        </h6>
        <h3 className="event-title fs-5">{ranking}</h3>
        <span className="event-date">Start Date: {startDate}</span>
        <span className="event-date">End Date: {endDate}</span>
        <div className="event-buttons">
          <button className="event-button bg-warning">Who's Coming</button>
          <button
            className="event-button bg-dark text-white"
            onClick={handleRegister}
          >
            Division
          </button>
          <button
            className="event-button Login-btn text-white"
            onClick={handleRegister}
          >
            {IsLoggedIn ? "Buy Now" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventData;
