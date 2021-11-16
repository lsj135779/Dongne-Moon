import React from "react";
import "./List.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Main({
  isLogin,
  setIsLogin,
  setUserinfo,
  postHandler,
  postContent,
}) {
  const navigate = useNavigate();

  let { category } = useParams();
  console.log(category);

  return (
    <>
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setUserinfo={setUserinfo}
      />

      <div>
        <div clalssName="menu-master">
          <div className="menu-wrap">
            <div className="menu-box">
              <div className="menu-material">
                <Link to="/post=all">
                  <p
                    className="menu-font"
                    onClick={() => {
                      postHandler();
                    }}
                  >
                    둘러보기
                  </p>
                </Link>
              </div>
              <div className="menu-material">
                <Link to="/post=hobby">
                  <p className="menu-font">취미</p>
                </Link>
              </div>
              <div className="menu-material">
                <Link to="/post=food">
                  <p className="menu-font">맛집</p>
                </Link>
              </div>
              <div className="menu-material">
                <Link to="/post=pet">
                  <p className="menu-font">반려동물</p>
                </Link>
              </div>
              <div className="menu-material">
                <Link to="/post=dongne">
                  <p className="menu-font">동네소식</p>
                </Link>
              </div>
              <div className="menu-material">
                <input type="search" className="search-input"></input>
              </div>
            </div>
          </div>
        </div>
        <div className="feed-master">
          <div className="feed-wrap">
            <div className="feed">
              <div className="subject-wrap">
                <div className="subject">
                  <p>취미</p>
                </div>
              </div>
              <div className="content-wrap">
                <div className="content">오늘 족구 한 판 하실분??</div>
              </div>
              <div className="address-date-wrap">
                <div className="address">수영구</div>
                <div className="date">21.11.14</div>
              </div>
              <div className="comment-wrap">
                <div className="comment">댓글</div>
              </div>
            </div>
            <div className="feed">
              <div className="subject-wrap">
                <div className="subject">
                  <p>취미</p>
                </div>
              </div>
              <div className="content-wrap">
                <div className="content">오늘 족구 한 판 하실분??</div>
              </div>
              <div className="address-date-wrap">
                <div className="address">수영구</div>
                <div className="date">21.11.14</div>
              </div>
              <div className="comment-wrap">
                <div className="comment">댓글</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
