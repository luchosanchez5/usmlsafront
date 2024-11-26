import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Modal from "react-bootstrap/Modal";
import CardPaymentForm from "./CardPaymentForm";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const CardPaymentModel = ({
  show,
  onClose,
  SetCardModel,
  DivisionDetailsBySearch,
  totalAmount,
  tournamentId,
  divisionId,
  teamId,
  pendingAmount,
  isPendingAmount
}) => {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered className="py-4 ">
      <Modal.Header closeButton>
        <Modal.Title>Enter Your Card Details</Modal.Title>
      </Modal.Header>
      <Modal.Body className="row flx-column ">
        <Elements stripe={stripePromise}>
          <CardPaymentForm
            DivisionDetailsBySearch={DivisionDetailsBySearch}
            totalAmount={totalAmount}
            tournamentId={tournamentId}
            SetCardModel={SetCardModel}
            divisionId={divisionId}
            teamId={teamId}
            pendingAmount={pendingAmount}
            isPendingAmount={isPendingAmount}
          />
        </Elements>
      </Modal.Body>
    </Modal>
  );
};

export default CardPaymentModel;
