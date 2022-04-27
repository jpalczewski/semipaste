import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from "react-bootstrap";
import { useLazyLoadQuery } from "react-relay";
import { PasteBinScreen } from "../PasteBin/PasteBinScreen";
import '../../styles/PasteHighlight.css'
import {popularPasteBin} from "../../Query/Rating/popularPasteBin";
import {popularPasteBinQuery} from "../../Query/Rating/__generated__/popularPasteBinQuery.graphql";


export const TablePopular = (props: any) => {
  const data = useLazyLoadQuery<popularPasteBinQuery>(popularPasteBin, {mode: props.mode, topFilter: props.topFilter});

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
          <th scope="col">Akcje</th>
        </tr>
      </thead>
      <tbody>
        {data.popularPasteBin == null ? (
          <p>krzew</p>
        ) : (
          data.popularPasteBin.map((element: any, i) => (
            <tr className="align-middle">
              <td>{data.popularPasteBin?.[i]?.id}</td>
              <td>{data.popularPasteBin?.[i]?.title}</td>
              <td>{data.popularPasteBin?.[i]?.author?.username}</td>
              <td>
                {data.popularPasteBin?.[i]?.dateOfCreation.slice(
                  0,
                  10
                )}
              </td>
              <td>
                {data.popularPasteBin?.[i]?.dateOfExpiry.slice(0, 10)}
              </td>
              <td>
                {data.popularPasteBin?.[i]?.totalRating}
              </td>
              <td style={{ width: 200 }}>
                <PasteBinScreen
                  title={data.popularPasteBin?.[i]?.title}
                  id={data.popularPasteBin?.[i]?.id}
                  language={data.popularPasteBin?.[i]?.language}
                  text={data.popularPasteBin?.[i]?.text}
                  likes={data.popularPasteBin?.[i]?.likes}
                  dislikes={data.popularPasteBin?.[i]?.dislikes}
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
