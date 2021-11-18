import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, patchIntro, patchNickname, patchImg } from "../actions/index";
import "./Mypage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

axios.defaults.withCredentials = true;

export default function Mypage({ }) {
  const reduxState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { user, islogin } = reduxState;
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const { nickname, email, address, intro, id, img } = user;
  const [profile, setProfile] = useState({
    nickname: nickname,
    img: img,
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
          dispatch(patchIntro(res.data.data.intro));
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
        .then((res) => {
          dispatch(patchNickname(res.data.data.nickname));
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
        dispatch(logout());
        //   setUserinfo(null);
        navigate("/main");
      });
  };

  const photoChange = (e) => {
    e.target.nextSibling.click();
  };

  // 제출되었을 때의 로직
  const PhotoSubmit = (e) => {
    e.preventDefault();
    // formData로 전송해야 multer가 알아 듣습니다.
    const formData = new FormData();
    formData.append("file", e.target.childNodes[1].files[0]);

    axios
      .patch(`${process.env.REACT_APP_API_URL}/user/img/${id}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          accesstoken: localStorage.getItem("accesstoken")
        },
      })
      .then((res) => {
        dispatch(patchImg(res.data.data.img));
      });
  };

  let style = { width: "50px", height: "50px" };
  return (
    <>
      <Header />
      <div className="mypage-master">
        {edit ? (
          <div className="mypage">
            <div className="member-master">
              <div className="member-material">
                <div className="member-box">
                  <div className="top-master">
                    <div className="top-name">
                      <img className="profile" src={`${img}`} alt="" />
                      <form
                        classname="img-modify"
                        encType="multipart/form-data"
                        style={{ position: "relative" }}
                        onSubmit={PhotoSubmit}
                      >
                        <input
                          type="button"
                          value="사진수정"
                          onClick={photoChange}
                        ></input>
                        <input
                          type="file"
                          name="file"
                          id="file"
                          accept="image/*"
                          onChange={photoChange}
                          style={{ display: "none" }}
                        />
                        <input type="submit" style={{ display: "none" }}></input>
                      </form>
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
                      <div className="text-input">{email}</div>
                    </div>
                  </div>
                  <div className="address-master">
                    <div className="address-name">주소</div>
                    <div className="address-text">
                      <div className="text-input">{address}</div>
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
                        <img src={`${img}`} style={style} />
                      </div>
                    </div>
                    <div className="top-text">

                      <div className="text-input-tick">
                        <div className="intro-array">{intro === "" ? "여러분의 일상을 공유해주세요" : intro}</div>
                      </div>
                    </div>
                  </div>
                  <div className="nick-master">
                    <div className="nick-name">닉네임</div>
                    <div className="nick-text">
                      <div className="text-input">{nickname}</div>
                    </div>
                  </div>
                  <div className="email-master1">
                    <div className="email-name">이메일</div>
                    <div className="email-text">
                      <div className="text-input">{email}</div>
                    </div>
                  </div>
                  <div className="address-master">
                    <div className="address-name">주소</div>
                    <div className="address-text">
                      <div className="text-input">{address}</div>
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
                          Swal.fire({
                            title: "정말 삭제 하겠습니까?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            cancelButtonText: "취소",
                            confirmButtonText: "삭제",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              withdraw();
                              Swal.fire("삭제완료!", "");
                            }
                          });
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
      </div>
      <Footer />
    </>
  );
}
