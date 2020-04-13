import {
  SET_LOADING,
  GET_GRADES,
  GRADES_ERROR,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  GET_PARTICIPANTS,
  GENERAL_ERROR,
  SEARCH_PARTICIPANT,
} from "./types";
import axios from "axios";

let apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// Get Grades
export const getGrades = () => async (dispatch) => {
  try {
    setLoading();
    const res = {
      data: [
        {
          name: "class 1",
        },
      ],
    };
    // const res = await axios.get(`${apiBaseUrl}/grades`);
    dispatch({
      type: GET_GRADES,
      payload: res.data,
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

// Retrieve Most Recent Registered Participants
export const getParticipants = () => async (dispatch) => {
  setLoading();
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };

  // const res = await axios.get(`${apiBaseUrl}/participants`,config)
  const res = {
    data: [
      {
        key: "1",
        firstName: "Aba",
        lastName: "Asomaning",
        class: "JHS 1",
        church: "Legon Interdenominational Church",
        age: 13,
        gender: "Female",
        medicalInfo: "Allergic to pineapple",
      },
      {
        key: "2",
        firstName: "Adoma",
        lastName: "Asomaning",
        class: "Class 3",
        church: "Legon Interdenominational Church",
        age: 9,
        gender: "Female",
        medicalInfo: "N/A",
      },
    ],
  };
  dispatch({
    type: GET_PARTICIPANTS,
    payload: res.data,
  });
};

// Search for a participant by last name
export const searchParticipant = (formData) => async (dispatch) => {
  try {
    setLoading();
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // };
    // const res = await axios.post(
    //   `${apiBaseUrl}/participants`,
    //   formData,
    //   config
    // );
    const res = {
      data: null,
    };
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
