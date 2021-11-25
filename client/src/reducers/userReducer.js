import {
  SET_USERS,
  LOGOUT,
  PATCH_INTRO,
  PATCH_NICKNAME,
  PATCH_IMG,
} from "../actions/index";
import { initialState } from "./initialState";

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        user: action.payload.user,
        islogin: { islogin: true },
      };

    case LOGOUT:
      return { ...state, islogin: { islogin: false } };

    case PATCH_INTRO:
      return { ...state, user: { ...state.user, intro: action.payload.intro } };

    case PATCH_NICKNAME:
      return {
        ...state,
        user: { ...state.user, nickname: action.payload.nickname },
      };

    case PATCH_IMG:
      console.log("###########img;;;", state);
      return { ...state, user: { ...state.user, img: action.payload.img } };

    default:
      return state;
  }
};

export default userReducer;
