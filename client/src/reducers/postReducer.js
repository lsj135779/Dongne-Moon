import { SET_POST } from "../actions/index";
import { initialState } from "./initialState";

const postReducer = (state = initialState, action) => {
  // console.log("1111111111111111", action.payload);
  switch (action.type) {
    case SET_POST:
      // console.log("2222222222222", action.payload);
      return { ...state, posts: action.payload.posts };

    default:
      return state;
  }
};

export default postReducer;
