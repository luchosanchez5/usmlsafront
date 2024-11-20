import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BsBorderWidth } from 'react-icons/bs';
import Toast from '../../shared/Toast';
console.log(CardElement);

const CARD_ELEMENT_OPTIONS = {
  iconStyle: 'solid',
  hidePostalCode: true,
  style: {

    base: {
      color: 'black',
      fontSmoothing: 'antialiased',

      fontSize: '16px',

      '::placeholder': {
        color: 'black',

      },
      border: '1px solid white',
      ':-webkit-autofill': {
        color: '#000000',

      },
    },
    invalid: {
      color: 'red',
      border: '1px solid red'
    }
  }
};

const CardPaymentForm = ({ DivisionDetailsBySearch, totalAmount, tournamentId, SetTeamBoxModel }) => {

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { id } = useParams()
  const { token } = useSelector((state) => state.user);

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
      Toast.error(paymentMethod.error.message)
    } else {

      const data = {
        paidAmount: totalAmount * 100,
        paymentCurrency: "usd",
        paymentMethod: paymentMethod?.paymentMethod?.id,
        teamId: Number(id),
        tournamentId: tournamentId,
        divisionId: DivisionDetailsBySearch[0].divisionId,
      };

      const res = await axios.post(
        "http://localhost:8082/api/payment/secure/create-subscription",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      SetTeamBoxModel(false)
      // Toast.success(res.data.message)

    }




  };

  return (

    <form onSubmit={handleSubmit} >
      <div className="d-flex flex-column align-items-center">
        <CardElement options={CARD_ELEMENT_OPTIONS} className='card-input' />
      </div>

      <div className="text-center mt-3">
        <button type="submit" className="gradient-btn-orange w-max-content height-56-important px-5 mt-4">
          Subscribe Now
        </button>
      </div>
    </form>
  );
};

export default CardPaymentForm;
