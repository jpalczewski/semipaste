import React from "react";
import {ButtonGroup, Badge, Form, Button} from "react-bootstrap";
import {UserDeleteModal} from "../Modals/UserDeleteModal";
import {useNavigate} from "react-router-dom";

export const UsersRow = (props: any) => {
    const navigate = useNavigate();

    return (
        <tr className="align-middle">
            <td>
                <Form.Check />
            </td>
            <td>{props.object?.node?.id}</td>
            <td>{props.object?.node?.username}</td>
            <td>{props.object?.node?.firstName}</td>
            <td>{props.object?.node?.lastName}</td>
            <td>{props.object?.node.email}</td>
            <td>{props.object?.node.dateJoined.slice(0, 10)}</td>
            <td>{props.object?.node?.isVerified ?
                <Badge bg="info">Verified</Badge>
                :
                <Badge bg="danger">Not</Badge>}</td>
            <td>{props.object?.node?.isStaff ?
                <Badge bg="success">Staff</Badge>
                :
                <Badge bg="danger">Not</Badge>}</td>
            <td>{props.object?.node?.isSuperuser ?
                <Badge bg="primary">Super User</Badge>
                :
                <Badge bg="danger">Not</Badge>}
            </td>
            <td>
                <ButtonGroup>
                    <Button
                        style={{marginRight: "1vh"}}
                        onClick={() => navigate("")}>
                        Edit
                    </Button>
                    <UserDeleteModal
                        id={props.object?.node?.id}
                        username={props.object?.node?.username}
                        />
                </ButtonGroup>
            </td>
        </tr>
    );
};
