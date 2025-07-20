import React, { useState, useContext } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { theme } = useContext(ThemeContext);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want To Logout??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser();
        setDropdownOpen(false);
        Swal.fire({
          title: "Logged Out",
          text: "Your Have Been Logout Sucessfully",
          icon: "success",
        });
      }
    });
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className="p-1 font-bold"
        onClick={() => setIsOpen(false)}
      >
        Home
      </NavLink>
      <NavLink
        className="p-1  font-bold"
        to="/pets"
        onClick={() => setIsOpen(false)}
      >
        Pet Listing
      </NavLink>
      <NavLink
        className="p-1  font-bold"
        to="/donations"
        onClick={() => setIsOpen(false)}
      >
        Donation campaigns
      </NavLink>
    </>
  );

  return (
    <nav
      className={` ${
        theme == "dark" ? "text-dark bg-[#222e50] " : "text-light bg-[#FEF9F6]"
      } shadow-md sticky top-0 z-50 `}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left Section: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-700 md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
          <Link to="/" className="">
            <div className="">
              <Logo />
            </div>
          </Link>
        </div>

        {/* Center Section: NavLinks (only md+) */}
        <div className="hidden md:flex gap-8">{navLinks}</div>

        {/* Right Section: User or Login Button */}

        <div className="flex items-center gap-4 relative">
          <span
            className={` rounded-2xl ${
              theme == "dark" ? "button-dark" : "button-light"
            } `}
          >
            <ThemeToggle />
          </span>
          {user ? (
            <>
              {/* Profile Image */}
              <img
                src={
                  user.photoURL
                    ? user.photoURL
                    : "https://i.ibb.co/gFg6hq0Y/user-avatar-profile-businessman-with-office-suit-vector-45326233.webp"
                }
                alt="Profile"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-12 h-12 object-cover rounded-full border-2 border-blue-500 shadow-md cursor-pointer transition duration-300"
                title={user.displayName || "User"}
              />

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-12 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <NavLink
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="flex flex-col gap-4 md:hidden px-4 pb-4 space-y-3 animate-slide-down">
          {navLinks}
          {!user && (
            <NavLink
              to="/login"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
