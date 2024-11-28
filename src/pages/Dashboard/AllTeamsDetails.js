import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
  GetMemberByTeamId,
  GetTeamsbyTeamId,
} from "../../store/team/actions/actionsCreators";
import MembersTable from "../../components/Member/MembersTable";
import AddCoManagerModel from "../../components/Models/AddCoManagerModel";
import AddPlayerModel from "../../components/Models/AddPlayerModel";
import PaymentModel from "../../components/CardModel/PaymentModel";
import PaymentHistoryTable from "../../components/Paymenthistory/PaymentHistoryTAble";
import DetailSkeleton from "../../components/SkeletonTable/DetailSkeleton";
import PendingHistoryTable from "../../components/Paymenthistory/PendingHistoryTable";
const AllTeamsDetails = () => {
  const { id } = useParams();
  const { TeamDetailsData, isLoading } = useSelector((state) => state.team);
  const { token } = useSelector((state) => state.user);
  const [state, setState] = useState(false);
  const [CoManagerBoxModel, SetCoManagerBoxModel] = useState(false);
  const [PlayerBoxModel, SetPlayerBoxModel] = useState(false);
  const [PaymentBoxModel, SetPaymentModel] = useState(false);
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(GetTeamsbyTeamId(id, token));
    Dispatch(GetMemberByTeamId(id, token));
  }, [id, Dispatch, state, token]);
  const { user } = useSelector((state) => state.user);
  const role = user?.roles[0];
  return (
    <>
      <h1 className="font-bold my-3 ps-4">Team Details</h1>
      <div className="text-end  pe-4  ">
        <button
          className="Team-register-btn mx-2"
          onClick={() => SetCoManagerBoxModel(true)}
        >
          Add Co Manager
        </button>
        <button
          className="Team-register-btn mx-2"
          onClick={() => SetPlayerBoxModel(true)}
        >
          Add Player
        </button>
        {role === "ADMIN" ? (
          ""
        ) : (
          <button
            className="Team-register-btn mx-2 "
            onClick={() => Navigate(`/dashboard/registerteam/${id}`)}
          >
            Team Register
          </button>
        )}
      </div>
      <div className="text-start  ps-4  ">
        <button className="Team-register-btn" onClick={() => Navigate(-1)}>
          Go Back
        </button>
      </div>

      {CoManagerBoxModel && (
        <AddCoManagerModel
          show={CoManagerBoxModel}
          onClose={() => SetCoManagerBoxModel(false)}
          SetCoManagerBoxModel={SetCoManagerBoxModel}
          id={id}
          setState={setState}
        />
      )}
      {PlayerBoxModel && (
        <AddPlayerModel
          show={PlayerBoxModel}
          onClose={() => SetPlayerBoxModel(false)}
          SetPlayerBoxModel={SetPlayerBoxModel}
          id={id}
          setState={setState}
        />
      )}

      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <div className="bg-white   rounded-lg shadow-lg max-w-4xl px-3 py-5 m-4">
          <Row className="row row-cols-3 align-items-center  gy-3">
            <Col>
              <h5 className=" text-nowrap fw-bold">Team Name:</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.name}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold">Team Email:</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.email}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold">Team Address:</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.address}</h6>
            </Col>

            <Col>
              <h5 className=" text-nowrap fw-bold"> Team City :</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.city}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold">Team State :</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.state}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold">Team Points :</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.points}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold"> Team Ranking :</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.ranking}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold">Team Games Win :</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.gamesWin}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold"> Team Games Lost :</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.gamesLost}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold">Team Games Tied :</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.gamesTied}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold">Team Avg Runs Scored :</h5>
              <h6 className=" text-nowrap ">
                {TeamDetailsData?.avgRunsScored}
              </h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold"> Team Avg Runs Allowed :</h5>
              <h6 className=" text-nowrap ">
                {TeamDetailsData?.avgRunsAllowed}
              </h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold"> Team Avg Runs Diff :</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.avgRunsDiff}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold"> Team Run Scored :</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.runScored}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold">Team Run Allowed :</h5>
              <h6 className=" text-nowrap ">{TeamDetailsData?.runAllowed}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold">Team Status :</h5>
              <h6
                className="text-nowrap fw-bold"
                style={{
                  color:
                    TeamDetailsData?.teamStatus === "ACTIVE" ? "green" : "red",
                }}
              >
                {TeamDetailsData?.teamStatus ?? "N/A"}
              </h6>
            </Col>
          </Row>
        </div>
      )}
      {PaymentBoxModel && <PaymentModel />}
      <h2 className="ps-4 text-danger">Team Members:</h2>
      <MembersTable teamId={id} setState={setState} />
      <h2 className="ps-4 text-danger">Payment Records:</h2>
      <PaymentHistoryTable />
      <h2 className="ps-4 text-danger">Tournament Registration:</h2>
      <PendingHistoryTable />
    </>
  );
};

export default DashboardLayout(AllTeamsDetails);
