import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import DivisionSearchModel from "./DivisionSearchModel";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
const Url = process.env.REACT_APP_MAIN_URL;

const ActiveEventData = ({
  status,
  subtitle,
  ranking,
  startDate,
  endDate,
  img,
  tournamentId,
  setDivisionValue,
  setTournamentId,
  SetDivisionDetailsBySearch
}) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [divisionsData, setDivisionsData] = useState([]);
  const handleClose = () => setShow(false);
  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const handleShowModal = async () => {
    setTournamentId(tournamentId);
    setShow(true);
    setLoading(true);
    await axios
      .get(
        `${Url}api/divisions/all/no-link-with-team/${tournamentId}/${id}?page=0&size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setDivisionsData(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
        setDivisionsData([]);
      })
      .finally(() => {
        setLoading(false);
      });
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
            style={{ background: status === "ACTIVE" ? "green" : "red" }}
          >
            {status}
          </span>
        </div>
        <h6 className="text-black fs-6">
          <CiLocationOn color="black" />
          {subtitle}
        </h6>
        <h3 className="event-title fs-5">{ranking}</h3>
        <span className="event-date">Start Date: {startDate}</span>
        <span className="event-date">End Date: {endDate}</span>
        {status === "ACTIVE" && (
          <div className="event-buttons">
            <button
              className="event-button Login-btn text-white"
              onClick={handleShowModal}
            >
              Register
            </button>
          </div>
        )}
      </div>
      <DivisionSearchModel
      SetDivisionDetailsBySearch={SetDivisionDetailsBySearch}
        show={show}
        onClose={handleClose}
        setDivisionValue={setDivisionValue}
        divisionsData={divisionsData}
        loading={loading}
      />
    </div>
  );
};

export default ActiveEventData;
