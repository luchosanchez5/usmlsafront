import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetDivisionsBySearch,
  GetTournamentsBySearch,
} from "../../store/tournament/actions/actionsCreators";
import CardPaymentModel from "../../components/Models/CardPaymentModel";
import SelectField from "../../components/product/SelectField";
import Toast from "../../shared/Toast";
import { useParams } from "react-router-dom";
const ContactInformation = ({
  selectedPayment,
  setSelectedPayment,
  DivisionValue,
  setDivisionValue,
  DivisionDetailsBySearch,
  totalAmount,
}) => {
  const { token } = useSelector((state) => state.user);
  const { id } = useParams();
  const { TournamentBySearch, DivisionBySearch } = useSelector(
    (state) => state.tournament
  );
  const [tournamentId, setTournamentId] = useState(null);
  const [CardModel, SetCardModel] = useState(false);
  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };
  const dispatch = useDispatch();
  console.log(TournamentBySearch);
  const TournmentOptions =
    TournamentBySearch?.data?.length > 0
      ? TournamentBySearch.data.map((item) => ({
          value: item?.tournamentId,
          label: item?.name,
        }))
      : [];

const DivisionOptions =
    DivisionBySearch?.data?.length > 0
      ? DivisionBySearch.data.map((item) => ({
          value: item?.divisionName,
          label: item?.divisionName,
        }))
      : [];

  useEffect(() => {
    dispatch(GetTournamentsBySearch(token));
  }, [dispatch, token]);

  const handleChange = (e) => {
    const tournamentId = e.target.value; // Directly get the tournamentId
    setTournamentId(tournamentId); // Set the state
    dispatch(GetDivisionsBySearch(token, 0, tournamentId, id));
  };

  const handleDivisionChange = (e) => {
    const value = decodeURIComponent(e.target.value);
    setDivisionValue(value);
  };
  const handlePlaceOrderBtn = () => {
    if (!selectedPayment) {
      return Toast.error("Select Your Payment Fees");
    } else {
      SetCardModel(true);
    }
  };

  return (
    <>
      <h2>Register Your Team</h2>
      <div className="mt-5 d-flex flex-column gap-2">
        <div className="d-flex  me-1">
          <SelectField
            deFaultValue="Select Your Tournament"
            options={TournmentOptions}
            className="d-flex flex-grow-1 py-2 me-1 form-control"
            onChange={handleChange}
          />

          {DivisionBySearch && DivisionBySearch?.data?.length > 0 && (
            <SelectField
              deFaultValue="Select Your Division"
              options={DivisionOptions}
              onClick={handleDivisionChange}
              className="py-2 d-flex flex-grow-1 form-control"
            />
          )}
        </div>
        {DivisionDetailsBySearch.length > 0 && (
          <>
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
                    ${DivisionDetailsBySearch?.[0]?.initialDepositFee || "N/A"}
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
      </div>
    </>
  );
};

export default ContactInformation;
