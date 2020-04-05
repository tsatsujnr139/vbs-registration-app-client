import { REGISTER_VOLUNTEER, REGISTRATION_ERROR, SET_LOADING } from "./types";
// import axios from "axios";

// let apiBaseUrl;

// if (process.env.NODE_ENV !== "production") {
//   apiBaseUrl = process.env.REACT_APP_VBS_API_BASE_URL;
// } else {
//   apiBaseUrl = process.env.VBS_API_BASE_URL;
// }

// Register a volunteer
export const registerVolunteer = formData => async dispatch => {
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
  } catch (error) {
    dispatch({
      type: REGISTRATION_ERROR,
      payload: error.message
    });
  }
};
