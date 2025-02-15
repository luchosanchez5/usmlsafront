import React from "react";
import { Modal } from "react-bootstrap";
import SpinNer from "../LoadingSpinner/SpinNer";

const DivisionModal = ({
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
          <div className="list-group">
            {divisionsData?.data?.map((division, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center border-bottom py-2"
              >
                <span className="fw-bold fs-6">{division.divisionName}</span>
                <span className="text-dark fw-bold fs-6">
                  {division.entryFee}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No divisions available.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DivisionModal;
