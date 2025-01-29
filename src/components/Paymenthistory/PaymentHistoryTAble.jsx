import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import "../../assets/css/products-table.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetPaymentRecords } from "../../store/team/actions/actionsCreators";
import TableSkeleton from "../SkeletonTable/SkeletonTable";
import { dateFormat } from "../../utlils/dateFormat";
const PaymentHistoryTable = ({ tournamentId, divisionId }) => {
  const { PaymentRecords, isLoading } = useSelector((state) => state.team);
  console.log(PaymentRecords);

  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(GetPaymentRecords(id, 0, token, false, tournamentId, divisionId));
  }, [Dispatch, id, token, tournamentId, divisionId]);
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
                <th>Sr #</th>
                <th>Team Name</th>
                <th>Registered Date </th>
                <th>Amount Paid</th>
                <th>Pending Amount</th>
                <th>Division</th>
                <th>Payment Status</th> 
              </tr>
            </thead>
            <tbody>
              {PaymentRecords?._embedded?.paymentRecordResponseList?.length >
              0 ? (
                PaymentRecords?._embedded?.paymentRecordResponseList?.map(
                  (item, index) => {
                    const serialNumber = index + 1;

                    return (
                      <tr key={index} className="main-row">
                        <td>{serialNumber}</td>
                        <td>{item?.teamName}</td>
                        <td>{dateFormat(item?.paymentDate)}</td>
                        <td>{item?.paidAmount}$</td>
                        <td>{item?.pendingAmount}$</td>
                        <td>{item?.divisionName}</td>
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
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
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
