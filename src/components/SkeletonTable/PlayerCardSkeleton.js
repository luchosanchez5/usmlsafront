import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, Col } from "react-bootstrap";

const   PlayerCardSkeleton = ({ count = 5 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <Col key={index} md={12} className="my-2">
                    <Card className="px-3">
                        <Card.Body className="d-flex justify-content-between align-items-center border-0">
                            <div>
                                <Skeleton
                                    width={120}
                                    height={20}
                                    baseColor="#afafaf"
                                    highlightColor="#eeeeee"
                                />
                                <Skeleton
                                    width={200}
                                    height={15}
                                    baseColor="#afafaf"
                                    highlightColor="#eeeeee"
                                    style={{ marginTop: "5px" }}
                                />
                            </div>
                            <Skeleton
                                circle
                                width={20}
                                height={20}
                                baseColor="#afafaf"
                                highlightColor="#eeeeee"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </>
    );
};

export default PlayerCardSkeleton;
