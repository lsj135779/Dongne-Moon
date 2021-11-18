import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/index";
import styled from "styled-components";
import "./Header.css";
import axios from "axios";
const logoImg = require("./../5.svg").default;
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
  width: ${(props) => props.width || "30px"};
`;

export default function Header({ }) {
  const reduxState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { user, islogin } = reduxState;
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accesstoken");
    navigate("/main");
  };

  return (
    <div className="headBox">
      <div>
        <div className="header-master">
          <div className="header-material"></div>
          <div className="header-material"></div>
          <div className="header-material">
            <Link to="/">
              <Img src={logoImg} alt-="logo" />
            </Link>
          </div>
          {islogin.islogin ? (
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
