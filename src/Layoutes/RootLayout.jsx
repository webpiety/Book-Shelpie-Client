import React from "react";
import { Outlet } from "react-router";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import Footer from "../Pages/Shared/Footer/Footer";
import Header from "../Pages/Shared/NavBar/Header";

const RootLayout = () => {
  return (
    <div className="max-w-[1260px] mx-auto">
      <div className="navbar">
        <Header></Header>
      </div>
      <Outlet></Outlet>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
