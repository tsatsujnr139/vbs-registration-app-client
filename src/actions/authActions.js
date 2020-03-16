import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  SET_LOADING
} from "./types";
import axios from "axios";

// Set Loading
export const setLoading = () => {
  return { type: SET_LOADING };
};

// Login
export const login = formData => async dispatch => {
  setLoading();
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };
    const res = {
      data: {
        token: "token"
      }
    };
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message
    });
  }
};

// Logout
export const logout = () => {
  return { type: LOGOUT };
};
