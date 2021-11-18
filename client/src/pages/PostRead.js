import React, { useEffect, useState, useRef } from "react";
import "./PostRead.css";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostReply from "../components/PostReply";


axios.defaults.withCredentials = true;
export default function PostRead({ }) {
  const reduxState = useSelector((state) => state.userReducer);
  const { user, islogin } = reduxState;
  const navigate = useNavigate();
  let { id } = useParams();
  const [postUser, setPostUser] = useState({});
  const [postReply, setPostReply] = useState([]);
  const [post, setPost] = useState({});
  const [replyWrite, setReplyWrite] = useState({
    reply: "",
  });
  const [contentModify, isContentModify] = useState(true);
  const [content, setContent] = useState('');
  const inputRef = useRef(null);

  const handleInputValue = (key) => (e) => {
    setReplyWrite({ ...replyWrite, [key]: e.target.value });
  };

  const header = {
    accesstoken: localStorage.getItem("accesstoken"),
  };

  const modifiedContent = (e) => {
    setContent(e.target.value);
  }

  const postContentModify = () => {
    axios.patch(`${process.env.REACT_APP_API_URL} / post / update / ${id}`,
      {
        contents: content,
      },
      {
        headers: header
      })
      .then(res => {
        setPost(res.data.data);
        isContentModify(true);
      })
  }

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL} / post / delete /${id}`, {
        headers: header,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "글 삭제 완료",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/post=all");
      });
  };

  const createReply = (e) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/comment/create`,
        {
          userId: user.id,
          contents: replyWrite.reply,
          postId: post.id,
        },
        { headers: header }
      )
      .then((res) => {
        setPostReply([...postReply, res.data.data]);
        inputRef.current.focus();
        inputRef.current.value = "";
      });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/post/read/${id}`).then((res) => {
      setPostUser(res.data.data.postUser.user);
      setPost(res.data.data.postUser);
      setPostReply(res.data.data.modifiedPostView.comments);
      setContent(res.data.data.postUser.contents);
    });
  }, [id]);
  const style = { width: "32px", height: "32px" };


  return (
    <>
      <Header />
      <div>
        <div className="read-box-master">
          <div className="read-box-wrap">
            <div className="read-box">
              <div className="post-master">
                <div className="post-wrap">
                  <div className="post">
                    <div className="info">
                      <div className="user-profile">
                        <img src={`${postUser.img}`} style={style} />
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
                    {contentModify ?
                      <div className="post-main">
                        <div className="post-main-content">
                          <p className="contentdetails">{post.contents}</p>
                        </div>
                        <div className="post-erase-wrap">
                          <div className="write-action" onClick={() => {
                            if (user.id === post.userId) isContentModify(false)
                          }}>글 수정</div>
                        </div>
                        <div className="post-erase-wrap">
                          <div className="write-action" onClick={() => {
                            if (user.id === post.userId) handleDelete()
                          }}>글 삭제</div>
                        </div>
                      </div>
                      :
                      <div className="post-main">
                        <div className="post-main-content">
                          <textarea className="modifiedContent" value={content} onChange={(e => modifiedContent(e))} />
                        </div>
                        <div className="post-erase-wrap">
                          <div className="write-action" onClick={() => postContentModify()}>수정 완료</div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className="reply-master">
                <p className="reply-name">
                  <span>댓글</span>
                  <span className="reply-count">{postReply.length}</span>
                </p>
                <div className="reply">
                  {postReply.map((reply, index) => (
                    <PostReply user={user} key={index} reply={reply} setPostReply={setPostReply} />
                  ))}
                </div>
              </div>

              <div className="reply-input-master">
                <div className="reply-input-wrap">
                  <div className="reply-input">
                    <div className="reply-content">
                      <input
                        ref={inputRef}
                        defaultValue={""}
                        className="reply-write"
                        onChange={handleInputValue("reply")}
                      ></input>
                    </div>
                    <div
                      className="reply-button"
                      onClick={(e) => {
                        createReply(e);
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
      </div>

      <Footer />
    </>
  );
}
