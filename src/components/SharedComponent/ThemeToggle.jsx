import React, { useContext } from "react";

import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={changeTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-md font-semibold 
        bg-secondary text-dark dark:bg-accent dark:text-light
        transition duration-300"
    >
      {theme === "dark" ? <FaSun /> : <FaMoon />}
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;
