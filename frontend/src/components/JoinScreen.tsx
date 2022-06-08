import React, { useState } from "react";
import {Container} from "react-bootstrap";
import { Wrapper, Footer, AllFooter } from "../styles/Components.style";
import { LoginScreen } from "./user/LoginScreen";
import { RegistrationScreen } from "./user/RegistrationScreen";
import {PasswordRecovery} from "./user/PasswordRecovery";
import {Button} from "@chakra-ui/react";

export const Join = () => {
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
                <div className="py-4">
                    <Container className="bg-white py-5">
                        {component()}
                        {vis <= 1 && <>
                            {vis === 0 && <>
                                <Button colorScheme="twitter" onClick={() => setVis(2)}>
                                    I forgot the password
                                </Button>
                            </>}
                            <Footer>
                                {!vis ? "Create a new account" : "Already registered?"}
                                <Button colorScheme="teal" style={{marginLeft: "5px"}} onClick={() => {
                                    if (vis === 0) setVis(1);
                                    else setVis(0);
                                }}>
                                    {!vis ? "Sing up" : "Sign in"}
                                </Button>
                            </Footer></>
                        }
                        {vis === 2 && <>
                            <Button colorScheme="teal" onClick={() => setVis(0)}>
                                Go Back
                            </Button>
                        </>}
                    </Container>
                </div>
            </Wrapper>
        </>
    );
};
