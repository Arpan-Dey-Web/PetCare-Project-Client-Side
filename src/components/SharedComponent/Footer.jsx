// Footer.jsx
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-6 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-700 pb-8">
        {/* Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            PawfectMatch 🐾
          </h2>
          <p className="text-gray-400">
            Bridging hearts, one paw at a time. Adopt. Love. Repeat.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
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
          <h3 className="text-lg font-semibold text-white mb-4">
            Connect With Us
          </h3>
          <p className="mb-3">arpandey.web@gmail.com</p>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://facebook.com/your-facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} PawfectMatch. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
