import React, { useState } from "react";
import { Card, Col, Modal, Row, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import PlayerCardSkeleton from "../../components/SkeletonTable/PlayerCardSkeleton";
import { PaginationControl } from "react-bootstrap-pagination-control";
import Toast from "../../shared/Toast";
import SpinNer from "../../components/LoadingSpinner/SpinNer";
import axios from "axios";
const Url = process.env.REACT_APP_MAIN_URL;

const DivisionSearchModel = ({
  show,
  onClose,
  setDivisionValue,
  divisionsData,
  loading,
  SetDivisionDetailsBySearch,
}) => {
  const [divisionName, setDivisionName] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardSelect = (id) => {
    setSelectedCard(id);
  };
  const { token } = useSelector((state) => state.user);

  const handleSubmit = async () => {
    setDivisionValue(divisionName);
    if (!token || !divisionName) {
      return;
    }
    try {
      const res = await axios.get(
        `${Url}api/divisions/search?divisionName=${divisionName}&page=0&size=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      SetDivisionDetailsBySearch(res.data.data);
    } catch (e) {
      console.error("Error fetching division details:", e);
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Modal
      size="xl"
      show={show}
      onHide={onClose}
      aria-labelledby="division-modal-title"
    >
      <Modal.Header closeButton className="text-light">
        <Modal.Title id="division-modal-title">Select Division</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="d-flex flex-column align-items-center">
          {loading ? (
            <PlayerCardSkeleton />
          ) : divisionsData?.data?.length > 0 ? (
            divisionsData?.data?.map((card, index) => (
              <Col key={index} md={12} className="my-2 ">
                <Card
                  className={`px-3  ${
                    selectedCard === card.divisionId
                      ? "bg-danger text-white"
                      : "text-black"
                  }`}
                  onClick={() => {
                    setDivisionName(card?.divisionName);
                    setSelectedCard(card?.divisionId);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex justify-content-between align-items-center border-0 m-0 p-3">
                    <div>
                      <Card.Title>{card?.divisionName}</Card.Title>
                      <Card.Text>Entry Fee ${card?.entryFee}</Card.Text>
                    </div>
                    <Form.Check
                      type="radio"
                      name="cardSelection"
                      checked={selectedCard === card.divisionId}
                      onChange={() => handleCardSelect(card.divisionId)}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <span className="text-center pt-3">No Divisions Available</span>
          )}
          {divisionsData?.data?.length > 10 && (
            <PaginationControl
              page={page}
              between={3}
              limit={10}
              total={divisionsData?.totalRecords}
              changePage={(page) => handlePageChange(page)}
              ellipsis={1}
            />
          )}

          {divisionsData?.data?.length > 0 && (
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="mt-3 gradient-btn-orange"
                onClick={() => {
                  if (selectedCard) {
                    handleSubmit();
                  } else {
                    Toast.error("Please Select at least One ");
                  }
                }}
              >
                {loading ? <SpinNer /> : "Next"}
              </button>
            </div>
          )}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default DivisionSearchModel;
