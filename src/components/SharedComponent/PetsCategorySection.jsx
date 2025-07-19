// PetsCategorySection.jsx
import { Link } from "react-router";
import { FaCat, FaDog, FaFish, FaPaw } from "react-icons/fa";
import { GiRabbit } from "react-icons/gi";

const categories = [
  {
    name: "Cats",
    icon: <FaCat className="text-3xl text-orange-500" />,
    path: "/pets/cats",
  },
  {
    name: "Dogs",
    icon: <FaDog className="text-3xl text-yellow-500" />,
    path: "/pets/dogs",
  },
  {
    name: "Rabbits",
    icon: <GiRabbit className="text-3xl text-pink-500" />,
    path: "/pets/rabbits",
  },
  {
    name: "Fish",
    icon: <FaFish className="text-3xl text-blue-500" />,
    path: "/pets/fish",
  },
  {
    name: "Others",
    icon: <FaPaw className="text-3xl text-purple-500" />,
    path: "/pets/others",
  },
];

const PetsCategorySection = () => {
  return (
    <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Find Your Companion
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.path}
            className="bg-white border rounded-xl p-6 flex flex-col items-center justify-center shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {cat.icon}
            <span className="mt-3 text-lg font-semibold text-gray-700">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PetsCategorySection;
