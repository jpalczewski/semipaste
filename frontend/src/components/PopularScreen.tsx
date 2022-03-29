import React from "react";
import { Wrapper, TableWrapper } from "../styles/Components.style";
import { Tables } from "./table/Table";

export const Popular = () => {
  return (
    <Wrapper>
      <p>Popularne wklejki</p>
      <TableWrapper>
        <Tables />
      </TableWrapper>
    </Wrapper>
  );
};
