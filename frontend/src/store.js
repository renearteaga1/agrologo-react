// import { configureStore, applyMiddleware, combineReducers } from "redux";
import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import {
  productListReducer,
  productCreateReducer,
  productDeleteReducer,
  productUpdateReducer,
} from "./reducers/productReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userListProductsReducer,
  userProductsDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userListProducts: userListProductsReducer,
  userProductsDetails: userProductsDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
