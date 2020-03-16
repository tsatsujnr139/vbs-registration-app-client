import { SET_LOADING, GET_STATS, GENERAL_ERROR } from "./types";

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const getRegistrationStats = () => async dispatch => {
  setLoading();
  try {
    // const res = await axios.get("/stats");
    const res = {
      data: {
        participantCount: "1008",
        volunteerCount: "108",
        churchCount: "20"
      }
    };
    dispatch({
      type: GET_STATS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GENERAL_ERROR,
      payload: error.message
    });
  }
};
