import React from "react";
import { Modal } from "react-bootstrap";
import SpinNer from "../LoadingSpinner/SpinNer";

const DetailsModal = ({ show, onClose, description, loading }) => {
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onClose}
      aria-labelledby="details-modal-title"
    >
      <Modal.Header closeButton className="bg-light text-dark">
        <Modal.Title id="details-modal-title">Tournament Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light text-dark">
        {loading ? (
          <div className="d-flex justify-content-center">
            <SpinNer />
          </div>
        ) : (
          //<p>{description || "No description available."}</p>
          <p>              
            <h6 style={{ whiteSpace: 'pre-line' }}>
                  {description || "No description available."}
            </h6>
        </p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DetailsModal;
