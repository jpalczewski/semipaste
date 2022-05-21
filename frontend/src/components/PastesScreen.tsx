import React, {useState} from "react";
import { Wrapper, TableWrapper, AllFooter } from "../styles/Components.style";
import { Tables } from "./table/Table";
import {Dropdown, DropdownButton} from "react-bootstrap";
import {useLazyLoadQuery} from "react-relay";
import {activePasteBinQuery} from "../Query/PasteBins/__generated__/activePasteBinQuery.graphql";
import {activePasteBin} from "../Query/PasteBins/activePasteBin";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {PaginationUtils} from "../utils/pagination";

export const Pastes = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [first, setFirst] = useState(15);
    let offSet = 0;
    let page = 1;
    let mode: string | null = "";
    let time: string | null = "";
    const search = useLocation().search;
    const pageNumber = searchParams.get("pageNumber");
    // const urlOffset = new URLSearchParams(search).get("offSet");
    const urlMode = searchParams.get("mode");

    if (pageNumber !== null) page = parseInt(pageNumber);
    if (page !== 1) offSet = first * (page - 1);
    // if (urlOffset !== null) offSet = parseInt(urlOffset);
    if (urlMode !== null) {
        mode = urlMode;
        if (mode == "top") {
            let urlTime = searchParams.get("time");
            if (urlTime !== null) {
                time = urlTime;
            }
        }
    }

    const pastes = useLazyLoadQuery<activePasteBinQuery>(activePasteBin,
      {mode: mode, time: time, first: first, offset: offSet}
    );

    const maxPage = Math.ceil(pastes.activePasteBin?.totalCount!/first)

    const handleModeSelect = (event: string | null) => {
        mode = event;
    }

    const handleTimeSelect = (event: string | null) => {
        time = event;
    }

    const handleFirst = (e: any) => {
        setFirst(parseInt(e.target.value));
    };

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
              onSelect={(event) => {
                  let before = mode;
                  handleModeSelect(event);
                  let url: string = searchParams.toString();
                  if (url === "") {
                      navigate(`/pastes?&mode=${mode}`);
                  }
                  else {
                      let urlMode = searchParams.get("mode");
                      if (urlMode === null) {
                          navigate(`/pastes?${searchParams.toString()}&mode=${mode}`);
                      }
                      else {
                          if (mode === "") {
                              let toReplace = `mode=${before}`;
                              if (searchParams.toString().includes("&mode")) toReplace = "&" + toReplace;
                              if (before == "top") {
                                  let urlTime = searchParams.get("time");
                                  if (urlTime === null) urlTime = "";
                                  navigate(`/pastes?${searchParams.toString().replace(toReplace, "").replace(`&time=${urlTime}`, "")}`);
                              } else {
                                navigate(`/pastes?${searchParams.toString().replace(toReplace, "")}`);
                              }
                          } else {
                              if (before == "top") {
                                  let urlTime = searchParams.get("time");
                                  if (urlTime === null) urlTime = "";
                                  if (mode === before) {
                                      navigate(`/pastes?${searchParams.toString().replace(`time=${urlTime}`, `time=${time}`)}`);
                                  }
                                  else {
                                      navigate(`/pastes?${searchParams.toString().replace(`mode=${before}`, `mode=${mode}`).replace(`&time=${urlTime}`, "")}`);
                                  }
                              }
                              else {
                                navigate(`/pastes?${searchParams.toString().replace(`mode=${before}`, `mode=${mode}`)}`);
                              }
                          }
                      }
                  }
              }}>
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
                    onSelect={(event) => {
                        let before = time;
                        handleTimeSelect(event);

                    }}
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
            {PaginationUtils(
                {
                    page: page,
                    maxPage: maxPage,
                    // offSet: offSet,
                    // first: first,
                })}
        </TableWrapper>
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
