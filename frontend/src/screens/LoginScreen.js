import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";

import { Alert, CircularProgress } from "@mui/material";

import FormContainer from "../components/FormContainer";

import { login } from "../actions/userActions";

function LoginScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  //   const userLogin = useSelector((state) => state.userLogin);
  //   const { error, loading, userInfo } = userLogin;

  //   useEffect(() => {
  //     if (userInfo) {
  //       history.push(redirect);
  //     }
  //   }, [history, userInfo, redirect]);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h2>Sign In</h2>
      {error && <Alert severity="error">{error}</Alert>}
      {loading && <CircularProgress />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
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
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Aun no tienes cuenta?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Regístrate.
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
