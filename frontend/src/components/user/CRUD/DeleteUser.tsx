import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  id: Number;
  email: string;
  username: string;
  isVisible: boolean;
}

export const DeleteUser = ({ isVisible, id, email, username }: Props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
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
              Jesteś pewien, że chcesz usunąć <strong>{username}?</strong>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
