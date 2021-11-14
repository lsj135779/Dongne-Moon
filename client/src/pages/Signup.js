import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import Footer from "../components/Footer";
import DaumPostcode from "react-daum-postcode";

export default function Signup() {
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    address: "",
    password: "",
    passwordCheck: "",
  });
  const [checkInfo, setCheckInfo] = useState({
    email: false,
    duplicate: false,
    addresses: false,
    password: false,
    confirmPW: false,
  });

  const handleInputValue = (key) => (e) => {
    setInfo({ ...info, [key]: e.target.value });

    if (key === "email") {
      if (isEmile(e.target.value)) {
        setCheckInfo({ ...checkInfo, email: true });
        console.log("서버로 중복체크!");
      } else {
        setCheckInfo({ ...checkInfo, email: false });
      }
    }

    if (key === "password") {
      if (isPassword(e.target.value)) {
        setCheckInfo({ ...checkInfo, password: true });
      } else {
        setCheckInfo({ ...checkInfo, password: false });
      }
    }

    if (key === "passwordCheck") {
      if (info.password === e.target.value) {
        setCheckInfo({ ...checkInfo, confirmPW: true });
      } else {
        setCheckInfo({ ...checkInfo, confirmPW: false });
      }
    }
  };

  // 주소 기능
  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      if (data.bname !== "") {
        extraAddr += `, ${data.bname}`;
      }
      fullAddr += extraAddr !== "" ? ` ${extraAddr}` : "";
    }
    setInfo({ ...info, ["address"]: fullAddr });
    setCheckInfo({ ...checkInfo, address: true });
    setIsOpenPost(false);
  };

  const postCodeStyle = {
    display: "block",
    position: "relative",
    top: "0%",
    width: "400px",
    height: "400px",
    padding: "7px",
  };

  const isEmile = (value) => {
    let regExp =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return regExp.test(value);
  };
  const isPassword = (value) => {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    return regExp.test(value);
  };

  const isSignup = (val) => {
    console.log("버튼클릭!!!", val);
    // console.log("checkInfo;;;", checkInfo);
  };

  return (
    <div>
      {isOpenPost ? (
        <div
          className="modalBackdrop"
          onClick={() => {
            setIsOpenPost(false);
          }}
        >
          <DaumPostcode
            style={postCodeStyle}
            autoClose
            onComplete={onCompletePost}
          />
        </div>
      ) : null}
      <div className="signup-master">
        {/* <div className="signup-material"></div> */}
        <div className="signup-material">
          <div className="logo">
            <Link to="/main">
              <img src="자산 5.svg" alt="" className="signuplogo" />
            </Link>
          </div>
          <div className="signup-form">
            <div className="wrapper">
              <div className="inputform">
                <div className="label">이메일</div>
                <input
                  type="email"
                  className="input"
                  onChange={handleInputValue("email")}
                ></input>
                {checkInfo.email ? (
                  ""
                ) : (
                  <div className="verify warn">사용할 수 없는 이메일입니다</div>
                )}

                <div className="verify warn hide">중복된 이메일입니다</div>
                <div className="verify pass hide">사용 가능한 이메일입니다</div>
                <div className="label">주소</div>
                <input
                  type="text"
                  className="input"
                  defaultValue={info.address}
                  onClick={() => {
                    setIsOpenPost(true);
                  }}
                ></input>
                <div className="label">비밀번호</div>
                <input
                  type="password"
                  className="input"
                  onChange={handleInputValue("password")}
                ></input>
                {checkInfo.password ? (
                  ""
                ) : (
                  <div className="verify warn">8 ~ 16자 영문, 숫자 조합</div>
                )}

                <div className="label">비밀번호 확인</div>
                <input
                  type="password"
                  className="input"
                  onChange={handleInputValue("passwordCheck")}
                ></input>
                {checkInfo.confirmPW ? (
                  <div className="verify pass">비밀번호가 일치합니다</div>
                ) : (
                  <div className="verify warn">
                    비밀번호가 일치하지 않습니다
                  </div>
                )}
              </div>
              <div className="submitbox">
                <div
                  onClick={() => {
                    isSignup();
                  }}
                  className="submitbutton"
                >
                  가입하기
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="signup-material"></div> */}
      </div>
      <Footer />
    </div>
  );
}
