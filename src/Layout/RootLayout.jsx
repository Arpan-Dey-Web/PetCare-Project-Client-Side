import React from "react";

import { Outlet } from "react-router";

import Navbar from "@/components/SharedComponent/Nabbar";
import Footer from "@/components/SharedComponent/Footer";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
