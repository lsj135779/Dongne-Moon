import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { axiosData, setUserInfo } from "./actions/index";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Mypage from "./pages/Mypage";
import List from "./pages/List";
import PostRead from "./pages/PostRead";
import PostWrite from "./pages/PostWrite";
import axios from "axios";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const [userinfo, setUserinfo] = useState("");

  const isAuthenticated = () => {
    if (localStorage.getItem("accesstoken")) {
      let url = {
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/user/info`,
        headers: {
          accesstoken: localStorage.getItem("accesstoken"),
        },
      };
      dispatch(axiosData(url, setUserInfo));
    }
  };
  const handleResponseSuccess = () => {
    isAuthenticated();
  };
  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/main" element={<Main setUserinfo={setUserinfo} />} />

        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Signin handleResponseSuccess={handleResponseSuccess} />}
        />
        <Route
          path="/mypage"
          element={<Mypage userinfo={userinfo} setUserinfo={setUserinfo} />}
        />

        <Route
          path="/post=:category"
          element={<List setUserinfo={setUserinfo} />}
        />
        <Route
          path="/post/read=:id"
          element={<PostRead userinfo={userinfo} setUserinfo={setUserinfo} />}
        />
        <Route path="/post/write" element={<PostWrite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
