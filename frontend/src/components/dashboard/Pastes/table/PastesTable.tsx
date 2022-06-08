import {useLazyLoadQuery} from "react-relay";
import {allPasteBinQuery} from "../../../../Query/PasteBins/__generated__/allPasteBinQuery.graphql";
import {allPasteBin} from "../../../../Query/PasteBins/allPasteBin";
import {Table} from "react-bootstrap";
import React from "react";
import {PastesRow} from "./PastesRow";

export const PastesTable = (props: any) => {

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                  <th></th>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Language</th>
                  <th scope="col">Author</th>
                  <th scope="col">Created</th>
                  <th scope="col">Expires</th>
                  <th scope="col">Rating</th>
                  <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
            {props.pastes === null
                ? (<div><p>Empty</p></div>)
                : (props.pastes.map((element: any, i: number) => {
                    return <PastesRow object={element} />
                }))}
            </tbody>
        </Table>
    );
};
