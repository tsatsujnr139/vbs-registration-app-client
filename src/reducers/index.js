import { combineReducers } from "redux";
import participantReducer from "./participantReducer";
import formReducer from "./formReducer";

export default combineReducers({
  formDetails: formReducer
});
