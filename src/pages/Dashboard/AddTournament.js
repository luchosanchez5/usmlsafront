import React, { useState } from "react";
import AddTournamentFields from "../../components/tournament/AddTournamentFields";
import DashboardLayout from "../../layout/DashboardLayout";
import AddDivisionFields from "../../components/Division/AddDivisionFields";
const AddTournament = () => {
  const [state, setState] = useState("tournamentForm");
  return (
    <>
      <div className="d-flex gap-3 justify-content-center">
        <button
          className="bg-black py-1 text-white"
          onClick={()=>setState("tournamentForm")}
        >
          Add Tournament
        </button>
        <button
          className="gradient-btn-orange px-1 py-1  text-white"
          onClick={()=>setState("divisionForm")}
        >
          Add Division
        </button>
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
