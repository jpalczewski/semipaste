import React from "react";
import { AllFooter, TableWrapper, Wrapper } from "../styles/Components.style";
import { Tables } from "./table/Table";

export const Current = () => {
  return (
    <>
      <Wrapper>
        <p>Aktualne wklejki</p>
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
