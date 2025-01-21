import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";

const EventData = ({ title, subtitle, ranking, startDate, endDate, img }) => {
  const getitem = localStorage.getItem("Login");
  const IsLoggedIn = JSON.parse(getitem);
  const [click, setClick] = useState(false);
  const Navigate = useNavigate();

  const handleRegister = () => {
    if (!IsLoggedIn) {
      Navigate("/auth/login");
    } else {
      Navigate("/myaccount");
    }
  };

  return (
    <>
      <Col className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4  my-3">
        <div class="card h-100 d-flex flex-row">
          <img
            src={img}
            class="card-img-left"
            alt="tournament"
            style={{
              width: "40%",
              objectFit: "cover",
              borderTopLeftRadius: "0.375rem",
              borderBottomLeftRadius: "0.375rem",
            }}
          />
          <div class="card-body d-flex flex-column">
            <span
              className="event-location"
              style={{ color: title === "ACTIVE" ? "green" : "red" }}
            >
              {title}
            </span>
            <h5 className="text-black font-sm">
              {" "}
              <CiLocationOn color="black" />
              {subtitle}
            </h5>
            <h3 className="event-date text-black fw-bold ">{ranking}</h3>
            <span className="event-division text-black">
              Start Date: {startDate}
            </span>
            <span className="event-division text-black">
              End Date: {endDate}
            </span>
            <div className="d-flex flex-column w-50">
              <button
                className="bg-warning border-0 text-dark px-2 mt-2 "
                onClick={() => setClick((pre) => !pre)}
              >
                Who's Coming
              </button>
              {click && (
                <>
                  <button
                    className="bg-dark text-white px-2 mt-2 "
                    onClick={handleRegister}
                  >
                    Division
                  </button>
                  <button
                    className="Login-btn text-white px-2 mt-2 "
                    onClick={handleRegister}
                  >
                    {IsLoggedIn ? "Buy Now" : "Register"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default EventData;
