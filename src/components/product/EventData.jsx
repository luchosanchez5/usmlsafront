import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import DivisionModal from "../HomeModals/DivisionModal";
import DetailsModal from "../HomeModals/DetailsModal";
import axios from "axios";
import DivisionAndTeamModal from "../HomeModals/DivisionAndTeamModal";
const Url = process.env.REACT_APP_MAIN_URL;

const EventData = ({
  id, // tournament id
  description, //Tournament Description
  title,
  subtitle,
  ranking,
  startDate,
  endDate,
  img,
  numberOfRegisteredTeams,
  showNumberOfRegisteredTeams,
  showWhoIsComing,
}) => {
  const getitem = localStorage.getItem("Login");
  const IsLoggedIn = JSON.parse(getitem);
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamData, setTeamData] = useState(false);
  const [tournamentName, setTournamentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [divisionsData, setDivisionsData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [tournamnetInfo, setTournamentInfo] = useState(false);

  const handleRegister = () => {
    if (!IsLoggedIn) {
      Navigate("/auth/login");
    } else {
      Navigate("/myaccount");
    }
  };

  const handleCloseModel = () => {
    setShow(false);
    setShowTeamModal(false);
    setShowDetails(false);
    setTournamentName("");
  };

  const handleShowModal = (name) => {
    setTournamentName(name);
  };
  
  const handleShowTeamModal = (name) => {
    setTeamData(true);
    setTournamentName(name);
    setTournamentInfo(false);
  };

  const handleShowInfo = (name) => {
    setTeamData(false);
    setTournamentName(name);
    setTournamentInfo(true);
  };

  useEffect(() => {
    if (tournamentName) {
      console.log(tournamentName, "tournamentName");
      setLoading(true);
      axios
        .get(
          `${Url}api/divisions/search?tournamentName=${encodeURIComponent(
            tournamentName
          )}`
        )
        .then((response) => {
          setDivisionsData(response.data);
          console.log("TOURNEY DETAILS", response.data);
        })
        .catch((error) => {
          console.error("API Error:", error);
          setDivisionsData([]);
        })
        .finally(() => {
          setLoading(false);
          if (teamData) {
            setTeamData(false);
            setShowTeamModal(true);
          } else {

              if (tournamnetInfo) {
                setShowDetails(true);
                setTournamentInfo(true);
                setTeamData(false);
              } else {
                setShow(true);
                setTeamData(false);
              }
          }
        });
    }
  }, [tournamentName]);

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
          <>
          <button
                className="event-button bg-green"
                onClick={() => handleShowInfo(ranking)}
              >
                More Info
              </button>
          </>
          
          {showWhoIsComing && (
            <>
              <button
                className="event-button bg-warning"
                onClick={() => handleShowTeamModal(ranking)}
              >
                Who's Coming
              </button>
              <button
                className="event-button bg-dark text-white"
                onClick={() => handleShowModal(ranking)}
              >
                Division
              </button>
            </>
          )}

          <button
            className="event-button Login-btn text-white"
            onClick={handleRegister}
          >
            {IsLoggedIn ? "Buy Now" : "Register"}
          </button>
        </div>
      </div>

      <DivisionModal
        show={show}
        onClose={handleCloseModel}
        divisionsData={divisionsData}
        loading={loading}
        tournamentName={tournamentName}
      />
      <DivisionAndTeamModal
        show={showTeamModal}
        onClose={handleCloseModel}
        divisionsData={divisionsData}
        loading={loading}
        tournamentName={tournamentName}
      />

      <DetailsModal
        show={showDetails}
        onClose={handleCloseModel}
        description={divisionsData?.data?.[0]?.description || ""}
        loading={loading}
      />
    </div>
  );
};

export default EventData;
