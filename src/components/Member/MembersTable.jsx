import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import "../../assets/css/products-table.css";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../SkeletonTable/SkeletonTable";
import DeleteCoManagerModel from "../Models/DeleteCoManagerModel";
import {
  removeCoManager,
  removePlayer,
} from "../../store/team/actions/actionsCreators";
import DeletePlayerModel from "../Models/DeletePlayerModel";
const MembersTable = ({ setState, teamId }) => {
  const { TeamMembers, isLoading } = useSelector((state) => state.team);
  const { token, user } = useSelector((state) => state.user);
  const Role = user?.roles[0];
  
  const [showCoManagerModel, setShowCoManagerModel] = useState(false);
  const [showPlayerModel, setShowPlayerModel] = useState(false);
  const [playerId, setPlayerId] = useState(null);
  const Dispatch = useDispatch();
  const showCoManagerModal = () => {
    setShowCoManagerModel(true);
  };

  const showPlayerModal = (id) => {
    setPlayerId(id);
    setShowPlayerModel(true);
  };
  const handleCloseModel = () => {
    setShowCoManagerModel(false);
    setShowPlayerModel(false);
  };

  const handleDeleteCoManager = () => {
    Dispatch(removeCoManager(teamId, token));
    setShowCoManagerModel(false);
    setState((prev) => !prev);
  };

  const handleDeletePlayer = () => {
    Dispatch(removePlayer(teamId, playerId, token));
    setShowPlayerModel(false);
    setState((prev) => !prev);
  };

  return (
    <div className="section-main m-3 px-3 py-4 bg-white  shadow-lg">
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
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                {/* <th>Status</th> */}
                {Role === "CO_MANAGER" ? null :<th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {TeamMembers?.members?.length > 0 ? (
                TeamMembers?.members?.map((item, index) => (
                  <tr key={index} className="main-row">
                    <td>{item?.name || item?.firstName}</td>
                    <td>{item?.email}</td>
                    <td>{item?.role}</td>
                    {Role==='CO_MANAGER' ? null :
                    <td>
                      <div>
                        {item?.role === "MANAGER" ? null : item?.role ===
                          "PLAYER" ? (
                          <button
                            onClick={() => {
                              showPlayerModal(item?.playerId);
                            }}
                            className="btn btn-sm btn-danger d-flex align-items-center"
                          >
                            <AiOutlineDelete className="me-1" />
                            Remove Player
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              showCoManagerModal(item?.id);
                            }}
                            className="btn btn-sm btn-danger d-flex align-items-center"
                          >
                            <AiOutlineDelete className="me-1" />
                            Remove Co-Manager
                          </button>
                        )}
                      </div>
                    </td>
                    }
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Team Members Available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>

      {showCoManagerModel && (
        <DeleteCoManagerModel
          show={showCoManagerModal}
          onClose={handleCloseModel}
          title="Co Manager"
          OnDelete={handleDeleteCoManager}
        />
      )}
      {showPlayerModel && (
        <DeletePlayerModel
          show={showPlayerModel}
          onClose={handleCloseModel}
          title="Player"
          OnDelete={handleDeletePlayer}
        />
      )}
    </div>
  );
};

export default MembersTable;
