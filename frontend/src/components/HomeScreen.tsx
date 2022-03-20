import React from "react";
import { Wrapper } from "../styles/Components.style";

import { LoginScreen } from "./user/LoginScreen";

export const Home = () => {
  return (
    <Wrapper>
      <p>Strona domowa</p>
      <LoginScreen />
    </Wrapper>
  );
};
