import {
  SET_LOADING,
  GET_GRADES,
  GRADES_ERROR,
  REGISTER_PARTICIPANT,
  REGISTRATION_ERROR
} from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  grades: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GRADES:
      return {
        ...state,
        grades: action.payload,
        loading: false
      };
    case REGISTER_PARTICIPANT:
      return {
        ...state,
        loading: false
      };
    case REGISTRATION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case GRADES_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
