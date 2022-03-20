import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import { tableData } from "../../dummy_data/dummyData";
import { users } from "../../Query/users";
import { Table } from "react-bootstrap";
import fetchGraphQL from "../../fetchGraphQL";

export const Tables = () => {
  console.log(users);

  fetchGraphQL(`
  query{
    allPasteBin {
      edges {
        node {
          id
          title
          pasteText
          exposure
          expireAfter
        }
      }
    }
  }
    `)
    .then((response) => {
      console.log("test");
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
