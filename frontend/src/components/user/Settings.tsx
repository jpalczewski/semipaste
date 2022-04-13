import React from "react";
import { useLocalStorage } from "../../useLocalStorage";

export const Settings = () => {
  const [isDarkTheme, setDarkTheme] = useLocalStorage("darkTheme", true);

  const toggleTheme = () => {
    setDarkTheme((prevValue) => !prevValue);
  };

  return (
    <button onClick={toggleTheme}>
      {`The current theme is ${isDarkTheme ? `dark` : `light`}`}
    </button>
  );
};
