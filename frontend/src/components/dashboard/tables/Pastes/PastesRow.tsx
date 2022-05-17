import React from "react";

export const PastesRow = (props: any) => {
    return (
        <tr className="align-middle">
            <td>{props.object?.node?.id}</td>
            <td>{props.object?.node?.title}</td>
            <td>{props.object?.node?.language}</td>
            <td>{props.object?.node?.author?.username}</td>
            <td>{props.object?.node.dateOfCreation.slice(0, 10)}</td>
            <td>{props.object?.node.dateOfExpiry.slice(0, 10)}</td>
            <td>{props.object?.node?.totalRating}</td>
        </tr>
    );
};
