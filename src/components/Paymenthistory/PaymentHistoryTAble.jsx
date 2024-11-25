import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import "../../assets/css/products-table.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetPaymentRecords } from "../../store/team/actions/actionsCreators";
import TableSkeleton from "../SkeletonTable/SkeletonTable";
import { AiOutlineCreditCard, AiOutlineDollarCircle } from "react-icons/ai";
const PaymentHistoryTable = ({ state, setState, tournamentId, divisionId }) => {
  const { PaymentRecords, isLoading } = useSelector((state) => state.team);

  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(GetPaymentRecords(id, 0, token, false, tournamentId, divisionId));
  }, [Dispatch, state, id, token, tournamentId, divisionId]);

  console.log(PaymentRecords?._embedded?.paymentRecordResponseList);

  return (
    <div className="section-main m-3 px-3 py-4 bg-white  shadow-lg mb-5">
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {isLoading ? (
          <Table>
            <TableSkeleton
              rows={10}
              columns={7}
              baseColor="#afafaf"
              highlightColor="#afafaf"
            />
          </Table>
        ) : (
          <Table responsive hover size="sm" className="mt-2">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Payment Purpose</th>
                <th>Pending Amount</th>
                <th>Paid Amount</th>
                <th>Total Amount</th>
                <th>Payment Status</th>
                <th>Payment Methods</th>
              </tr>
            </thead>
            <tbody>
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
                            item?.paymentStatus === "succeeded"
                              ? "green"
                              : "red",
                        }}
                      >
                        {item?.paymentStatus}
                      </td>
                      <td>
                        <td>
                          <div className="d-flex flex-wrap gap-1">
                            <button className="btn btn-sm btn-outline-dark d-flex align-items-center">
                              <AiOutlineDollarCircle className="me-1" /> Cash
                            </button>
                            <button className="btn btn-sm btn-outline-danger d-flex align-items-center">
                              <AiOutlineCreditCard className="me-1" /> Card
                            </button>
                          </div>
                        </td>
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
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
