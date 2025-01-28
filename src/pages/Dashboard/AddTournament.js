import React, { useState } from "react";
import AddTournamentFields from "../../components/tournament/AddTournamentFields";
import DashboardLayout from "../../layout/DashboardLayout";
import AddDivisionFields from "../../components/Division/AddDivisionFields";
const AddTournament = () => {
  const [state, setState] = useState("tournamentForm");
  const handleCheckboxChange = () => {
    setState((prevState) =>
      prevState === "tournamentForm" ? "divisionForm" : "tournamentForm"
    );
  };

  return (
    <>
      <div className="d-flex gap-3 justify-content-end align-items-center">
        <label className="switch">
          <input type="checkbox" onChange={handleCheckboxChange} />
          <span className="slider"></span>
        </label>
        <p className="p-0 m-0 fw-bold">
          {state === "tournamentForm" ? "Division Form" : "Tournament Form"}
        </p>
      </div>
      {state === "tournamentForm" ? (
        <AddTournamentFields />
      ) : (
        <AddDivisionFields />
      )}
    </>
  );
};

export default DashboardLayout(AddTournament);
