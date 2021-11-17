import React from "react";
import { useState } from "react";
import "./Mypage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Mypage({ userinfo, isLogin, setUserinfo, setIsLogin }) {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const { nickname, email, address, intro, id, img } = userinfo;
  const [thumbnail, isThumbnail] = useState(img);
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
      axios
        .patch(
          `http://localhost:4000/user/intro/${id}`,

          {
            intro: profile.intro,
          }
        )
        .then((res) => {
          console.log(res.data.data.intro);
          setUserinfo((userinfo) => ({
            ...userinfo,
            intro: res.data.data.intro,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (profile.nickname !== undefined) {
      axios
        .patch(
          `http://localhost:4000/user/nickname/${id}`,

          {
            nickname: profile.nickname,
          }
        )
        .then((res) => {
          console.log(res.data.data.nickname);
          setUserinfo((userinfo) => ({
            ...userinfo,
            nickname: res.data.data.nickname,
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setEdit(false);
  };

  const withdraw = () => {
    axios.delete("http://localhost:4000/user/withdrawal").then((res) => {
      alert("회원탈퇴!");
      setIsLogin(false);
      //   setUserinfo(null);
      navigate("/main");
    });
  };

  const photoChange = (e) => {
    console.log('사진 제출')
    e.target.nextSibling.click();
  };

  // 제출되었을 때의 로직
  const PhotoSubmit = (e) => {
    console.log('사진 업로드')
    e.preventDefault();
    // formData로 전송해야 multer가 알아 듣습니다.
    const formData = new FormData();
    formData.append("file", e.target.childNodes[1].files[0]);

    axios.patch(`http://localhost:4000/user/img/${id}`, formData, {
      header: {
        "content-type": "multipart/form-data",
      },
    }).then((res) => {
      console.log(res.data);
      isThumbnail(res.data.data.img);
      setUserinfo((userinfo) => ({
        ...userinfo,
        img: res.data.data.img,
      }));
    })
  };

  return (
    <>
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        setUserinfo={setUserinfo}
      />
      {edit ? (
        <div className="mypage">
          <div className="member-master">
            <div className="member-material">
              <div className="member-box">
                <div className="top-master">
                  <div className="top-name">
                    <div className="profile">
                      <img className="profile" src={`${img}`} alt="나만의 프로필 사진을 넣어보세요." />
                    </div>
                    <form
                      classname="img-modify"
                      encType="multipart/form-data"
                      style={{ position: "relative" }}
                      onSubmit={PhotoSubmit}
                    >
                      <input type="button" value="사진수정" onClick={photoChange}></input>
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
                    <div className="circle">
                      <img className="circle" src={`${img}`} alt="썸네일" />
                    </div>
                  </div>
                  <div className="top-text">
                    <input
                      type="text"
                      value={
                        userinfo.intro === ""
                          ? "여러분의 일상을 공유해주세요"
                          : intro
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
