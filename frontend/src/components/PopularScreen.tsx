import React, {useState} from "react";
import { Wrapper, TableWrapper, AllFooter } from "../styles/Components.style";
import {TablePopular} from "./table/TablePopular";
import {Dropdown, DropdownButton, ButtonGroup} from "react-bootstrap";

export const Popular = () => {
    const [mode, setMode] = useState<string | null>("top");
    const [topFilter, setTopFilter] = useState<string | null>("all");

    const handleModeSelect = (event: string | null) => {
        setMode(event)
    }

    const handleTopFilterSelect = (event: string | null) => {
        setTopFilter(event)
    }

  return (
    <>
      <Wrapper>
        <p style={{ textAlign: "left", paddingLeft: 50, paddingTop: 50 }}>
          Popularne Wklejki
        </p>

          <DropdownButton
              className="d-inline mx-2"
              id="dropdown-basic-button"
              title={mode}
              onSelect={handleModeSelect}
          >
            <Dropdown.Item eventKey="top">top</Dropdown.Item>
            <Dropdown.Item eventKey="hot">hot</Dropdown.Item>
          </DropdownButton>
          <>
              {mode == "top" &&
                <DropdownButton
                    className="d-inline mx-2"
                    id="dropdown-basic-button"
                    title={topFilter == "" ? "all" : topFilter}
                    onSelect={handleTopFilterSelect}
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
          <TablePopular mode={mode} topFilter={topFilter}/>
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
