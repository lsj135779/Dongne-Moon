import React, { useEffect, useState } from "react";
import "./PostRead.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostReply from "../components/PostReply";
import styled from "styled-components";

export default function PostRead() {
  //   const navigate = useNavigate();
  let { id } = useParams();
  const [postUser, setPostUser] = useState({});
  const [post, setPost] = useState({});
  const [postReply, setPostReply] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/post/read/${id}`).then((res) => {
      console.log(res.data.data);
      console.log(res.data.data.postUser);

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
                      <img src="사용자.png" style={style} />
                    </div>
                    <div>
                      <div>{postUser.nickname}</div>
                      <div className="reply-user-address">
                        <div className="reply-user-information">
                          <span>{postUser.address.split(",")[1]}</span>
                          <spam>{post.views}</spam>
                          <span className="reply-user-date">
                            {new Date(post.createdAt).toLocaleDateString(
                              "ko-kr"
                            )}
                          </span>
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
                    <span className="reply-count">{post.comment_cnt}</span>
                  </p>
                </div>
              </div>
              <div className="reply">
                {postReply.map((reply, index) => (
                  <PostReply key={index} reply={reply} />
                ))}
              </div>
            </div>

            <div className="reply-input-master">
              <div className="reply-input-wrap">
                <div className="reply-input">
                  <div className="reply-content">거기 맛없던데여?</div>
                  <div className="write-action">댓글 달기</div>
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
