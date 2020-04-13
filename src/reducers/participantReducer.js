import {
  SET_LOADING,
  GET_GRADES,
  GRADES_ERROR,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR,
  GET_PARTICIPANTS,
  SEARCH_PARTICIPANT,
} from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  grades: null,
  participants: null,
  success: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GRADES:
      return {
        ...state,
        grades: action.payload,
        loading: false,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case REGISTRATION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GRADES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_PARTICIPANTS:
      return {
        ...state,
        participants: action.payload,
        loading: false,
      };
    case SEARCH_PARTICIPANT:
      return {
        ...state,
        participants: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
