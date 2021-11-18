import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <>
      <div>
        <div className="feed-master">
          <div className="feed-wrap">
            <Link to={`/post/read=${post.id}`}>
              <div className="feed">
                <div className="subject-wrap">
                  <div className="subject">
                    <p>{post.category}</p>
                  </div>
                </div>
                <div className="content-wrap">
                  <div className="content">{post.contents}</div>
                </div>
                <div className="address-date-wrap">
                  <div>{post.user.nickname}</div>
                  <div className="address">
                    {post.user.address.split(",")[1]}
                  </div>
                </div>
                <div className="comment-wrap">
                  <div className="comment">{`조회수: ${post.views}`}</div>
                  <div className="date">
                    {new Date(post.createdAt).toLocaleDateString("ko-kr")}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
