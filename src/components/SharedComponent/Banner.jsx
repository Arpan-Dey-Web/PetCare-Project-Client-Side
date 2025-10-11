import React from "react";

import eagleImage from "@/assets/eagle.png";
import dogImage from "@/assets/dogBanner.png";
import catImage from "@/assets/catlying.png";
import { Button } from "../ui/button";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="relative h-[90vh] w-full mb-16 bg-cover bg-center overflow-hidden">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content Wrapper */}
      <div className="relative flex justify-between  h-full z-20">
        {/* Left image */}
        <div className=" h-full items-end hidden lg:flex">
          <img
            src={eagleImage}
            alt="Eagle"
            className="h-full object-contain"
            style={{ objectPosition: "bottom" }}
          />
        </div>

        {/* Center text */}
        <div className="flex flex-col mt-14 items-center text-white text-center px-6 max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-7xl font-extrabold mb-4  block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            The Best Care for <br /> Your Best Friend
          </h1>
          {/* <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            The Best Care for <br /> Your Best Friend */}
          {/* </span> */}
          <p className="text-sm md:text-lg lg:text-2xl text-white/90 max-w-xl leading-relaxed">
            At <span className="font-semibold text-amber-400">PetPath</span>, we
            provide exceptional care and services for your pets, including
            grooming, boarding, and walking. Trust us to ensure your furry
            friends are happy.
          </p>
          {/* cat image show  cat one hand touch this button  */}
          <Link to="/pets">
            <Button
              value={"View more"}
              className="z-10  mt-5 px-8 lg:py-8 rounded-full text-lg font-semibold bg-gradient-to-r from-amber-500 to-pink-500 shadow-lg hover:scale-105 hover:shadow-pink-400/50 transition-all overflow-hidden lg:w-2xs  "
            />
          </Link>

          <div className=" w-full ">
            <img className="" src={catImage} alt="" />
          </div>
        </div>

        {/* Right image */}
        <div className="hidden lg:flex h-full items-end">
          <img
            src={dogImage}
            alt="Dog"
            className="h-full object-contain"
            style={{ objectPosition: "bottom" }}
          />
        </div>

        {/* Wave bottom border */}
        <svg
          className="absolute bottom-0 left-0 w-full h-16 md:h-24 lg:h-32"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill={"#f8fafc"}
            fillOpacity="1"
            d="M0,64L48,85.3C96,107,192,149,288,170.7C384,192,480,192,576,202.7C672,213,768,235,864,229.3C960,224,1056,192,1152,170.7C1248,149,1344,139,1392,133.3L1440,128V320H0Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Banner;
