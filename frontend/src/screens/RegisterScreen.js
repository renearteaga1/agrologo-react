import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";

import { Alert, CircularProgress } from "@mui/material";

import FormContainer from "../components/FormContainer";

import { register } from "../actions/userActions";

function RegisterScreen({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Contraseñas no coinciden");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer classNameCol="border" classNameRow="mt-3">
      <h2 className="my-2">Registrarse</h2>
      {/* {message && <Alert severity="error">{message}</Alert>}
      {error && <Alert variant="error">{error}</Alert>}
      {loading && <CircularProgress />} */}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          {/* <Form.Label>Nombre</Form.Label> */}
          <Form.Control
            required
            type="name"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="my-3">
          {/* <Form.Label>Correo Electrónico</Form.Label> */}
          <Form.Control
            required
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          {/* <Form.Label>Contraseña</Form.Label> */}
          <Form.Control
            required
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirm" className="my-3">
          {/* <Form.Label>Confirmar Contraseña</Form.Label> */}
          <Form.Control
            required
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className="row col-6 mx-auto">
          <Button type="submit" variant="primary">
            Registrarme
          </Button>
        </div>
      </Form>

      <Row className="py-3">
        <Col>
          Tienes una cuenta?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Ingresar
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
