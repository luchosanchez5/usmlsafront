import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Table, Form } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
// import { CiEdit } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/products-table.css";
import {
  DelPersons,
  GetPersons,
  getPersonsbySearch,
} from "../../store/person/actions/actionsCreators";
import DeleteModel from "../Models/DeleteModel";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { GlobalInfo } from "../../App";
import { useNavigate } from "react-router-dom";
import TableSkeleton from "../SkeletonTable/SkeletonTable";
const AllPersonsTable = () => {
  const { PersonData, isLoading } = useSelector((state) => state.person);
  const { SetUserEdit, SetUserId } = useContext(GlobalInfo);
  const { token } = useSelector((state) => state.user);
  const [page, setPage] = useState(0);
  const [deleteModel, setDeleteModel] = useState(false);
  const [personId, setPersonid] = useState(null);
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  useEffect(() => {
    Dispatch(GetPersons(page, token));
  }, [Dispatch,page,token]);

  const handlePageChange = (newPage) => {
    setPage(newPage - 1);
  };

  const handleDeletePersonbtn = (id) => {
    setDeleteModel(true);
    setPersonid(id);
  };
  const handleEyebtn = (id) => {
    Navigate(`/dashboard/allpersons/${id}`);
  };
//   const handleEditbtn = (id) => {
//     SetUserEdit(true);
//     SetUserId(id);
//     Navigate("/dashboard/addperson");
//   };
  const handleDeletePerson = () => {
    Dispatch(
      DelPersons(personId, token, () => {
        Dispatch(GetPersons(page, token));
        setDeleteModel(false);
      })
    );
  };
  const handleCloseModel = () => {
    setDeleteModel(false);
  };
  const handleSearchPersons = (value) => {
    Dispatch(getPersonsbySearch(value.target.value));
  };
  return (
    <div className="section-main m-3 px-3 py-4 rounded-lg shadow-lg max-w-4xl ">
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search"
            className="w-50"
            onChange={handleSearchPersons}
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
                <th>Name</th>
                <th>email</th>
                <th>ranking</th>
                <th>Person A Player</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {/* {isLoading && <div>Loading...</div>} */}
              {PersonData?.data?.length > 0 ? (
                PersonData?.data?.map((item, index) => (
                  <tr key={index} className="main-row">
                    <td>{item.name || "N/A"}</td>
                    <td>{item.email}</td>
                    <td>{item.ranking}</td>
                    <td>{item.role}</td>

                    <td>
                      <div>
                        <BsEye
                          className="action-icon eye-icon"
                          onClick={() => handleEyebtn(item?.id)}
                        />
                        {/* <CiEdit className='action-icon edit-icon' onClick={() => handleEditbtn(item?.id)} /> */}
                        <AiOutlineDelete
                          className="action-icon delete-icon"
                          onClick={() => handleDeletePersonbtn(item?.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No Persons Available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
        {PersonData?.totalRecords > 10 && (
          <PaginationControl
            page={page + 1}
            between={1}
            limit={10}
            total={PersonData?.totalRecords}
            changePage={(page) => handlePageChange(page)}
            ellipsis={1}
          />
        )}

        {deleteModel && (
          <DeleteModel
            show={DeleteModel}
            onClose={handleCloseModel}
            OnDelete={handleDeletePerson}
            title="Person"
          />
        )}
      </div>
    </div>
  );
};

export default AllPersonsTable;
