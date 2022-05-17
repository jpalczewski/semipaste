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
