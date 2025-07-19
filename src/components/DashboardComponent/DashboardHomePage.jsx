import React from "react";
import { FaPaw, FaUser, FaDonate, FaPlusCircle } from "react-icons/fa";

const DashboardHomePage = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 min-h-[calc(100vh-80px)]">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Welcome to Your Dashboard 🐾
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Manage your pets, track donations, and help adorable companions find
          their forever homes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
            <FaPaw className="text-3xl text-indigo-500 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-700">My Pets</h3>
            <p className="text-sm text-gray-500">
              View and manage pets you’ve added for adoption.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
            <FaPlusCircle className="text-3xl text-green-500 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-700">Add a Pet</h3>
            <p className="text-sm text-gray-500">
              Help more pets find homes by adding new listings.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
            <FaDonate className="text-3xl text-pink-500 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-700">Donations</h3>
            <p className="text-sm text-gray-500">
              Create or view campaigns, and track donations.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition">
            <FaUser className="text-3xl text-yellow-500 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-gray-700">Profile</h3>
            <p className="text-sm text-gray-500">
              Manage your account and dashboard settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
