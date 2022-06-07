import React from "react";
import { Wrapper } from "../../styles/Components.style";
import { useLocalStorage } from "../../utils/useLocalStorage";

export const Settings = () => {
  const [isDarkTheme, setDarkTheme] = useLocalStorage("darkTheme", true);

  const toggleTheme = () => {
    setDarkTheme((prevValue) => !prevValue);
  };

  return (
    <Wrapper>
      <p>SETTING</p>
      <button onClick={toggleTheme}>
        {`The current theme is ${isDarkTheme ? `dark` : `light`}`}
      </button>
    </Wrapper>
  );
};
