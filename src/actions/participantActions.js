import {
  SET_LOADING,
  GET_GRADES,
  GRADES_ERROR,
  REGISTRATION_ERROR
} from "./types";
// import axios from "axios";

// let apiBaseUrl;

// if (process.env.NODE_ENV !== "production") {
//   apiBaseUrl = process.env.REACT_APP_VBS_API_BASE_URL;
// } else {
//   apiBaseUrl = process.env.VBS_API_BASE_URL;
// }

// Get Grades
export const getGrades = () => async dispatch => {
  try {
    setLoading();
    // const res = await axios.get("/grades");
    const res = {
      data: [
        {
          name: "Class 1"
        },
        {
          name: "Class 2"
        },
        {
          name: "Class 3"
        },
        {
          name: "Class 4"
        },
        {
          name: "Class 5"
        },
        {
          name: "Class 6"
        },
        {
          name: "JHS 1"
        },
        {
          name: "JHS 2"
        },
        {
          name: "JHS 3"
        }
      ]
    };

    dispatch({
      type: GET_GRADES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GRADES_ERROR,
      payload: error.message
    });
  }
};

// Register a participant
export const registerParticipant = formData => async dispatch => {
  console.log(`Participant Registration Details:: ${formData}`);
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
  } catch (error) {
    dispatch({
      type: REGISTRATION_ERROR,
      payload: error.message
    });
  }
};

export const setLoading = () => {
  return { type: SET_LOADING };
};
