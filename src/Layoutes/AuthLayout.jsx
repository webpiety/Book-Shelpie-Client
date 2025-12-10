import React from "react";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div>
      <div>
        <NavBar></NavBar>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default AuthLayout;
