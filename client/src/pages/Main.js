import React from "react";
import "./Main.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Category_Hobby from "../components/Category_Hobby";

export default function Main() {
  return (
    <>
      <Header />
      <Category_Hobby />
      <Footer />
    </>
  );
}
