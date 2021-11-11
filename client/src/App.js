import "./App.css";
<<<<<<< HEAD

function App() {
  return <div></div>;
=======
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
>>>>>>> 8fc0c081738c86a190835f899acc516a939000a7
}

export default App;
