import React, { useState } from "react";
import "./PostReply.css";
import axios from "axios";

export default function PostReply({ reply, user, setPostReply }) {

  const [clicked, isClicked] = useState(true);
  const [commenterInfo, setCommenterInfo] = useState(null);
  const header = {
    accesstoken: localStorage.getItem("accesstoken"),
  };
  const style = { width: "30px", height: "30px" };

  const deleteComment = () => {
    axios.delete(
      `${process.env.REACT_APP_API_URL}/comment/delete/${reply.id}`,
      { headers: header }
    ).then(res => {
      setPostReply([...res.data.data.comments]);
    })
  };
  const date = new Date(reply.createdAt)
    .toLocaleDateString("ko-kr")
    .split("")
    .splice(2)
    .join("");
  const getCommenterInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/comment/read/${reply.id}/`)
      .then((res) => {
        setCommenterInfo(res.data.data);
        isClicked(!clicked);
      });
  };

  return (
    <>
      {clicked ? (
        <div className="reply-main-wrap">
          <div className="commenterInfo" onClick={getCommenterInfo}>
            <img src={`${reply.user.img}`} style={style} alt="" />
            <div className="reply-user-info">
              <div className="font-size-large">{reply.user.nickname}</div>
              <div className="reply-user-address">
                <div className="reply-user-information">
                  {reply.user.address.split(",")[1]}
                </div>
              </div>
            </div>
          </div>
          <div className="reply-user-content">
            <div className="reply-contents">{reply.contents}</div>
            <div className="reply-user-date">
              {date.split("").splice(0, 10).join("")}
            </div>
          </div>
          <div className="reply-erase">
            {user.id === reply.user.id ? (
              <div className="delete-btn" onClick={deleteComment}>
                삭제
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div
          className="modal"
          onClick={() => isClicked(!clicked)}
          role="dialog"
        >
          <div className="commenterInfo-modal">
            <img
              src={commenterInfo.user.img}
              style={style}
              alt="commenterImg"
            ></img>
            <div className="commenterNickname">
              {commenterInfo.user.nickname}
            </div>
          </div>
          <div className="commenterIntro">{commenterInfo.user.intro}</div>
        </div>
      )}
    </>
  );
}
