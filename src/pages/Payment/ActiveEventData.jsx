import React, {useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import DivisionSearchModel from "./DivisionSearchModel";
import { GetDivisionsBySearch } from "../../store/tournament/actions/actionsCreators";
import { useDispatch, useSelector } from "react-redux";
const Url = process.env.REACT_APP_MAIN_URL;

const ActiveEventData = ({
  title,
  subtitle,
  ranking,
  startDate,
  endDate,
  img,
  numberOfRegisteredTeams,
  showNumberOfRegisteredTeams,
  showWhoIsComing,
  tournamentId,
  setDivisionValue,
  setTournamentId
}) => {
    
  const getitem = localStorage.getItem("Login");
  const IsLoggedIn = JSON.parse(getitem);
  const Navigate = useNavigate();
    const Dispatch = useDispatch();
    const { token } = useSelector((state) => state.user);
    const { id } = useParams();
  const [show, setShow] = useState(false);
  const handleRegister = () => {
    if (!IsLoggedIn) {
      Navigate("/auth/login");
    } else {
      Navigate("/myaccount");
    }
  };
//   useEffect(()=>{
//       Dispatch(GetDivisionsBySearch(token, 0, tournamentId, id))
//   },[tournamentId])
  const handleClose = () => setShow(false);


  //     if (tournamentName) {
  //       console.log(tournamentName, "tournamentName");
  //       setLoading(true);
  //       axios
  //         .get(
  //           `${Url}api/divisions/search?tournamentName=${encodeURIComponent(
  //             tournamentName
  //           )}`
  //         )
  //         .then((response) => {
  //           setDivisionsData(response.data);
  //         })
  //         .catch((error) => {
  //           console.error("API Error:", error);
  //           setDivisionsData([]);
  //         })
  //         .finally(() => {
  //           setLoading(false);
  //           if (teamData) {
  //             console.log("if");
  //             setTeamData(false);
  //             setShowTeamModal(true);
  //           } else {
  //             console.log("else");
  //             setShow(true);
  //             setTeamData(false);
  //           }
  //         });
  //     }
  //   }, [tournamentName]);

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
            className="event-button bg-dark text-white"
            onClick={() => {
              setShow(true);
              setTournamentId(tournamentId);
            }}
          >
            Select Division
          </button>
          <button
            className="event-button Login-btn text-white"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>
      {show && (
        <DivisionSearchModel
          show={show}
          onClose={handleClose}
          tournamentId={tournamentId}
          setDivisionValue={setDivisionValue}
        />
      )}
   
    </div>
  );
};

export default ActiveEventData;
