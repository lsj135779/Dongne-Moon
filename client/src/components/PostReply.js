import React from "react";
import "./PostReply.css";

export default function PostReply({ reply }) {
  console.log(reply);
  console.log(reply.user.address.split(",")[1]);
  const style = { width: "30px", height: "30px" };
  return (
    <div className="reply-main-wrap">
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

      <div className="reply-user-content">
        <p>{reply.contents}</p>
      </div>
      <div className="reply-erase">
        <div className="write-action">댓글 삭제</div>
      </div>
    </div>
  );
}
