import {
  SET_LOADING,
  GET_GRADES,
  GRADES_ERROR,
  REGISTRATION_SUCCESS,
  UPDATE_PARTICIPANT_SUCCESS,
  REGISTRATION_ERROR,
  GET_PARTICIPANTS,
  GENERAL_ERROR,
  SEARCH_PARTICIPANT,
  CLEAR_ERRORS,
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

let apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// Get Grades
export const getGrades = () => async (dispatch) => {
  try {
    setLoading();
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

// Register a participant
export const registerParticipant = (formData) => async (dispatch) => {
  console.log(`Participant Registration Details:: ${JSON.stringify(formData)}`);
  try {
    setLoading();
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
export const updateParticipant = (id, formData) => async (dispatch) => {
  console.log(`Participant Update Details:: ${JSON.stringify(formData)}`);
  try {
    setLoading();
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
export const getParticipants = () => async (dispatch) => {
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
export const searchParticipant = (value) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    setLoading();

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

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
