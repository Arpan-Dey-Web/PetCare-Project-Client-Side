// Footer.jsx
import { useContext } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "./Logo";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const footerBgClass = theme === "dark" ? "footer-dark" : "footer-light";
  const textColorClass = theme === "dark" ? "text-dark" : "text-light";
  const borderColorClass =
    theme === "dark" ? "border-gray-700" : "border-gray-200";
  const iconHoverClass =
    theme === "dark" ? "hover:text-white" : "hover:text-gray-900";

  return (
    <footer className={`${footerBgClass} ${textColorClass} pt-12 pb-6 px-4`}>
      <div
        className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b ${borderColorClass} pb-8`}
      >
        {/* Logo & Tagline */}
        <div>
         <Logo/>
          <p className="opacity-80">
            Bridging hearts, one paw at a time. Adopt. Love. Repeat.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/pets" className="hover:underline">
                Pet Listing
              </a>
            </li>
            <li>
              <a href="/donations" className="hover:underline">
                Donation Campaigns
              </a>
            </li>
            <li>
              <a href="/login" className="hover:underline">
                Login / Register
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <p className="mb-3">arpandey.web@gmail.com</p>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
              className={iconHoverClass}
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className={iconHoverClass}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://facebook.com/your-facebook"
              target="_blank"
              rel="noopener noreferrer"
              className={iconHoverClass}
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm opacity-70 mt-8">
        © {new Date().getFullYear()} PawfectMatch. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
