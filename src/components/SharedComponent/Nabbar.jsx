import React, { useState, useContext } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import Logo from "./Logo";


import { Button } from "@/components/ui/button";
import {
  FaHome,
  FaPaw,
  FaDonate,
  FaTachometerAlt,
  FaInfoCircle,
} from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = (
    <>
      <NavLink to="/" className=" ">
        Home
      </NavLink>
      <NavLink className="  " to="/pets">
        Pet Listing
      </NavLink>
      <NavLink className="  " to="/donations">
        Donation campaigns
      </NavLink>

      {user ? (
        <NavLink
          to="/dashboard"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        ></NavLink>
      ) : (
        ""
      )}
    </>
  );

  return (
    <nav
      className={` text-light bg-[#FEF9F6]
       shadow-md sticky top-0 z-50  py-2`}
    >
      <div className="max-w-7xl mx-auto  py-2 flex items-center justify-between">
        {/* Left Section: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <span className="text-2xl text-white md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FiMenu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <NavLink
                    to="/"
                    className=" font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NavLink
                    className="  font-bold"
                    to="/pets"
                    onClick={() => setIsOpen(false)}
                  >
                    Pet Listing
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NavLink
                    className="  font-bold"
                    to="/donations"
                    onClick={() => setIsOpen(false)}
                  >
                    Donation campaigns
                  </NavLink>
                </DropdownMenuItem>
                {user ? (
                  <>
                    <DropdownMenuItem>
                      <NavLink to="/dashboard" className="">
                        Dashboard
                      </NavLink>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem>
                    <NavLink to="/login">Log In</NavLink>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </span>
          <Link to="/" className="">
            <div className="">
              <Logo />
            </div>
          </Link>
        </div>

        {/* Center Section: NavLinks (only md+) */}
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <div className=" hidden md:flex gap-8">
                  <span className="flex gap-2 items-center">
                    <FaHome />
                    <NavLink
                      className="flex text-xl items-center gap-1 hover:border-b-2 hover:border-[#ec4899]"
                      to="/"
                    >
                      Home
                    </NavLink>
                  </span>
                  <span className="flex gap-2 items-center">
                    <FaPaw />
                    <NavLink
                      className="flex text-xl items-center gap-1 hover:border-b-2 hover:border-[#ec4899]"
                      to="/pets"
                    >
                      Adopt
                    </NavLink>
                  </span>

                  <span className="flex gap-2 items-center">
                    <FaDonate />
                    <NavLink
                      className="flex text-xl items-center gap-1 hover:border-b-2 hover:border-[#ec4899]"
                      to="/donations"
                    >
                      Campaigns
                    </NavLink>
                  </span>

                  {user && (
                    <span className="flex gap-2 items-center">
                      <FaTachometerAlt />
                      <NavLink
                        to="/dashboard"
                        className="flex text-xl items-center gap-1 hover:border-b-2 hover:border-[#ec4899]"
                      >
                        Dashboard
                      </NavLink>
                    </span>
                  )}

                  <span className="flex gap-2 items-center">
                    <FaInfoCircle />
                    <NavLink
                      className="flex text-xl items-center gap-1 hover:border-b-2 hover:border-[#ec4899]"
                      to="/about-us"
                    >
                      About Us
                    </NavLink>
                  </span>
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4 relative">
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
                className="w-12 h-12 object-cover rounded-full border-2 border-blue-500 shadow-md cursor-pointer transition duration-300"
                title={user.displayName || "User"}
              />
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
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
