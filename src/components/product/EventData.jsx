import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
    <Row className="event-data-container mx-5 my-3 py-5">
      <Col md={8} className="d-flex align-items-center">
        <Image
          width={300}
          height={200}
          src={img} // Display image or fallback passed from the parent
          alt="Event Logo"
          className="event-logo"
        />
        <div className="d-flex flex-column ms-3 text-center text-md-start">
          <span
            className="event-location"
            style={{ color: title === "ACTIVE" ? "green" : "red" }}
          >
            {title}
          </span>
          <h4 className="event-title fw-bold">{subtitle}</h4>
          <h3 className="event-date">{ranking}</h3>
          <span className="event-division">Start Date: {startDate}</span>
          <span className="event-division">End Date: {endDate}</span>
        </div>
      </Col>
      <Col md={4} className="d-flex justify-content-end flex-column">
        <div className="d-flex justify-content-end">
          <button
            className="Login-btn text-white px-3 py-2"
            onClick={handleRegister}
          >
            {IsLoggedIn ? "Buy Now" : "Register"}
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default EventData;
