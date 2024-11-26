import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import "../../assets/css/products-table.css";
import { useDispatch, useSelector } from "react-redux";
import { DelVenue } from "../../store/Venue/actions/actionCreators";
import DeleteModel from "../Models/DeleteModel";
import TableSkeleton from "../SkeletonTable/SkeletonTable";
const MembersTable = ({ setState }) => {
  const { TeamMembers, isLoading } = useSelector((state) => state.team);
  const [DelVenueModel, SetDelVenueModel] = useState(false);
  const [VenueId, Setvenueid] = useState(null);
  const Dispatch = useDispatch();
  const handleDeletebtn = (id) => {
    Setvenueid(id);
    SetDelVenueModel(true);
  };

  const handleCloseModel = () => {
    SetDelVenueModel(false);
  };

  const handleDeleteVenue = () => {
    Dispatch(DelVenue(VenueId));
    setState((prev) => !prev);
    SetDelVenueModel(false);
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {TeamMembers?.members?.length > 0 ? (
                TeamMembers?.members?.map((item, index) => (
                  <tr key={index} className="main-row">
                    <td>{item?.name || item?.firstName}</td>
                    <td>{item?.email}</td>
                    <td>{item?.role}</td>
                    <td>
                      <div>
                        {item?.role === "MANAGER" ? (
                          ""
                        ) : (
                          <AiOutlineDelete
                            className="action-icon delete-icon"
                            onClick={() => handleDeletebtn(item?.venueId)}
                          />
                        )}
                      </div>
                    </td>
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

      {DelVenueModel && (
        <DeleteModel
          show={DelVenueModel}
          onClose={handleCloseModel}
          OnDelete={handleDeleteVenue}
          title="Member"
        />
      )}
    </div>
  );
};

export default MembersTable;
