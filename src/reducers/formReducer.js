import {
  SET_LOADING,
  SET_STEP,
  SET_PARTICIPANT_DETAILS,
  SET_GUARDIAN_DETAILS
} from "../actions/types";

const initialState = {
  loading: false,
  step: 1,
  error: null,
  participantDetails: {
    surname: "",
    firstName: "",
    dateOfBirth: "",
    age: "",
    grade: "",
    gender: "",
    church: "",
    medicalInfo: ""
  },
  guardianDetails: {
    fullName: "",
    phone: "",
    alternatePhone: "",
    email: "",
    pickupPersonName: "",
    pickupPersonPhone: ""
  },
  volunteerDetails: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: false
      };
    case SET_STEP:
      return {
        ...state,
        step: action.payload
      };
    case SET_PARTICIPANT_DETAILS:
      console.log(`Participant Details: ${action.payload}`);
      return {
        ...state,
        participantDetails: action.payload
      };
    case SET_GUARDIAN_DETAILS:
      console.log(`Guardian Details: ${action.payload}`);
      return {
        ...state,
        guardianDetails: action.payload
      };
    default:
      return state;
  }
};
