import React, { useState } from "react";
import "./Signin.css";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
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
      Swal.fire({
        icon: "error",
        title: "회원정보를 입력해 주세요",
        text: "",
        footer: "",
      });
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/signin`, {
          email: loginInfo.email,
          password: loginInfo.password,
        })
        .then((res) => {
          localStorage.setItem("accesstoken", res.data.token);
          handleResponseSuccess();
          navigate("/main");
        }).catch(() => {
          Swal.fire({
            icon: "error",
            title: "잘못된 정보입니다",
            text: "",
            footer: "",
          });
        })
    }
  };

  return (
    <div>
      <div className="signin-master">
        <div className="signin-material">
          <div className="logo">
            <Link to="/main">
              <img src={require("../images/5.svg").default} alt="" className="signinlogo" />
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
      </div>
      <Footer />
    </div>
  );
}
