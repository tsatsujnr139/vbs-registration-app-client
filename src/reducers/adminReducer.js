import {
  GENERAL_ERROR,
  ADD_ADMIN_ERROR,
  ADD_ADMIN,
  SET_LOADING,
  GET_DASHBOARD_DATA,
} from "../actions/types";

const initialState = {
  loading: false,
  dashboardData: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        dashboardData: action.payload,
        loading: false,
      };
    case ADD_ADMIN:
      return {
        ...state,
        loading: false,
      };
    case GENERAL_ERROR:
      return {
        ...state,
        loading: false,
        error: "Error retrieving the requested resource",
      };
    case ADD_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: "Unable to add new admin at this time. Please try again later",
      };
    default:
      return state;
  }
};
