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
import { Table } from "react-bootstrap";

export const Tables = () => {
  console.log(users.name);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Tytuł</th>
          <th>Autor</th>
          <th>Język</th>
          <th>Dodano</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((id) => (
          <tr>
            <td>{id.title}</td>
            <td>{id.author}</td>
            <td>{id.lang}</td>
            <td>{id.date}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
