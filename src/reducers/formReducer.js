import {
  SET_LOADING,
  SET_STEP,
  SET_PARTICIPANT_DETAILS,
  SET_GUARDIAN_DETAILS,
  SET_VOLUNTEER_DETAILS,
} from "../actions/types";

const initialState = {
  loading: false,
  step: 1,
  error: null,
  participantDetails: {
    last_name: "",
    first_name: "",
    date_of_birth: "",
    age: "",
    grade: "",
    gender: "",
    church: "",
    medical_info: "",
  },
  guardianDetails: {
    parent_name: "",
    primary_contact_no: "",
    alternate_contact_no: "",
    whatsApp_no: "",
    email: "",
    pickup_person_name: "",
    pickup_person_contact_no: "",
  },
  volunteerDetails: {
    last_name: "",
    first_name: "",
    contact_no: "",
    whatsApp_no: "",
    email: "",
    gender: "",
    preferred_role: "",
    preferred_class: "",
    church: "",
    previous_volunteer: "",
    previous_site: "",
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_STEP:
      return {
        ...state,
        step: action.payload,
      };
    case SET_PARTICIPANT_DETAILS:
      console.log(`Participant Details: ${action.payload}`);
      return {
        ...state,
        participantDetails: action.payload,
      };
    case SET_GUARDIAN_DETAILS:
      console.log(`Guardian Details: ${action.payload}`);
      return {
        ...state,
        guardianDetails: action.payload,
      };
    case SET_VOLUNTEER_DETAILS:
      console.log(`Volunteer Details: ${action.payload}`);
      return {
        ...state,
        volunteerDetails: action.payload,
      };
    default:
      return state;
  }
};
