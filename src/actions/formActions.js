import { SET_LOADING, SET_STEP } from "./types";

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const setCurrentStep = step => {
  return {
    type: SET_STEP,
    payload: step
  };
};
