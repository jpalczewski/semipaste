import React from "react";
import { AllFooter, Wrapper } from "../styles/Components.style";
import { PasteBinForm } from "./form/form";
import {Button, Dropdown} from "react-bootstrap";

export const Create = () => {
  return (
    <>
      <Wrapper>
        <p style={{ textAlign: "left", paddingLeft: 50, paddingTop: 50 }}>
          UTWÓRZ NOWĄ WKLEJKĘ
        </p>
        <PasteBinForm />
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
