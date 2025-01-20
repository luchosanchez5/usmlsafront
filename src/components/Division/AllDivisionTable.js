import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Table, Form } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/products-table.css";
import DeleteModel from "../Models/DeleteModel";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { GlobalInfo } from "../../App";
import { useNavigate } from "react-router-dom";
import {
  DeleteDivision,
  GetAllDivisions,
  getDivisionbySearch,
} from "../../store/tournament/actions/actionsCreators";
import TableSkeleton from "../SkeletonTable/SkeletonTable";
const AllDivisionTable = () => {
  const { AllDivisionsData, isLoading } = useSelector(
    (state) => state.tournament
  );
  const { SetDivisionEdit, SetDivisionId } = useContext(GlobalInfo);
  const { token } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [deleteModel, setDeleteModel] = useState(false);
  const [divisionId, setDivisionid] = useState(null);
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    Dispatch(GetAllDivisions(page, token));
  }, [Dispatch, token, page]);
  const handlePageChange = (newPage) => {
    setPage(newPage - 1);
  };
  const handleDeletePersonbtn = (id) => {
    setDeleteModel(true);
    setDivisionid(id);
  };
  const handleEyebtn = (id) => {
    Navigate(`/dashboard/alldivisions/${id}`);
  };
  const handleEditbtn = (id) => {
    SetDivisionEdit(true);
    SetDivisionId(id);
    Navigate("/dashboard/addivision");
  };
  const handleDeletePerson = () => {
    Dispatch(
      DeleteDivision(divisionId, token, () => {
        Dispatch(GetAllDivisions(page, token));
        setDeleteModel(false);
      })
    );
  };
  const handleCloseModel = () => {
    setDeleteModel(false);
  };
  const handleSearchDivisions = (value) => {
    Dispatch(getDivisionbySearch(value.target.value));
  };
  return (
    <div className="section-main m-3 px-3 py-4 rounded-lg shadow-lg max-w-4xl ">
      <Row className="mb-3">
        <Col sm={12} md={4} lg={4}>
          <Form.Control
            type="email"
            placeholder="Search"
            onChange={handleSearchDivisions}
          />
        </Col>
      </Row>
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
          <Table responsive hover size="sm" className=" mt-2">
            <thead>
              <tr>
                <th>Division Name</th>
                <th>Tournament Name</th>
                <th>Entry Fee</th>
                <th>Initial Deposte Fee</th>
                <th>Max Teams</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {isLoading && <div>Loading...</div>} */}
              {AllDivisionsData?.data?.length > 0 ? (
                AllDivisionsData?.data?.map((item, index) => (
                  <tr key={index} className="main-row">
                    <td>{item?.divisionName || "N/A"}</td>
                    <td>{item?.tournamentName || "N/A"}</td>
                    <td>{item?.entryFee || "N/A"}</td>
                    <td>{item?.initialDepositFee || "N/A"}</td>
                    <td>{item?.maxTeams || "N/A"}</td>
                    <td
                      style={{
                        color:
                          item?.divisionStatus === "OPEN" ? "green" : "red",
                      }}
                    >
                      {item?.divisionStatus || "N/A"}
                    </td>

                    <td>
                      <div>
                        <BsEye
                          className="action-icon eye-icon"
                          onClick={() => handleEyebtn(item?.divisionId)}
                        />
                        <CiEdit
                          className="action-icon edit-icon"
                          onClick={() => handleEditbtn(item?.divisionId)}
                        />
                        <AiOutlineDelete
                          className="action-icon delete-icon"
                          onClick={() =>
                            handleDeletePersonbtn(item?.divisionId)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Divisions Available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}

        {AllDivisionsData?.data?.length > 10 && (
          <PaginationControl
            page={page}
            between={3}
            limit={10}
            total={AllDivisionsData?.data?.totalRecords}
            changePage={(page) => handlePageChange(page)}
            ellipsis={1}
          />
        )}

        {deleteModel && (
          <DeleteModel
            show={DeleteModel}
            onClose={handleCloseModel}
            OnDelete={handleDeletePerson}
            title="Division"
          />
        )}
      </div>
    </div>
  );
};

export default AllDivisionTable;
