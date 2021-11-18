import React, { useEffect, useState, useMemo } from "react";
import "./PostWrite.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { logout, patchIntro, patchNickname, patchImg } from "../actions/index";
const logoImg = require("../images/5.svg").default;

export default function PostWrite() {

  const reduxState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { user, islogin } = reduxState;
  const navigate = useNavigate();
  const [postWrite, setPostWrite] = useState({
    contents: "",
  });
  const [selected, setSelected] = useState("");

  const handleInputValue = (key) => (e) => {
    setPostWrite({ ...postWrite, [key]: e.target.value });
  };

  const header = {
    accesstoken: localStorage.getItem("accesstoken"),
  };
  const createPost = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/post/create`,
        {
          userId: user.id,
          category: selected.value,
          contents: postWrite.contents,
        },
        { headers: header }
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "글 작성 완료!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/post=${selected.value}`);
      });
  };

  const options = useMemo(
    () => [
      { value: "취미", label: "취미" },
      { value: "맛집", label: "맛집" },
      { value: "반려동물", label: "반려동물" },
      { value: "동네소식", label: "동네소식" },
    ],
    []
  );
  const handleChange = (selected) => {
    setSelected(selected);
  };

  return (
    <>
      <Header />
      <div className="postwrite-master">
        <div className="postwrite-material">
          <div className="logo">
            <Link to="/main">
              <img src={logoImg} className="logo" />
            </Link>
          </div>
          <div className="postwrite-master">
            <div className="postwrite-wrap">
              <div className="postwrite-form">
                <div className="email-master">
                  <div className="writelabel">
                    <div className="subject-select">
                      <div className="category">
                        무엇을 공유하고 싶으신가요?
                      </div>
                      <Select
                        options={options}
                        value={selected}
                        onChange={handleChange}
                        defaultMenuIsOpen
                      />
                    </div>
                  </div>
                  <textarea
                    className="wrtieinput"
                    onChange={handleInputValue("contents")}
                  ></textarea>
                </div>

                <div className="submitbox">
                  <div
                    className="submitbutton"
                    onClick={() => {
                      createPost();
                    }}
                  >
                    글 작성
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
