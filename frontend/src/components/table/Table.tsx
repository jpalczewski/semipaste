import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { tableData } from "../../dummy_data/dummyData";
import { Table } from "react-bootstrap";
import fetchGraphQL from "../../fetchGraphQL";

export const Tables = (props: any) => {
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
