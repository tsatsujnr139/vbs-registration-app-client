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

// let apiBaseUrl;

// if (process.env.NODE_ENV !== "production") {
//   apiBaseUrl = process.env.REACT_APP_VBS_API_BASE_URL;
// } else {
//   apiBaseUrl = process.env.VBS_API_BASE_URL;
// }

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
    // const res = await axios.get(`${apiBaseUrl}/api/auth`);
    const res = {
      data: {
        surname: "Asomaning",
        firstName: "Aforo",
        email: "aforo@email.com",
        password: "password",
      },
    };
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.message,
    });
  }
};

// Login
export const login = (formData) => async (dispatch) => {
  setLoading();
  try {
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };
    // const res = axios.post(`${apiBaseUrl}/api/auth`,formData,config);
    const res = {
      data: {
        token: "token",
      },
    };
    loadUser();
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.message,
    });
  }
};

// Logout
export const logout = () => {
  return { type: LOGOUT };
};
