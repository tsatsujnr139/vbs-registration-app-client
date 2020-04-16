import {
  SET_LOADING,
  REGISTRATION_ERROR,
  GET_VOLUNTEERS,
  GET_ROLES,
  SEARCH_VOLUNTEER,
  REGISTRATION_SUCCESS,
  GENERAL_ERROR,
  CLEAR_ERRORS,
} from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  volunteerData: null,
  roles: null,
  success: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_VOLUNTEERS:
      return {
        ...state,
        loading: false,
        volunteerData: action.payload,
      };
    case GET_ROLES:
      return {
        ...state,
        loading: false,
        roles: action.payload,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case SEARCH_VOLUNTEER:
      return {
        ...state,
        loading: false,
        volunteerData: action.payload,
      };
    case REGISTRATION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GENERAL_ERROR:
      return {
        ...state,
        loading: false,
        error: "Error retrieving the requested resource",
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
