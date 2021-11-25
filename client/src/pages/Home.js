import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="background">
        <div className="slogan">
          <div>혼자보다는 함께하는</div>
          <div>세상을 향한 문을 여세요</div>
        </div>
      </div>

      <div className="buttonbox">
        <Link to={"/main"} style={{ textDecoration: "none" }}>
          <div className="openbutton">OPEN THE DOOR</div>
        </Link>
      </div>
    </>
  );
}
