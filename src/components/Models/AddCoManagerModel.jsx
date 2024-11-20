import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import InputField from '../product/InputField'; // Assuming you have a reusable InputField component
import Modal from 'react-bootstrap/Modal';
import { Card, Row, Col, Form } from "react-bootstrap";
import { AllPlayersSchemas } from '../../Schemas/Schemas'; // Assuming validation schema is correct
import { useDispatch, useSelector } from 'react-redux';
import { AddCoManagerToTeam, GetCoManager } from '../../store/team/actions/actionsCreators';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { toast } from 'react-toast-notification';
import Toast from '../../shared/Toast';
const AddCoManagerModel = ({ show, onClose, SetCoManagerBoxModel, id,setState }) => {
    const { CoManagerData, isLoading } = useSelector((state) => state.team)
    const { token } = useSelector((state) => state.user)
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

        Dispatch(AddCoManagerToTeam(id, selectedCard, token))
        setState((prev)=>!prev)
        SetCoManagerBoxModel(false)
    }

    useEffect(() => {
        Dispatch(GetCoManager('Co_Manager', token, page))
    }, [])



    return (
        <Modal show={show} onHide={onClose} size="xl" centered className="py-4">
            <Modal.Header closeButton>
                <Modal.Title>Select Co-Manager </Modal.Title>
            </Modal.Header>

            <Modal.Body className="row justify-content-center">
                <Row className="d-flex flex-column align-items-center">
                    {CoManagerData?.data?.length > 0 ? CoManagerData?.data?.map((card, index) => (
                        <Col key={card.id} md={12} className="my-2 ">
                            <Card
                                className={`px-3  ${selectedCard === card.id ? "bg-danger text-white" : "text-black"}`}
                                onClick={() => handleCardSelect(card.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <Card.Body className="d-flex justify-content-between align-items-center border-0 m-0 p-3" >
                                    <div>
                                        <Card.Title>{card.name}</Card.Title>
                                        <Card.Text>{card.email}</Card.Text>
                                    </div>
                                    <Form.Check
                                        type="radio"
                                        name="cardSelection"
                                        checked={selectedCard === card.id}
                                        onChange={() => handleCardSelect(card.id)}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    )) :
                        <span className='text-center pt-3'>No Co Manager Available</span>
                    }
                </Row>
                {CoManagerData?.data?.length > 10 && <PaginationControl
                    page={page}
                    between={3}
                    limit={10}
                    total={CoManagerData?.totalRecords}
                    changePage={(page) => handlePageChange(page)}
                    ellipsis={1}
                />}


                {CoManagerData?.data?.length > 0 && (
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

export default AddCoManagerModel;
