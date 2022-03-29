import React, { useState } from "react";
import { editUser } from "../../../Query/Users/editUser";
import RelayEnvironment from "../../../RelayEnvironment";
import { commitMutation } from "react-relay";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { editUserMutation } from "../../../Query/__generated__/editUserMutation.graphql";

interface Props {
  id: string | undefined;
  email: string | undefined;
  username: string | undefined;
  firnstname: string | undefined;
  lstname: string | undefined;
}

export const EditUser: React.FC<Props> = (props) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (event: any) => {
    const { name, value } = event.currentTarget;
    setInputs({ ...inputs, [name]: value, id: props.id });
  };

  const handleSubmit = (event: any) => {
    commitMutation<editUserMutation>(RelayEnvironment, {
      mutation: editUser,
      variables: event,
      onCompleted: (response) => {
        console.log("ok", response);
      },
      onError: (error) => {
        console.error(error);
      },
    });
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} size="sm">
        Edytuj
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edytuj użytkownika</Modal.Title>
        </Modal.Header>
        <Modal.Body onSubmit={handleSubmit}>
          <div>
            <label>Id</label>
            <input
              name="id"
              type="name"
              className="form-control"
              placeholder={props.id}
              value={props.id}
              disabled
            />
          </div>
          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder={props.email}
              // value={inputs?.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nazwa użytkownika</label>
            <input
              name="username"
              type="name"
              className="form-control"
              placeholder={props.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Imie</label>
            <input
              name="firstName"
              type="name"
              className="form-control"
              placeholder={props.firnstname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nazwisko</label>
            <input
              name="lastName"
              type="name"
              className="form-control"
              placeholder={props.lstname}
              onChange={handleChange}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            onClick={() => handleSubmit(inputs)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
