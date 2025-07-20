// PetsCategorySection.jsx
import { Link } from "react-router";
import { FaCat, FaDog, FaFish, FaPaw } from "react-icons/fa";
import { GiRabbit } from "react-icons/gi";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const categories = [
  {
    name: "Cats",
    icon: <FaCat className="text-4xl text-orange-500" />,
    path: "/pets/cats",
  },
  {
    name: "Dogs",
    icon: <FaDog className="text-4xl text-yellow-500" />,
    path: "/pets/dogs",
  },
  {
    name: "Rabbits",
    icon: <GiRabbit className="text-4xl text-pink-500" />,
    path: "/pets/rabbits",
  },
  {
    name: "Fish",
    icon: <FaFish className="text-4xl text-blue-500" />,
    path: "/pets/fish",
  },
  {
    name: "Others",
    icon: <FaPaw className="text-4xl text-purple-500" />,
    path: "/pets/others",
  },
];

const PetsCategorySection = () => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  return (
    <section className="py-12 px-4">
      <h2
        className={`text-3xl font-bold text-center mb-10 ${
          isDark ? "text-dark" : "text-light"
        }`}
      >
        Find Your Companion
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow ${
              isDark
                ? "card-dark border border-gray-700 text-white hover:shadow-lg"
                : "card-light border-gray-200 text-gray-700 hover:shadow-md"
            }`}
          >
            {cat.icon}
            <span
              className={`mt-3 text-lg font-semibold ${
                isDark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PetsCategorySection;
