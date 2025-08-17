import React, { use } from "react";
import Navbar from "../SharedComponent/Nabbar";
import { Outlet } from "react-router";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "../SharedComponent/Footer";
import ScrollToTop from "react-scroll-to-top";



const RootLayout = () => {
  const { theme } = use(ThemeContext)

  return (
    <div className={`${theme == "light" ? "bg-light" : "bg-dark"}`}>
      <ScrollToTop /> {/* auto scroll on route change */}
      <Navbar />
      <div className=" ">
        <div className=" mb-10">
          <Outlet />
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default RootLayout;
