import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import "../../assets/css/products-table.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetPaymentRecords } from "../../store/team/actions/actionsCreators";
const PaymentHistoryTable = ({ state, setState }) => {
  const { PaymentRecords, isLoading } = useSelector((state) => state.team);

  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(GetPaymentRecords(id, 0, token));
  }, [Dispatch, state, id, token]);

  return (
    <div className="section-main m-3 px-3 py-4 bg-white  shadow-lg mb-5">
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table responsive hover size="sm" className="mt-2">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Payment Purpose</th>
              <th>Pending Amount</th>
              <th>Paid Amount</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <div className="mb-4">
                <h4>Loading...</h4>
              </div>
            )}
            {PaymentRecords?._embedded?.paymentRecordResponseList?.length >
            0 ? (
              PaymentRecords?._embedded?.paymentRecordResponseList?.map(
                (item, index) => (
                  <tr key={index} className="main-row">
                    <td>{item?.teamName}</td>
                    <td>{item?.paymentPurpose}</td>
                    <td>{item?.pendingAmount}</td>
                    <td>{item?.paidAmount}</td>
                    <td>{item?.totalAmount}</td>
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
                <td colSpan="6" className="text-center">
                  No Payment Record Available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
