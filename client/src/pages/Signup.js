import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import Footer from "../components/Footer";
import DaumPostcode from "react-daum-postcode";
import Swal from "sweetalert2";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
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
    address: false,
    password: false,
    confirmPW: false,
  });

  const handleInputValue = (key) => (e) => {
    setInfo({ ...info, [key]: e.target.value });

    if (key === "email") {
      if (isEmile(e.target.value)) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/user/email`, {
            email: e.target.value,
          })
          .then(() => {
            setCheckInfo({ ...checkInfo, duplicate: true, email: true });
          })
          .catch(() => {
            setCheckInfo({ ...checkInfo, email: true, duplicate: false });
          });
      } else {
        setCheckInfo({ ...checkInfo, email: false, duplicate: false });
      }
    }

    if (key === "password") {
      if (isPassword(e.target.value)) {
        setCheckInfo({ ...checkInfo, password: true });
        if (info.passwordCheck === e.target.value) {
          setCheckInfo({ ...checkInfo, password: true, confirmPW: true });
        } else {
          setCheckInfo({ ...checkInfo, password: true, confirmPW: false });
        }
      } else {
        setCheckInfo({ ...checkInfo, password: false });
        if (info.passwordCheck !== e.target.value) {
          setCheckInfo({ ...checkInfo, password: false, confirmPW: false });
        }
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

  // ?????? ??????
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
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{3,})$/i;
    return regExp.test(value);
  };
  const isPassword = (value) => {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    return regExp.test(value);
  };

  const isSignup = () => {
    if (
      checkInfo.email &&
      checkInfo.duplicate &&
      checkInfo.password &&
      checkInfo.confirmPW &&
      checkInfo.address
    ) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/user/signup`, {
          email: info.email,
          address: info.address,
          password: info.password,
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "?????? ??????",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "????????????????????????",
            text: "",
            footer: "",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "?????? ???????????????...",
        text: "",
        footer: "",
      });
    }
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
        <div className="signup-material">
          <div className="logo">
            <Link to="/main">
              <img src={require("../images/5.svg").default} alt="" className="signuplogo" />
            </Link>
          </div>
          <div className="signup-form">
            <div className="wrapper">
              <div className="inputform">
                <div className="label">?????????</div>
                <input
                  type="email"
                  className="input"
                  onChange={handleInputValue("email")}
                ></input>
                {checkInfo.email ? (
                  ""
                ) : (
                  <div className="verify warn">????????? ??? ?????? ??????????????????</div>
                )}
                {checkInfo.email === true && checkInfo.duplicate === false ? (
                  <div className="verify warn">????????? ??????????????????</div>
                ) : (
                  ""
                )}
                {checkInfo.duplicate ? (
                  <div className="verify pass">?????? ????????? ??????????????????</div>
                ) : (
                  ""
                )}

                <div className="label">??????</div>
                <input
                  type="text"
                  className="input"
                  defaultValue={info.address}
                  onFocus={() => {
                    setIsOpenPost(true);
                  }}
                ></input>
                <div className="label">????????????</div>
                <input
                  type="password"
                  className="input"
                  onChange={handleInputValue("password")}
                ></input>
                {checkInfo.password ? (
                  ""
                ) : (
                  <div className="verify warn">
                    8 ~ 16??? ??????, ?????? ?????? ?????????.
                  </div>
                )}

                <div className="label">???????????? ??????</div>
                <input
                  type="password"
                  className="input"
                  onChange={handleInputValue("passwordCheck")}
                ></input>
                {checkInfo.confirmPW ? (
                  <div className="verify pass">??????????????? ???????????????</div>
                ) : (
                  <div className="verify warn">
                    ??????????????? ???????????? ????????????
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
                  ????????????
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
