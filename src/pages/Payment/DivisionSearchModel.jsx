import React, { useEffect, useLayoutEffect, useState } from "react";
import { Card, Col, Modal, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetDivisionsBySearch } from "../../store/tournament/actions/actionsCreators";
import { useParams } from "react-router-dom";
import PlayerCardSkeleton from "../../components/SkeletonTable/PlayerCardSkeleton";
import { PaginationControl } from "react-bootstrap-pagination-control";
const Url = process.env.REACT_APP_MAIN_URL;

const DivisionSearchModel = ({
  show,
  onClose,
  tournamentId,
  setDivisionValue,
}) => {
    
  const Dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { id } = useParams();
  const { TournamentBySearch, DivisionBySearch, isLoading } = useSelector(
    (state) => state.tournament
  );
  const [page, setPage] = useState(0);

  const [selectedCard, setSelectedCard] = useState(null);
  const handleCardSelect = (id) => {
    setSelectedCard(id);
  };
  const handleSubmit = () => {
    //   Dispatch(AddCoManagerToTeam(id, selectedCard, token))
    //     .then(() => {
    //     //   setState((prev) => !prev);
    //     })
    //     .catch(() => {
    //       console.log("Failed to add Co-Manager");
    //     });
    //   onClose()
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
      <Modal.Body >
        <Row className="d-flex flex-column align-items-center">
          {isLoading ? (
            <PlayerCardSkeleton />
          ) : DivisionBySearch?.data?.length > 0 ? (
            DivisionBySearch?.data?.map((card, index) => (
              <Col key={card.id} md={12} className="my-2 ">
                <Card
                  className={`px-3  ${
                    selectedCard === card.divisionId
                      ? "bg-danger text-white"
                      : "text-black"
                  }`}
                  onClick={() => {
                    setDivisionValue(card.divisionName);
                    setSelectedCard(card.divisionId);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body className="d-flex justify-content-between align-items-center border-0 m-0 p-3">
                    <div>
                      <Card.Title>{card.divisionName}</Card.Title>
                      <Card.Text>{card.email}</Card.Text>
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
          {DivisionBySearch?.data?.length > 10 && (
            <PaginationControl
              page={page}
              between={3}
              limit={10}
              total={DivisionBySearch?.totalRecords}
              changePage={(page) => handlePageChange(page)}
              ellipsis={1}
            />
          )}

          {/* {DivisionBySearch?.data?.length > 0 && (
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
              {isLoading ? <SpinNer /> : "Submit"}
            </button>
          </div>
        )} */}
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default DivisionSearchModel;
