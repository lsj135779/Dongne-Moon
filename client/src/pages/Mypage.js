import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, patchIntro, patchNickname } from "../actions/index";
import "./Mypage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Mypage({}) {
  const reduxState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { user, islogin } = reduxState;
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const { nickname, email, address, intro, id } = user;
  const [profile, setProfile] = useState({
    nickname: nickname,
    email: email,
    address: address,
    intro: intro,
  });
  const handleInputValue = (key) => (e) => {
    setProfile({ ...profile, [key]: e.target.value });
  };
  const editHandler = () => {
    if (profile.intro !== undefined) {
      let url = {
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}/user/intro/${id}`,
        headers: {
          accesstoken: localStorage.getItem("accesstoken"),
        },
        data: {
          intro: profile.intro,
        },
      };
      axios(url)
        .then((res) => {
          // console.log("res.data.data;;;", res.data.data);
          dispatch(patchIntro(res.data.data.intro));

          // setUserinfo((userinfo) => ({
          //   ...userinfo,
          //   intro: res.data.data.intro,
          // }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (profile.nickname !== undefined) {
      let url = {
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}/user/nickname/${id}`,
        headers: {
          accesstoken: localStorage.getItem("accesstoken"),
        },
        data: {
          nickname: profile.nickname,
        },
      };
      axios(url)
        // .patch(
        //   `${process.env.REACT_APP_API_URL}/user/nickname/${id}`,

        //   {
        //     nickname: profile.nickname,
        //   }
        // )
        .then((res) => {
          // console.log("res.data.data.nickname;;", res.data.data.nickname);
          dispatch(patchNickname(res.data.data.nickname));

          // setUserinfo((userinfo) => ({
          //   ...userinfo,
          //   nickname: res.data.data.nickname,
          // }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setEdit(false);
  };
  const withdraw = () => {
    let url = {
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/user/withdrawal`,
      headers: {
        accesstoken: localStorage.getItem("accesstoken"),
      },
    };
    axios(url)
      // .delete(`${process.env.REACT_APP_API_URL}/user/withdrawal`)
      .then((res) => {
        alert("회원탈퇴!");
        dispatch(logout());
        //   setUserinfo(null);
        navigate("/main");
      });
  };
  let style = { width: "50px", height: "50px" };
  return (
    <>
      <Header />
      {edit ? (
        <div className="mypage">
          <div className="member-master">
            <div className="member-material">
              <div className="member-box">
                <div className="top-master">
                  <div className="top-name">
                    <div className="profile">
                      <img src=" 사용자.png" style={style} />
                    </div>
                  </div>
                  <div className="top-text">
                    <input
                      type="text"
                      defaultValue={intro}
                      className="text-input-tick"
                      onChange={handleInputValue("intro")}
                    ></input>
                  </div>
                </div>
                <div className="nick-master">
                  <div className="nick-name">닉네임</div>
                  <div className="nick-text">
                    <input
                      type="text"
                      defaultValue={nickname}
                      className="text-input"
                      onChange={handleInputValue("nickname")}
                    ></input>
                  </div>
                </div>
                <div className="email-master1">
                  <div className="email-name">이메일</div>
                  <div className="email-text">
                    <input
                      type="text"
                      value={email}
                      className="text-input"
                    ></input>
                  </div>
                </div>
                <div className="address-master">
                  <div className="address-name">주소</div>
                  <div className="address-text">
                    <input
                      type="text"
                      value={address}
                      className="text-input"
                    ></input>
                  </div>
                </div>
                <div className="button-master">
                  <div className="mypagebox">
                    <div
                      className="submitbutton"
                      onClick={() => {
                        editHandler();
                      }}
                    >
                      수정
                    </div>
                    <div
                      className="submitbutton"
                      onClick={() => {
                        setEdit(false);
                      }}
                    >
                      취소
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mypage">
          <div className="member-master">
            <div className="member-material">
              <div className="member-box">
                <div className="top-master">
                  <div className="top-name">
                    <div className="profile">
                      <img src=" 사용자.png" style={style} />
                    </div>
                  </div>
                  <div className="top-text">
                    <input
                      type="text"
                      value={
                        intro === "" ? "여러분의 일상을 공유해주세요" : intro
                      }
                      className="text-input-tick"
                    ></input>
                  </div>
                </div>
                <div className="nick-master">
                  <div className="nick-name">닉네임</div>
                  <div className="nick-text">
                    <input
                      type="text"
                      value={nickname}
                      className="text-input"
                      onChange={handleInputValue("nickname")}
                    ></input>
                  </div>
                </div>
                <div className="email-master1">
                  <div className="email-name">이메일</div>
                  <div className="email-text">
                    <input
                      type="text"
                      value={email}
                      className="text-input"
                    ></input>
                  </div>
                </div>
                <div className="address-master">
                  <div className="address-name">주소</div>
                  <div className="address-text">
                    <input
                      type="text"
                      value={address}
                      className="text-input"
                    ></input>
                  </div>
                </div>
                <div className="button-master">
                  <div className="mypagebox">
                    <div
                      className="submitbutton"
                      onClick={() => {
                        setEdit(true);
                      }}
                    >
                      회원정보 수정
                    </div>
                    <div
                      className="submitbutton"
                      onClick={() => {
                        withdraw();
                      }}
                    >
                      회원탈퇴
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
