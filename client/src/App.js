import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Mypage from "./pages/Mypage";
import axios from "axios";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userinfo, setUserinfo] = useState("");

  const isAuthenticated = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/user/info`).then((res) => {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
