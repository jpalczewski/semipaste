import React from "react";
import { Wrapper } from "../styles/Components.style";
import { Tables } from "./table/Table";

export const Popular = () => {
  return (
    <Wrapper>
      <p>Popularne wklejki</p>
      <Tables />
    </Wrapper>
  );
};
