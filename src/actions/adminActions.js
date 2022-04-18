import {
  ADD_ADMIN,
  ADD_ADMIN_ERROR,
  CLEAR_ERRORS,
  DASHB0ARD_DATA_ERROR,
  GET_DASHBOARD_DATA,
  SET_LOADING,
} from "./types";

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

let apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// Get Dashboard Data
export const getDashboardData = () => async dispatch => {
  dispatch({ type: SET_LOADING });
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.get(`${apiBaseUrl}/dashboard-data/`);
    dispatch({
      type: GET_DASHBOARD_DATA,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error Retreiving Dashboard Data:::" + error.message);
    dispatch({
      type: DASHB0ARD_DATA_ERROR,
      payload: error.message,
    });
  }
};

// Add New Admin
export const addAdmin = formData => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  dispatch({ type: SET_LOADING });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post(`${apiBaseUrl}/user/create/`, formData, config);
    dispatch({
      type: ADD_ADMIN,
    });
  } catch (error) {
    console.error("Error Adding Admin " + error);
    if (error) {
      let statusCode = error.response.status;
      if (statusCode === 400) {
        let errorMessage = JSON.stringify(error.response.data);
        if (errorMessage.includes("exists")) {
          dispatch({
            type: ADD_ADMIN_ERROR,
            payload: "A user with this email already exists",
          });
        } else {
          dispatch({
            type: ADD_ADMIN_ERROR,
            payload: errorMessage,
          });
        }
      } else {
        dispatch({
          type: ADD_ADMIN_ERROR,
          payload:
            "Unable to add new admin at this time. Please try again later",
        });
      }
    } else {
      dispatch({
        type: ADD_ADMIN_ERROR,
        payload: "Unable to add new admin at this time. Please try again later",
      });
    }
  }
};

export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
