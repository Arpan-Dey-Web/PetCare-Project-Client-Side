import React from "react";
import Nabbar from "../SharedComponent/Nabbar";
import { Outlet } from "react-router";
import Banner from "../SharedComponent/Banner";
import PetsCategorySection from "../SharedComponent/PetsCategorySection";
import CallToActionSection from "../SharedComponent/CallToActionSection";
import AboutUsSection from "../SharedComponent/AboutUsSection";
import Footer from "../SharedComponent/Footer";
import Loading from "../SharedComponent/Loading";
import WeprovideFeatures from "../SharedComponent/WeprovideFeatures";
import FAQ from "../SharedComponent/FAQ";
import PetCare from "../SharedComponent/Petcare";
import PetsHappinessSection from "../SharedComponent/PetsHappinessSection";
import LimitedPetShow from "../SharedComponent/LimitedPetShow";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>

      <div>
        {/* <CallToActionSection></CallToActionSection> */}

        <div className=" mx-auto max-w-7xl mb-4">
          <PetsCategorySection></PetsCategorySection>
        </div>
        <WeprovideFeatures />

        <LimitedPetShow></LimitedPetShow>
        <PetsHappinessSection />

        <PetCare/> 
      </div>

      {/* <FAQ /> */}
    </div>
  );
};

export default Home;
