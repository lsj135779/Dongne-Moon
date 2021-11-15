import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Header.css";
import axios from "axios";
axios.defaults.withCredentials = true;

// import "./Header.css";
const HeadBox = styled.header`
  height: 60px;
  width: 100%;
  border-style: solid;
  border-width: 2px;
  position: relative;
  background-color: #ffdbc1;
  border-bottom: 1px gray;
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  height: ${(props) => props.height || "30px"};
  width: ${(props) => props.width || "100px"};
`;

export default function Header({ isLogin, setUserinfo, setIsLogin }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios.post("http://localhost:4000/user/signout").then((res) => {
      setIsLogin(false);

      navigate("/main");
    });
  };

  return (
    <div className="headBox">
      <div>
        <div className="header-master">
          <div className="header-material"></div>
          <div className="header-material"></div>
          <div className="header-material">
            <Link to="/">
              <Img src="5.svg" />
            </Link>
          </div>
          {isLogin ? (
            <div className="header-material">
              <Link to="/mypage">
                {" "}
                <div className="logout">Mypage</div>
              </Link>
              <div
                className="logout"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </div>
            </div>
          ) : (
            <div className="header-material">
              <Link to="/login" className="login">
                Login
              </Link>
              <Link to="/signup" className="signup">
                Signup
              </Link>
            </div>
          )}

          <div className="header-material"></div>
        </div>
      </div>
    </div>
  );
}
