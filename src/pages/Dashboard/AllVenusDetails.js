import React, { useEffect } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetVenueByVenueId } from "../../store/Venue/actions/actionCreators";
import { Row, Col } from "react-bootstrap";
import DetailSkeleton from "../../components/SkeletonTable/DetailSkeleton";
import { FaArrowLeft } from "react-icons/fa6";
const AllVenusDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { VenuDetails, isLoading } = useSelector((state) => state.venue);
  useEffect(() => {
    dispatch(GetVenueByVenueId(id));
  }, [id, dispatch]);

  return (
    <>
      <div className="ps-4 my-3">
        <span className="text-white fs-4 fw-bold p-2 rounded" style={{
          background: "black",
        }}>
          Venue Details
        </span>
      </div>
      <div className="text-end pe-4">
        <button className="bg-black rounded">
          <FaArrowLeft onClick={() => Navigate(-1)} color="white" size={20} />
        </button>
      </div>
      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <div className="bg-white  rounded shadow-lg max-w-4xl px-3 pt-4 py-5 m-4">
          <Row className="row row-cols-1 row-cols-sm-2 row-cols-lg-3  align-items-center  gy-3">
            <Col>
              <h5 className=" text-nowrap fw-bold ">Name:</h5>
              <h6 className=" ">{VenuDetails?.name}</h6>
            </Col>
            <Col>
              <h5 className="text-nowrap fw-bold ">Address 1:</h5>
              <h6 className=" ">{VenuDetails?.address1}</h6>
            </Col>
            <Col>
              <h5 className="text-nowrap fw-bold">Address 2:</h5>
              <h6 className=" ">{VenuDetails?.address2}</h6>
            </Col>
            <Col>
              <h5 className="text-nowrap fw-bold ">Created On:</h5>
              <h6 className="">{VenuDetails?.createdOn}</h6>
            </Col>
            <Col>
              <h5 className="text-nowrap fw-bold">Number Of Fields:</h5>
              <h6 className=" ">{VenuDetails?.numberOfFields}</h6>
            </Col>
            <Col>
              <h5 className=" text-nowrap fw-bold">State:</h5>
              <h6 className=" ">{VenuDetails?.state}</h6>
            </Col>
            <Col>
              <h5 className="text-nowrap fw-bold"> Venue Status:</h5>
              <h6>
                <span className="text-white fw-bold p-2 rounded"
                  style={{
                    background:
                      VenuDetails?.statusVenue === "OPEN" ? "green" : "red",
                    fontSize: "12px",
                  }}>
                  {VenuDetails?.statusVenue}
                </span>
              </h6>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default DashboardLayout(AllVenusDetails);
