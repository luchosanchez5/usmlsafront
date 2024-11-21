import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import OrderSummeryCard from "./OrderSummeryCard";
import DashboardLayout from "../../layout/DashboardLayout";
import ContactInformation from "./ContactInformation";
import { useSelector } from "react-redux";
import axios from "axios";
const Url = process.env.REACT_APP_MAIN_URL;

const RegisterTeam = () => {
  // const [isFormValid, setIsFormValid] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [DivisionDetailsBySearch, SetDivisionDetailsBySearch] = useState([]);
  const [DivisionValue, setDivisionValue] = useState("");
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
      console.log("DivisionValue is empty, skipping API call");
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

  return (
    <>
      <div className="container mt-5">
        <Row className="justify-content-center">
          <Col className="d-flex flex-column " lg={8}>
            <ContactInformation
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              DivisionValue={DivisionValue}
              setDivisionValue={setDivisionValue}
              DivisionDetailsBySearch={DivisionDetailsBySearch}
              totalAmount={totalAmount}
            />
          </Col>
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
