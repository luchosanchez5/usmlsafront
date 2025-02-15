import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import AuthSlider from "../shared/AuthSlider";
import ErrorBoundary from "../shared/ErrorBoundary";
import img from '../assets/images/calista-resort-hotel-blog-tenis-banner.jpg'
import ErrorBoundaryAlert from "../shared/ErrorBoundaryAlert";

const AuthLayout = (WrappedComponent) => {
  return function AuthLayoutHoc(props) {
    return (
      <>
        <div className="full-height-section" style={{ background: 'black' }}>
          <Container fluid className="px-0 ">
            <Row className="m-0 row-cols-1 auth-section-1">
              <Col xs="12" lg={12} xl={12} className=" " >
                <ErrorBoundary fallback={<ErrorBoundaryAlert />}>
                  <WrappedComponent {...props} />
                </ErrorBoundary>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  };
};

export default AuthLayout;
