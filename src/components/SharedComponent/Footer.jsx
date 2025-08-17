// Footer.jsx
import { useContext } from "react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaHeart,
  FaPaw,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "./Logo";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Adopt a Pet", href: "/pets" },
    { name: "Pet Care Guide", href: "/care" },
    { name: "Success Stories", href: "/stories" },
    { name: "Volunteer", href: "/volunteer" },
  ];

  const services = [
    { name: "Pet Adoption", href: "/adoption" },
    { name: "Donation Campaigns", href: "/donations" },
    { name: "Pet Health Services", href: "/health" },
    { name: "Lost & Found", href: "/lost-found" },
    { name: "Emergency Rescue", href: "/rescue" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Arpan-Dey-Web",
      icon: <FaGithub />,
      hoverColor: "hover:text-gray-400",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/arpan-dey-web",
      icon: <FaLinkedin />,
      hoverColor: "hover:text-blue-500",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/arpandey5000/",
      icon: <FaFacebook />,
      hoverColor: "hover:text-blue-600",
    },
  ];

  return (
    <footer
      className={`relative ${isDark ? "bg-gray-900" : "bg-gray-50"} border-t ${
        isDark ? "border-gray-800" : "border-gray-200"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-20 text-6xl text-purple-400 transform rotate-12">
          🐾
        </div>
        <div className="absolute bottom-20 right-20 text-4xl text-pink-400 transform -rotate-12">
          🐱
        </div>
        <div className="absolute top-32 right-32 text-5xl text-blue-400 transform rotate-45">
          🐕
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto pt-16 pb-8 px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo />
            </div>
            <p
              className={`text-sm leading-relaxed mb-6 ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Bridging hearts, one paw at a time. We connect loving families
              with pets in need, creating forever homes filled with joy and
              unconditional love.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center`}
                >
                  <FaEnvelope className="text-white text-xs" />
                </div>
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  arpandey.web@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center`}
                >
                  <FaPhone className="text-white text-xs" />
                </div>
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  +8801821524847
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center`}
                >
                  <FaMapMarkerAlt className="text-white text-xs" />
                </div>
                <span
                  className={`text-sm ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Chittagong City, Bangladesh
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`text-lg font-bold mb-6 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              <FaPaw className="text-purple-500" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`text-sm transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group ${
                      isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className={`text-lg font-bold mb-6 flex items-center gap-2 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              <FaHeart className="text-pink-500" />
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className={`text-sm transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group ${
                      isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3
              className={`text-lg font-bold mb-6 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              Stay Connected
            </h3>

            {/* Newsletter Signup */}
            <div className="mb-6">
              <p
                className={`text-sm mb-4 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Subscribe to get updates on new pets and adoption stories.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-colors ${
                    isDark
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500 focus:border-purple-500"
                  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`}
                />
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p
                className={`text-sm mb-4 ${
                  isDark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Follow us on social media
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1 ${
                      isDark
                        ? "border-gray-700 text-gray-400 hover:border-gray-600"
                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                    } ${social.hoverColor}`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`border-t ${
            isDark ? "border-gray-800" : "border-gray-200"
          } pt-8`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              © {new Date().getFullYear()} Pet Home. All rights reserved. By Arpan
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <a
                href="/privacy"
                className={`transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className={`transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className={`transition-colors ${
                  isDark
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 ${
          isDark ? "hover:from-purple-600 hover:to-pink-600" : ""
        }`}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="mx-auto" />
      </button>
    </footer>
  );
};

export default Footer;
