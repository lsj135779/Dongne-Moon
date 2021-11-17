import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Post from "../components/Post";
import "./List.css";

export default function List({ isLogin, setIsLogin, setUserinfo }) {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState([]);

  let { category } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/post/${category}`).then((res) => {
      setPostContent(res.data.data);
      // console.log(postContent);
    });
  }, [category]);

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
                  <p className="menu-font">둘러보기</p>
                </Link>
              </div>
              <div className="menu-material">
                <Link to="/post=취미">
                  <p className="menu-font">취미</p>
                </Link>
              </div>
              <div className="menu-material">
                <Link to="/post=맛집">
                  <p className="menu-font">맛집</p>
                </Link>
              </div>
              <div className="menu-material">
                <Link to="/post=반려동물">
                  <p className="menu-font">반려동물</p>
                </Link>
              </div>
              <div className="menu-material">
                <Link to="/post=동네소식">
                  <p className="menu-font">동네소식</p>
                </Link>
              </div>
              <div className="menu-material">
                <input type="search" className="search-input"></input>
              </div>
            </div>
          </div>
        </div>

        {postContent.map((post, index) => (
          <Post key={index} post={post} />
        ))}
        <div className="write-master">
          <div className="write-wrap">
            <div className="write-button"></div>
            <div className="write-button"></div>
            <div className="write-button"></div>
            <div className="write-button"></div>
            <div className="write-button">
              {" "}
              <Link to="/post/create">
                <div className="write-action">글 작성</div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
