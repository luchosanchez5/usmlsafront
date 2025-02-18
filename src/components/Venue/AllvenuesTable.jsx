import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Table, Form } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import "../../assets/css/products-table.css";
import { useDispatch, useSelector } from "react-redux";
import {
  DelVenue,
  SearchVenue,
} from "../../store/Venue/actions/actionCreators";
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

  const handleDeleteVenue = () => {
    Dispatch(
      DelVenue(VenueId, token, () => {
        Dispatch(GetVenue(page));
        SetDelVenueModel(false);
      })
    );
  };
  const handleSearchVenue = (value) => {
    Dispatch(SearchVenue(value.target.value));
  };

  return (
    <>
      <div className="section-main m-3 px-3 py-4 rounded-lg shadow-lg max-w-4xl">
        <Row className="mb-3">
          <Col sm={12} md={4} lg={4}>
            <Form.Control
              type="text"
              placeholder="Venue Name"
              onChange={handleSearchVenue}
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
            <Table border={true} responsive hover size="sm" className="mt-2">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {VenueData?.data?.length > 0 ? (
                  VenueData?.data?.map((item, index) => (
                    <tr key={index} className="main-row">
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.city}</td>
                      <td>{item.state}</td>
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
        {DelVenueModel && (
          <DeleteModel
            show={DelVenueModel}
            onClose={handleCloseModel}
            OnDelete={handleDeleteVenue}
            title="Venue"
          />
        )}
      </div>
      {VenueData?.totalRecords > 10 && (
        <PaginationControl
          page={page + 1}
          between={3}
          limit={10}
          total={VenueData?.totalRecords}
          changePage={(page) => setPage(page - 1)}
          ellipsis={1}
        />
      )}
    </>
  );
};

export default AllMembersTable;
