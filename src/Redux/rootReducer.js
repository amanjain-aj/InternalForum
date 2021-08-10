import { combineReducers } from "redux";
import Questionreducer from "./questions/questionReducer";
import UserReducer from "./users/userReducer";
import TagReducer from "./tags/tagReducer";

export const rootReducer = combineReducers({
  Questionreducer,
  UserReducer,
  TagReducer,
});
