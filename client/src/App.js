import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Mypage from "./pages/Mypage";
import List from "./pages/List";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState("");
  const [postContent, setPostContent] = useState();

  const getCookie = function (name) {
    const value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  };
  const accesstoken = getCookie("accesstoken");

  const isAuthenticated = () => {
    axios
      .get("http://localhost:4000/user/info", {
        headers: { accesstoken: accesstoken },
      })
      .then((res) => {
        setUserinfo(res.data.data);
        setIsLogin(true);
      });
  };
  const handleResponseSuccess = () => {
    isAuthenticated();
  };
  useEffect(() => {
    isAuthenticated();
  }, []);

  const postHandler = () => {
    axios.get("http://localhost:4000/post").then((res) => {
      const data = res.data;
      console.log(data);
      setPostContent(data);
    });
  };
  // const categoryHandler = () => {
  //   axios.get(`http://localhost:4000/post/${}`).then((res) => {
  //     console.log(res.data);
  //   });
  // };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/main"
          element={
            <Main
              isLogin={isLogin}
              setUserinfo={setUserinfo}
              setIsLogin={setIsLogin}
            />
          }
        />

        <Route
          path="/signup"
          element={<Signup isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
        <Route
          path="/login"
          element={<Signin handleResponseSuccess={handleResponseSuccess} />}
        />
        <Route
          path="/mypage"
          element={
            <Mypage
              userinfo={userinfo}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
              setUserinfo={setUserinfo}
            />
          }
        />

        <Route
          path="/post=:category"
          element={
            <List
              isLogin={isLogin}
              setUserinfo={setUserinfo}
              setIsLogin={setIsLogin}
              postHandler={postHandler}
              postContent={postContent}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
