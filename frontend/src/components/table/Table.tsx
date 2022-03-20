import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import { tableData } from "../../dummy_data/dummyData";
import { users } from "../../Query/users";
import { Table } from "react-bootstrap";
import fetchGraphQL from "../../fetchGraphQL";

export const Tables = (props: any) => {
  fetchGraphQL(users)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });

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
            {/* <td>{data.allPasteBin.edges.node.title}</td> */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
