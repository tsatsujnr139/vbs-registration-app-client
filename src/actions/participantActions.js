import {
  CLEAR_ERRORS,
  GENERAL_ERROR,
  GET_GRADES,
  GET_PARTICIPANTS,
  GET_SESSIONS,
  GRADES_ERROR,
  REGISTRATION_ERROR,
  REGISTRATION_SUCCESS,
  SEARCH_PARTICIPANT,
  SESSIONS_ERROR,
  SET_LOADING,
  UPDATE_PARTICIPANT_SUCCESS,
} from "./types";

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

let apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// Get Grades
export const getGrades = () => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await axios.get(`${apiBaseUrl}/grades/`);
    dispatch({
      type: GET_GRADES,
      payload: res.data.results,
    });
  } catch (error) {
    console.error("Error retrieving grades:::" + error);
    dispatch({
      type: GRADES_ERROR,
      payload: error.message,
    });
  }
};

// Get Sessions
export const getSessions = () => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });
    const res = await axios.get(`${apiBaseUrl}/sessions/`);
    dispatch({
      type: GET_SESSIONS,
      payload: res.data.results,
    });
  } catch (error) {
    console.error("Error retrieving sessions:::" + error);
    dispatch({
      type: SESSIONS_ERROR,
      payload: error.message,
    });
  }
};

// Register a participant
export const registerParticipant = formData => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `${apiBaseUrl}/participants/`,
      formData,
      config
    );
    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error registering participant:::" + error);
    dispatch({
      type: REGISTRATION_ERROR,
      payload: error.message,
    });
  }
};

// Register a participant
export const updateParticipant = (id, formData) => async dispatch => {
  try {
    dispatch({ type: SET_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.put(`${apiBaseUrl}/participants/${id}/`, formData, config);
    dispatch({
      type: UPDATE_PARTICIPANT_SUCCESS,
    });
  } catch (error) {
    console.error("Error updating participant details:::" + error);
    dispatch({
      type: REGISTRATION_ERROR,
      payload: error.message,
    });
  }
};

// Retrieve Most Recent Registered Participants
export const getParticipants = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    dispatch({ type: SET_LOADING });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get(`${apiBaseUrl}/participants/`, config);
    dispatch({
      type: GET_PARTICIPANTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GENERAL_ERROR,
      payload: error.message,
    });
  }
};

// Search for a participant by last name
export const searchParticipant = value => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    dispatch({ type: SET_LOADING });
    const res = await axios.get(
      `${apiBaseUrl}/participants/?last_name=${value}`
    );
    dispatch({
      type: SEARCH_PARTICIPANT,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error searching for participant:::" + error);
    dispatch({
      type: GENERAL_ERROR,
      payload: error.message,
    });
  }
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
