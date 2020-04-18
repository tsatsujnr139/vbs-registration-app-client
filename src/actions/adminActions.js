import {
  SET_LOADING,
  GET_DASHBOARD_DATA,
  ADD_ADMIN,
  DASHB0ARD_DATA_ERROR,
  ADD_ADMIN_ERROR,
  CLEAR_ERRORS,
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

let apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const setLoading = () => {
  return { type: SET_LOADING };
};

// Get Dashboard Data
export const getDashboardData = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    setLoading();
    const res = await axios.get(`${apiBaseUrl}/dashboard-data/`);
    // const res = {
    //   data: {
    //     overview: {
    //       participants: 1008,
    //       volunteers: 108,
    //       participant_churches: 20,
    //       volunteer_churches: 20,
    //       participants_this_week: 20,
    //       volunteers_this_week: 6,
    //       participant_churches_this_week: 2,
    //       volunteer_churches_this_week: 2,
    //     },
    //     distributions: {
    //       participant_class_distribution: [
    //         {
    //           x: "Pre-school",
    //           y: 100,
    //         },
    //         {
    //           x: "Class 1",
    //           y: 42,
    //         },
    //         {
    //           x: "Class 2",
    //           y: 36,
    //         },
    //         {
    //           x: "Class 3",
    //           y: 37,
    //         },
    //         {
    //           x: "Class 4",
    //           y: 39,
    //         },
    //         {
    //           x: "Class 5",
    //           y: 36,
    //         },
    //         {
    //           x: "Class 6",
    //           y: 30,
    //         },
    //         {
    //           x: "JHS 1",
    //           y: 40,
    //         },
    //         {
    //           x: "JHS 2",
    //           y: 45,
    //         },
    //         {
    //           x: "JHS 3",
    //           y: 24,
    //         },
    //       ],
    //       volunteer_class_distribution: [
    //         {
    //           x: "Pre-school",
    //           y: 100,
    //         },
    //         {
    //           x: "Class 1",
    //           y: 42,
    //         },
    //         {
    //           x: "Class 2",
    //           y: 36,
    //         },
    //         {
    //           x: "Class 3",
    //           y: 37,
    //         },
    //         {
    //           x: "Class 4",
    //           y: 39,
    //         },
    //         {
    //           x: "Class 5",
    //           y: 36,
    //         },
    //         {
    //           x: "Class 6",
    //           y: 30,
    //         },
    //         {
    //           x: "JHS 1",
    //           y: 40,
    //         },
    //         {
    //           x: "JHS 2",
    //           y: 45,
    //         },
    //         {
    //           x: "JHS 3",
    //           y: 24,
    //         },
    //       ],
    //     },
    //   },
    // };
    dispatch({
      type: GET_DASHBOARD_DATA,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error Retreiving Dashboard Data:::" + error.message);
    dispatch({
      type: DASHB0ARD_DATA_ERROR,
      payload: error.message,
    });
  }
};

// Add New Admin
export const addAdmin = (formData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    setLoading();
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // const res = await axios.post(`${apiBaseUrl}/admin`, formData, config);

    dispatch({
      type: ADD_ADMIN,
    });
  } catch (error) {
    dispatch({
      type: ADD_ADMIN_ERROR,
      payload: error.message,
    });
  }
};

export const clearErrors = () => {
  return { type: CLEAR_ERRORS };
};
