import React, { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function DarkMode() {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    document.body.style.backgroundColor = checked ? "#121212" : "#ffffff";
    document.body.style.color = checked ? "#ffffff" : "#000000";
  };

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? "#121212" : "#ffffff";
    document.body.style.color = isDarkMode ? "#ffffff" : "#000000";
  }, [isDarkMode]);

  return (
    <DarkModeSwitch
      style={{ marginBottom: "0.2rem" }}
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={35}
    />
  );
}
