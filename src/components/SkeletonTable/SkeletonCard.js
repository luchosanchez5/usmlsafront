import React from "react";
import { Col, Row } from "react-bootstrap";

const SkeletonCard = () => {
    return (
        <Row className="event-data-container mx-5 my-3 py-5">
            <Col md={8} className="d-flex align-items-center">
                {/* Skeleton for image */}
                <div
                    style={{
                        width: "300px",
                        height: "200px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "8px",
                    }}
                ></div>
                <div className="d-flex flex-column ms-3 text-center text-md-start">
                    {/* Skeleton for text */}
                    <div
                        style={{
                            width: "100px",
                            height: "20px",
                            backgroundColor: "#e0e0e0",
                            marginBottom: "10px",
                            borderRadius: "4px",
                        }}
                    ></div>
                    <div
                        style={{
                            width: "200px",
                            height: "30px",
                            backgroundColor: "#e0e0e0",
                            marginBottom: "10px",
                            borderRadius: "4px",
                        }}
                    ></div>
                    <div
                        style={{
                            width: "150px",
                            height: "20px",
                            backgroundColor: "#e0e0e0",
                            marginBottom: "10px",
                            borderRadius: "4px",
                        }}
                    ></div>
                    <div
                        style={{
                            width: "150px",
                            height: "20px",
                            backgroundColor: "#e0e0e0",
                            marginBottom: "10px",
                            borderRadius: "4px",
                        }}
                    ></div>
                </div>
            </Col>
            <Col md={4} className="d-flex justify-content-end flex-column">
                {/* Skeleton for button */}
                <div
                    style={{
                        width: "100px",
                        height: "40px",
                        backgroundColor: "#e0e0e0",
                        borderRadius: "8px",
                        alignSelf: "flex-end",
                    }}
                ></div>
            </Col>
        </Row>
    );
};

export default SkeletonCard;
