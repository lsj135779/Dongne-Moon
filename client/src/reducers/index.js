import { combineReducers } from "redux";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  postReducer,
  userReducer,
});

export default rootReducer;
