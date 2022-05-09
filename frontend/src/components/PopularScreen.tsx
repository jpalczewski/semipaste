import React, {useState} from "react";
import { Wrapper, TableWrapper, AllFooter } from "../styles/Components.style";
import { Tables } from "./table/Table";
import { Dropdown, DropdownButton } from "react-bootstrap";

export const Popular = () => {
    const [mode, setMode] = useState<string | null>("top");
    const [time, setTime] = useState<string | null>("all");
    const [first, setFirst] = useState(15);
    const [offset, setOffset] = useState(0);

    const handleModeSelect = (event: string | null) => {
        setMode(event);
    }

    const handleTimeSelect = (event: string | null) => {
        setTime(event);
    }

    const handleFirst = (event: number) => {
        setFirst(event);
    }

  return (
    <>
      <Wrapper>
        <p style={{ textAlign: "left", paddingLeft: 50, paddingTop: 50 }}>
          Popularne Wklejki
        </p>

          <select onChange={(event => {handleFirst(parseInt(event.target.value))})} value={first}>
              <option key="15-pastes" value="15">15</option>
              <option key="30-pastes" value="30">30</option>
              <option key="45-pastes" value="45">45</option>
          </select>

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
          <Tables mode={mode} time={time} first={first} offset={offset} />
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
