import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Modal from 'react-bootstrap/Modal';
import CardPaymentForm from './CardPaymentForm';
const stripePromise = loadStripe('pk_test_51LMyjxA4W5oaFcE3knRBfDStl55nBP3yg0ayEpI1Zjt8T04HpNamuG13e0astSrIceY4vrCRIoYaoOzyWPIYFvEE00iC1iIUXU');

const CardPaymentModel = ({ show, onClose, SetTeamBoxModel, DivisionDetailsBySearch,totalAmount,tournamentId }) => {


    return (
        <Modal show={show} onHide={onClose} size='lg'  centered className='py-4 ' >
            <Modal.Header closeButton>
                <Modal.Title>Enter Your Card Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="row flx-column ">
                <Elements stripe={stripePromise}>
                    <CardPaymentForm DivisionDetailsBySearch={DivisionDetailsBySearch} totalAmount={totalAmount} tournamentId={tournamentId} SetTeamBoxModel={SetTeamBoxModel} />
                </Elements>

            </Modal.Body>


        </Modal>
    )
}

export default CardPaymentModel