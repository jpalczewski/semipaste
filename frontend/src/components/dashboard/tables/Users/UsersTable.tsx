import {useLazyLoadQuery} from "react-relay";
import {Table} from "react-bootstrap";
import React from "react";
import {allUsers} from "../../../../Query/Users/allUsers";
import {allUsersQuery} from "../../../../Query/Users/__generated__/allUsersQuery.graphql";
import {UsersRow} from "./UsersRow";

export const UsersTable = () => {
    const data = useLazyLoadQuery<allUsersQuery>(allUsers, {});

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Username</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Data of Creation</th>
                  <th scope="col">Verified</th>
                  <th scope="col">Staff</th>
                  <th scope="col">SuperUser</th>
                  <th scope="col">Options</th>
                </tr>
            </thead>
            <tbody>
            {data.allUsers?.edges === null
                ? (<div><p>Empty</p></div>)
                : (data.allUsers?.edges.map((element: any, i) => {
                    return <UsersRow object={element} />
                }))}
            </tbody>
        </Table>
    );
};
