import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Signup from "./pages/Signup";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/main" element={<Main />} isLogin={isLogin} />
      </Routes>
      <Routes>
        <Route path="/user/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
