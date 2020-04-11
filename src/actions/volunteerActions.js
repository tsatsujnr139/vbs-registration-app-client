import {
  REGISTER_VOLUNTEER,
  REGISTRATION_ERROR,
  SET_LOADING,
  SEARCH_VOLUNTEER,
  GENERAL_ERROR,
  GET_VOLUNTEERS,
} from "./types";
// import axios from "axios";

// let apiBaseUrl;

// if (process.env.NODE_ENV !== "production") {
//   apiBaseUrl = process.env.REACT_APP_VBS_API_BASE_URL;
// } else {
//   apiBaseUrl = process.env.VBS_API_BASE_URL;
// }

// Retrieve Most Recent Registered Volunteers
export const getVolunteers = () => async (dispatch) => {
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
        firstName: "Tsatsu",
        lastName: "Adogla-Bessa",
        class: "Pre-school",
        church: "Legon Interdenominational Church",
        gender: "Male",
      },
      {
        key: "2",
        firstName: "Sena",
        lastName: "Adogla-Bessa",
        class: "Class 1",
        church: "Legon Interdenominational Church",
        gender: "Female",
      },
    ],
  };
  dispatch({
    type: GET_VOLUNTEERS,
    payload: res.data,
  });
};

// Register a volunteer
export const registerVolunteer = (formData) => async (dispatch) => {
  try {
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
    dispatch({
      type: REGISTER_VOLUNTEER,
    });
  } catch (error) {
    dispatch({
      type: REGISTRATION_ERROR,
      payload: error.message,
    });
  }
};

// Search for a volunteer by last name
export const searchVolunteer = (formData) => async (dispatch) => {
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
