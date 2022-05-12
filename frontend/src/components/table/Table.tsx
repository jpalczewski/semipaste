import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Table} from "react-bootstrap";
import {useLazyLoadQuery} from "react-relay";
import '../../styles/PasteHighlight.css'
import {activePasteBin} from "../../Query/PasteBins/activePasteBin";
import {activePasteBinQuery} from "../../Query/PasteBins/__generated__/activePasteBinQuery.graphql";
import {Row} from "./Row";


export const Tables = (props: any) => {
  const pastes = useLazyLoadQuery<activePasteBinQuery>(activePasteBin,
      {mode: props.mode, time: props.time, first: props.first, offset: props.offset}
  );

  const [page, setPage] = useState(1);
  const [startCrsor, setStarCursor] = useState("");
  const [endCrsor, setEndCursor] = useState("");


  const LeftPag = (pageNum: number) => {
    return (
        <button onClick={() => {
            setPage(pageNum);
            props.setOffSet((pageNum-1) * props.first);
        }}>
            {pageNum}
        </button>
    )
  }

  const renderLeftPag = () => {
      let leftPagList = [];
      let pgNum = Math.abs(page - 3);
      while (pgNum < page) {
        if (pgNum > 0) {
            leftPagList.push(LeftPag(pgNum));
        }
        pgNum += 1;
      }
      if (pgNum > 3) {
          leftPagList.unshift(<button disabled>...</button>)
      }
      return leftPagList;
  }

    const rightPag = (pageNum: number) => {
    return (
        <button onClick={() => {
            setPage(pageNum);
            props.setOffSet((pageNum-1) * props.first);
        }}>
            {pageNum}
        </button>
    )
  }

  const renderRightPag = () => {
      let rightPagList = [];
      let pgNum = page + 3;
      while (pgNum > page) {
          if ( pgNum < (pastes.activePasteBin?.totalCount! / props.first)) {
              rightPagList.unshift(rightPag(pgNum));
          }
          pgNum -= 1;
      }
      if (pgNum-1 < pastes.activePasteBin?.totalCount! / props.first) {
          rightPagList.push(<button disabled>...</button>)
      }
      return rightPagList;
  }

  const renderPagination = () => {
    return (
        <div>
          {
            page > 1 &&
              <>
              <button onClick={() => {
                  setPage(1);
                  props.setOffSet(0);
                }
              }>
                First
              </button>
              <button onClick={() => {
                  setPage(page - 1);
                  props.setOffSet( props.offset - props.first );
              }
              }>
                Previous
              </button>
                  {renderLeftPag()}
              </>
          }
          <button disabled>
            {page}
          </button>
          {
            pastes.activePasteBin?.pageInfo?.hasNextPage &&
             <>
                 {renderRightPag()}
                 <button onClick={() => {
                  setPage(page + 1);
                  props.setOffSet( props.offset + props.first );
              }
              }>
                Next
              </button>
              <button onClick={() => {
                  setPage(Math.floor((pastes.activePasteBin?.totalCount! / props.first)));
                  props.setOffSet( ((pastes.activePasteBin?.totalCount! / props.first)-2) * props.first);
              }
              }>
                Last
              </button>
             </>
          }
        </div>
    )
  }

    return (
        <>
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
        {pastes.activePasteBin?.edges == null ?  (
          <p>krzew</p>
        ) : (
          pastes.activePasteBin?.edges.map((element: any, i) => (
            <Row
            object={pastes.activePasteBin?.edges[i]?.node}
            />
          ))
        )}
      </tbody>
    </Table>
          {renderPagination()}
        </>
  );
};
