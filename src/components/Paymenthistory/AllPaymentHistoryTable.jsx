import React, { useState, useEffect } from "react";
import { Col, Row, Table, Form } from "react-bootstrap";
import "../../assets/css/products-table.css";
import { useDispatch, useSelector } from "react-redux";

import {
  GetPaymentRecords,
  GetPaymentRecordsByAdmin,
  getPaymentRecordsBySearch,
} from "../../store/team/actions/actionsCreators";
import { dateFormat } from "../../utlils/dateFormat";
import { PaginationControl } from "react-bootstrap-pagination-control";
const AllPaymentHistoryTable = () => {
  const { PaymentRecords } = useSelector((state) => state.team);
  const { token, user } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);

  const userId = user?.userId;
  const Dispatch = useDispatch();
  const role = user.roles[0];

  const isUser = true;
  useEffect(() => {
    if (role === "ADMIN") {
      Dispatch(GetPaymentRecordsByAdmin(token));
    } else {
      Dispatch(GetPaymentRecords(userId, 0, token, isUser));
    }
  }, [Dispatch]);

  const handleSearchPayment = (value) => {
    const searchValue = value.target.value;
    if (searchValue === "") {
      if (role === "ADMIN") {
        Dispatch(GetPaymentRecordsByAdmin(token));
      } else {
        Dispatch(GetPaymentRecords(userId, 0, token, isUser));
      }
    } else {
      Dispatch(getPaymentRecordsBySearch(searchValue, token));
    }
  };
  return (
    <>
      <div className="section-main m-3 px-3 py-4 rounded shadow-lg max-w-4xl ">
        <Row className="mb-3">
          <Col>
            <Form.Control
              type="text"
              placeholder="Team Name"
              className="w-50"
              onChange={handleSearchPayment}
            />
          </Col>
        </Row>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <Table border={true} responsive hover size="sm" className="mt-2">
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
                      <td>{item?.pendingAmount}$</td>
                      <td>{item?.paidAmount}$</td>
                      <td>{item?.totalAmount}$</td>
                      <td>{item?.paymentChannel}</td>
                      <td>{item?.paymentCurrency}</td>
                      <td>{dateFormat(item?.paymentDate)}</td>

                      <td>
                        <span
                          className="text-white fw-bold p-2 rounded"
                          style={{
                            background:
                              item?.paymentStatus === "succeeded"
                                ? "green"
                                : "red",
                            fontSize: "12px",
                          }}
                        >
                          {item?.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No Records Are Available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      {PaymentRecords?._embedded?.totalElements > 10 && (
        <PaginationControl
          page={page + 1}
          between={3}
          limit={10}
          total={PaymentRecords?._embedded?.totalElements}
          changePage={(page) => setPage(page - 1)}
          ellipsis={1}
        />
      )}
    </>
  );
};

export default AllPaymentHistoryTable;
