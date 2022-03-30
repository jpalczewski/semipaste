import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from "react-bootstrap";
import { useLazyLoadQuery } from "react-relay";
import { allPasteBinQuery } from "../../Query/PasteBins/__generated__/allPasteBinQuery.graphql";
import { allPasteBin } from "../../Query/PasteBins/allPasteBin";
import { PasteBinScreen } from "../PasteBin/PasteBinScreen";

export const Tables = (props: any) => {
  const data = useLazyLoadQuery<allPasteBinQuery>(allPasteBin, {});

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tytuł</th>
          <th scope="col">Tekst</th>
          <th scope="col">Dodano</th>
          <th scope="col">Data wygaśnięcia</th>
          <th scope="col">Widoczność?</th>
          <th scope="col">Akcje</th>
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
              <td>{data.allPasteBin?.edges[i]?.node?.text.slice(0, 10)}</td>
              <td>
                {data.allPasteBin?.edges[i]?.node?.dateOfCreation.slice(0, 10)}
              </td>
              <td>
                {data.allPasteBin?.edges[i]?.node?.dateOfExpiry.slice(0, 10)}
              </td>
              <td>{data.allPasteBin?.edges[i]?.node?.exposure.toString()}</td>
              <td style={{ width: 200 }}>
                <PasteBinScreen
                  title={data.allPasteBin?.edges[i]?.node?.title}
                  text={data.allPasteBin?.edges[i]?.node?.text}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
