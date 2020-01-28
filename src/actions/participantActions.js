import { SET_LOADING, GET_GRADES, GRADES_ERROR } from "./types";
import axios from "axios";

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
      payload: error.response.data.msg
    });
  }
};

export const setLoading = () => {
  return { type: SET_LOADING };
};
