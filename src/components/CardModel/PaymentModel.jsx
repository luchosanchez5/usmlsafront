import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CardForm from "./CardForm";

function PaymentModel({ show, onClose, onConfirm, event }) {
  const [isFormValid, setIsFormValid] = useState(false);

  // const courseName = event?.coursetitle;
  // const courseAuthor = event?.courseAuthor;

  const handleFormValidityChange = (validity) => {
    setIsFormValid(validity);
  };
  // const [price, setprice] = useState("500");
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onClose}
      aria-labelledby="payment-modal-title"
    >
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title id="payment-modal-title">
          Confirm Your Subsription
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <CardForm onFormValidityChange={handleFormValidityChange} />
        <div className="text-end mt-4">
          <button
            className="gradient-btn-orange"
            onClick={onConfirm}
            disabled={!isFormValid}
          >
            Proceed with Payment
          </button>
          <Button
            variant="secondary"
            style={{ padding: "13px 10px 12px", borderRadius: "0" }}
            onClick={onClose}
            className="ms-2"
          >
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PaymentModel;
