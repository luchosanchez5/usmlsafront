import React from "react";
import { Modal, Accordion, Card, Button, ProgressBar } from "react-bootstrap";
import SpinNer from "../LoadingSpinner/SpinNer";

const DivisionAndTeamModal = ({
  show,
  onClose,
  divisionsData,
  loading,
  tournamentName,
}) => {
  console.log(divisionsData);

  return (
    <Modal
      size="xl"
      show={show}
      onHide={onClose}
      aria-labelledby="division-modal-title"
    >
      <Modal.Header closeButton className="bg-light text-dark">
        <Modal.Title id="division-modal-title">{tournamentName}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light text-dark">
        {loading ? (
          <SpinNer />
        ) : divisionsData?.data?.length > 0 ? (
          <Accordion>
            {divisionsData.data.map((division, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>
                  <div className="d-flex justify-content-between w-100">
                    <span className="fw-bold">{division.divisionName}</span>
                  </div>
                  <div style={{ width: "100%", maxWidth: "300px" }}>
                    <ProgressBar
                      now={(division.entryFee / 1000) * 100}
                      variant="danger"
                      label={`${((division.entryFee / 1000) * 100).toFixed(
                        1
                      )}%`}
                    />
                  </div>
                  <span className="fw-bold text-dark mx-2">
                    ${division.entryFee}
                  </span>
                </Accordion.Header>
                <Accordion.Body>
                  {division.registeredTeamsData?.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Team Name</th>
                            <th>Division Name</th>
                            <th>Zip Code</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {division.registeredTeamsData.map(
                            (team, teamIndex) => (
                              <tr key={teamIndex}>
                                <td>{teamIndex + 1}</td>
                                <td>{team.name}</td>
                                <td>{division.divisionName}</td>
                                <td>{team.zipCode}</td>
                                <td>
                                  <span
                                    className="text-white my-2 p-2 rounded"
                                    style={{
                                      background:
                                        team?.teamStatus === "ACTIVE"
                                          ? "green"
                                          : "red",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {team?.teamStatus}
                                  </span>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-muted">No teams registered.</p>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <p className="text-center">No divisions available.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DivisionAndTeamModal;
