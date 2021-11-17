import React, { useEffect, useState } from "react";
import "./PostWrite.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PostWrite() {
  return (
    <>
      <Header />
      <div className="postwrite-box-master">
        <div className="postwrite-box-wrap">
          <div className="postwrite-box">
            <div className="postwrite-master">
              <div className="postwrite-wrap">
                <div className="postwrite">
                  <div className="info">
                    <div className="postwrite-profile">사용자</div>
                    <div>
                      <div>닉네임</div>
                      <div className="postwrite-user-address">
                        <div className="postwrite-user-information">
                          <span>주소</span>
                          <spam className="postwrite-user-views">
                            조회수 뷰
                          </spam>
                          <span className="postwrite-user-date">오예</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="postwrite-main">
                    <div className="postwrite-main-content">
                      <input className="postwrite-input"></input>
                    </div>
                    <div className="postwrite-erase-wrap">
                      <div className="postwrite-action">글 작성</div>
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
