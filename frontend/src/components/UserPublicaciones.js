import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Form, Row } from "react-bootstrap";

import { Alert, CircularProgress } from "@mui/material";

import { listUserProducts } from "../actions/userActions";

import ProductsProfile from "../components/ProductsProfile";

function UserPublicaciones({ products, loadingListProducts }) {
  const dispatch = useDispatch();

  //   const userListProducts = useSelector((state) => state.userListProducts);
  //   const { loading, products } = userListProducts;

  //   useEffect(() => {
  //     dispatch(listUserProducts());
  //     console.log(products);
  //   }, [dispatch]);

  return (
    <>
      <Row className="py-3">
        <Col>
          <h3>Mis publicaciones</h3>
        </Col>
        <Col md={4}>
          <Button href="/product/create">Nueva Publicacion</Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {loadingListProducts ? (
            <CircularProgress />
          ) : (
            <ProductsProfile itemData={products} />
          )}

          {/* {message && <Alert severity="error">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        {errorUpdate && <Alert severity="error">{errorUpdate}</Alert>}
        {loading && <CircularProgress />} */}
          {/* <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <div className="row col-10 mx-auto">
            <Button type="submit" variant="primary">
              Update
            </Button>
          </div>
        </Form> */}
        </Col>
      </Row>
    </>
  );
}

export default UserPublicaciones;
