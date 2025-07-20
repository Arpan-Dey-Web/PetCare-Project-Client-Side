import React, { use } from "react";
import Navbar from "../SharedComponent/Nabbar";
import { Outlet } from "react-router";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../SharedComponent/Footer";

const RootLayout = () => {
  const { theme } = use(ThemeContext)

  return (
    <div className={`${theme == "light" ? "bg-light" : "bg-dark"}`}>
      <Navbar />
      <div className=" w-11/12 mx-auto max-w-7xl">
        <div className=" my-10">
          <Outlet />
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
