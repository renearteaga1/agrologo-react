import React from "react";

import { Container, Row, Col } from "react-bootstrap";

function FormContainer({ children, classNameRow, classNameCol }) {
  return (
    <Container>
      <Row className={`justify-content-md-center ` + classNameRow}>
        <Col xs={12} md={6} className={` ` + classNameCol}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default FormContainer;
