import React, { useEffect, useState } from "react";
import "./PostRead.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostReply from "../components/PostReply";
import styled from "styled-components";

axios.defaults.withCredentials = true;
export default function PostRead({}) {
  const reduxState = useSelector((state) => state.userReducer);
  const { user, islogin } = reduxState;
  //   const navigate = useNavigate();
  let { id } = useParams();
  const [postUser, setPostUser] = useState({});
  const [postReply, setPostReply] = useState([]);
  const [post, setPost] = useState({});
  const [replyWrite, setReplyWrite] = useState({
    reply: "",
  });

  const handleInputValue = (key) => (e) => {
    setReplyWrite({ ...replyWrite, [key]: e.target.value });
    // console.log(replyWrite);
  };

  const header = {
    accesstoken: localStorage.getItem("accesstoken"),
  };

  const createReply = () => {
    axios
      .post(
        "http://localhost:4000/comment/create",
        {
          userId: post.userId,
          contents: replyWrite.reply,
          postId: post.id,
        },
        { headers: header }
      )
      .then((res) => {
        setPostReply([...postReply, res.data.data]);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/post/read/${id}`).then((res) => {
      setPostUser(res.data.data.postUser.user);
      setPost(res.data.data.postUser);
      setPostReply(res.data.data.modifiedPostView.comments);
    });
  }, [id]);
  const style = { width: "32px", height: "32px" };

  return (
    <>
      <Header />
      <div className="read-box-master">
        <div className="read-box-wrap">
          <div className="read-box">
            <div className="post-master">
              <div className="post-wrap">
                <div className="post">
                  <div className="info">
                    <div className="user-profile">
                      <img src={`${user.img}`} style={style} />
                    </div>
                    <div className="user-info-wrap">
                      <div className="user-nickName">{postUser.nickname}</div>
                      <div className="reply-user-info-wrap">
                        {postUser.address === undefined ? null : (
                          <div>{postUser.address.split(",")[1]}</div>
                        )}
                        <div className="views-date-wrap">
                          <div className="reply-user-views">
                            조회수 {post.views}
                            <div>
                              작성일{" "}
                              {new Date(post.createdAt).toLocaleDateString(
                                "ko-kr"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="post-main">
                    <div className="post-main-content">
                      <p>{post.contents}</p>
                    </div>
                    <div className="post-erase-wrap">
                      <div className="write-action">글 수정</div>
                    </div>
                    <div className="post-erase-wrap">
                      <div className="write-action">글 삭제</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reply-master">
              <div className="reply-wrap">
                <div className="reply-title">
                  <p className="reply-name">
                    <span>댓글</span>
                    <span className="reply-count">{postReply.length}</span>
                  </p>
                </div>
              </div>
              <div className="reply">
                {postReply.map((reply, index) => (
                  <PostReply user={user} key={index} reply={reply} />
                ))}
              </div>
            </div>

            <div className="reply-input-master">
              <div className="reply-input-wrap">
                <div className="reply-input">
                  <div className="reply-content">
                    <input
                      className="reply-write"
                      onChange={handleInputValue("reply")}
                    ></input>
                  </div>
                  <div
                    className="reply-button"
                    onClick={() => {
                      createReply();
                    }}
                  >
                    댓글 달기
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
