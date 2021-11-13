import React from "react";
import "./Category_Hobby.css";
import { Link } from "react-router-dom";

export default function Category_Hobby() {
  return (
    <div className="main">
      <div className="left-square">
        <div className="up-left-square">
          <Link to="/post/hobby">
            <div className="big-square memo">
              <div className="container">
                <div className="pic">
                  <img
                    width="100px"
                    height="100px"
                    src="취미.png"
                    alt="Mypage"
                  />
                </div>
                <div className="title">취미</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="down-left-square">
          <Link to="/post/food">
            <div className="big-square memo">
              <div className="container">
                <div className="pic">
                  <img width="100px" height="100px" src="립.png" alt="Mypage" />
                </div>
                <div className="title">맛집</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="mid-circle">
        <Link exact to="/post">
          <div className="mabbe-circle">
            <div className="circle">둘러보기</div>
          </div>
        </Link>
      </div>
      <div className="right-square">
        <div className="up-right-square">
          <Link to="/post/pet">
            <div className="big-square memo">
              <div className="container">
                <div className="pic">
                  <img
                    width="100px"
                    height="100px"
                    src="반려동물.png"
                    alt="Mypage"
                  />
                </div>
                <div className="title">반려동물</div>
              </div>
            </div>
          </Link>
        </div>
        <div className="down-right-square">
          <Link to="/post/dongne">
            <div className="big-square memo">
              <div className="container">
                <div className="pic">
                  <img
                    width="100px"
                    height="100px"
                    src="동네소식.png"
                    alt="Mypage"
                  />
                </div>
                <div className="title">동네소식</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
