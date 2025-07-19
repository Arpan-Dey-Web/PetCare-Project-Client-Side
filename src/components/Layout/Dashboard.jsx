import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { NavLink, Outlet } from "react-router"; // ✅ Fixed react-router import
import Navbar from "../SharedComponent/Nabbar";
import {
  FaPaw,
  FaPlusCircle,
  FaClipboardList,
  FaHandHoldingHeart,
  FaDonate,
  FaHeart,
  FaUsers,
  FaDog,
} from "react-icons/fa";
import useRole from "../hooks/useRole";


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [role] = useRole();

  // Auto collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
      else setSidebarOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


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
    // Admin-only routes (conditionally spread)
    ...(role === "admin"
      ? [
          {
            to: "admin/allusers",
            icon: <FaUsers />,
            label: "Active Users (Admin)",
          },
          { to: "admin/allpets", icon: <FaDog />, label: "All Pets (Admin)" },
          {
            to: "admin/alldonation",
            icon: <FaDonate />,
            label: "All Donations (Admin)",
          },
        ]
      : []),
  ];

  return (
    <div className="h-screen flex flex-col max-w-7xl mx-auto">
      {/* Top Navbar */}
      <div className="sticky top-0 z-50 shadow bg-white">
        <Navbar />
      </div>

      {/* Layout Wrapper */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-16"
          } sticky top-[64px] h-[calc(100vh-64px)] bg-white shadow-md transition-all duration-300  z-40`}
        >
          <div className="flex items-center justify-between px-4 pt-4">
            {sidebarOpen && (
              <h2 className="text-xl font-bold text-blue-600 tracking-wide">
                Dashboard
              </h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white transition-colors shadow ml-auto"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? (
                <FiChevronLeft className="w-5 h-5" />
              ) : (
                <FiChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>

          <nav className="mt-6 px-2 space-y-1">
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
                <span className="text-xl text-blue-500 group-hover:scale-110 transition-transform">
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

        {/* Scrollable Main Content */}
        <main className="no-scrollbar flex-1 overflow-y-auto scrollbar-hide scroll-smooth ">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
