import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED,
  SET_LOADING,
  CLEAR_ERRORS,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import storeConfig from "../store";

const { persistor } = storeConfig;

let apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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
      payload: `Session has expired. Please login again.`,
    });
  }
};

// Login
export const login = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post(`${apiBaseUrl}/user/token/`, formData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.token,
    });
    loadUser();
  } catch (error) {
    console.error("Error Logging in User::: " + error);
    if (error.response) {
      let statusCode = error.response.status;
      if (statusCode === 400) {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response.data.non_field_errors,
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: "Unable to login at this time. Please try again.",
        });
      }
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: "Unable to login at this time. Please try again.",
      });
    }
  }
};

// Logout
export const logout = () => {
  persistor.purge();
  return { type: LOGOUT };
};

// Set Loading
export const setLoading = () => {
  return { type: SET_LOADING };
};

// Set Loading
export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
