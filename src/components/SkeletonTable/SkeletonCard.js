import React from "react";
import { Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
    return (
        <Row className="g-4">
            {[...Array(2)].map((_, index) => (
                <Col key={index} xs={12} md={6}>
                    <div className="event-card">
                        <div className="event-card-img">
                            <Skeleton height="100%" width="100%" />
                        </div>

                        <div className="event-card-body">
                            <Skeleton width={80} height={15} />

                            <Skeleton width={150} height={20} />

                            <Skeleton width={200} height={25} />

                            <Skeleton width={120} height={15} />
                            <Skeleton width={120} height={15} />
                            <div className="event-buttons">
                                <Skeleton width={80} height={30} />
                                <Skeleton width={80} height={30} />
                                <Skeleton width={80} height={30} />
                            </div>
                        </div>
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export default SkeletonCard;
