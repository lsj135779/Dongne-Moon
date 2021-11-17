import React from "react";
import "./Post.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Post({ post }) {
  //   const navigate = useNavigate();

  //   let { category } = useParams();
  //   console.log(category);

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
                  <div className="address">{post.address}</div>
                  <div className="date">{post.createdAt}</div>
                </div>
                <div className="comment-wrap">
                  <div className="comment">{`댓글 ${post.comment_cnt}`}</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
