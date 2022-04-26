import React from "react";
import { AllFooter, TableWrapper, Wrapper } from "../styles/Components.style";
import { Tables } from "./table/Table";
import {activePasteBin} from "../Query/PasteBins/activePasteBin";
import {TableCurrent} from "./table/TableCurrent";

export const Current = () => {
  return (
    <>
      <Wrapper>
        <p style={{ textAlign: "left", paddingLeft: 50, paddingTop: 50 }}>
          Aktualne Wklejki
        </p>
        <TableWrapper>
          <TableCurrent />
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
