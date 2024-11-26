import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "../../assets/css/products-table.css";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import {
  completePendingPayment,
  getPendingPaymentRecords,
} from "../../store/team/actions/actionsCreators";
import TableSkeleton from "../SkeletonTable/SkeletonTable";
import { AiOutlineCreditCard, AiOutlineDollarCircle } from "react-icons/ai";
import CardPaymentModel from "../Models/CardPaymentModel";
import ConfirmModel from "../Models/ConfirmModel";
import Toast from "../../shared/Toast";
const PendingHistoryTable = () => {
  const { PendingPaymentRecords, isLoading } = useSelector(
    (state) => state.team
  );

  const { id } = useParams();
  const { token } = useSelector((state) => state.user);
  const Dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [SelectedPayment, SetSelectedPayment] = useState(null);
  const [isPendingAmount, setIsPendingAmount] = useState(false);
  const [apiCall, setApiCall] = useState(false);

  const [CardModel, SetCardModel] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ConfirmPayment, SetConfirmPayment] = useState(null);
  const handleCashPayment = (
    teamId,
    tournamentId,
    divisionId,
    pendingAmount
  ) => {
    Dispatch(
      completePendingPayment(
        teamId,
        tournamentId,
        divisionId,
        pendingAmount,
        token
      )
    );
    setShowModal(false);
    setApiCall((prev) => !prev);
  };

  const handleCardPayment = (item) => {
    SetSelectedPayment(item);
    SetCardModel(true);
    setIsPendingAmount(true);
  };

  const confirmCashPayment = (item) => {
    SetConfirmPayment(item);
    setShowModal(true);
  };
  const showToaster = (item) => {
    Toast.warning("Please contact help desk");
  };

  useEffect(() => {
    Dispatch(getPendingPaymentRecords(id, 0, token));
  }, [Dispatch, id, token, apiCall]);
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
                <th>Team</th>
                <th>Tournament</th>
                <th>Division </th>
                <th>Registration Date</th>
                <th>Pending Amount</th>
                <th>Registration Status</th>
                <th>Payment Methods</th>
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
                    <td>{item?.pendingAmount}$</td>
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
                    <td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {user?.roles[0] === "ADMIN" &&
                          parseFloat(item.pendingAmount) !== 0 ? (
                            <button
                              onClick={() => confirmCashPayment(item)}
                              className="btn btn-sm btn-dark d-flex align-items-center"
                            >
                              <AiOutlineDollarCircle className="me-1" />
                              Pay By Cash
                            </button>
                          ) : (
                            ""
                          )}
                          {user?.roles[0] === "MANAGER" &&
                          parseFloat(item.pendingAmount) !== 0 ? (
                            <>
                              <button
                                onClick={() => handleCardPayment(item)}
                                className="btn btn-sm btn-danger d-flex align-items-center"
                              >
                                <AiOutlineCreditCard className="me-1" />
                                Pay By Card
                              </button>
                              <button
                                onClick={() => showToaster()}
                                className="btn btn-sm btn-dark d-flex align-items-center"
                              >
                                <AiOutlineDollarCircle className="me-1" />
                                Pay By Cash
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Tournament Registration Available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>
      {showModal && (
        <ConfirmModel
          show={showModal}
          onClose={() => setShowModal(false)}
          OnDelete={() =>
            handleCashPayment(
              ConfirmPayment.teamId,
              ConfirmPayment.tournamentId,
              ConfirmPayment.divisionId,
              ConfirmPayment.pendingAmount
            )
          }
        />
      )}
      {CardModel && SelectedPayment && (
        <CardPaymentModel
          show={CardModel}
          SetCardModel={SetCardModel}
          tournamentId={SelectedPayment.tournamentId}
          teamId={SelectedPayment.teamId}
          divisionId={SelectedPayment.divisionId}
          pendingAmount={SelectedPayment.pendingAmount}
          onClose={() => SetCardModel(false)}
          isPendingAmount={isPendingAmount}
          setApiCall={setApiCall}
          
        />
      )}
    </div>
  );
};

export default PendingHistoryTable;
