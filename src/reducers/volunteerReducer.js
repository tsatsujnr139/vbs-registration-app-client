import {
  SET_LOADING,
  REGISTER_VOLUNTEER,
  REGISTRATION_ERROR,
  GET_VOLUNTEERS,
  SEARCH_VOLUNTEER,
} from "../actions/types";

const initialState = {
  loading: false,
  error: null,
  volunteers: null,
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
        volunteers: action.payload,
      };
    case REGISTER_VOLUNTEER:
      return {
        ...state,
        loading: false,
      };
    case SEARCH_VOLUNTEER:
      return {
        ...state,
        loading: false,
        volunteers: action.payload,
      };
    case REGISTRATION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
