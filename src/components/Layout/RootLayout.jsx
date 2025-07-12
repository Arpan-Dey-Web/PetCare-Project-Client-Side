import React, { use } from "react";
import Navbar from "../SharedComponent/Nabbar";
import { Outlet } from "react-router";
import { ThemeContext } from "../context/ThemeContext";

const RootLayout = () => {
  const { theme } = use(ThemeContext)
  // console.log(theme);
  return (
    <div className={`${theme == "light" ? "bg-light" : "bg-dark"}`}>
      <Navbar />
      <div className=" w-11/12 mx-auto max-w-7xl">
        <div className=" my-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
