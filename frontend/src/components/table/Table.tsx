import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from "react-bootstrap";
import { useLazyLoadQuery } from "react-relay";
import { allPasteBinQuery } from "../../Query/PasteBins/__generated__/allPasteBinQuery.graphql";
import { allPasteBin } from "../../Query/PasteBins/allPasteBin";
import { PasteBinScreen } from "../PasteBin/PasteBinScreen";
import { activePasteBinQuery } from "../../Query/PasteBins/__generated__/activePasteBinQuery.graphql";
import { activePasteBin } from "../../Query/PasteBins/activePasteBin";
import '../../styles/PasteHighlight.css'


export const Tables = (props: any) => {
  const data = useLazyLoadQuery<activePasteBinQuery>(activePasteBin, {});

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tytuł</th>
          <th scope="col">Dodano</th>
          <th scope="col">Data wygaśnięcia</th>
          <th scope="col">Widoczność?</th>
          <th scope="col">Akcje</th>
        </tr>
      </thead>
      <tbody>
        {data.activePasteBin?.edges == null ? (
          <p>krzew</p>
        ) : (
          data.activePasteBin.edges.map((element: any, i) => (
            <tr className="align-middle">
              <td>{data.activePasteBin?.edges[i]?.node?.id}</td>
              <td>{data.activePasteBin?.edges[i]?.node?.title}</td>
              <td>
                {data.activePasteBin?.edges[i]?.node?.dateOfCreation.slice(
                  0,
                  10
                )}
              </td>
              <td>
                {data.activePasteBin?.edges[i]?.node?.dateOfExpiry.slice(0, 10)}
              </td>
              <td>
                {data.activePasteBin?.edges[i]?.node?.exposure.toString()}
              </td>
              <td style={{ width: 200 }}>
                <PasteBinScreen
                  title={data.activePasteBin?.edges[i]?.node?.title}
                  id={data.activePasteBin?.edges[i]?.node?.id}
                  language={data.activePasteBin?.edges[i]?.node?.language}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
