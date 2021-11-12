import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import "./Header.css";
const HeadBox = styled.header`
  height: 60px;
  /* border-style: solid;
	border-width: 2px; */
  position: relative;
  background-color: #ffdbc1;
  border-bottom: 1px gray;
  display: flex;
  align-items: center;
  .leftheader {
    flex: 3 0 0;
  }
  .mid {
    /* display: flex;
    justify-content: center; */
    text-align: center;
    padding-top: 8px;
    flex: 4 0 0;

    /* text-align: center; */
  }
  .right {
    display: flex;
    flex: 2.5 0 0;
    /* margin-right: 200px; */
  }
  .logo {
    margin-right: 10px;
  }
  .logout {
    text-decoration: none;
    color: black;
  }
`;
const Img = styled.img`
  height: ${(props) => props.height || "30px"};
  width: ${(props) => props.width || "100px"};
`;

export default function Header() {
  return (
    // <div className="container">
    //   <header>
    //     <h2>
    //       {" "}
    //       <Link to="/" className="logo">
    //         <Img src="달달달.png" />
    //       </Link>
    //     </h2>

    //     <nav>
    //       <ul>
    //         <li>
    //           <a href="/mypage">
    //             <img width="10px" height="15px" src="mypage.ico" />
    //           </a>
    //         </li>
    //         <li>
    //           <a href="/logout">LOG OUT</a>
    //         </li>
    //       </ul>
    //     </nav>
    //   </header>
    // </div>

    <HeadBox>
      <div className="leftheader"></div>
      <div className="mid">
        <Link to="/" className="mid ">
          <Img src="달달달.png" />
        </Link>
      </div>

      <div className="right logout">
        <Link to="/mypage">
          <Img
            width="10px"
            height="15px"
            className="right logo"
            src="mypage.ico"
            alt="Mypage"
          />
        </Link>
        <Link to="/logout" className="logout">
          <div>Logout</div>
        </Link>
      </div>
    </HeadBox>
  );
}
