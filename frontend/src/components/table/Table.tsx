import React from "react";
import {
  TableWrapper,
  THead,
  TFoot,
  TBody,
  TR,
  TH,
  TD,
} from "../../styles/Table.style";
import "bootstrap/dist/css/bootstrap.css";
import { tableData } from "../../dummy_data/dummyData";
import { users } from "../../Query/users";

export const Tables = () => {
  return (
    <TableWrapper>
      <THead>
        <TR>
          <TH>Tytuł</TH>
          <TH>Autor</TH>
          <TH>Język</TH>
          <TH>Dodano</TH>
        </TR>
      </THead>
      <TBody>
        {tableData.map((id) => (
          <TR>
            <TD>{id.title}</TD>
            <TD>{id.author}</TD>
            <TD>{id.lang}</TD>
            <TD>{id.date}</TD>
          </TR>
        ))}
      </TBody>
    </TableWrapper>
  );
};
