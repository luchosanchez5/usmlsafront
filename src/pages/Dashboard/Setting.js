import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPerson,
  UploadPersonImg,
} from "../../store/person/actions/actionsCreators";
import { Col, Row } from "react-bootstrap";
import PageHeader from "../../shared/PageHeader";
import ManagerInfoEditModel from "../../components/Models/ManagerInfoEditModel";
import AdminInfoEditModel from "../../components/Models/AdminInfoEditModel";
import PlayerInfoEditModel from "../../components/Models/PlayerInfoEditModel";
import CoManagerInfoEditModel from "../../components/Models/CoManagerInfoEditModel";
import { FaCamera } from "react-icons/fa";
import DetailSkeleton from "../../components/SkeletonTable/DetailSkeleton";
const Setting = () => {
  const { Persondata, isLoading } = useSelector((state) => state.person);
  const { user, token } = useSelector((state) => state.user);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [editModel, setEditModel] = useState(false);
  const [state, setState] = useState(true);
  const Dispatch = useDispatch();
  useEffect(() => {
    Dispatch(GetPerson(user.userId));
  }, [Dispatch, state, user]);
  useEffect(() => {
    if (Persondata?.data?.profilePicture) {
      try {
        // Decode Base64 if it's encoded
        const binaryData = atob(Persondata?.data?.profilePicture);
        const bytes = new Uint8Array(binaryData.length);

        // Populate Uint8Array with decoded bytes
        for (let i = 0; i < binaryData.length; i++) {
          bytes[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob from the decoded bytes (you can adjust the MIME type if necessary)
        const blob = new Blob([bytes], { type: "image/jpeg" });
        const imageURL = URL.createObjectURL(blob);
        // Create an object URL for the image
        console.log("Generated Image URL:", imageURL);

        // Set the preview image URL to the state
        setPreviewImage(imageURL);
      } catch (e) {
        console.error("Error decoding image", e);
        setPreviewImage(null); // Reset preview if an error occurs
      }
    } else {
      setPreviewImage(null); // If no picture data, reset to null
    }
  }, [Persondata]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
      Dispatch(UploadPersonImg(user?.userId, token, file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleConfrim = () => {};
  return (
    <>
      <PageHeader
        title="User Info"
        subtitle="Manage Your User"
        btnText="Edit User"
        onClick={() => setEditModel(true)}
      />

      <div
        className="Upload-picture d-flex flex-column align-items-center justify-content-center gap-2"
        onClick={triggerFileInput}
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

      {isLoading ? (
        <DetailSkeleton />
      ) : (
        <div className="section-main m-3 px-3 py-5 bg-white  shadow-lg">
          <Row className="my-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
            <Col>
              <h5 className="fw-bold"> Email : </h5>
              <h6>{Persondata?.data?.email}</h6>
            </Col>

            <Col>
              <h5 className="fw-bold"> Role : </h5>
              <h6>{Persondata?.data?.role}</h6>
            </Col>
            <Col>
              <h5 className="fw-bold">First Name : </h5>
              <h6>{Persondata?.data?.firstName}</h6>
            </Col>
            <Col>
              <h5 className="fw-bold">Last Name : </h5>
              <h6> {Persondata?.data?.lastName}</h6>
            </Col>
          </Row>
        </div>
      )}
      {editModel &&
        (Persondata?.data?.role === "ADMIN" ? (
          <AdminInfoEditModel
            show={editModel}
            onClose={() => setEditModel(false)}
            onClick={handleConfrim}
            setEditModel={setEditModel}
            setState={setState}
          />
        ) : Persondata?.data?.role === "MANAGER" ? (
          <ManagerInfoEditModel
            show={editModel}
            setEditModel={setEditModel}
            onClose={() => setEditModel(false)}
            onClick={handleConfrim}
            setState={setState}
          />
        ) : Persondata?.data?.role === "PLAYER" ? (
          <PlayerInfoEditModel
            show={editModel}
            setEditModel={setEditModel}
            onClose={() => setEditModel(false)}
            onClick={handleConfrim}
          />
        ) : Persondata?.data?.role === "CO_MANAGER" ? (
          <CoManagerInfoEditModel
            show={editModel}
            setEditModel={setEditModel}
            onClose={() => setEditModel(false)}
            onClick={handleConfrim}
          />
        ) : (
          ""
        ))}
    </>
  );
};

export default DashboardLayout(Setting);
