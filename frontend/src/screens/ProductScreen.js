import React from "react";
import { Link } from "react-router-dom";

import { Button, Card, Col, ListGroup, Image, Row } from "react-bootstrap";
import { Box, Rating } from "@mui/material";

function ProductScreen({ match }) {
  let products = [{ id: "1", name: "product1" }];
  const product = products.find((p) => p.id === match.params.id);
  return (
    <div>
      <Link to="/" className="btn btn-light">
        Regresar
      </Link>
      <Row>
        <Col>
          <Image fluid />
        </Col>
        <Col>
          <h5>{product.name}</h5>
          <p className="text-secondary">{product.brand}</p>
          <div className="my-3 d-flex">
            <Rating value={product.rating} precision={0.5} readOnly />
            <Box sx={{ ml: 2 }}>{product.numReviews} calificaciones</Box>
          </div>
          <hr></hr>
          <div>{product.description}</div>
        </Col>
        <Col md={3}>
          <div>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Precio: </Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Estado: </Col>
                  <Col>
                    {product.countInStock > 0 ? "En Stock" : "Sin Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-center">
                <Button
                  className="btn-block btn-deep-champagne"
                  disabled={product.countInStock < 1}
                  type="button"
                >
                  Agregar a Carrito
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default ProductScreen;
