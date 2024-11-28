import React, { useEffect, useState } from "react";
import { Col, Row, Table, Form } from "react-bootstrap";
import { BsEye } from "react-icons/bs";
import "../../assets/css/products-table.css";
import { useDispatch, useSelector } from "react-redux";
import { GetYourTeam } from "../../store/team/actions/actionsCreators";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useNavigate } from "react-router-dom";
import SkeletonTable from "../SkeletonTable/SkeletonTable";
const YourTeamTable = () => {
  const { YourTeamData, isLoading } = useSelector((state) => state.team);

  const { user, token } = useSelector((state) => state.user);
 
  const userId = user?.userId;
  const Dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const Navigate = useNavigate();

 
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleEyeBtn = (id) => {
    Navigate(`/dashboard/yourteam/${id}`);
  };
  useEffect(() => {
    Dispatch(GetYourTeam(userId, page, token));
  }, [userId, page, token]);

  return (
    <>
      <div className="section-main m-3 px-3 py-4 rounded-lg shadow-lg max-w-4xl ">
        <Row className="mb-3">
          <Col>
            <Form.Control type="email" placeholder="Search" className="w-50" />
          </Col>
        </Row>
        <Table responsive hover className=" mt-2">
          <thead>
            <tr>
              <th>Name</th>
              <th>Points</th>
              <th>Ranking</th>
              <th>State</th>
              <th>City</th>
              <th>GamesWin</th>
              <th>GamesLost</th>
              <th>RunScored</th>
              <th>RunAllowed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonTable rows={5} columns={9} />
            ) : YourTeamData?.data?.length > 0 ? (
              YourTeamData?.data?.map((item, index) => (
                <tr key={index} className="main-row">
                  <td>{item.name}</td>
                  <td>{item.points}</td>
                  <td>{item.ranking}</td>

                  <td>{item.state}</td>
                  <td>{item.city}</td>
                  <td>{item.gamesWin}</td>
                  <td>{item.gamesLost}</td>
                  <td>{item.avgRunsDiff}</td>
                  <td>{item.runAllowed}</td>

                  <td>
                    <div>
                      <BsEye
                        className="action-icon eye-icon"
                        onClick={() => handleEyeBtn(item?.teamId)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No Teams Available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      
      {YourTeamData?.data?.length > 10 && (
        <PaginationControl
          page={page}
          between={3}
          limit={10}
          total={YourTeamData?.totalRecords}
          changePage={(page) => handlePageChange(page)}
          ellipsis={1}
        />
      )}
    </>
  );
};

export default YourTeamTable;
