import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Table, Form } from "react-bootstrap";
import { AiFillPrinter, AiFillFilePdf, AiOutlineDelete } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { IoAddCircle } from "react-icons/io5";
import "../../assets/css/products-table.css";
import { useDispatch, useSelector } from "react-redux";
import { DelVenue } from "../../store/Venue/actions/actionCreators";
import DeleteModel from "../Models/DeleteModel";
import { GetVenue } from "../../store/Venue/actions/actionCreators";
import { useNavigate } from "react-router-dom";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { GlobalInfo } from "../../App";
import { GetPaymentRecords, getPaymentRecordsbySearch } from "../../store/team/actions/actionsCreators";
const AllPaymentHistoryTable = () => {
  const { VenueData, isLoading } = useSelector((state) => state.venue);
  const { PaymentRecords } = useSelector((state) => state.team);
 
  const { token, user } = useSelector((state) => state.user);
  // const [page, setPage] = useState(0);
  const userId = user?.userId;
  const Dispatch = useDispatch();

  const isUser = true;
  useEffect(() => {
    Dispatch(GetPaymentRecords(userId, 0, token, isUser));
  }, [Dispatch]);

 
  

  const handleSearchPayment = (value) => {
    // Dispatch(getPaymentRecordsbySearch(value.target.value,token));
  };
  return (
    <div className="section-main m-3 px-3 py-4 rounded-lg shadow-lg max-w-4xl ">
      <Row className="mb-3">
        <Col>
          <Form.Control type="text" placeholder="Search" className="w-50" onChange={handleSearchPayment} />
        </Col>
       
      </Row>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table responsive hover size="sm" className="mt-2">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Pending Amount</th>
              <th>Paid Amount</th>
              <th>Total Amount</th>
              <th>Payment Method</th>
              <th>Payment Currency</th>
              <th>Payment Date</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {PaymentRecords?._embedded?.paymentRecordResponseList?.length >
            0 ? (
              PaymentRecords?._embedded?.paymentRecordResponseList?.map(
                (item, index) => (
                  <tr key={index} className="main-row">
                    <td>{item?.teamName}</td>
                    <td>{item?.pendingAmount}</td>
                    <td>{item?.paidAmount}</td>
                    <td>{item?.totalAmount}</td>
                    <td>{item?.paymentChannel}</td>
                    <td>{item?.paymentCurrency}</td>
                    <td>{item?.paymentDate}</td>
                    <td
                      style={{
                        color:
                          item?.paymentStatus === "succeeded" ? "green" : "red",
                      }}
                    >
                      {item.paymentStatus}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No Records Are Available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
     
    </div>
  );
};

export default AllPaymentHistoryTable;
