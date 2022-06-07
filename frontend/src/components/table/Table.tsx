import "bootstrap/dist/css/bootstrap.css";
import '../../styles/PasteHighlight.css'
import {Row} from "./Row";

import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Table} from "react-bootstrap";
import '../../styles/PasteHighlight.css'

import {
    Table as ChakraTable,
    Thead, Tbody,
    Tr, Th, Td
} from "@chakra-ui/react";

export const Tables = (props: any) => {
    return (
    <>
        <ChakraTable variant="striped" className="my-4">
            <Thead>
                <Tr>
                    <Th style={{textAlign: "center"}}>Title</Th>
                    <Th style={{textAlign: "center"}}>Author</Th>
                    <Th style={{textAlign: "center"}}>Created</Th>
                    <Th style={{textAlign: "center"}}>Rating</Th>
                    {/*<Th>Rate</Th>*/}
                    <Th style={{textAlign: "center"}}>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {props.pastes.activePasteBin?.edges == null ?  (
                    <p>krzew</p>
                ) : (
                    props.pastes.activePasteBin?.edges.map((element: any, i: number) => (
                        <Row
                            object={props.pastes.activePasteBin?.edges[i]?.node}
                        />
                    ))
                )}
            </Tbody>
        </ChakraTable>
    {/*<Table className="my-3" striped bordered hover responsive>*/}
    {/*  <thead>*/}
    {/*    <tr>*/}
    {/*      <th scope="col">Title</th>*/}
    {/*      <th scope="col">Author</th>*/}
    {/*      <th scope="col">Created</th>*/}
    {/*      <th scope="col">Rating</th>*/}
    {/*      /!*<th scope="col">Rate</th>*!/*/}
    {/*      <th scope="col">Actions</th>*/}
    {/*    </tr>*/}
    {/*  </thead>*/}
    {/*  <tbody>*/}
    {/*    {props.pastes.activePasteBin?.edges == null ?  (*/}
    {/*      <p>krzew</p>*/}
    {/*    ) : (*/}
    {/*      props.pastes.activePasteBin?.edges.map((element: any, i: number) => (*/}
    {/*        <Row*/}
    {/*        object={props.pastes.activePasteBin?.edges[i]?.node}*/}
    {/*        />*/}
    {/*      ))*/}
    {/*    )}*/}
    {/*  </tbody>*/}
    {/*</Table>*/}
    </>
  );
};
