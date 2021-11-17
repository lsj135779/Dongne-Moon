import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./List.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosData, setPost } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Post from "../components/Post";
axios.defaults.withCredentials = true;

export default function List({}) {
  const reduxState = useSelector((state) => state.postReducer);
  const { posts } = reduxState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  let { category } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/${category}`)
      .then((res) => {
        dispatch(setPost(res.data.data));
        // setPosts(res.data.data);
      });
    // dispatch(
    // axiosData(`${process.env.REACT_APP_API_URL}/post/${category}`, setPost)
    // );
  }, [category]);
  // const categoryHandler = () => {

  // };

  const ModifyModalBackdrop = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: grid;
    place-items: center;
  `;

  const ModifyViews = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    border-radius: 15px;
    background-color: white;
    width: 400px;
    height: 400px;
  `;

  return (
    <>
      <Header />

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
                <input
                  type="search"
                  className="search-input"
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      console.log(e.target.value);
                    }
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <button
          className="modifyBtn"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          글쓰기
        </button>
        {isOpen ? (
          <ModifyModalBackdrop
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <ModifyViews onClick={(e) => e.stopPropagation()}>
              <div className="modalheader">
                <div></div>
                <h2>글 수정</h2>
                <span
                  className="closeBtn "
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  X
                </span>
              </div>
              <div className="modifyContainer">
                <div className="modifyTitle"></div>
                <textarea
                  defaultValue={
                    "가나다라마바사~~~~~~~~~~~~~~~~~~~~~1122323124124215253523qq"
                  }
                  className="text-input"
                ></textarea>
              </div>
            </ModifyViews>
          </ModifyModalBackdrop>
        ) : null}

        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
        {/* <Post /> */}
      </div>

      <Footer />
    </>
  );
}
