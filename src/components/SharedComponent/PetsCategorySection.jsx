// PetsCategorySection.jsx
import { Link } from "react-router";
import { FaCat, FaDog, FaFish, FaPaw } from "react-icons/fa";
import { GiRabbit } from "react-icons/gi";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import dogImage from "../../assets/dog.png";
import catImage from "../../assets/cat.png";
import birdImage from "../../assets/bird.png";
import rabbitImage from "../../assets/rabbit.png";

const PetsCategorySection = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const petCategories = [
    {
      name: "Dogs",
      image: dogImage,
      bgGradient: "from-orange-400 to-red-500",
      hoverGradient: "from-orange-500 to-red-600",
    },
    {
      name: "Cats",
      image: catImage,
      bgGradient: "from-purple-400 to-pink-500",
      hoverGradient: "from-orange-500 to-red-600",
    },
    {
      name: "Birds",
      image: birdImage,
      bgGradient: "from-blue-400 to-cyan-500",
      hoverGradient: "from-orange-500 to-red-600",
    },
    {
      name: "Rabbits",
      image: rabbitImage,
      bgGradient: "from-green-400 to-emerald-500",
      hoverGradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <section className="my-16 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10">
        {/* Enhanced Title Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <FaPaw
              className={`text-2xl ${
                isDark ? "text-amber-400" : "text-amber-600"
              }`}
            />
            <span
              className={`text-lg font-medium ${
                theme == "dark" ? "text-dark" : "text-light"
              }`}
            >
              Pet Categories
            </span>
            <FaPaw
              className={`text-2xl ${
                isDark ? "text-amber-400" : "text-amber-600"
              }`}
            />
          </div>

          <h2
            className={`text-6xl font-bold mb-4  ${
              theme == "dark" ? "text-dark" : "text-light"
            }`}
          >
            Find Your Perfect
          </h2>

          <h3
            className={`text-4xl font-bold  bg-clip-text  ${
              theme == "dark" ? "text-dark" : "text-light"
            }`}
          >
            Companion
          </h3>

          <div
            className={`w-24 h-1 mx-auto mt-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full`}
          ></div>
        </div>

        {/* Enhanced Pet Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4  gap-8 w-6/12 md:w-full  md:max-w-5xl  mx-auto ">
          {petCategories.map((pet, index) => (
            <div
              key={pet.name}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Main container */}
              <div
                className={`relative aspect-square rounded-full transition-all duration-500 cursor-pointer transform group-hover:scale-105  ${
                  isDark
                    ? " bg-gray-800/50 backdrop-blur-sm group-hover:border-transparent "
                    : " bg-white/80 backdrop-blur-sm group-hover:border-transparent"
                }`}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${pet.hoverGradient} rounded-full opacity-0 group-hover:opacity-90 transition-all duration-500`}
                ></div>

                {/* Image container */}
                <div className="relative bottom-0  h-full flex  justify-center rounded-full overflow-hidden">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className=" max-h-full object-contain overflow-hidden transition-all duration-500 group-hover:scale-105 drop-shadow-lg  "
                  />
                </div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <div
                    className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>

              {/* Category name */}
              <div className="text-center mt-4">
                <h3
                  className={`text-xl font-semibold transition-all duration-300 group-hover:scale-110 ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {pet.name}
                </h3>
                <div
                  className={`w-0 h-0.5 bg-gradient-to-r ${pet.bgGradient} mx-auto mt-2 group-hover:w-12 transition-all duration-500 rounded-full`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-16">
          <div
            className={`flex items-center gap-2 px-6 py-3 rounded-full ${
              isDark
                ? "bg-gray-800/30 border border-gray-700"
                : "bg-white/30 border border-gray-300"
            } backdrop-blur-sm`}
          >
            <FaPaw className="text-pink-500 animate-pulse" />
            <span
              className={`text-sm font-medium ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Choose your favorite pet category
            </span>
            <FaPaw
              className="text-purple-500 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetsCategorySection;
