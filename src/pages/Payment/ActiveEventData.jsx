import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import DivisionSearchModel from "./DivisionSearchModel";
import { useDispatch, useSelector } from "react-redux";

const ActiveEventData = ({
  title,
  subtitle,
  ranking,
  startDate,
  endDate,
  img,
  numberOfRegisteredTeams,
  showNumberOfRegisteredTeams,
  tournamentId,
  setDivisionValue,
  setTournamentId,
}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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
        {showNumberOfRegisteredTeams && (
          <div>
            <span className="bg-dark text-white rounded p-1">
              No of Registered Teams:{" "}
              {numberOfRegisteredTeams > 0 ? numberOfRegisteredTeams : 0}
            </span>
          </div>
        )}

        <div className="event-buttons">
          <button
            className="event-button Login-btn text-white"
            onClick={() => {
              setShow((prev) => !prev);
              setTournamentId(tournamentId);
            }}
          >
            Register
          </button>
        </div>
      </div>
      {show && (
        <DivisionSearchModel
          show={show}
          onClose={handleClose}
          tournamentID={tournamentId}
          setDivisionValue={setDivisionValue}
        />
      )}
    </div>
  );
};

export default ActiveEventData;
