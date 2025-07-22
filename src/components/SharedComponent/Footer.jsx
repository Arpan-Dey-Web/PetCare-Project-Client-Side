// Footer.jsx
import { useContext } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "./Logo";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={` pt-12 pb-6 px-4  ${
        theme == "dark" ? "text-white" : "text-black"
      }`}
    >
      <div
        className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b  pb-8`}
      >
        {/* Logo & Tagline */}
        <div>
          <Logo />
          <p className="">
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
              href="https://github.com/Arpan-Dey-Web"
              target="_blank"
              rel="noopener noreferrer"
              className={""}
            >
              <FaGithub />
            </a>
            <a
              href="www.linkedin.com/in/arpan-dey-web"
              target="_blank"
              rel="noopener noreferrer"
              className={""}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/arpandey5000/"
              target="_blank"
              rel="noopener noreferrer"
              className={""}
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm opacity-70 mt-8">
        © {new Date().getFullYear()} PawHome. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
