import {
  ADD_ADMIN,
  ADD_ADMIN_ERROR,
  CLEAR_ERRORS,
  DASHB0ARD_DATA_ERROR,
  GENERAL_ERROR,
  GET_DASHBOARD_DATA,
  SET_LOADING,
} from "../actions/types";

const initialState = {
  loading: false,
  dashboardData: null,
  error: null,
  success: null,
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
        success: true,
      };
    case GENERAL_ERROR:
      return {
        ...state,
        loading: false,
        error: "Error retrieving the requested resource",
      };
    case DASHB0ARD_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error:
          "There was an error retrieving the dashboard data. Please reload the page to try again.",
      };
    case ADD_ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };
    default:
      return state;
  }
};
