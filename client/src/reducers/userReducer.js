import {
  SET_USERS,
  LOGOUT,
  PATCH_INTRO,
  PATCH_NICKNAME,
} from "../actions/index";
import { initialState } from "./initialState";

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      // console.log("###########;;;", state);
      return {
        ...state,
        user: action.payload.user,
        islogin: { islogin: true },
      };

    case LOGOUT:
      return { ...state, islogin: { islogin: false } };

    case PATCH_INTRO:
      // console.log("###########;;;", state);
      return { ...state, user: { intro: action.payload.intro } };

    case PATCH_NICKNAME:
      console.log("###########;;;", state);
      return { ...state, user: { nickname: action.payload.nickname } };

    default:
      return state;
  }
};

export default userReducer;
