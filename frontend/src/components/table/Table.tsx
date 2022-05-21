import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Table} from "react-bootstrap";
import '../../styles/PasteHighlight.css'
import {Row} from "./Row";

export const Tables = (props: any) => {

    return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Author</th>
          <th scope="col">Created</th>
          <th scope="col">Expires</th>
          <th scope="col">Toral Rating</th>
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
