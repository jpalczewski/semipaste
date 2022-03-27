import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { commitMutation, graphql } from "react-relay";
import RelayEnvironment from "../../../RelayEnvironment";
import { deleteUser } from "../../../Query/deleteUser";
import { deleteUserMutation } from "../../../__generated__/deleteUserMutation.graphql";
// import graphql from "babel-plugin-relay/macro";

export const DeleteUser = (id: any) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(id.toString());

  const handleSubmit = (input: any) => {
    console.log("input", input.toString());

    console.log("test");

    commitMutation<deleteUserMutation>(RelayEnvironment, {
      mutation: graphql`
        mutation deleteUserMutation($input: ID!) {
          deleteUser(id: $input) {
            ok
          }
        }
      `,
      variables: { input },
    });
    handleClose();
  };
  return (
    <>
      <Button variant="danger" onClick={handleShow} size="sm">
        Usuń
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Usuń użytkownika</Modal.Title>
        </Modal.Header>
        <Modal.Body onSubmit={handleSubmit}>
          <div>
            <p>
              Jesteś pewien, że chcesz usunąć <strong>{"test"}?</strong>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            onClick={(id) => handleSubmit(id)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
