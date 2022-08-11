import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { Button, Card, Col, ListGroup, Image, Row } from "react-bootstrap";
import { Alert, Box, CircularProgress, Rating } from "@mui/material";

import { listProductDetails } from "../actions/productActions";

function ProductScreen({ match }) {
  const [qty, setQty] = useState(0);

  //Review constants

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <div>
      <Link to="/" className="btn btn-light">
        Regresar
      </Link>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Row className="d-md-none">
            <Col>{product.name}</Col>
          </Row>

          <Row className="d-md-none mt-3">
            <Col md={8} className="img-div text-center">
              <Image className="img-img" src={product.image.image1} />
            </Col>
          </Row>

          <Row className="d-md-none mt-3">
            <Col>
              <h4>$ {product.price.precioTotal}</h4>
            </Col>
          </Row>

          <Row className="">
            <Col>
              <div>Cantidad de animales en el lote: {product.cantidad}</div>
            </Col>
          </Row>
          <Row className="mb-4 d-none d-md-block">
            <Col md={8} className="img-div">
              <Image className="img-img" src={product.image.image1} />
            </Col>

            <Col md={4}>
              <div>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Precio: </Col>
                      <Col>
                        <strong>${product.price.precioTotal}</strong>
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
          <Row>
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
          </Row>
        </>
      )}
    </div>
  );
}

export default ProductScreen;
