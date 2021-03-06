import {
  SET_LOADING,
  GET_GRADES,
  GET_SESSIONS,
  GRADES_ERROR,
  SESSIONS_ERROR,
  REGISTRATION_SUCCESS,
  UPDATE_PARTICIPANT_SUCCESS,
  REGISTRATION_ERROR,
  GET_PARTICIPANTS,
  SEARCH_PARTICIPANT,
  GENERAL_ERROR,
  CLEAR_ERRORS,
} from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  grades: null,
  sessions: null,
  participantData: null,
  participantId: null,
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
    case GET_SESSIONS:
      return {
        ...state,
        sessions: action.payload,
        loading: false,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case UPDATE_PARTICIPANT_SUCCESS:
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
    case SESSIONS_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
    case GET_PARTICIPANTS:
      return {
        ...state,
        participantData: action.payload,
        loading: false,
      };
    case SEARCH_PARTICIPANT:
      return {
        ...state,
        participantData: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
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
