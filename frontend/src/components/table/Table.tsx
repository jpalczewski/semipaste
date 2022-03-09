import React from "react";
import { TableWrapper } from "../../styles/Components.style";

export const Table = (props: any) => {
  return (
    <TableWrapper>
      <tr style={{ borderColor: "red", borderWidth: 20 }}>
        <td>Tytuł</td>
        <td>Autor</td>
        <td>Język</td>
      </tr>
      <tr>
        <td>{props.title}</td>
        <td>{props.author}</td>
        <td>{props.language}</td>
      </tr>
    </TableWrapper>
  );
};
