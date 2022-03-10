import React from "react";
import { Wrapper } from "../styles/Components.style";
import { Table } from "./table/Table";

export const Current = () => {
  return (
    <Wrapper>
      <p>Aktualne wklejki</p>
      <Table />
    </Wrapper>
  );
};
