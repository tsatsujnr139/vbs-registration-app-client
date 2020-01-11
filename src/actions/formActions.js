import {
  SET_LOADING,
  SET_STEP,
  SET_PARTICIPANT_DETAILS,
  SET_GUARDIAN_DETAILS
} from "./types";

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const setStep = step => {
  return {
    type: SET_STEP,
    payload: step
  };
};

export const setParticipantDetails = values => {
  return {
    type: SET_PARTICIPANT_DETAILS,
    payload: values
  };
};

export const setguardianDetails = values => {
  return {
    type: SET_GUARDIAN_DETAILS,
    payload: values
  };
};
