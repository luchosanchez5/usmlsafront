import React, { useEffect, useState, useRef } from "react";
import PageHeader from "../../shared/PageHeader";
import DashboardLayout from "../../layout/DashboardLayout";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetTournamentsDetailsByTournamentId,
  uploadTournamentPicture,
} from "../../store/tournament/actions/actionsCreators";
import AddVenueModel from "../../components/Models/AddVenueModel";
import DetailSkeleton from "../../components/SkeletonTable/DetailSkeleton";
import PaymentHistoryTable from "../../components/Paymenthistory/PaymentHistoryTAble";
import { FaCamera } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { dateFormat } from "../../utlils/dateFormat";

const AllTournamentDetails = () => {
  const { TournamentDetails, isLoading } = useSelector(
    (state) => state.tournament
  );
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState(null);
  const [assignVenueBoxModel, setVenueModel] = useState(false);
  const [state, setState] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(GetTournamentsDetailsByTournamentId(id, token));
  }, [id, dispatch, token, state]);

  useEffect(() => {
    if (TournamentDetails?.picture) {
      try {
        const binaryData = atob(TournamentDetails.picture);
        const bytes = new Uint8Array(binaryData.length);

        for (let i = 0; i < binaryData.length; i++) {
          bytes[i] = binaryData.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: "image/jpeg" });
        const imageURL = URL.createObjectURL(blob);
        setPreviewImage(imageURL);
      } catch (e) {
        console.error("Error decoding image", e);
        setPreviewImage(null);
      }
    } else {
      setPreviewImage(null);
    }
  }, [TournamentDetails]);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
      dispatch(uploadTournamentPicture(id, token, file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <div className="d-flex align-items-center gap-3">
        <div
          className="Upload-picture d-flex flex-column align-items-center justify-content-center gap-2"
          style={{ marginLeft: "20px", background: !previewImage && "black" }}
        >
          {isLoading ? (
            <div
              className="skeleton-loader"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
              }}
            ></div>
          ) : (
            <img
              src={
                previewImage
                  ? previewImage
                  : "https://usmlsa.com/wp-content/uploads/2023/10/usmlsa_new_png-Copy.png"
              }
              alt="Tournament Preview"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: !previewImage && "contain",
              }}
            />
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
            accept="image/*"
          />
        </div>

      </div>
      <div className="d-flex flex-column ms-5 ps-4 pt-3  gap-2 ">
        <FaCamera size={20} onClick={triggerFileInput} cursor='pointer' />
      </div>
      <div className="text-end pe-4">
        <button className="bg-black rounded">
          <FaArrowLeft onClick={() => navigate(-1)} color="white" size={20} />
        </button>
      </div>
      <div className="ps-4 my-3">
        <span className="text-white fs-4 fw-bold p-2 rounded" style={{
          background: "black",
        }}>
          Tournament Details
        </span>
      </div>
      {TournamentDetails.venueName === null && (
        <PageHeader btnText="Add Venue" onClick={() => setVenueModel(true)} />
      )}
      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <div className="bg-white rounded shadow-lg max-w-4xl px-3 pt-4 py-5 m-4">
          <Row className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 align-items-center gy-3">
            <Col>
              <h5 className="text-nowrap fw-bold">Tournament Name:</h5>
              <h6 className="">{TournamentDetails?.name}</h6>
            </Col>
            <Col>
              <h5 className="text-nowrap fw-bold">Venue Name:</h5>
              <h6 className="">
                {TournamentDetails?.venueName
                  ? TournamentDetails?.venueName
                  : "No Venue Selected Yet"}
              </h6>
            </Col>
            <Col>
              <h5 className="text-nowrap fw-bold">Start Date:</h5>
              <h6 className="text-nowrap">
                {dateFormat(TournamentDetails?.startDate)}
              </h6>
            </Col>
            <Col>
              <h5 className="text-nowrap fw-bold">End Date:</h5>
              <h6 className="text-nowrap">
                {dateFormat(TournamentDetails?.endDate)}
              </h6>
            </Col>
            <Col>
              <h5 className="text-green fw-bold">Status Tournament:</h5>
              <h6>
                <span className="text-white fw-bold p-2 rounded"
                  style={{
                    background:
                      TournamentDetails?.status === "ACTIVE" ? "green" : "red",
                  }}>  {TournamentDetails?.status}</span>
              </h6>
            </Col>
            <Col>
              <h5 className="text-green fw-bold">No of Divisions:</h5>
              <h6
              >
                {TournamentDetails?.numberOfDivisions}
              </h6>
            </Col>
          </Row>
        </div>
      )}
      {assignVenueBoxModel && (
        <AddVenueModel
          show={assignVenueBoxModel}
          onClose={() => setVenueModel(false)}
          SetVenueModel={setVenueModel}
          setState={setState}
        />
      )}
      <div className="ps-4">
        <span className="text-white fs-4 fw-bold p-2 rounded" style={{
          background: "red",
        }}>
          Payment Records
        </span>
      </div>
      <PaymentHistoryTable tournamentId={id} />
    </>
  );
};

export default DashboardLayout(AllTournamentDetails);
