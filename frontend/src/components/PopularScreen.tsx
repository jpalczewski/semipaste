import React, {useState} from "react";
import { Wrapper, TableWrapper, AllFooter } from "../styles/Components.style";
import { Tables } from "./table/Table";
import { Dropdown, DropdownButton } from "react-bootstrap";

export const Popular = () => {
    const [mode, setMode] = useState<string | null>("all");

    const handleModeSelect = (event: string | null) => {
        setMode(event)
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
                    title={mode == "" ? "all" : mode}
                    onSelect={handleModeSelect}
                >
                    <Dropdown.Item eventKey="today">today</Dropdown.Item>
                    <Dropdown.Item eventKey="week">week</Dropdown.Item>
                    <Dropdown.Item eventKey="month">month</Dropdown.Item>
                    <Dropdown.Item eventKey="year">year</Dropdown.Item>
                    <Dropdown.Item eventKey="all">all</Dropdown.Item>
                </DropdownButton>
        <TableWrapper>
          <Tables mode={mode} />
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
