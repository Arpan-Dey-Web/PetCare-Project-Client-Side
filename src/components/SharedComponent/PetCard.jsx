import React, { useContext } from "react";
import { Link } from "react-router"; // Fixed: useRouter should be from 'react-router-dom'
import { ThemeContext } from "../context/ThemeContext";

const PetCard = ({ pet }) => {

  const { _id, name, age, image, location, category } = pet;
  const { theme } = useContext(ThemeContext);

  // Conditional classes based on theme
  const cardBg = theme === "dark" ? "card-dark" : "card-light";
  const textColor = theme === "dark" ? "text-dark" : "text-light";
  const secondaryText = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const buttonClass =
    theme === "dark"
      ? "button-dark hover:bg-[#0891b2]"
      : "button-light hover:bg-[#6d28d9]";

  return (
    <div
      className={`${cardBg} rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 border border-gray-200`}
    >
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between">
          <h2 className={`text-xl font-bold ${textColor}`}>{name}</h2>
          <div className="border p-2 rounded-2xl text-sm bg-sky-200 px-4 py-1 ">{category}</div>
        </div>

        <p className={`${secondaryText} mt-1`}>
          <span className="font-medium">Age:</span> {age} year
          {age > 1 ? "s" : ""}
        </p>
        <p className={secondaryText}>
          <span className="font-medium">Location:</span> {location}
        </p>

        <div className="mt-4 text-right">
          <Link
            to={`/pets/${_id}`}
            className={`inline-block px-4 py-2 text-sm rounded transition ${buttonClass}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
