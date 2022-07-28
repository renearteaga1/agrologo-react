import React from "react";

import { Col, Row } from "react-bootstrap";

import Product from "../components/Product";

function HomeScreen() {
  let products = [{ id: "1", name: "producto1" }];
  return (
    <div>
      <h3>Products Screen</h3>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
