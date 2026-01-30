import React, { useEffect, useState, useContext } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { NavLink, Outlet } from "react-router";
import {
  FaPaw,
  FaPlusCircle,
  FaClipboardList,
  FaHandHoldingHeart,
  FaDonate,
  FaHeart,
  FaUser,
  FaUsers,
  FaDog,
  FaUserShield,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const Dashboard = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [role] = useRole();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d97706",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = await axios.post(
          `${import.meta.env.VITE_API}/logout`,
          {},
          { withCredentials: true }
        );

        signOutUser();

        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out successfully",
          icon: "success",
          confirmButtonColor: "#d97706",
        });
      }
    });
  };

  const sidebarLinks = [
    { to: "/", icon: <FaHome />, label: "Home" },
    { to: "profile", icon: <FaUser />, label: "Profile" },
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
    ...(role === "admin"
      ? [
          {
            to: "admin-dashboard",
            icon: <FaUserShield />,
            label: "Admin Dashboard",
          },
          {
            to: "admin/allusers",
            icon: <FaUsers />,
            label: "Active Users",
          },
          { to: "admin/allpets", icon: <FaDog />, label: "All Pets" },
          {
            to: "admin/alldonation",
            icon: <FaDonate />,
            label: "All Donations",
          },
        ]
      : []),
  ];

  return (
    <div className="flex justify-center h-screen bg-light overflow-hidden">
      <div className="flex w-full h-screen overflow-hidden">
        {/* Fixed Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 flex-shrink-0 flex flex-col`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
            {sidebarOpen && (
              <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-amber-100 hover:text-amber-700 transition-colors ml-auto"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? (
                <FiChevronLeft className="w-5 h-5" />
              ) : (
                <FiChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation Links - Scrollable if needed */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {sidebarLinks.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-amber-50 text-amber-700 font-semibold shadow-sm"
                    : "text-gray-700 hover:bg-gray-100"
                }`
                }
              >
                <span
                  className={`text-xl transition-transform group-hover:scale-110`}
                >
                  {icon}
                </span>
                {sidebarOpen && (
                  <span className="transition-opacity duration-300 text-sm">
                    {label}
                  </span>
                )}
              </NavLink>
            ))}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`w-full group flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:bg-red-50 hover:text-red-600 mt-4 border-t border-gray-200 pt-4`}
            >
              <span className="text-xl transition-transform group-hover:scale-110">
                <FaSignOutAlt />
              </span>
              {sidebarOpen && (
                <span className="transition-opacity duration-300 text-sm">
                  Logout
                </span>
              )}
            </button>
          </nav>
        </aside>

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 h-screen overflow-y-auto transition-all duration-300">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
