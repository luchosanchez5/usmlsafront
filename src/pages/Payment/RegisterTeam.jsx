import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import OrderSummeryCard from "./OrderSummeryCard";
import DashboardLayout from "../../layout/DashboardLayout";
import ActiveEvents from "./ActiveEvents";
import FindEvents from "../../components/product/FindEvents";
import CardPaymentModel from "../../components/Models/CardPaymentModel";
import Toast from "../../shared/Toast";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createCustomSubscription } from "../../store/team/actions/actionsCreators";
import SpinNer from "../../components/LoadingSpinner/SpinNer";



const RegisterTeam = () => {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [DivisionDetailsBySearch, SetDivisionDetailsBySearch] = useState([]);
  const [DivisionValue, setDivisionValue] = useState("");
  const [CardModel, SetCardModel] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);
  const DivisionDetails = DivisionDetailsBySearch[0];
  const { user } = useSelector((state) => state.user);
  const role = user?.roles[0];
  const { isLoading } = useSelector((state) => state.team);
  const [customMethod, setCustomMethod] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const Dispatch = useDispatch();
  const navigate = useNavigate();

 /* const totalAmount =
    selectedPayment === "InitialDeposit"
      ? DivisionDetails?.initialDepositFee
      : DivisionDetails?.entryFee;*/

      const totalAmount =
      selectedPayment === "InitialDeposit"
        ? DivisionDetails?.initialDepositFee
        : selectedPayment === "EntryFee"
        ? DivisionDetails?.entryFee
        : selectedPayment === "CustomAmount"
        ? parseFloat(customAmount) || 0
        : 0;      

  useEffect(() => {

  }, [role]);    


  /*------------- Added by Lucho for Custom Amount----------------- ***/
  /******************************************************************** */

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = {
      teamId: id,
      paidAmount: customAmount,
      paymentCurrency: "USD",
      // add any other necessary form values
      paymentMethod: customMethod,
      tournamentId: tournamentId,
      divisionId: DivisionDetailsBySearch[0]?.divisionId,
    };
  
    const isManual = "MANUAL";
  
    Dispatch(
      createCustomSubscription(
        data,
        token,
        navigate,
        id,
        false, // or true if pending amount
        SetCardModel
      )
    );
  };

  /************************************ */

  const handlePlaceOrderBtn = () => {
    /*if (!selectedPayment) {
      return Toast.error("Select Your Payment Fees");
    } else {
      SetCardModel(true);
    }*/

      if (!selectedPayment) {
        return Toast.error("Select Your Payment Fees");
      }
    
      if (selectedPayment === "CustomAmount") {
        if (!customAmount || parseFloat(customAmount) < 0) {
          return Toast.error("Enter a valid custom amount.");
        }
        if (!customMethod) {
          return Toast.error("Select a manual payment method.");
        }
        // ✅ Trigger manual payment submission
        handleSubmit({ preventDefault: () => {} });
      } else {
        // ✅ Open the card modal for card payments
        SetCardModel(true);
      }


  };

  const handlePaymentChange = (event) => {
            console.log("Role value:", role);
        console.log("Team ID : ", id);
        console.log("Divison : ", DivisionDetailsBySearch[0]?.divisionId);
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

                {role === "ADMIN" && (
                  <div className="payment-option border p-3 mb-2 rounded">
                    <div className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="CustomAmount"
                        value="CustomAmount"
                        id="CustomAmount"
                        checked={selectedPayment === "CustomAmount"}
                        onChange={handlePaymentChange}
                      />
                      <label className="form-check-label" htmlFor="CustomAmount">
                        Custom Amount

                      </label>
                    </div>

    {/* Show this dropdown only if CustomAmount is selected */}
    {selectedPayment === "CustomAmount" && (
      <div className="mt-3">
        <div className="mb-3">
          <label htmlFor="customAmount" className="form-label">
            Enter Custom Amount ($)
          </label>
          <input
            type="number"
            className="form-control"
            id="customAmount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="e.g. 120.00"
            min="0"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="customPaymentMethod" className="form-label">
            Select Payment Method
          </label>
          <select
            id="customPaymentMethod"
            className="form-select"
            value={customMethod}
            onChange={(e) => setCustomMethod(e.target.value)}
          >
            <option value="">-- Choose Method --</option>
            <option value="Zelle">Zelle</option>
            <option value="Venmo">Venmo</option>
            <option value="Cash">Cash</option>
            <option value="Square">Square</option>
            <option value="Coupon">Coupon</option>
          </select>
        </div>
      </div>
    )}


                  </div>
                )}

                <button
                  className="gradient-btn-orange"
                  onClick={handlePlaceOrderBtn}
                >
                  {isLoading ? <SpinNer /> : "Place Order"}
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
