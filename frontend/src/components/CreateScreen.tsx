import React from "react";
import { Wrapper } from "../styles/Components.style";
import { PasteBinForm } from "./form/form";

export const Create = () => {
  return (
    <Wrapper>
      <p>Utwórz nową wklejkę</p>
      <PasteBinForm />
    </Wrapper>
  );
};
