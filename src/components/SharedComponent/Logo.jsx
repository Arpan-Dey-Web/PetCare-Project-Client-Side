import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        className="w-10 rounded-xl"
        src="https://i.ibb.co/d4FJcpGW/Paw-s-Home-Logo-with-Vibrant-Compassionate-Design.png"
        alt="Paw's Home Logo"
      />
      <h1
        className="
          font-bold 
          transition-colors duration-300
        "
      >
        Pet Home
      </h1>
    </div>
  );
};

export default Logo;
