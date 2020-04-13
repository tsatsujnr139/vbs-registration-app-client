import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  SET_LOADING,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";

let apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// Set Loading
export const setLoading = () => {
  return { type: SET_LOADING };
};

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${apiBaseUrl}/user/self/`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error Loading User::: " + error);
    dispatch({
      type: AUTH_ERROR,
      payload: `Please login again.`,
    });
  }
};

// Login
export const login = (formData) => async (dispatch) => {
  try {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`${apiBaseUrl}/user/token/`, formData, config);
    console.log("res::" + res);
    // loadUser();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
  } catch (error) {
    console.error("Error Logging in User::: " + error);
    let statusCode = error.response.status;
    if (statusCode === 400) {
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.non_field_errors,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: "Unable to login at this time. Please try again later.",
      });
    }
  }
};

// Logout
export const logout = () => {
  return { type: LOGOUT };
};
