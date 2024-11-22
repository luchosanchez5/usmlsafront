import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import "../../assets/css/products-table.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPendingPaymentRecords } from "../../store/team/actions/actionsCreators";
import TableSkeleton from "../SkeletonTable/SkeletonTable";
const PendingHistoryTable = ({ state, setState }) => {
  const { PendingPaymentRecords, isLoading } = useSelector(
    (state) => state.team
  );

  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const Dispatch = useDispatch();

  useEffect(() => {
    Dispatch(getPendingPaymentRecords(id, 0, token));
  }, [Dispatch, state, id, token]);
  console.log(PendingPaymentRecords, "lasbdhkhaksdhkasd");
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
                <th>Tournament Name</th>
                <th>Division Name</th>
                <th>Registration Date</th>
                <th>Paid Amount</th>
                <th>Registration Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <div className="mb-4">
                  <h4>Loading...</h4>
                </div>
              )}
              {PendingPaymentRecords?.data?.length > 0 ? (
                PendingPaymentRecords?.data?.map((item, index) => (
                  <tr key={index} className="main-row">
                    <td>{item?.teamName}</td>
                    <td>{item?.tournamentName}</td>
                    <td>{item?.divisionName}</td>
                    <td>{item?.registrationDate}</td>
                    <td>{item?.depositFeeAmount}</td>
                    <td
                      style={{
                        color:
                          item?.registrationStatus === "PARTIAL_REGISTRATION"
                            ? "red"
                            : "green",
                      }}
                    >
                      {item?.registrationStatus}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Record Available
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

export default PendingHistoryTable;
