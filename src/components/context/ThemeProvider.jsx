import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const html = document.documentElement;

    if (mode === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      html.classList.toggle("dark", prefersDark);
    } else {
      html.classList.toggle("dark", mode === "dark");
    }

    localStorage.setItem("theme", mode);
  }, [mode]);

  const changeTheme = (newMode) => {
    setMode(newMode); // accept direct value from <Select />
  };

  const themeContext = {
    theme: mode,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
