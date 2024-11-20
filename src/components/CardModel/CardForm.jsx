import React, { useState, useEffect } from "react";
import { Form, Row, Col, Container, Card } from "react-bootstrap";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import SelectTag from "../product/SelectTag";

const CardForm = ({ onFormValidityChange, price='500' }) => {
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCVC] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(price); // Initial full price

  const isCardNumberValid = cardNumber.length === 16;
  const isCVCValid = cvc.length === 3 || cvc.length === 4; // CVC is usually 3 or 4 digits
  const isExpiryDateValid = /^\d{2}\/\d{2}$/.test(expiryDate); // MM/YY format
  const isCardHolderValid = cardHolder.trim() !== "";

  const isFormValid =
    isCardNumberValid && isCVCValid && isExpiryDateValid && isCardHolderValid;

  // Notify the parent component whenever form validity changes
  useEffect(() => {
    onFormValidityChange(isFormValid);
  }, [isFormValid, onFormValidityChange]);

  const paymentOptions = [
    { value: "Half Payment", label: "Half Payment" },
    { value: "Full Payment", label: "Full Payment" },
  ];

  const handleChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === "Half Payment") {
      setPaymentAmount(price / 2); // Set to half price
    } else if (selectedOption === "Full Payment") {
      setPaymentAmount(price); // Set to full price
    }
  };

  return (
    <Container className="">
      <Card className="p-4 bg-dark ">
        <Form>
          <Form.Group className="mb-3">
          <Form.Label>Payment options</Form.Label>
            <SelectTag
              options={paymentOptions}
              onChange={handleChange}
              className='form-control '
              style={{borderRadius:'0'}}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3 ">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email"      style={{borderRadius:'0'}} />
          </Form.Group> */}

          <Form.Group className="mb-3">
            <Form.Label>Card Information</Form.Label>
            <Row className="gap-2">
              <Col md={12}>
                <Form.Control
                  type="text"
                  placeholder="Card number"
                  value={cardNumber}
                  style={{borderRadius:'0'}}
                  onChange={(e) =>
                    setCardNumber(e.target.value.replace(/\D/g, ""))
                  }
                  maxLength={16}
                  isInvalid={!isCardNumberValid && cardNumber.length > 0}
                />
              </Col>
              <Col md={12}>
                <Form.Control
                  type="text"
                  placeholder="MM/YY"
                  value={expiryDate}
                  style={{borderRadius:'0'}}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  maxLength={5}
                  isInvalid={!isExpiryDateValid && expiryDate.length > 0}
                />
              </Col>
              <Col md={12}>
                <Form.Control
                  type="text"
                  placeholder="CVC"
                  value={cvc}
                  onChange={(e) => setCVC(e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                  style={{borderRadius:'0'}}
                  isInvalid={!isCVCValid && cvc.length > 0}
                />
              </Col>
              <Col md={12}>
                <Form.Control
                  type="text"
                  placeholder="Name on card"
                  value={cardHolder}
                  style={{borderRadius:'0'}}
                  onChange={(e) => setCardHolder(e.target.value)}
                  isInvalid={!isCardHolderValid && cardHolder.length > 0}
                />
              </Col>
            </Row>
            <div className="mt-2">
              <FaCcVisa
                size={35}
                color="white"
                style={{ marginRight: "10px" }}
              />
              <FaCcMastercard
                size={35}
                color="white"
                style={{ marginRight: "10px" }}
              />
              <FaCcAmex size={35} color="white" />
            </div>
          </Form.Group>

          <Form.Group className="mt-4">
            <Form.Label className="fw-bold">Amount to Pay: ${paymentAmount}</Form.Label>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
};

export default CardForm;
