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
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import Navbar from "../SharedComponent/Nabbar";
import { ThemeContext } from "../context/ThemeContext";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
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
  // { to: "/dashboardHome", icon: <FaHome />, label: "DashboardHome" },
 const sidebarLinks = [
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
    <div
      className={`h-screen flex flex-col 
        ${theme === "dark" ? "bg-dark text-dark" : "bg-light text-light"}`}
    >
      {/* Top Navbar */}
      <div
        className={`sticky top-0 z-50 shadow
          ${theme === "dark" ? "bg-navbar-dark" : "bg-navbar-light"}`}
      >
        <Navbar />
      </div>

      {/* Layout Wrapper */}
      <div className="flex flex-1 overflow-hidden w-11/12 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-16"
          } sticky top-[64px] h-[calc(100vh-64px)] shadow-md transition-all duration-300 z-40
          ${
            theme === "dark"
              ? "bg-sidebar-dark text-sidebar-text"
              : "bg-sidebar-light text-sidebar-text-light"
          }`}
        >
          <div className="flex py-2 px-4 items-center">
            {sidebarOpen && (
              <h2
                className={`text-xl font-bold tracking-wide ${
                  theme === "dark"
                    ? "text-textColorDark"
                    : "text-textColorLight"
                }`}
              >
                Dashboard
              </h2>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-full transition-colors shadow ml-auto
                ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-blue-600 hover:text-white"
                    : "bg-gray-200 hover:bg-blue-500 hover:text-white"
                }`}
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {sidebarOpen ? (
                <FiChevronLeft className="w-5 h-5" />
              ) : (
                <FiChevronRight className="w-5 h-5" />
              )}
            </button>
          </div>

          <nav className="px-2 space-y-1">
            {sidebarLinks.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `group flex items-center gap-4 px-4 py-2 rounded-lg font-medium transition-all duration-300
                  ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-blue-700 hover:text-white"
                      : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                  }
                  ${
                    isActive
                      ? theme === "dark"
                        ? "bg-blue-900 text-white font-semibold"
                        : "bg-blue-200 text-blue-800 font-semibold"
                      : ""
                  }
                  `
                }
              >
                <span
                  className={`text-xl ${
                    theme === "dark"
                      ? "text-blue-400 group-hover:scale-110"
                      : "text-blue-500 group-hover:scale-110"
                  } transition-transform`}
                >
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
        <main className="no-scrollbar flex-1 overflow-y-auto scrollbar-hide scroll-smooth">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
