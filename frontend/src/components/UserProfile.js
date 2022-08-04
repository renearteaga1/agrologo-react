import React from "react";

import { Button, Col, Form, Row } from "react-bootstrap";

import { Alert, CircularProgress } from "@mui/material";

function UserProfile({
  message,
  error,
  errorUpdate,
  loading,
  submitHandler,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) {
  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>
        {message && <Alert severity="error">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        {errorUpdate && <Alert severity="error">{errorUpdate}</Alert>}
        {loading && <CircularProgress />}
        <Form onSubmit={submitHandler}>
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
        </Form>
      </Col>
      <Col md={8}></Col>
    </Row>
  );
}

export default UserProfile;
