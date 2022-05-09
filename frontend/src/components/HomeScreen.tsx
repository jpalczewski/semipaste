import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Wrapper, Footer, AllFooter } from "../styles/Components.style";

import { LoginScreen } from "./user/LoginScreen";
import { RegistrationScreen } from "./user/RegistrationScreen";
import {PasswordRecovery} from "./user/PasswordRecovery";

export const Home = () => {
  const [vis, setVis] = useState(0);

  const component = () => {
      switch (vis) {
          case 0: {
              return <LoginScreen />;
          }
          case 1: {
              return <RegistrationScreen />;
          }
          case 2: {
              return <PasswordRecovery />
          }
      }
  }

  return (
    <>
      <Wrapper>
          {component()}
          { vis <= 1 && <>
              {vis === 0 && <>
                  <Button variant="primary" onClick={() => setVis(2)}>
                    I forgot the password
                  </Button>
              </>}
        <Footer>
          {!vis ? "Nie posiadasz konta?  " : "Posiadasz już konto?  "}
            <Button variant="success" onClick={() => {
              if (vis === 0) setVis(1);
              else setVis(0);
          }}>
            {!vis ? "Zarejestruj się" : "Zaloguj się"}
          </Button>
        </Footer></>
          }
          {vis === 2 && <>
                  <Button variant="primary" onClick={() => setVis(0)}>
                    Go Back
                  </Button>
              </>}
      </Wrapper>
      <AllFooter>
        <p
          style={{
            color: "white",
            fontSize: 10,
            textAlign: "left",
            padding: 10,
          }}
        >
          @2022 Średnik - all rights reserved
        </p>
      </AllFooter>
    </>
  );
};
