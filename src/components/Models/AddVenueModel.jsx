import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Card, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  AddVenue,
} from "../../store/team/actions/actionsCreators";
import { PaginationControl } from "react-bootstrap-pagination-control";
import Toast from "../../shared/Toast";
import { useParams } from "react-router-dom";
import { GetVenue } from "../../store/Venue/actions/actionCreators";
const AddVenueModel = ({ show, onClose, SetVenueModel, setState }) => {
  const { id } = useParams();
  const { VenueData } = useSelector((state) => state.venue);
  const { token } = useSelector((state) => state.user);
  const [selectedCard, setSelectedCard] = useState(null);
  const [page, setPage] = useState(0);

  const Dispatch = useDispatch();
  const handleCardSelect = (id) => {
    setSelectedCard(id);
  };
  useEffect(() => {
    Dispatch(GetVenue(page));
  }, [Dispatch, page]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleSubmit = () => {
    Dispatch(AddVenue(id, selectedCard, token));
    setState(true);
    SetVenueModel(false);
  };

  return (
    <Modal show={show} onHide={onClose} size="xl" centered className="py-4">
      <Modal.Header closeButton>
        <Modal.Title>Select Venue</Modal.Title>
      </Modal.Header>

      <Modal.Body className="row      justify-content-center">
        <Row className="d-flex flex-column align-items-center">
          {VenueData?.data?.length > 0 ? (
            VenueData?.data?.map((card, index) => (
              <Col key={card.id} md={12} className="my-2 ">
                <Card
                  className={`px-3  ${
                    selectedCard === card.venueId
                      ? "bg-danger text-white"
                      : "text-black"
                  }`}
                  onClick={() => handleCardSelect(card.venueId)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex justify-content-between align-items-center border-0 m-0 p-3">
                    <div>
                      <Card.Title>{card.name}</Card.Title>
                      <Card.Text>{card.city}</Card.Text>
                    </div>
                    <Form.Check
                      type="radio"
                      name="cardSelection"
                      checked={selectedCard === card.venueId}
                      onChange={() => handleCardSelect(card.venueId)}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <span className="text-center pt-3">No Venue Available</span>
          )}
        </Row>
        {VenueData?.data?.length > 10 && (
          <PaginationControl
            page={page}
            between={3}
            limit={10}
            total={VenueData?.totalRecords}
            changePage={(page) => handlePageChange(page)}
            ellipsis={1}
          />
        )}

        {VenueData?.data?.length > 0 && (
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="mt-3 gradient-btn-orange"
              onClick={() => {
                if (selectedCard) {
                  handleSubmit();
                } else {
                  Toast.error("Please Select atleast One ");
                }
              }}
            >
              Add Venue
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddVenueModel;
