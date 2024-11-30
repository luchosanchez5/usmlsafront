import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createSubscription } from "../../store/team/actions/actionsCreators";
import Toast from "../../shared/Toast";
import SpinNer from "../LoadingSpinner/SpinNer";
console.log(CardElement);

const CARD_ELEMENT_OPTIONS = {
  iconStyle: "solid",
  hidePostalCode: true,
  style: {
    base: {
      color: "black",
      fontSmoothing: "antialiased",

      fontSize: "16px",

      "::placeholder": {
        color: "black",
      },
      border: "1px solid white",
      ":-webkit-autofill": {
        color: "#000000",
      },
    },
    invalid: {
      color: "red",
      border: "1px solid red",
    },
  },
};

const CardPaymentForm = ({
  DivisionDetailsBySearch,
  totalAmount,
  tournamentId,
  SetCardModel,
  divisionId,
  teamId,
  pendingAmount,
  isPendingAmount,
  setApiCall,
}) => {
  const stripe = useStripe();
  const { isLoading } = useSelector((state) => state.team);
  const elements = useElements();
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const Dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const paymentMethod = await stripe?.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement),
    });

    if (paymentMethod.error) {
      Toast.error(paymentMethod.error.message);
    } else {
      const data = {
        paidAmount: pendingAmount ? pendingAmount * 100 : totalAmount * 100,
        paymentCurrency: "usd",
        paymentMethod: paymentMethod?.paymentMethod?.id,
        teamId: Number(id) || teamId,
        tournamentId: tournamentId,
        divisionId: divisionId
          ? divisionId
          : DivisionDetailsBySearch[0]?.divisionId,
      };
      console.log(data);
      Dispatch(createSubscription(data, token, navigate, id, isPendingAmount));
      if (!isLoading) {
        SetCardModel(false);
        setApiCall((prev) => !prev);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex flex-column align-items-center">
        <CardElement options={CARD_ELEMENT_OPTIONS} className="card-input" />
      </div>

      <div className="text-center mt-3">
        <button
          type="submit"
          className="gradient-btn-orange w-max-content height-56-important px-5 mt-4"
        >
          {isLoading ? <SpinNer /> : "Pay Now"}
        </button>
      </div>
    </form>
  );
};

export default CardPaymentForm;
