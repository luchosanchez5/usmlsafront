import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import OrderSummeryCard from "./OrderSummeryCard";
import DashboardLayout from "../../layout/DashboardLayout";
import ActiveEvents from "./ActiveEvents";
import FindEvents from "../../components/product/FindEvents";
import CardPaymentModel from "../../components/Models/CardPaymentModel";
import Toast from "../../shared/Toast";
import { FaArrowLeft } from "react-icons/fa6";

const RegisterTeam = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [DivisionDetailsBySearch, SetDivisionDetailsBySearch] = useState([]);
  const [DivisionValue, setDivisionValue] = useState("");
  const [CardModel, SetCardModel] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);
  const DivisionDetails = DivisionDetailsBySearch[0];
  const totalAmount =
    selectedPayment === "InitialDeposit"
      ? DivisionDetails?.initialDepositFee
      : DivisionDetails?.entryFee;

  const handlePlaceOrderBtn = () => {
    if (!selectedPayment) {
      return Toast.error("Select Your Payment Fees");
    } else {
      SetCardModel(true);
    }
  };
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };
  return (
    <>
      <div className="ps-4 my-3">
        <span
          className="text-white fs-4 fw-bold p-2 rounded"
          style={{
            background: "black",
          }}
        >
          Register Your Team
        </span>
      </div>
      {!DivisionValue && (
        <>
          <FindEvents />
          <ActiveEvents
            setDivisionValue={setDivisionValue}
            setTournamentId={setTournamentId}
            SetDivisionDetailsBySearch={SetDivisionDetailsBySearch}
          />
        </>
      )}
      <div className="container mt-5">
        <Row className="justify-content-center">
          {DivisionValue && (
            <>
              <div className="text-start">
                <button className="bg-black rounded">
                  <FaArrowLeft
                    onClick={() => setDivisionValue(null)}
                    color="white"
                    size={20}
                  />
                </button>
              </div>

              <Col>
                <h2 className="py-3">Payment Options</h2>
                <div className="payment-option border p-3 mb-2 rounded">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="EntryFee"
                      value="EntryFee"
                      id="EntryFee"
                      checked={selectedPayment === "EntryFee"}
                      onChange={handlePaymentChange}
                    />
                    <label className="form-check-label" htmlFor="EntryFee">
                      Entry Fee
                      <span className="fw-bolder">
                        ${DivisionDetailsBySearch?.[0]?.entryFee}
                      </span>
                    </label>
                  </div>
                </div>
                <div className="payment-option border p-3 mb-2 rounded">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="InitialDeposit"
                      value="InitialDeposit"
                      id="InitialDeposit"
                      checked={selectedPayment === "InitialDeposit"}
                      onChange={handlePaymentChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="InitialDeposit"
                    >
                      Initial Deposit Fee
                      <span className="fw-bolder">
                        ${DivisionDetailsBySearch?.[0]?.initialDepositFee || 0}
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  className="gradient-btn-orange"
                  onClick={handlePlaceOrderBtn}
                >
                  Place Your Order
                </button>
              </Col>

              <CardPaymentModel
                show={CardModel}
                SetCardModel={SetCardModel}
                DivisionDetailsBySearch={DivisionDetailsBySearch}
                totalAmount={totalAmount}
                tournamentId={tournamentId}
                onClose={() => SetCardModel(false)}
              />
            </>
          )}
          <Col className="mt-4">
            {DivisionValue && DivisionDetailsBySearch.length > 0 && (
              <OrderSummeryCard
                selectedPayment={selectedPayment}
                DivisionDetailsBySearch={DivisionDetailsBySearch}
                totalAmount={totalAmount}
              />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashboardLayout(RegisterTeam);
