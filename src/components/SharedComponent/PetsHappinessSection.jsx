import React from "react";
import { motion } from "framer-motion";
import { FaUserMd, FaHeart, FaShieldAlt, FaStar, FaPaw } from "react-icons/fa";
// src = "/src/assets/happypet.png";
import happypetImage from "../../assets/happypet.png";
import { Sparkles } from "lucide-react";
const PetsHappinessSection = () => {
  const features = [
    {
      title: "Experienced Professionals",
      description:
        "Our team consists of highly trained and passionate pet care experts dedicated to ensuring your pet's well-being.",
      icon: <FaUserMd className="text-xl sm:text-2xl" />,
      position: "top-left",
      iconBg: "from-blue-400 to-blue-600",
    },
    {
      title: "Comprehensive Services",
      description:
        "From grooming to boarding, we offer a wide range of services to meet all your pet's needs under one roof.",
      icon: <FaShieldAlt className="text-xl sm:text-2xl" />,
      position: "top-right",
      iconBg: "from-purple-400 to-purple-600",
    },
    {
      title: "Loving Environment",
      description:
        "We prioritize your pet's safety and comfort, providing a nurturing and secure setting for them to thrive.",
      icon: <FaHeart className="text-xl sm:text-2xl" />,
      position: "bottom-left",
      iconBg: "from-pink-400 to-pink-600",
    },
    {
      title: "Customer Satisfaction",
      description:
        "We pride ourselves on exceptional customer service, with numerous happy clients who trust us.",
      icon: <FaStar className="text-xl sm:text-2xl" />,
      position: "bottom-right",
      iconBg: "from-amber-400 to-amber-600",
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3 h-3" />
            Happiness Guaranteed
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Your Pets Will Be Extremely <br />
            <span className="text-orange-500 italic font-serif">
              Happy With Us
            </span>
          </h2>
        </div>

        {/* Mobile & Tablet Layout */}
        <div className="block lg:hidden">
          {/* Central Image for Mobile */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div
              className={`w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-orange-100 to-pink-100
              flex items-center justify-center shadow-xl`}
            >
              <div className="relative">
                <img
                  src="/src/assets/happypet.png"
                  alt="Happy pets - dog and cat together"
                  className="w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 object-cover rounded-full"
                  style={{
                    filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.1))",
                  }}
                />
                {/* Decorative elements */}
                <div className="absolute -top-2 -left-2 text-xl sm:text-2xl animate-bounce">
                  ✨
                </div>
                <div className="absolute -top-1 -right-3 text-lg sm:text-xl animate-pulse">
                  💖
                </div>
                <div
                  className="absolute -bottom-2 -right-1 text-xl sm:text-2xl animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  🌟
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards Grid for Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`bg-white border-gray-200
                   rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border backdrop-blur-sm`}
                >
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r ${feature.iconBg} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
                    >
                      {feature.icon}
                    </div>
                    <h3
                      className={`text-base sm:text-lg font-bold text-gray-800
                      `}
                    >
                      {feature.title}
                    </h3>
                  </div>
                  <p
                    className={`text-sm leading-relaxed text-gray-600
                    `}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout (Large screens and up) */}
        <div className="hidden lg:block">
          <div className="relative flex items-center justify-center min-h-[600px]">
            {/* Central Circle with Pets */}
            <div className="relative">
              {/* Large Background Circle */}
              <div
                className={`w-[500px] h-[500px] rounded-full bg-gradient-to-br from-orange-100 to-pink-100
                flex items-center justify-center shadow-2xl`}
              >
                <div className="relative">
                  <img
                    src={happypetImage}
                    alt="Happy pets - dog and cat together"
                    className="w-full h-full object-cover rounded-full"
                    style={{
                      filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))",
                    }}
                  />
                  {/* Decorative elements around pets */}
                  <div className="absolute -top-4 -left-4 text-3xl animate-bounce">
                    ✨
                  </div>
                  <div className="absolute -top-2 -right-6 text-2xl animate-pulse">
                    💖
                  </div>
                  <div
                    className="absolute -bottom-4 -right-2 text-3xl animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  >
                    🌟
                  </div>
                </div>
              </div>

              {/* Feature Cards Positioned Around Circle */}
              {features.map((feature, index) => {
                const positions = {
                  "top-left": "absolute -top-8 -left-48",
                  "top-right": "absolute -top-8 -right-48",
                  "bottom-left": "absolute -bottom-8 -left-48",
                  "bottom-right": "absolute -bottom-8 -right-48",
                };

                return (
                  <div
                    key={index}
                    className={`${
                      positions[feature.position]
                    } w-72 transform hover:scale-105 transition-all duration-300`}
                  >
                    <div
                      className={`bg-white border-gray-200 rounded-2xl p-6 shadow-xl border backdrop-blur-sm`}
                    >
                      {/* Icon */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.iconBg} flex items-center justify-center text-white shadow-lg`}
                        >
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`text-lg font-bold mb-2 text-gray-800
                            `}
                          >
                            {feature.title}
                          </h3>
                        </div>
                      </div>
                      <p
                        className={`text-sm leading-relaxed text-gray-600
                        `}
                      >
                        {feature.description}
                      </p>
                    </div>

                    {/* Connecting Line to Center */}
                    <div
                      className={`absolute ${
                        feature.position.includes("left")
                          ? "right-0 top-1/2"
                          : "left-0 top-1/2"
                      } translate-y-0`}
                    >
                      <div
                        className={`w-16 h-px bg-gradient-to-r ${
                          feature.position.includes("left")
                            ? `${feature.iconBg.split(" ")[1]} to-transparent`
                            : `from-transparent ${feature.iconBg.split(" ")[3]}`
                        } opacity-30`}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetsHappinessSection;
