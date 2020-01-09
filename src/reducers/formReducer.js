import { SET_LOADING, SET_STEP } from "../actions/types";

const initialState = {
  participant: null,
  loading: false,
  current_step: 1,
  error: null
};

export default (state = initialState, action) => {
  switch (action) {
    case SET_LOADING:
      return {
        ...state,
        loading: false
      };
    case SET_STEP:
      return {
        ...state,
        current_step: action.payload
      };
    default:
      return state;
  }
};
