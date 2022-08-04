import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { LinkContainer } from "react-router-bootstrap";

import { Button, Col, Form, Row } from "react-bootstrap";

import { Alert, CircularProgress } from "@mui/material";

import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

import UserPublicaciones from "../components/UserPublicaciones";
import UserProfile from "../components/UserProfile.js";

import {
  getUserDetails,
  updateUserProfile,
  logout,
  listUserProducts,
} from "../actions/userActions";

function ProfileScreen({ history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [pageDisplay, setPageDisplay] = useState("");

  const [showView, setShowView] = useState("");
  const handlePageDisplay = (e) => {
    e.preventDefault();
    setPageDisplay(e.target.innerText);
    setShowView(e.target.innerText.toLowerCase());
  };
  //PUBLICACIONES
  const userListProducts = useSelector((state) => state.userListProducts);
  const { loading: loadingListProducts, products } = userListProducts;

  useEffect(() => {
    if (showView == "publicaciones") {
      console.log("publicaciones");
      dispatch(listUserProducts());
    }
  }, [showView]);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { error: errorUpdate, success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || userInfo.id !== user.id || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
    if (error && error.includes("Given token not valid")) {
      dispatch(logout());
    }
  }, [dispatch, history, userInfo, user, success, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Contraseñas no coinciden");
    } else {
      console.log(name);
      dispatch(
        updateUserProfile({
          id: user.id,
          username: email,
          email: email,
          first_name: name,
          password: password,
        })
      );
      setMessage("");
    }
  };

  let props = {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    message,
    setMessage,
    pageDisplay,
    setPageDisplay,
    showView,
    setShowView,
    error,
    loading,
    user,
    userInfo,
    errorUpdate,
    success,
    submitHandler,
    products,
    loadingListProducts,
  };
  return (
    <div className="container">
      <Row className="">
        <Col>
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a
                className={
                  "nav-link " +
                  (pageDisplay == "Perfil" || pageDisplay == "" ? `active` : ``)
                }
                aria-current="page"
                href="#"
                onClick={(e) => handlePageDisplay(e)}
              >
                Perfil
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  "nav-link " + (pageDisplay == "Publicaciones" ? `active` : ``)
                }
                href="#"
                onClick={(e) => handlePageDisplay(e)}
              >
                Publicaciones
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  "nav-link " + (pageDisplay == "Link" ? `active` : ``)
                }
                href="#"
                onClick={(e) => handlePageDisplay(e)}
              >
                Link
              </a>
            </li>
          </ul>
        </Col>
        <hr />
      </Row>

      {showView == "link" ? (
        <h2>Link</h2>
      ) : showView == "publicaciones" ? (
        <UserPublicaciones {...props} />
      ) : (
        <UserProfile {...props} />
      )}
    </div>
  );
}

export default ProfileScreen;
