import "bootstrap/dist/css/bootstrap.css";
import '../../styles/PasteHighlight.css'
import {Row} from "./Row";

import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Button, Table} from "react-bootstrap";
import { useLazyLoadQuery } from "react-relay";
import '../../styles/PasteHighlight.css'
import {activePasteBin} from "../../Query/PasteBins/activePasteBin";
import {activePasteBinQuery} from "../../Query/PasteBins/__generated__/activePasteBinQuery.graphql";

export const Tables = (props: any) => {
  const data = useLazyLoadQuery<activePasteBinQuery>(activePasteBin, {
    mode: props.mode,
    time: props.time,
  });

    return (
    <Table className="my-3" striped bordered hover responsive>
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Created</th>
          <th scope="col">Expires</th>
          <th scope="col">Rating</th>
          <th scope="col">Rate</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.pastes.activePasteBin?.edges == null ?  (
          <p>krzew</p>
        ) : (
          props.pastes.activePasteBin?.edges.map((element: any, i: number) => (
            <Row
            object={props.pastes.activePasteBin?.edges[i]?.node}
            />
          ))
        )}
      </tbody>
    </Table>
  );
};
