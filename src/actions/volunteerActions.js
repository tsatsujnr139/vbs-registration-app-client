import {
  REGISTRATION_ERROR,
  SET_LOADING,
  SEARCH_VOLUNTEER,
  GENERAL_ERROR,
  GET_VOLUNTEERS,
  GET_ROLES,
  REGISTRATION_SUCCESS,
  UPDATE_VOLUNTEER_SUCCESS,
  CLEAR_ERRORS,
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

let apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// Retrieve Available Volunteer Roles
export const getRoles = () => async (dispatch) => {
  setLoading();
  const data = [
    {
      name: "Teaching",
    },
    {
      name: "Non-Teaching",
    },
  ];
  dispatch({
    type: GET_ROLES,
    payload: data,
  });
};

// Retrieve Most Recent Registered Volunteers
export const getVolunteers = () => async (dispatch) => {
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

    const res = await axios.get(`${apiBaseUrl}/volunteers/`, config);
    dispatch({
      type: GET_VOLUNTEERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GENERAL_ERROR,
      payload: error.message,
    });
  }
};

// Register a volunteer
export const registerVolunteer = (formData) => async (dispatch) => {
  console.log(`Volunteer Registration Details:: ${JSON.stringify(formData)}`);
  try {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`${apiBaseUrl}/volunteers/`, formData, config);
    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error registering volunteer:::" + error);
    dispatch({
      type: REGISTRATION_ERROR,
      payload: error.message,
    });
  }
};

// Update volunteer
export const updateVolunteer = (id, formData) => async (dispatch) => {
  console.log(`Volunteer Update Details:: ${JSON.stringify(formData)}`);
  try {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(`${apiBaseUrl}/volunteers/${id}/`, formData, config);
    dispatch({
      type: UPDATE_VOLUNTEER_SUCCESS,
    });
  } catch (error) {
    console.error("Error registering volunteer:::" + error);
    dispatch({
      type: REGISTRATION_ERROR,
      payload: error.message,
    });
  }
};

// Search for a volunteer by last name
export const searchVolunteer = (value) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    setLoading();
    const res = await axios.get(`${apiBaseUrl}/volunteers/?last_name=${value}`);
    dispatch({
      type: SEARCH_VOLUNTEER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GENERAL_ERROR,
      payload: error.message,
    });
  }
};

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
