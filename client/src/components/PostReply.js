import React, { useState } from "react";
import "./PostReply.css";
import axios from "axios";

export default function PostReply({ reply, user }) {
  console.log(reply);
  const [clicked, isClicked] = useState(true);
  const header = {
    accesstoken: localStorage.getItem("accesstoken"),
  };
  const style = { width: "30px", height: "30px" };
  const deleteComment = () => {
    axios.delete(
      `${process.env.REACT_APP_API_URL}/comment/delete/${reply.id}`,
      { headers: header }
    );
  };

  const commenterInfo = () => {
    isClicked(!clicked);
  };

  return (
    <>
      <div className="reply-main-wrap">
        <div onClick={commenterInfo}>
          {clicked ? (
            <div>
              <p>
                <img src="사용자.png" style={style} alt="" />
              </p>
              <div className="reply-user-info">
                <p>{reply.user.nickname}</p>
                <div className="reply-user-address">
                  <div className="reply-user-information">
                    <span>{reply.user.address.split(",")[1]}</span>
                    <span className="reply-user-date">
                      {new Date(reply.createdAt).toLocaleDateString("ko-kr")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="modal" onClick={commenterInfo}>
              {reply.user.intro}
            </div>
          )}
        </div>

        <div className="reply-user-content">
          <p>{reply.contents}</p>
        </div>
        <div className="reply-erase">
          {user.id === reply.user.id ? (
            <div className="write-action" onClick={deleteComment}>
              댓글 삭제
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
