import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import OrderSummeryCard from "./OrderSummeryCard";
import DashboardLayout from "../../layout/DashboardLayout";
import ContactInformation from "./ContactInformation";
import { useSelector } from "react-redux";
import axios from "axios";
import RegisterComponent from "./ActiveEvents";
import ActiveEvents from "./ActiveEvents";
import FindEvents from "../../components/product/FindEvents";
import CardPaymentModel from "../../components/Models/CardPaymentModel";
import Toast from "../../shared/Toast";
const Url = process.env.REACT_APP_MAIN_URL;

const RegisterTeam = () => {
  // const [isFormValid, setIsFormValid] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [DivisionDetailsBySearch, SetDivisionDetailsBySearch] = useState([]);
  const [DivisionValue, setDivisionValue] = useState("");
  const [CardModel, SetCardModel] = useState(false);
  const [tournamentId, setTournamentId] = useState(null);

  const DivisionDetails = DivisionDetailsBySearch[0];
  const totalAmount =
    selectedPayment === "IntialDeposit"
      ? DivisionDetails?.initialDepositFee
      : DivisionDetails?.entryFee;
  const { token } = useSelector((state) => state.user);

  // const handleFormValidityChange = (validity) => {
  //   setIsFormValid(validity);
  // };

  useEffect(() => {
    if (!DivisionValue) {
      return;
    }

    const fetchDivisionDetails = async () => {
      if (!token || !DivisionValue) {
        return;
      }

      try {
        const res = await axios.get(
          `${Url}api/divisions/search?divisionName=${DivisionValue}&page=0&size=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        SetDivisionDetailsBySearch(res.data.data);
      } catch (e) {
        console.error("Error fetching division details:", e);
      }
    };

    fetchDivisionDetails();
  }, [DivisionValue, token]);
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
          <ActiveEvents setDivisionValue={setDivisionValue} setTournamentId={setTournamentId}  />
        </>
      )}
      <div className="container mt-5">
        <Row className="justify-content-center">
          {/* <Col className="d-flex flex-column " lg={6}>
            <ContactInformation
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              DivisionValue={DivisionValue}
              setDivisionValue={setDivisionValue}
              DivisionDetailsBySearch={DivisionDetailsBySearch}
              totalAmount={totalAmount}
            />
          </Col> */}
          {DivisionDetailsBySearch.length > 0 && (
            <>
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
                      Entry Fee{" "}
                      <span className="fw-bolder">
                        ${DivisionDetailsBySearch?.[0]?.entryFee || "N/A"}
                      </span>
                    </label>
                  </div>
                </div>

                <div className="payment-option border p-3 mb-2 rounded">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="IntialDeposit"
                      value="IntialDeposit"
                      id="IntialDeposit"
                      checked={selectedPayment === "IntialDeposit"}
                      onChange={handlePaymentChange}
                    />
                    <label className="form-check-label" htmlFor="IntialDeposit">
                      Initial Deposit Fee{" "}
                      <span className="fw-bolder">
                        $
                        {DivisionDetailsBySearch?.[0]?.initialDepositFee ||
                          "N/A"}
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
              {CardModel && (
                <CardPaymentModel
                  show={CardModel}
                  SetCardModel={SetCardModel}
                  DivisionDetailsBySearch={DivisionDetailsBySearch}
                  totalAmount={totalAmount}
                  tournamentId={tournamentId}
                  onClose={() => SetCardModel(false)}
                />
              )}
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
