import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Button, Table} from "react-bootstrap";
import { useLazyLoadQuery } from "react-relay";
import { PasteBinScreen } from "../PasteBin/PasteBinScreen";
import '../../styles/PasteHighlight.css'
import {activePasteBin} from "../../Query/PasteBins/activePasteBin";
import {activePasteBinQuery} from "../../Query/PasteBins/__generated__/activePasteBinQuery.graphql";
import {Row} from "./Row";


export const Tables = (props: any) => {
  const data = useLazyLoadQuery<activePasteBinQuery>(activePasteBin, {mode: props.mode, time: props.time});

    return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tytuł</th>
          <th scope="col">Autor</th>
          <th scope="col">Dodano</th>
          <th scope="col">Data wygaśnięcia</th>
          <th scope="col">Ocena</th>
          <th scope="col">Oceń</th>
          <th scope="col">Akcje</th>
        </tr>
      </thead>
      <tbody>
        {data.activePasteBin?.edges == null ?  (
          <p>krzew</p>
        ) : (
          data.activePasteBin.edges.map((element: any, i) => (
            <Row
            object={data.activePasteBin?.edges[i]?.node}
            />
          ))
        )}
      </tbody>
    </Table>
  );
};
