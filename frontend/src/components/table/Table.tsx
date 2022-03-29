import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from "react-bootstrap";
import { useLazyLoadQuery } from "react-relay";
import { allPasteBinQuery } from "../../Query/PasteBins/__generated__/allPasteBinQuery.graphql";
import { allPasteBin } from "../../Query/PasteBins/allPasteBin";

export const Tables = (props: any) => {
  const data = useLazyLoadQuery<allPasteBinQuery>(allPasteBin, {});

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tytuł</th>
          <th>Tekst</th>
          <th>Dodano</th>
          <th>Data wygaśnięcia</th>
          <th>Widoczność?</th>
        </tr>
      </thead>
      <tbody>
        {data.allPasteBin?.edges == null ? (
          <p>krzew</p>
        ) : (
          data.allPasteBin.edges.map((element: any, i) => (
            <tr className="align-middle">
              <td>{data.allPasteBin?.edges[i]?.node?.id}</td>
              <td>{data.allPasteBin?.edges[i]?.node?.title}</td>
              <td>{data.allPasteBin?.edges[i]?.node?.text}</td>
              <td>{data.allPasteBin?.edges[i]?.node?.dateOfCreation}</td>
              <td>{data.allPasteBin?.edges[i]?.node?.dateOfExpiry}</td>
              <td>{data.allPasteBin?.edges[i]?.node?.exposure.toString()}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
