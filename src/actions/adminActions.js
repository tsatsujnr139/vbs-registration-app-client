import {
  SET_LOADING,
  GET_DASHBOARD_DATA,
  ADD_ADMIN,
  DASHB0ARD_DATA_ERROR,
  ADD_ADMIN_ERROR,
  CLEAR_ERRORS,
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

let apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const setLoading = () => {
  return { type: SET_LOADING };
};

// Get Dashboard Data
export const getDashboardData = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    setLoading();
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
export const addAdmin = (formData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    setLoading();
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
        dispatch({
          type: ADD_ADMIN_ERROR,
          payload: JSON.stringify(error.response.data),
        });
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
