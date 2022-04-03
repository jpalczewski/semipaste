import React from "react";
import { AllFooter, Wrapper } from "../styles/Components.style";

export const About = () => {
  return (
    <>
      <Wrapper>
        <p>Strona informacyjna o projekcie</p>
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
        </p>{" "}
      </AllFooter>
    </>
  );
};
