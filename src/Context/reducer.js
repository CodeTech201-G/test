// import React, { useState, useReducer } from 'react';

let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))['username']
	: "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))['uuid']
	: "";


export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.username,
        token: action.payload.uuid,
        loading: false,
        errorMessage: '',
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: "",
      };
    case "SESSION_TIMEOUT":
      return {
        ...initialState,
        user: "",
        token: "",
        errorMessage: 'Session timeout',
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
