import React, {useState} from "react";
import { Wrapper, TableWrapper, AllFooter } from "../styles/Components.style";
import { Tables } from "./table/Table";
import {Dropdown, DropdownButton, Pagination} from "react-bootstrap";
import {useLazyLoadQuery} from "react-relay";
import {activePasteBinQuery} from "../Query/PasteBins/__generated__/activePasteBinQuery.graphql";
import {activePasteBin} from "../Query/PasteBins/activePasteBin";
import {useParams} from "react-router-dom";

export const Pastes = () => {

    const [mode, setMode] = useState<string | null>("");
    const [time, setTime] = useState<string | null>("all");
    const [first, setFirst] = useState(15);
    const [offset, setOffSet] = useState(0);

    const pastes = useLazyLoadQuery<activePasteBinQuery>(activePasteBin,
      {mode: mode, time: time, first: first, offset: offset}
    );

    const { pageIndex } = useParams();
    let page = 1;
    if (pageIndex !== undefined) {
        page = parseInt(pageIndex);
    }

    const handleModeSelect = (event: string | null) => {
        setMode(event);
    }

    const handleTimeSelect = (event: string | null) => {
        setTime(event);
    }

    const handleFirst = (e: any) => {
        setFirst(parseInt(e.target.value));
    };

    const LeftPag = (pageNum: number) => {
    return (
        <Pagination.Item onClick={() => {
            page = pageNum;
            setOffSet((pageNum-1) * first);
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
            page = pageNum;
            setOffSet((pageNum-1) * first);
        }}>
            {pageNum}
        </Pagination.Item>
    )
  }

  const renderRightPag = () => {
      let rightPagList = [];
      let pgNum = page + 3;
      while (pgNum > page) {
          if ( pgNum <= Math.ceil(pastes.activePasteBin?.totalCount! / first)) {
              rightPagList.unshift(rightPag(pgNum));
          }
          pgNum -= 1;
      }
      if (pgNum < Math.ceil(pastes.activePasteBin?.totalCount! / first)-3) {
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
                  page = 1;
                  setOffSet(0);
                }
              } />
              <Pagination.Prev onClick={() => {
                  page = page - 1;
                  setOffSet( offset - first );
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
                  page = page + 1;
                  setOffSet( offset + first );
              }
              } />
              <Pagination.Last onClick={() => {
                  page = Math.ceil((pastes.activePasteBin?.totalCount! / first));
                  setOffSet( ((pastes.activePasteBin?.totalCount! / first-1)) * first);
              }
              } />
             </>
          }
        </Pagination>
    )
  }

  return (
    <>
      <Wrapper>
        <p style={{ textAlign: "left", paddingLeft: 50, paddingTop: 50 }}>
          Popularne Wklejki
        </p>

          <select className={"form-select"} style={{width: "10vh", margin: "auto"}}
                  onChange={(e) => {
                      handleFirst(e);
                  }}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="5">5</option>
              <option value="15" selected>15</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
          </select>

          <DropdownButton
              className="d-inline mx-2"
              id="dropdown-basic-button"
              title={mode === "" ? "new" : mode}
              onSelect={handleModeSelect}
          >
            <Dropdown.Item eventKey="">new</Dropdown.Item>
            <Dropdown.Item eventKey="top">top</Dropdown.Item>
            <Dropdown.Item eventKey="hot">hot</Dropdown.Item>
          </DropdownButton>
          <>
              {mode == "top" &&
                <DropdownButton
                    className="d-inline mx-2"
                    id="dropdown-basic-button"
                    title={time == "" ? "all" : time}
                    onSelect={handleTimeSelect}
                >
                    <Dropdown.Item eventKey="today">today</Dropdown.Item>
                    <Dropdown.Item eventKey="week">week</Dropdown.Item>
                    <Dropdown.Item eventKey="month">month</Dropdown.Item>
                    <Dropdown.Item eventKey="year">year</Dropdown.Item>
                    <Dropdown.Item eventKey="">all</Dropdown.Item>
                </DropdownButton>
              }
          </>
        <TableWrapper>
          <Tables pastes={pastes} page={page}/>
        </TableWrapper>
          {renderPagination()}
      </Wrapper>
      <AllFooter>
        <p
          style={{
            color: "white",
            fontSize: 10,
            textAlign: "left",
            padding: 10,
          }}
        >
          @2022 Średnik - all rights reserved
        </p>{" "}
      </AllFooter>
    </>
  );
};
