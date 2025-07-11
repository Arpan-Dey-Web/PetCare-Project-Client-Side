import React from "react";
import Nabbar from "../SharedComponent/Nabbar";
import { Outlet } from "react-router";
import Banner from "../SharedComponent/Banner";

const Home = () => {
  return (
    <div className="w-11/12 mx-auto max-w-7xl my-4">
      <Banner></Banner>
      <div className="h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
