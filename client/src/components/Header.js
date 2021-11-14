import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Header.css";
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

export default function Header({ isLogin }) {
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
              <Link to="/user/info">
                <Img width="10px" height="15px" src="mypage.ico" alt="Mypage" />
              </Link>
              <div className="logout">Logout</div>
            </div>
          ) : (
            <div className="header-material">
              <Link to="/login" className="login">
                LOGIN
              </Link>
              <Link to="/signup" className="signup">
                SIGNUP
              </Link>
            </div>
          )}

          <div className="header-material"></div>
        </div>
      </div>
    </div>
  );
}
