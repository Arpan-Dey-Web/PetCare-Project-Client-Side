import React from "react";
import Nabbar from "../SharedComponent/Nabbar";
import { Outlet } from "react-router";
import Banner from "../SharedComponent/Banner";
import PetsCategorySection from "../SharedComponent/PetsCategorySection";
import CallToActionSection from "../SharedComponent/CallToActionSection";
import AboutUsSection from "../SharedComponent/AboutUsSection";
import Footer from "../SharedComponent/Footer";
import Loading from "../SharedComponent/Loading";

const Home = () => {
  return (
    <div className=" mx-auto max-w-7xl my-4">
      <Banner></Banner>
      <PetsCategorySection></PetsCategorySection>
      <CallToActionSection></CallToActionSection>
      <AboutUsSection></AboutUsSection>
    </div>
  );
};

export default Home;
