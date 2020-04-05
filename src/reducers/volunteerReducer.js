import {
  SET_LOADING,
  REGISTER_VOLUNTEER,
  REGISTRATION_ERROR
} from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  grades: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case REGISTER_VOLUNTEER:
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
    default:
      return state;
  }
};
