import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Navbar from "../SharedComponent/Nabbar";
import { NavLink, Outlet } from "react-router"; // ✅ fixed router import
import {
  FaPaw,
  FaPlusCircle,
  FaClipboardList,
  FaHandHoldingHeart,
  FaDonate,
  FaHeart,
} from "react-icons/fa";


const sidebarLinks = [
  { to: "add-pet", icon: <FaPlusCircle />, label: "Add Pet" },
  { to: "my-added-pets", icon: <FaPaw />, label: "My Added Pets" },
  {
    to: "adoption-requests",
    icon: <FaClipboardList />,
    label: "Adoption Request",
  },
  {
    to: "create-donation-campaign",
    icon: <FaDonate />,
    label: "Create Donation Campaign",
  },
  {
    to: "my-donation-campaigns",
    icon: <FaHandHoldingHeart />,
    label: "My Donation Campaigns",
  },
  { to: "my-donations", icon: <FaHeart />, label: "My Donations" },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Auto-collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-11/12 mx-auto max-w-7xl my-4">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex flex-1 max-w-7xl mx-auto w-11/12 my-6 gap-4">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } bg-white shadow-xl rounded-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-200`}
        >
          {/* Sidebar Header (optional logo or title) */}
          <div className="flex items-center justify-between px-4 pt-4">
            {sidebarOpen && (
              <h2 className="text-lg font-bold text-blue-600 tracking-wide">
                PetAdopt
              </h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white transition-colors shadow flex items-center justify-center ml-auto"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? (
                <FiChevronLeft className="w-5 h-5" />
              ) : (
                <FiChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col mt-6 space-y-1 px-2">
            {sidebarLinks.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-4 py-2 rounded-lg text-gray-700 font-medium transition-all duration-300
          hover:bg-blue-100 hover:text-blue-700 ${
            isActive ? "bg-blue-200 text-blue-800 font-semibold" : ""
          }`
                }
              >
                <span className="text-xl text-blue-500 transition-transform duration-300 group-hover:scale-110">
                  {icon}
                </span>
                {sidebarOpen && (
                  <span className="transition-opacity duration-300">
                    {label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white rounded-md shadow-md p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
