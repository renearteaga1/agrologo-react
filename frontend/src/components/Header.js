import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Container,
  Form,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";

import { logout } from "../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="opal" variant="text-black" expand="md" collapseOnSelect>
        <Container fluid>
          <LinkContainer exact to="/" activeClassName="">
            <Navbar.Brand>Agrologo</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-md-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
              activeKey="/"
            >
              <LinkContainer exact to="/">
                <Nav.Link active={false}>Inicio</Nav.Link>
              </LinkContainer>
              <LinkContainer exact to="/cart">
                <Nav.Link active={false}>Carrito</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile" activeClassName="">
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                  </LinkContainer>

                  {/* <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item> */}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer exact to="/login">
                  <Nav.Link active={false}>Login</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <SearchBox />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
