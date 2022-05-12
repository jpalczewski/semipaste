import React, {useState} from "react";
import { Wrapper, TableWrapper, AllFooter } from "../styles/Components.style";
import { Tables } from "./table/Table";
import { Dropdown, DropdownButton } from "react-bootstrap";

export const Pastes = () => {
    const [mode, setMode] = useState<string | null>("");
    const [time, setTime] = useState<string | null>("all");
    const [first, setFirst] = useState(15);
    const [offset, setOffSet] = useState(0);


    const handleModeSelect = (event: string | null) => {
        setMode(event);
    }

    const handleTimeSelect = (event: string | null) => {
        setTime(event);
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

          <select className={"form-select"} onChange={(e) => handleFirst(e)}>
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
          <Tables mode={mode} time={time} first={first} offset={offset} setOffSet={setOffSet}/>
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
