import {
  SET_LOADING,
  SET_STEP,
  SET_PARTICIPANT_DETAILS,
  SET_GUARDIAN_DETAILS,
  SET_VOLUNTEER_DETAILS,
} from "./types";

export const setLoading = () => {
  return { type: SET_LOADING };
};

export const setStep = (step) => {
  return {
    type: SET_STEP,
    payload: step,
  };
};

export const setParticipantDetails = (values) => {
  return {
    type: SET_PARTICIPANT_DETAILS,
    payload: values,
  };
};

export const setGuardianDetails = (values) => {
  return {
    type: SET_GUARDIAN_DETAILS,
    payload: values,
  };
};

export const setVolunteerDetails = (values) => {
  return {
    type: SET_VOLUNTEER_DETAILS,
    payload: values,
  };
};
