import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { commitMutation } from "react-relay";
import RelayEnvironment from "../../../RelayEnvironment";
import { deleteUser } from "../../../Query/deleteUser";
import { deleteUserMutation } from "../../../Query/__generated__/deleteUserMutation.graphql";

interface IProps {
  id: string | undefined;
}

export const DeleteUser: React.FC<IProps> = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const [test, setTest] = useState(props.id);

  const handleSubmit = (input: any) => {
    commitMutation<deleteUserMutation>(RelayEnvironment, {
      mutation: deleteUser,
      variables: { input },
      onCompleted: (response) => {
        console.log("ok", response);
      },
      onError: (error) => {
        console.error(error);
      },
    });
    handleShow();
  };
  return (
    <>
      <Button variant="danger" onClick={handleShow} size="sm">
        Usuń
      </Button>
      <Modal show={show} onHide={handleShow}>
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
            onClick={() => handleSubmit(test)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
