import React from "react";
import { Wrapper } from "../styles/Components.style";
import { Table } from "./table/Table";

export const Popular = () => {
  return (
    <Wrapper>
      <p>Popularne wklejki</p>
      <Table />
    </Wrapper>
  );
};
