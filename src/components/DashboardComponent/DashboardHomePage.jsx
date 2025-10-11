import React, { useContext } from "react";
import { FaPaw, FaUser, FaDonate, FaPlusCircle } from "react-icons/fa";

import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

const DashboardHomePage = () => {
  const { user } = useContext(AuthContext);

  // Dynamic classes based on theme
  const bgClass = "bg-light";
  const textPrimary = "text-light";
  const textSecondary =
    "text-accent-light";
  const cardBg = "card-light";
  const cardText = "text-light";

  return (
    <div className={`${bgClass} p-6 min-h-[calc(100vh-80px)]`}>
      <div className="max-w-5xl mx-auto text-center">
        <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${textPrimary}`}>
          Welcome to Your Dashboard 🐾
        </h1>
        <p className={`text-lg mb-10 ${textSecondary}`}>
          Manage your pets, track donations, and help adorable companions find
          their forever homes.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div
            className={`${cardBg} ${cardText} shadow-md rounded-lg p-6 hover:shadow-xl transition`}
          >
            <Link to={"/dashboard/my-added-pets"}>
              <FaPaw className="text-3xl text-indigo-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-1">My Pets</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                View and manage pets you’ve added for adoption.
              </p>
            </Link>
          </div>

          {/* Card 2 */}
          <div
            className={`${cardBg} ${cardText} shadow-md rounded-lg p-6 hover:shadow-xl transition`}
          >
            <Link to={"/dashboard/add-pet"}>
              <FaPlusCircle className="text-3xl text-green-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-1">Add a Pet</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Help more pets find homes by adding new listings.
              </p>
            </Link>
          </div>

          {/* Card 3 */}
          <div
            className={`${cardBg} ${cardText} shadow-md rounded-lg p-6 hover:shadow-xl transition`}
          >
            <Link to={"/dashboard/my-donations"}>
              <FaDonate className="text-3xl text-pink-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-1">Donations</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Create or view campaigns, and track donations.
              </p>
            </Link>
          </div>

          {/* Card 4 */}
          <div
            className={`${cardBg} ${cardText} shadow-md rounded-lg p-6 hover:shadow-xl transition`}
          >
            <Link to={"/dashboard/profile"}>
              <FaUser className="text-3xl text-yellow-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-1">Profile</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your account and dashboard settings.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;
