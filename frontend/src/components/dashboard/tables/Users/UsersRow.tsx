import React from "react";

export const UsersRow = (props: any) => {
    return (
        <tr className="align-middle">
            <td>{props.object?.node?.id}</td>
            <td>{props.object?.node?.username}</td>
            <td>{props.object?.node?.firstName}</td>
            <td>{props.object?.node?.lastName}</td>
            <td>{props.object?.node.email}</td>
            <td>{props.object?.node.dateJoined.slice(0, 10)}</td>
            <td>{props.object?.node?.totalRating}</td>
        </tr>
    );
};
