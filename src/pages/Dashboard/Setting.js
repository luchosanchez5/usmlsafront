import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPersonsById,
  UploadPersonImg,
} from "../../store/person/actions/actionsCreators";
import { Col, Row } from "react-bootstrap";
import PageHeader from "../../shared/PageHeader";
import ManagerInfoEditModel from "../../components/Models/ManagerInfoEditModel";
import AdminInfoEditModel from "../../components/Models/AdminInfoEditModel";
import PlayerInfoEditModel from "../../components/Models/PlayerInfoEditModel";
import CoManagerInfoEditModel from "../../components/Models/CoManagerInfoEditModel";
import { FaCamera } from "react-icons/fa";
import logo from "../../assets/images/usmlsa_logo.png";
import DetailSkeleton from "../../components/SkeletonTable/DetailSkeleton";
const Setting = () => {
  const { PersonDetails, isLoading } = useSelector((state) => state.person);
  const { user, token } = useSelector((state) => state.user);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [editModel, setEditModel] = useState(false);
  const [state, setState] = useState(true);
  const Dispatch = useDispatch();


  useEffect(() => {
    Dispatch(GetPersonsById(user.userId, token));
  }, [Dispatch, state, user, token]);


  useEffect(() => {
    if (PersonDetails?.data?.profilePicture) {
      try {
        const binaryData = atob(PersonDetails?.data?.profilePicture);
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
  }, [PersonDetails]);

  const handleFileUpload = (event) => {
    const file = event.target.files;
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
      Dispatch(UploadPersonImg(user?.userId, token, file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleConfrim = () => { };
  return (
    <>
      <PageHeader
        title="User Info"
        subtitle="Manage Your User"
        btnText="Edit User"
        onClick={() => setEditModel(true)}
      />
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
                  : logo

              }
              alt="Division Preview"
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
      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <div className="section-main m-3 px-3 py-5 bg-white  shadow-lg rounded">
          <Row className="my-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            <Col>
              <h5 className="fw-bold"> Email : </h5>
              <h6>{PersonDetails?.data?.email}</h6>
            </Col>

            <Col>
              <h5 className="fw-bold"> Role : </h5>
              <h6>{PersonDetails?.data?.role}</h6>
            </Col>
            <Col>
              <h5 className="fw-bold">First Name : </h5>
              <h6>{PersonDetails?.data?.firstName}</h6>
            </Col>
            <Col>
              <h5 className="fw-bold">Last Name : </h5>
              <h6> {PersonDetails?.data?.lastName}</h6>
            </Col>
          </Row>
        </div>
      )}
      {editModel &&
        (PersonDetails?.data?.role === "ADMIN" ? (
          <AdminInfoEditModel
            show={editModel}
            onClose={() => setEditModel(false)}
            onClick={handleConfrim}
            setEditModel={setEditModel}
            setState={setState}
          />
        ) : PersonDetails?.data?.role === "MANAGER" ? (
          <ManagerInfoEditModel
            show={editModel}
            setEditModel={setEditModel}
            onClose={() => setEditModel(false)}
            onClick={handleConfrim}
            setState={setState}
          />
        ) : PersonDetails?.data?.role === "PLAYER" ? (
          <PlayerInfoEditModel
            show={editModel}
            setEditModel={setEditModel}
            onClose={() => setEditModel(false)}
            onClick={handleConfrim}
            setState={setState}
          />
        ) : PersonDetails?.data?.role === "CO_MANAGER" ? (
          <CoManagerInfoEditModel
            show={editModel}
            setEditModel={setEditModel}
            onClose={() => setEditModel(false)}
            onClick={handleConfrim}
            setState={setState}
          />
        ) : (
          ""
        ))}
    </>
  );
};

export default DashboardLayout(Setting);
