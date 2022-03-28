import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Wrapper, Footer } from "../styles/Components.style";

import { LoginScreen } from "./user/LoginScreen";
import { RegistrationScreen } from "./user/RegistrationScreen";

export const Home = () => {
  const [vis, setVis] = useState(false);
  return (
    <Wrapper>
      <p>Strona domowa</p>
      {!vis ? <LoginScreen /> : <RegistrationScreen />}
      <Footer>
        {!vis ? "Nie posiadasz konta?  " : "Posiadasz już konto?  "}
        <Button variant="success" onClick={() => setVis(!vis)}>
          {!vis ? "Zarejestruj się" : "Zaloguj się"}
        </Button>
      </Footer>
    </Wrapper>
  );
};
