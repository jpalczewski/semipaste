import React from "react";
import { Wrapper } from "../styles/Components.style";
import { Form } from "./form/form";

export const Create = () => {
  return (
    <Wrapper>
      <p>Utwórz nową wklejkę</p>
      <Form />
    </Wrapper>
  );
};
