import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");
  const [theme,setTheme] = useState("")
  useEffect(() => {
    const html = document.querySelector("html");
    html.dataset.theme = mode;
  }, [mode]);
  const changeTheme = () => {
    setMode((prevTheme) => {
      if (prevTheme == "dark") {
        setTheme('dark')
        return "light";
      } else {
        setTheme("light");
        return "dark";
      }
    });
    
  };


  const themecontext = {
    theme,
    setTheme,
    changeTheme,
  };
  return <ThemeContext value={themecontext}>{children}</ThemeContext>;
};

export default ThemeProvider;
