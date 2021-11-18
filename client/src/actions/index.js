import axios from "axios";
axios.defaults.withCredentials = true;

export const SET_USERS = "SET_USERS";
export const SET_POST = "SET_POST";
export const LOGOUT = "LOGOUT";
export const PATCH_INTRO = "PATCH_INTRO";
export const PATCH_NICKNAME = "PATCH_NICKNAME";
export const PATCH_IMG = "PATCH_IMG";

export const axiosData = (api, action) => (dispatch) => {
  return axios(api)
    .then((res) => {
      console.log("axiosData;;;;;;", res.data.data);
      dispatch(action(res.data.data));
    })
    .catch((err) => console.log(err.response));
};

export const setUserInfo = (user) => {
  return {
    type: SET_USERS,
    payload: {
      user,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const setPost = (posts) => {
  return {
    type: SET_POST,
    payload: {
      posts,
    },
  };
};

export const patchIntro = (intro) => {
  return {
    type: PATCH_INTRO,
    payload: {
      intro,
    },
  };
};

export const patchNickname = (nickname) => {
  return {
    type: PATCH_NICKNAME,
    payload: {
      nickname,
    },
  };
};

export const patchImg = (img) => {
  return {
    type: PATCH_IMG,
    payload: {
      img,
    },
  };
};
