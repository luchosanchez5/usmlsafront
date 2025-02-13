import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";

const EventData = ({ title, subtitle, ranking, startDate, endDate, img }) => {
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
      {/* Left Image */}
      <div className="event-card-img">
        <img src={img} alt="tournament" />
      </div>

      {/* Right Content */}
      <div className="event-card-body">
        {/* Location & Event Info */}
        <div className="event-info">
          <span className="event-location">{subtitle}</span>
          <h3 className="event-title">{ranking}</h3>
          <p className="event-date">
            {startDate} - {endDate}
          </p>
        </div>

        {/* Buttons */}
        <div className="event-buttons">
          <button className="event-button btn-small bg-warning">
            WHO'S COMING
          </button>
          <button
            className="event-button btn-small bg-dark text-white"
            onClick={handleRegister}
          >
            DIVISIONS
          </button>
          <button
            className="event-button btn-small Login-btn text-white"
            onClick={handleRegister}
          >
            {IsLoggedIn ? "REGISTER" : "BUY NOW"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventData;
