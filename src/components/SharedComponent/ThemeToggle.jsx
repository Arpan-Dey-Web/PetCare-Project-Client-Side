import React, { useContext } from "react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FaSun, FaMoon, FaLaptop } from "react-icons/fa";

const ThemeToggle = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  return (
    <Select value={theme} onValueChange={changeTheme}>
      <SelectTrigger className="w-[120px] bg-transparent">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light" className="flex items-center gap-2 ">
          <FaSun className="text-yellow-500 " /> <span>Light</span>
        </SelectItem>
        <SelectItem value="dark" className="flex items-center gap-2 ">
          <FaMoon className="text-indigo-500" />
          <span className="">Dark</span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ThemeToggle;
