import {
  CLEAR_ERRORS,
  GENERAL_ERROR,
  GET_ROLES,
  GET_VOLUNTEERS,
  REGISTRATION_ERROR,
  REGISTRATION_SUCCESS,
  SEARCH_VOLUNTEER,
  SET_LOADING,
  UPDATE_VOLUNTEER_SUCCESS,
} from "./types"

import axios from "axios"
import setAuthToken from "../utils/setAuthToken"

let apiBaseUrl = process.env.REACT_APP_API_BASE_URL

// Retrieve Available Volunteer Roles
export const getRoles = () => async dispatch => {
  dispatch({ type: SET_LOADING })
  const data = [
    {
      name: "Teaching",
    },
    {
      name: "Teaching Assistant",
    },
    {
      name: "IT",
    },
    {
      name: "Special Needs",
    },
  ]
  dispatch({
    type: GET_ROLES,
    payload: data,
  })
}

// Retrieve Most Recent Registered Volunteers
export const getVolunteers = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    dispatch({ type: SET_LOADING })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const res = await axios.get(`${apiBaseUrl}/volunteers/`, config)
    dispatch({
      type: GET_VOLUNTEERS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GENERAL_ERROR,
      payload: error.message,
    })
  }
}

// Register a volunteer
export const registerVolunteer = formData => async dispatch => {
  try {
    dispatch({ type: SET_LOADING })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await axios.post(`${apiBaseUrl}/volunteers/`, formData, config)
    dispatch({
      type: REGISTRATION_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    console.error("Error registering volunteer:::" + error)
    dispatch({
      type: REGISTRATION_ERROR,
      payload: error.message,
    })
  }
}

// Update volunteer
export const updateVolunteer = (id, formData) => async dispatch => {
  try {
    dispatch({ type: SET_LOADING })
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    await axios.put(`${apiBaseUrl}/volunteers/${id}/`, formData, config)
    dispatch({
      type: UPDATE_VOLUNTEER_SUCCESS,
    })
  } catch (error) {
    console.error("Error registering volunteer:::" + error)
    dispatch({
      type: REGISTRATION_ERROR,
      payload: error.message,
    })
  }
}

// Search for a volunteer by last name
export const searchVolunteer = value => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    dispatch({ type: SET_LOADING })
    const res = await axios.get(`${apiBaseUrl}/volunteers/?last_name=${value}`)
    dispatch({
      type: SEARCH_VOLUNTEER,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: GENERAL_ERROR,
      payload: error.message,
    })
  }
}

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS })
}
