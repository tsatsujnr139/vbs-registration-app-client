import { combineReducers } from "redux";
import participantReducer from "./participantReducer";
import formReducer from "./formReducer";
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import volunteerReducer from "./volunteerReducer";

export default combineReducers({
  formDetails: formReducer,
  participant: participantReducer,
  auth: authReducer,
  admin: adminReducer,
  volunteer: volunteerReducer
});
