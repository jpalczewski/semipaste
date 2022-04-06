import React from "react";
import { Wrapper, TableWrapper, AllFooter } from "../styles/Components.style";
import { Tables } from "./table/Table";

export const Popular = () => {
  return (
    <>
      <Wrapper>
        <p>Popularne wklejki</p>
        <TableWrapper>
          <Tables />
        </TableWrapper>
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
