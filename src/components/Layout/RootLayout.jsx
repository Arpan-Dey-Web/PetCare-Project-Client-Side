import React, { use } from "react";
import Navbar from "../SharedComponent/Nabbar";
import { Outlet } from "react-router";

import Footer from "../SharedComponent/Footer";
// import ScrollToTop from "react-scroll-to-top";

const RootLayout = () => {
  return (
    <div className="bg-light">
      {/* <ScrollToTop /> */}
      <Navbar />
      <div>
        <div className="mb-10">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
