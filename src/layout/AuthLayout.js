import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ErrorBoundary from "../shared/ErrorBoundary";
import ErrorBoundaryAlert from "../shared/ErrorBoundaryAlert";

const AuthLayout = (WrappedComponent) => {
  return function AuthLayoutHoc(props) {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth > 768);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <div
        style={{
          background: "black",
          minHeight: "100vh",
          height: isDesktop ? "100vh" : "auto", // 100vh only for desktop
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container fluid className="px-0 w-100">
          <Row className="m-0 row-cols-1 auth-section-1 h-100">
            <Col xs="12" lg={12} xl={12} className="h-100 d-flex align-items-center justify-content-center">
              <ErrorBoundary fallback={<ErrorBoundaryAlert />}>
                <WrappedComponent {...props} />
              </ErrorBoundary>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };
};

export default AuthLayout;
