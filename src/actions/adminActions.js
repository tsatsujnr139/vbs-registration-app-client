import { SET_LOADING, GET_DASHBOARD_DATA, GENERAL_ERROR } from "./types";

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const getDashboardData = () => async (dispatch) => {
  setLoading();
  try {
    // const res = await axios.get("/stats");
    const res = {
      data: {
        overview: {
          participantCount: 1008,
          volunteerCount: 108,
          churchCount: 20,
          participantsThisWeek: 20,
          volunteersThisWeek: 6,
          churchesThisWeek: 2,
        },
        distributions: {
          participantClassDistribution: [
            {
              x: "Pre-school",
              y: 100,
            },
            {
              x: "Class 1",
              y: 42,
            },
            {
              x: "Class 2",
              y: 36,
            },
            {
              x: "Class 3",
              y: 37,
            },
            {
              x: "Class 4",
              y: 39,
            },
            {
              x: "Class 5",
              y: 36,
            },
            {
              x: "Class 6",
              y: 30,
            },
            {
              x: "JHS 1",
              y: 40,
            },
            {
              x: "JHS 2",
              y: 45,
            },
            {
              x: "JHS 3",
              y: 24,
            },
          ],
          volunteerClassDistribution: [
            {
              x: "Pre-school",
              y: 100,
            },
            {
              x: "Class 1",
              y: 42,
            },
            {
              x: "Class 2",
              y: 36,
            },
            {
              x: "Class 3",
              y: 37,
            },
            {
              x: "Class 4",
              y: 39,
            },
            {
              x: "Class 5",
              y: 36,
            },
            {
              x: "Class 6",
              y: 30,
            },
            {
              x: "JHS 1",
              y: 40,
            },
            {
              x: "JHS 2",
              y: 45,
            },
            {
              x: "JHS 3",
              y: 24,
            },
          ],
        },
      },
    };
    dispatch({
      type: GET_DASHBOARD_DATA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GENERAL_ERROR,
      payload: error.message,
    });
  }
};
