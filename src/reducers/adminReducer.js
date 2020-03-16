import { GENERAL_ERROR, SET_LOADING, GET_STATS } from "../actions/types";

const initialState = {
  loading: false,
  stats: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_STATS:
      return {
        ...state,
        stats: action.payload,
        loading: false
      };
    case GENERAL_ERROR:
      return {
        ...state,
        loading: false,
        error: "Error retrieving the requested resource"
      };
    default:
      return state;
  }
};
