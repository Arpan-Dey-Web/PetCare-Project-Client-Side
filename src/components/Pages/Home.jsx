import React from "react";
import Nabbar from "../SharedComponent/Nabbar";
import { Outlet } from "react-router";
import Banner from "../SharedComponent/Banner";
import PetsCategorySection from "../SharedComponent/PetsCategorySection";
import AboutUsSection from "../SharedComponent/AboutUsSection";


import WeprovideFeatures from "../SharedComponent/WeprovideFeatures";
import FAQ from "../SharedComponent/FAQ";

import PetsHappinessSection from "../SharedComponent/PetsHappinessSection";
import LimitedPetShow from "../SharedComponent/LimitedPetShow";
import PetCare from "../SharedComponent/PetCare";

const Home = () => {
  return (
    <div>
      <div>
        <Banner />
        <div className=" mx-auto max-w-7xl mb-4">
          <PetsCategorySection />
        </div>
        <WeprovideFeatures />
        <LimitedPetShow />
        <PetsHappinessSection />
        <PetCare />
      </div>
    </div>
  );
};

export default Home;
