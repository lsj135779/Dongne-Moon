import React from "react";
import "./Post.css";

export default function Post({ post }) {
  return (
    <div className="feed-master">
      <div className="feed-wrap">
        <div className="feed">
          <div className="subject-wrap">
            <div className="subject">
              <p>{post.category}</p>
              {/* <p>gds</p> */}
            </div>
          </div>
          <div className="content-wrap">
            {/* <div className="content">q121e</div> */}
            <div className="content">{post.contents}</div>
          </div>
          <div className="address-date-wrap">
            {/* <div className="address">3434g34g</div> */}
            <div className="address">{post.user.address.split(",")[1]}</div>
            {/* <div className="date">zxvdvbsdbs</div> */}
            <div className="date">
              {new Date(post.createdAt).toLocaleDateString("ko-kr")}
            </div>
          </div>
          <div className="comment-wrap">
            {/* <div className="comment">ol89l;</div> */}
            <div className="comment">댓글: {post.comment_cnt}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
