import React from "react";
import {PasteDeleteModal} from "../Modals/PasteDeleteModal";
import {Button, ButtonGroup, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const PastesRow = (props: any) => {
    const navigate = useNavigate();

    return (
        <tr className="align-middle">
            <td>
                <Form.Check />
            </td>
            <td>{props.object?.node?.id}</td>
            <td>{props.object?.node?.title}</td>
            <td>{props.object?.node?.language}</td>
            <td>{props.object?.node?.author?.username}</td>
            <td>{props.object?.node.dateOfCreation.slice(0, 10)}</td>
            <td>{props.object?.node.dateOfExpiry.slice(0, 10)}</td>
            <td>{props.object?.node?.totalRating}</td>
            <td>
                <ButtonGroup>
                    <Button
                        style={{marginRight: "1vh"}}
                        onClick={() => navigate("")}
                    >
                        Edit
                    </Button>
                    <PasteDeleteModal
                    id={props.object?.node?.id}
                    title={props.object?.node?.title}
                />
                </ButtonGroup>
            </td>
        </tr>
    );
};
