import React from 'react';
import { Link } from 'react-router';

const PetCard = ({ pet }) => {
 const { _id, name, age, image, location } = pet;
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 border border-gray-100">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600 mt-1">
            <span className="font-medium">Age:</span> {age} year
            {age > 1 ? "s" : ""}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Location:</span> {location}
          </p>

          <div className="mt-4 text-right">
            <Link
              to={`/pets/${_id}`}
              className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
};

export default PetCard;