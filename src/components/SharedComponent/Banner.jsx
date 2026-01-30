import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

import eagleImage from "@/assets/eagle.png";
import dogImage from "@/assets/dogBanner.png";
import catImage from "@/assets/catlying.png";

const Banner = () => {
  return (
    <div className="relative h-[90vh] w-full mb-16 bg-[#0f172a] overflow-hidden">
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 z-10"></div>

      {/* Background Decorative "Glow" */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/20 rounded-full blur-[120px]"></div>

      <div className="relative flex justify-between h-full z-20  ">
        {/* Left Side: Floating Eagle */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="h-full items-end hidden lg:flex flex-1"
        >
          <motion.img
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            src={eagleImage}
            alt="Eagle"
            className="h-[80%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        {/* Center Content */}
        <div className="flex flex-col items-center justify-center text-white text-center px-6 z-30 flex-[2] mt-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-6 uppercase tracking-widest"
          >
            🐾 Premium Pet Care
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-8xl font-black mb-6 leading-tight"
          >
            The Best Care for <br />
            <span className="bg-gradient-to-r from-amber-400 via-pink-500 to-red-500 bg-clip-text text-transparent italic font-serif">
              Your Best Friend
            </span>
          </motion.h1>

          {/* Button Area with Cat Interaction */}
          <div className="relative group">
            <Link to="/pets">
              <button className="relative z-10 mt-5 px-10 py-5 rounded-2xl text-2xl font-bold bg-gradient-to-r from-amber-500 to-pink-600 shadow-[0_10px_30px_rgba(236,72,153,0.3)] hover:shadow-[0_15px_40px_rgba(236,72,153,0.5)] hover:-translate-y-1 active:scale-95 transition-all cursor-pointer">
                Browse Pets
              </button>
            </Link>
          </div>

          <p className="mt-8 text-gray-300 max-w-md text-lg italic">
            "Because every paw deserves a warm home and a happy heart."
          </p>
        </div>

        {/* Right Side: Sliding Dog */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex h-full items-end flex-1"
        >
          <img
            src={dogImage}
            alt="Dog"
            className="h-[85%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          />
        </motion.div>

        {/* Improved Wave - Matches your #f8fafc background */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-full h-24"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,88.71,133.26,81,189.39,72.52c41.35-6.24,85-11.23,132-16.08Z"
              fill="#f8fafc"
            ></path>
          </svg>
        </div>
      </div>
      {/* This SVG at the bottom of your dark banner makes it "bleed" into the white section below */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,88.71,133.26,81,189.39,72.52c41.35-6.24,85-11.23,132-16.08Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Banner;
