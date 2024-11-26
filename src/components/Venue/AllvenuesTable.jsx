import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Table, Form } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import "../../assets/css/products-table.css";
import { useDispatch, useSelector } from "react-redux";
import { DelVenue, SearchVenue } from "../../store/Venue/actions/actionCreators";
import DeleteModel from "../Models/DeleteModel";
import { GetVenue } from "../../store/Venue/actions/actionCreators";
import { useNavigate } from "react-router-dom";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { GlobalInfo } from "../../App";
import TableSkeleton from "../SkeletonTable/SkeletonTable";
const AllMembersTable = () => {
  const { VenueData, isLoading } = useSelector((state) => state.venue);

  const [DelVenueModel, SetDelVenueModel] = useState(false);
  const [VenueId, Setvenueid] = useState(null);
  const { token } = useSelector((state) => state.user);
  const { SetVenueEdit, SetVenueId } = useContext(GlobalInfo);
  const [page, setPage] = useState(0);
  const Dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleDeletebtn = (id) => {
    Setvenueid(id);
    SetDelVenueModel(true);
  };

  useEffect(() => {
    Dispatch(GetVenue(page));
  }, [Dispatch, page]);

  const handleCloseModel = () => {
    SetDelVenueModel(false);
  };
  const handleEditBtn = (id) => {
    SetVenueId(id);
    SetVenueEdit(true);
    Navigate("/dashboard/addvenue");
  };
  const handleEyebtn = (id) => {
    Navigate(`/dashboard/allvenue/${id}`);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage - 1);
  };

  const handleDeleteVenue = () => {
    Dispatch(
      DelVenue(VenueId, token, () => {
        // Fetch updated venues after successful deletion
        Dispatch(GetVenue(page));
        // Close the modal
        SetDelVenueModel(false);
      })
    );
  };
  const handleSearchVenue = (value) => {
    Dispatch(SearchVenue(value.target.value))
  }

  return (
    <>
      <div className="section-main m-3 px-3 py-4 rounded-lg shadow-lg max-w-4xl">
        <Row className="mb-3">
          <Col>
            <Form.Control type="text" placeholder="Search" className="w-50" onChange={handleSearchVenue} />
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
            <Table responsive hover size="sm" className="mt-2">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address1</th>
                  <th>Address2</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Number of Fields</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {VenueData?.data?.length > 0 ? (
                  VenueData?.data?.map((item, index) => (
                    <tr key={index} className="main-row">
                      <td>{item.name}</td>
                      <td>{item.address1}</td>
                      <td>{item.address2}</td>
                      <td>{item.city}</td>
                      <td>{item.state}</td>
                      <td>{item.numberOfFields}</td>
                      <td>
                        <div>
                          <BsEye
                            className="action-icon eye-icon"
                            onClick={() => handleEyebtn(item?.venueId)}
                          />
                          <CiEdit
                            className="action-icon edit-icon"
                            onClick={() => handleEditBtn(item?.venueId)}
                          />
                          <AiOutlineDelete
                            className="action-icon delete-icon"
                            onClick={() => handleDeletebtn(item?.venueId)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No Venue Available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
        {VenueData?.totalRecords > 10 && (
          <PaginationControl
            page={page}
            between={3}
            limit={10}
            total={VenueData?.totalRecords}
            changePage={(page) => handlePageChange(page)}
            ellipsis={1}
          />
        )}
        {DelVenueModel && (
          <DeleteModel
            show={DelVenueModel}
            onClose={handleCloseModel}
            OnDelete={handleDeleteVenue}
            title="Venue"
          />
        )}
      </div>
    </>
  );
};

export default AllMembersTable;
