import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Table} from "react-bootstrap";
import {useLazyLoadQuery} from "react-relay";
import '../../styles/PasteHighlight.css'
import {activePasteBin} from "../../Query/PasteBins/activePasteBin";
import {activePasteBinQuery} from "../../Query/PasteBins/__generated__/activePasteBinQuery.graphql";
import {Row} from "./Row";
import {Pagination} from 'react-bootstrap';


export const Tables = (props: any) => {
  const pastes = useLazyLoadQuery<activePasteBinQuery>(activePasteBin,
      {mode: props.mode, time: props.time, first: props.first, offset: props.offset}
  );


  // Pagination
  const [page, setPage] = useState(1);

  const LeftPag = (pageNum: number) => {
    return (
        <Pagination.Item onClick={() => {
            setPage(pageNum);
            props.setOffSet((pageNum-1) * props.first);
        }}>
            {pageNum}
        </Pagination.Item>
    )
  }

  const renderLeftPag = () => {
      let leftPagList = [];
      let pgNum = Math.abs(page - 2);
      while (pgNum < page) {
        if (pgNum > 0) {
            leftPagList.push(LeftPag(pgNum));
        }
        pgNum += 1;
      }
      if (pgNum > 3 && pgNum-2 != 1) {
          leftPagList.unshift(<Pagination.Ellipsis disabled />)
      }
      return leftPagList;
  }

    const rightPag = (pageNum: number) => {
    return (
        <Pagination.Item onClick={() => {
            setPage(pageNum);
            props.setOffSet((pageNum-1) * props.first);
        }}>
            {pageNum}
        </Pagination.Item>
    )
  }

  const renderRightPag = () => {
      let rightPagList = [];
      let pgNum = page + 3;
      while (pgNum > page) {
          if ( pgNum <= Math.ceil(pastes.activePasteBin?.totalCount! / props.first)) {
              rightPagList.unshift(rightPag(pgNum));
          }
          pgNum -= 1;
      }
      if (pgNum < Math.ceil(pastes.activePasteBin?.totalCount! / props.first)-3) {
          rightPagList.push(<Pagination.Ellipsis disabled />)
      }
      return rightPagList;
  }

  const renderPagination = () => {
    return (
        <Pagination>
          {
            page > 1 &&
              <>
              <Pagination.First onClick={() => {
                  setPage(1);
                  props.setOffSet(0);
                }
              } />
              <Pagination.Prev onClick={() => {
                  setPage(page - 1);
                  props.setOffSet( props.offset - props.first );
              }
              } />
                  {renderLeftPag()}
              </>
          }
          <Pagination.Item active>
            {page}
          </Pagination.Item>
          {
            pastes.activePasteBin?.pageInfo?.hasNextPage &&
             <>
             {renderRightPag()}
             <Pagination.Next onClick={() => {
                  setPage(page + 1);
                  props.setOffSet( props.offset + props.first );
              }
              } />

              <Pagination.Last onClick={() => {
                  setPage(Math.ceil((pastes.activePasteBin?.totalCount! / props.first)));
                  props.setOffSet( ((pastes.activePasteBin?.totalCount! / props.first-1)) * props.first);
              }
              } />
             </>
          }
        </Pagination>
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
