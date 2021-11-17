import "./Main.css";
import Header from "../components/Header";
import Category_Hobby from "../components/Category_Hobby";
import Footer from "../components/Footer";

export default function Main({ isLogin, setIsLogin, setUserinfo }) {
  return (
    <>
      <Header setUserinfo={setUserinfo} />
      <Category_Hobby />
      <Footer />
    </>
  );
}
