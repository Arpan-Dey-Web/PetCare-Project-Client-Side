import React from "react";
import { Link } from "react-router";
import { MapPin, Calendar } from "lucide-react";

const PetCard = ({ pet }) => {
  const { _id, name, age, image, location, category } = pet;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 group">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-semibold shadow-md backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Pet Name */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-1">
          {name}
        </h2>

        {/* Pet Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Age:</span> {age} year
              {age > 1 ? "s" : ""} old
            </p>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-600" />
            <p className="text-gray-600 text-sm line-clamp-1">
              <span className="font-medium">Location:</span> {location}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* View Details Button */}
        <Link
          to={`/pets/${_id}`}
          className="w-full block text-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 bg-amber-600 hover:bg-amber-700 text-white shadow-md hover:shadow-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
