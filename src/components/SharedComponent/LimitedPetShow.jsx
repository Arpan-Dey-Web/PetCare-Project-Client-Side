import React, { useEffect, useState } from "react";
import { MapPin, Calendar, PawPrint } from "lucide-react";
import { FaLongArrowAltRight } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router";

const LimitedPetShow = () => {
  const [pets, setPets] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/limitedPets").then((res) => setPets(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900 flex items-center justify-center gap-3">
          Our Featured Pets
          <PawPrint className="w-10 h-10 text-amber-600" />
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet these adorable friends looking for their forever homes
        </p>
      </div>

      {/* Pet Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pets.map((pet) => (
          <div
            key={pet._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-200 group"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Category Badge */}
              <div className="absolute top-3 right-3">
                <span className="bg-amber-100 text-amber-800 px-4 py-1.5 rounded-full text-xs font-semibold shadow-md backdrop-blur-sm">
                  {pet.category}
                </span>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Pet Name & Breed */}
              <h3 className="text-2xl font-bold text-gray-900 mb-1 line-clamp-1">
                {pet.name}
              </h3>
              <p className="text-green-600 font-semibold mb-4 text-sm">
                {pet.breed}
              </p>

              {/* Pet Info */}
              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-pink-500" />
                  <span className="text-gray-700 text-sm">
                    {pet.age} year{pet.age > 1 ? "s" : ""} old
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700 text-sm line-clamp-1">
                    {pet.location}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* View More Button */}
              <Link to={`/pets/${pet._id}`}>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link to="/pets">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg text-base font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto">
            View All Available Pets
            <FaLongArrowAltRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LimitedPetShow;
