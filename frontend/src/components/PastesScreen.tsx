import React, {useRef, useState} from "react";
import { Wrapper, TableWrapper, AllFooter } from "../styles/Components.style";
import { Tables } from "./table/Table";
import {Button, Dropdown, DropdownButton, Collapse, Form, ButtonGroup} from "react-bootstrap";
import {useLazyLoadQuery} from "react-relay";
import {activePasteBinQuery} from "../Query/PasteBins/__generated__/activePasteBinQuery.graphql";
import {activePasteBin} from "../Query/PasteBins/activePasteBin";
import {useNavigate, useSearchParams} from "react-router-dom";
import {PaginationUtils} from "../utils/pagination";
import {allLanguagesQuery} from "../Query/SyntaxHighlight/__generated__/allLanguagesQuery.graphql";
import {Languages} from "../Query/SyntaxHighlight/allLanguages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {clearURL, handleURL} from "../utils/url";
import Select from "react-select";

export const Pastes = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [first, setFirst] = useState(15);
    const [openFilters, setOpenFilters] = useState(false);

    let offSet = 0;
    let page = 1;
    let mode: string | null = "";
    let time: string | null = "";

    const pageNumber = searchParams.get("pageNumber");
    const urlMode = searchParams.get("mode");

    if (pageNumber !== null) page = parseInt(pageNumber);
    if (page !== 1) offSet = first * (page - 1);
    if (urlMode !== null) {
        mode = urlMode;
        if (mode === "top") {
            let urlTime = searchParams.get("time");
            if (urlTime !== null) {
                time = urlTime;
            }
        }
    }

    // filter
    let title_Istartswith: string | null  = null;
    const URLtitleStartswith = searchParams.get("title");
    if (URLtitleStartswith !== null) title_Istartswith = URLtitleStartswith;

    let dateOfCreation_Gte: string | null  = null;
    const URLdateOfCreationGte = searchParams.get("dateOfCreation_Gte");
    if (URLdateOfCreationGte !== null) dateOfCreation_Gte = URLdateOfCreationGte;

     let dateOfCreation_Lte: string | null  = null;
    const URLdateOfCreationLte = searchParams.get("dateOfCreation_Lte");
    if (URLdateOfCreationLte !== null) dateOfCreation_Lte = URLdateOfCreationLte;

    let language: string | null  = null;
    const URLlanguage = searchParams.get("language");
    if (URLlanguage !== null) language = URLlanguage;

    let author: string | null = null;
    const URLauthor = searchParams.get("author");
    if (URLauthor !== null && URLauthor !== "") author = URLauthor;


    const pastes = useLazyLoadQuery<activePasteBinQuery>(activePasteBin,
      {
          mode: mode,
          time: time,
          first: first,
          offset: offSet,
          title_Istartswith: title_Istartswith,
          dateOfCreation_Gte: dateOfCreation_Gte,
          dateOfCreation_Lte: dateOfCreation_Lte,
          language: language,
          author__Username: author
      }
    );

    const titleIStartsWith_ref = useRef<HTMLInputElement>(null);
    const author_ref = useRef<HTMLInputElement>(null);
    const language_ref = useRef<HTMLSelectElement>(null);
    const dateOfCreationGte_ref = useRef<HTMLInputElement>(null);
    const dateOfCreationLte_ref = useRef<HTMLInputElement>(null);

    const maxPage = Math.ceil(pastes.activePasteBin?.totalCount!/first);


    const handleModeSelect = (event: string | null) => {
        mode = event;
    }

    const handleTimeSelect = (event: string | null) => {
        time = event;
    }

    const handleFirst = (e: any) => {
        setFirst(parseInt(e.target.value));
    };

    const navigateMode = (before: string | null) => {
        // if no params - empty
        if (searchParams.toString() === "") {
            // navigate to pastes with mode
            navigate(`/pastes?mode=${mode}`);
        }
        // params - not empty
        else {
            // if not empty but no mode in the query
            // pastes
            if (searchParams.get("mode") === null) {
                // give mode
                navigate(`/pastes?` + searchParams.toString() + `&mode=${mode}`);
            } else {
                // url to build and navigate to
                // pastes?query
                let url: string = "/pastes?" + searchParams.toString();
                // if empty = [new]
                if (mode === "") {
                    // replace the previous mode
                    let toReplace = `mode=${before}`;
                    // if the query already has other params
                    // set the & at the beginning
                    if (searchParams.toString().includes("&mode")) toReplace = "&" + toReplace;
                    // replace the mode to empty = [new]
                    url = url.replace(toReplace, "");
                }
                // if mode = top/hot
                else {
                    url = url.replace(`mode=${before}`, `mode=${mode}`);
                }
                // if the previous one was top => remove the time param
                const urlTime = searchParams.get("time");
                if (urlTime !== null) {
                    url = url.replace(`&time=${urlTime}`, "");
                }
                // navigate to the built url with the params query
                navigate(url);
            }
        }
    }

    const navigateTime = () => {
        let url = "/pastes?" + searchParams.toString();
        const urlTime = searchParams.get("time");
        // if all
        if (urlTime === null) {
            if (time !== "") {
                url += `&time=${time}`;
            }
        }
        else {
            // if set to all
            if (time === "") {
                url = url.replace(`&time=${urlTime}`, "");
            }
            url = url.replace(`&time=${urlTime}`, `&time=${time}`);
        }
        navigate(url);
    }

    const handleFilters = () => {
        let url = searchParams.toString();
        const titleIStartsWith_value = titleIStartsWith_ref?.current?.value;
        const author_value = author_ref?.current?.value;
        const language_value = encodeURIComponent(language_ref?.current?.value!);
        const dateOfCreationGte_value = dateOfCreationGte_ref?.current?.value!.toString();
        const dateOfCreationLte_value = dateOfCreationLte_ref?.current?.value!.toString();

        url = handleURL(url, URLtitleStartswith, "title", titleIStartsWith_value!);
        url = handleURL(url, URLauthor, "author", author_value!);
        url = handleURL(url, URLlanguage, "language", language_value!);
        url = handleURL(url, URLdateOfCreationGte, "dateOfCreation_Gte", dateOfCreationGte_value!);
        url = handleURL(url, URLauthor, "dateOfCreation_Lte", dateOfCreationLte_value!);

        url = handleURL(url, searchParams.get("pageNumber"), "pageNumber", "1");

        setSearchParams(url);
    }

    const handleFiltersClear = () => {
        filterInput.author = "";
        filterInput.language = "";
        filterInput.dateOfCreationGte = "";
        filterInput.dateOfCreationLte = "";

        let url = searchParams.toString();
        url = clearURL(url, "title", URLtitleStartswith);
        url = clearURL(url, "author", URLauthor);
        url = clearURL(url, "language", URLlanguage);
        url = clearURL(url, "dateOfCreation_Gte", URLdateOfCreationGte);
        url = clearURL(url, "dateOfCreation_Lte", URLdateOfCreationLte);
        setSearchParams(url);
    }

    const languages = useLazyLoadQuery<allLanguagesQuery>( Languages, {} ).allLanguages;
      const languages_options = languages?.map(
      language => {
        return {value: language, label: language}
      }
  );

    const [filterInput, setFilterInput] = useState({
        author: author,
        language: language,
        dateOfCreationGte: dateOfCreation_Gte,
        dateOfCreationLte: dateOfCreation_Lte,
        titleIStartsWith: title_Istartswith,
    });

    const handleChangeFilterInput = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setFilterInput((values) => ({ ...values, [name]: value }));
    }

  return (
    <>
      <Wrapper>
        <p style={{ textAlign: "left", paddingLeft: 50, paddingTop: 50 }}>
          Popularne Wklejki
        </p>
         <TableWrapper>
            <Collapse in={openFilters}>
                <div className="container-fluid" style={{textAlign: "left"}}>
                    <div className="row">
                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label>
                                        Author
                                        <FontAwesomeIcon style={{marginLeft: "1vh"}} icon={solid("pen")} />
                                    </Form.Label>
                                    <Form.Control
                                        ref={author_ref}
                                        type="text"
                                        name="author"
                                        placeholder="author's username"
                                        value={filterInput.author === null ? "" : filterInput.author}
                                        onChange={handleChangeFilterInput}
                                    />
                                </Form.Group>
                            </div>
                        <div className="col-6">
                                <Form.Group>
                                    <Form.Label>
                                        Language
                                        <FontAwesomeIcon style={{marginLeft: "1vh"}} icon={solid("code")} />
                                    </Form.Label>
                                    {/*<Select*/}
                                    {/*  ref={language_ref}*/}
                                    {/*  defaultValue={languages_options![0]}*/}
                                    {/*  isClearable={true}*/}
                                    {/*  options={languages_options}*/}
                                    {/*/>*/}
                                    <Form.Select
                                        ref={language_ref}
                                        name="language"
                                        onChange={handleChangeFilterInput}
                                        value={filterInput.language === null ? "" : filterInput.language}
                                        aria-label="Default select example">
                                        <option key={0} value={""} selected></option>
                                        {languages?.map((language, i) => {
                                            return <option key={i} value={ language! }>{ language }</option>
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">
                            <Form.Group controlId="dateOfCreationGte">
                                <Form.Label>From</Form.Label>
                                <Form.Control
                                    ref={dateOfCreationGte_ref}
                                    type="date"
                                    placeholder="Date of Birth"
                                    name="dateOfCreationGte"
                                    onChange={handleChangeFilterInput}
                                    value={filterInput.dateOfCreationGte === null ? "" : filterInput.dateOfCreationGte}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-3">
                            <Form.Group controlId="dateOfCreationLte">
                                <Form.Label>To</Form.Label>
                                <Form.Control
                                    ref={dateOfCreationLte_ref}
                                    type="date"
                                    placeholder="Date of Birth"
                                    name="dateOfCreationLte"
                                    value={filterInput.dateOfCreationLte === null ? "" : filterInput.dateOfCreationLte}
                                    onChange={handleChangeFilterInput}
                                />
                            </Form.Group>
                        </div>
                    </div>
                    <ButtonGroup
                        className="mt-5 mb-4">
                        <Button
                            onClick={handleFilters}
                            style={{marginRight: "3vh"}}>Apply</Button>
                        <Button
                            onClick={handleFiltersClear}
                            variant="danger">Clear</Button>
                    </ButtonGroup>
                    <hr className="mb-5" />
                </div>
            </Collapse>
            <div className="d-flex justify-content-between">
                <div className="input-group m-auto justify-content-between" style={{width: "33vh"}}>
                    <div>
                        <DropdownButton
                        className="d-inline mx-2"
                        id="dropdown-basic-button"
                        title={mode === "" ? "new" : mode}
                        onSelect={(event) => {
                        // mode before
                        const before = searchParams.get("mode");
                        // set mode
                        handleModeSelect(event);
                        navigateMode(before);
                        }}>
                        <Dropdown.Item eventKey="">
                            <div className="d-flex justify-content-start">
                                <FontAwesomeIcon style={{marginRight: "1vh"}} icon={solid("clock")} />
                                New
                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="top">
                            <FontAwesomeIcon style={{marginRight: "1vh"}} icon={solid("signal")} />
                            top
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="hot">
                            <FontAwesomeIcon style={{marginRight: "1vh"}} icon={solid("fire")} />
                            hot
                        </Dropdown.Item>
                    </DropdownButton>
                    <>
                        {mode === "top" &&
                            <DropdownButton
                                className="d-inline mx-2"
                                id="dropdown-basic-button"
                                title={time === "" ? "all" : time}
                                onSelect={(event) => {
                                    handleTimeSelect(event);
                                    navigateTime();
                                }}
                            >
                                <Dropdown.Item eventKey="today">today</Dropdown.Item>
                                <Dropdown.Item eventKey="week">week</Dropdown.Item>
                                <Dropdown.Item eventKey="month">month</Dropdown.Item>
                                <Dropdown.Item eventKey="year">year</Dropdown.Item>
                                <Dropdown.Item eventKey="">all</Dropdown.Item>
                            </DropdownButton>
                        }</>
                    </div>
                    <div>

                    </div>
                </div>
                <div className="input-group m-auto justify-content-center" style={{width: "33vh"}}>
                    <ButtonGroup>
                        <input
                            ref={titleIStartsWith_ref}
                            name="titleIStartsWith"
                            type="text"
                            value={filterInput.titleIStartsWith === null ? "" : filterInput.titleIStartsWith}
                            onChange={event => {
                                setFilterInput({...filterInput, titleIStartsWith: event.target.value});
                                // titleIStartsWith_ref.current?.value = event.target.value;
                            }}
                            style={{width: "20vh"}}/>
                        <Button variant="primary"
                            onClick={handleFilters}
                        >
                            <FontAwesomeIcon icon={solid("magnifying-glass")} />
                        </Button>
                        <Button style={{marginLeft: "1vh"}} onClick={() => setOpenFilters(!openFilters)} aria-expanded={openFilters}>
                            <FontAwesomeIcon icon={solid("filter")} />
                        </Button>
                    </ButtonGroup>
                </div>
                <div className="input-group justify-content-end" style={{width: "33vh"}}>
                    {PaginationUtils({
                        page: page,
                        maxPage: maxPage,
                    })}
                </div>
            </div>
          <Tables pastes={pastes} page={page}/>
            <div className="d-flex justify-content-between">
                <div>
                    Rows on one page:
                    <select className={"form-select"} style={{width: "10vh"}}
                        onChange={(e) => {handleFirst(e)}}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="15" selected>15</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                </div>
                <div>
                    {PaginationUtils({
                    page: page,
                    maxPage: maxPage,
                })}
                </div>
            </div>
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
