import React, { useState, useEffect, useCallback } from "react";
import "./List.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Loader from "../components/Loader";
import axios from "axios";
import Post from "../components/Post";
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;

export default function List({ }) {
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isData, setIsData] = useState(true);
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [ref, inView] = useInView({
    threshold: 1,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  let { category } = useParams();

  const handleSerch = (key) => {
    if (keyword === " " || keyword === "") {
      Swal.fire({
        icon: "error",
        title: "동네를 입력해 주세요",
        text: "",
        footer: "",
      });
      return;
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/post/search?`, {
        keyword: keyword,
      }).then((res) => {
        setKeyword("")
        setPostContent(res.data.data);
        setIsData(false)
      })
      .catch((err) => setIsData(false));



  }

  const getItems = useCallback(async () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_URL}/post/${category}?page=${page}`)
      .then((res) => {
        setPostContent((postContent) => [...postContent, ...res.data.data]);
      })
      .catch((err) => setIsData(false));
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [page, category]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <>
      <Header />

      <div>
        <div clalssName="menu-master">
          <div className="menu-wrap">
            <div className="menu-box">
              <div className="menu-material">
                <Link to="/post=all" onClick={() => {
                  setPostContent([]);
                  setPage(1);
                }}>
                  <p className="menu-font">둘러보기</p>
                </Link>
              </div>
              <div className="menu-material">
                <Link to="/post=취미" onClick={() => {
                  setPostContent([]);
                  setPage(1);
                }}>
                  <p className="menu-font">취미</p>
                </Link>
              </div>
              <div className="menu-material">
                <Link to="/post=맛집" onClick={() => {
                  setPostContent([]);
                  setPage(1);
                }}>
                  <p className="menu-font">맛집</p>
                </Link>
              </div>
              <div className="menu-material">
                <Link to="/post=반려동물" onClick={() => {
                  setPostContent([]);
                  setPage(1);
                }}>
                  <p className="menu-font">반려동물</p>
                </Link>
              </div>
              <div className="menu-material">
                <Link to="/post=동네소식" onClick={() => {
                  setPostContent([]);
                  setPage(1);
                }}>
                  <p className="menu-font">동네소식</p>
                </Link>
              </div>
              <div className="menu-material">
                <input
                  type="search"
                  className="search-input"
                  value={keyword}
                  onChange={(e) => { setKeyword(e.target.value) }}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleSerch(e.key)
                    }
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>

        {postContent.slice(0).reverse().map((post, index) => (
          <Post key={index} post={post} />
        ))}

        {isData ? (
          <div className="Target-Element" inView={inView} ref={ref}>
            {loading && <Loader ref={ref} />}
          </div>
        ) : null}

        <div className="write-button">
          <Link to="/post/write">
            <div className="write-action">글 작성</div>
          </Link>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}
