import {
  ADMISSION_PICKUP_ERROR,
  ADMIT_PARTICIPANT,
  CLEAR_ERRORS,
  GENERAL_ERROR,
  GET_GRADES,
  GET_PARTICIPANTS,
  GET_SESSIONS,
  GRADES_ERROR,
  PICKUP_PARTICIPANT,
  REGISTRATION_ERROR,
  REGISTRATION_SUCCESS,
  SEARCH_PARTICIPANT,
  SESSIONS_ERROR,
  SET_LOADING,
  UPDATE_PARTICIPANT_SUCCESS,
} from "../actions/types"

const initialState = {
  loading: false,
  error: null,
  grades: null,
  sessions: null,
  participantData: null,
  participantId: null,
  success: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GRADES:
      return {
        ...state,
        grades: action.payload,
        loading: false,
      }
    case GET_SESSIONS:
      return {
        ...state,
        sessions: action.payload,
        loading: false,
      }
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      }
    case UPDATE_PARTICIPANT_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      }
    case REGISTRATION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case GRADES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case SESSIONS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    case GET_PARTICIPANTS:
      return {
        ...state,
        participantData: action.payload,
        loading: false,
      }
    case SEARCH_PARTICIPANT:
      return {
        ...state,
        participantData: action.payload,
        loading: false,
      }
    case ADMIT_PARTICIPANT:
      return {
        ...state,
        success: { message: "Participant admitted successfully" },
        loading: false,
      }
    case PICKUP_PARTICIPANT:
      return {
        ...state,
        success: { message: "Participant marked as picked up successfully" },
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GENERAL_ERROR:
      return {
        ...state,
        loading: false,
        error: "Error retrieving the requested resource",
      }
    case ADMISSION_PICKUP_ERROR:
      return {
        ...state,
        loading: false,
        error: { message: action.payload },
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}
