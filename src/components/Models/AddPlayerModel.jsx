import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Card, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  
  AddPlayerToTeam,
  GetPlayers,
} from "../../store/team/actions/actionsCreators";
import { PaginationControl } from "react-bootstrap-pagination-control";
import Toast from "../../shared/Toast";
import PlayerCardSkeleton from "../SkeletonTable/PlayerCardSkeleton";
import { setNestedObjectValues } from "formik";
const AddPlayerModel = ({ show, onClose, SetPlayerBoxModel, id, setState }) => {
  const { PlayerData, isLoading } = useSelector((state) => state.team);
  const { token } = useSelector((state) => state.user);
  const [selectedCard, setSelectedCard] = useState(null);
  const [page, setPage] = useState(0);

  const Dispatch = useDispatch();
  const handleCardSelect = (id) => {
    setSelectedCard(id);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleSubmit = () => {
    console.log(selectedCard);
    
    Dispatch(AddPlayerToTeam(id, selectedCard, token));
    setState((prev) => !prev);
    SetPlayerBoxModel(false);
  };

  useEffect(() => {
    Dispatch(GetPlayers(id,page,token))
  }, [Dispatch, token, page]);

  return (
    <Modal show={show} onHide={onClose} size="lg" centered className="py-4">
      <Modal.Header closeButton>
        <Modal.Title>Select Player </Modal.Title>
      </Modal.Header>

      <Modal.Body className="row justify-content-center ">
        <Row className="d-flex flex-column align-items-center">
          {isLoading ? (
            <PlayerCardSkeleton />
          ) : PlayerData?.data?.length > 0 ? (
            PlayerData?.data?.map((card, index) => (
              <Col key={card.id} md={12} className="my-2 ">
                <Card
                  className={`px-3  ${
                    selectedCard === card.playerId
                      ? "bg-danger text-white"
                      : "text-black"
                  }`}
                  onClick={() => handleCardSelect(card.playerId)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex justify-content-between align-items-center border-0">
                    <div>
                      <Card.Title>{card.name}</Card.Title>
                      <Card.Text>{card.email}</Card.Text>
                    </div>
                    <Form.Check
                      type="radio"
                      name="cardSelection"
                      checked={selectedCard === card.playerId}
                      onChange={() => handleCardSelect(card.playerId)}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <span className="text-center pt-3">No Players Available</span>
          )}
        </Row>
        {PlayerData?.data?.length > 10 && (
          <PaginationControl
            page={page}
            between={3}
            limit={10}
            total={PlayerData?.totalRecords}
            changePage={(page) => handlePageChange(page)}
            ellipsis={1}
          />
        )}

        {PlayerData?.data?.length > 0 && (
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
              Submit
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AddPlayerModel;
