import React from "react";
import Navbar from "../SharedComponent/Nabbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto max-w-7xl">
        <div className="h-screen my-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
