import React from "react";
import { TableWrapper, Wrapper } from "../styles/Components.style";
import { Tables } from "./table/Table";

export const Current = () => {
  return (
    <Wrapper>
      <p>Aktualne wklejki</p>
      <TableWrapper>
        <Tables />
      </TableWrapper>
    </Wrapper>
  );
};
