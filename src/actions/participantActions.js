import {
  SET_LOADING,
  GET_GRADES,
  GRADES_ERROR,
  REGISTRATION_ERROR,
  GET_PARTICIPANTS,
  GENERAL_ERROR,
  SEARCH_PARTICIPANT,
} from "./types";
import axios from "axios";
// import axios from "axios";

// let apiBaseUrl;

// if (process.env.NODE_ENV !== "production") {
//   apiBaseUrl = process.env.REACT_APP_VBS_API_BASE_URL;
// } else {
//   apiBaseUrl = process.env.VBS_API_BASE_URL;
// }

// Get Grades
export const getGrades = () => async (dispatch) => {
  try {
    setLoading();
    // const res = await axios.get("/grades");
    const res = {
      data: [
        {
          name: "Class 1",
        },
        {
          name: "Class 2",
        },
        {
          name: "Class 3",
        },
        {
          name: "Class 4",
        },
        {
          name: "Class 5",
        },
        {
          name: "Class 6",
        },
        {
          name: "JHS 1",
        },
        {
          name: "JHS 2",
        },
        {
          name: "JHS 3",
        },
      ],
    };

    dispatch({
      type: GET_GRADES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GRADES_ERROR,
      payload: error.message,
    });
  }
};

// Register a participant
export const registerParticipant = (formData) => async (dispatch) => {
  console.log(`Participant Registration Details:: ${{ ...formData }}`);
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
    dispatch({
      type: GENERAL_ERROR,
      payload: error.message,
    });
  }
};

export const setLoading = () => {
  return { type: SET_LOADING };
};
