import React, { useState } from "react";
import "./Signin.css";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Signin({ handleResponseSuccess }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = () => {
    if (loginInfo.email.length === 0 || loginInfo.password.length === 0) {
      alert("회원정보를 입력해 주세요");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/signin`, {
          email: loginInfo.email,
          password: loginInfo.password,
        })
        .then((res) => {
          handleResponseSuccess();
          navigate("/main");
        });
    }
  };

  return (
    <div>
      <div className="signin-master">
        <div className="signin-material">
          <div className="logo">
            <Link to="/main">
              <img src="자산 5.svg" alt="" className="signinlogo" />
            </Link>
          </div>
          <div className="signin-master">
            <div className="signin-wrap">
              <div className="signin-form">
                <div className="email-master">
                  <div className="label">이메일</div>
                  <input
                    type="email"
                    className="input"
                    onChange={handleInputValue("email")}
                  ></input>
                </div>
                <div className="pw-master">
                  <div className="label">비밀번호</div>
                  <input
                    type="password"
                    className="input"
                    onChange={handleInputValue("password")}
                  ></input>
                </div>
                <div className="submitbox">
                  <div className="submitbutton" onClick={handleLogin}>
                    로그인
                  </div>
                  <div className="question">
                    <Link to="/signup">아직 회원이 아니신가요?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
