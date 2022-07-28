// import { configureStore, applyMiddleware, combineReducers } from "redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import { productListReducer } from "./reducers/productReducers";

import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,

  userLogin: userLoginReducer,
});

const initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  initialState,
});

export default store;
