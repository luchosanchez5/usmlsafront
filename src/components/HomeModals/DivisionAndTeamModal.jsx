import React from "react";
import { Modal, Accordion, Card, Button } from "react-bootstrap";
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
                    <span className="fw-bold text-primary">
                      ${division.entryFee}
                    </span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {division.registeredTeamsData?.length > 0 ? (
                    <div className="list-group">
                      {division.registeredTeamsData.map((team, teamIndex) => (
                        <div key={teamIndex} className="border-bottom py-2">
                          <p className="mb-1">
                            <strong>Team:</strong> {team.name}
                          </p>
                          <p className="mb-1">
                            <strong>Email:</strong> {team.email}
                          </p>
                          <p className="mb-1">
                            <strong>Address:</strong> {team.address}
                          </p>
                          <p className="mb-1">
                            <strong>Zip Code:</strong> {team.zipCode}
                          </p>
                        </div>
                      ))}
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
