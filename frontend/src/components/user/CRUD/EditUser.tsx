import React, { SetStateAction, useState, Dispatch } from "react";
// import { editUser } from "../../../Query/editUser";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useMutation } from "react-relay";

interface Props {
  id: Number;
  email: string;
  username: string;
}

export const EditUser = ({ id, email, username }: Props) => {
  const [inputs, setInputs] = useState({ login: "", email: "", password: "" });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: any) => {
    console.log(inputs);
    setInputs({ login: "", password: "", email: "" });
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
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="adam.małysz@ski.jump"
              value={inputs.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Nazwa użytkownika</label>
            <input
              type="name"
              className="form-control"
              placeholder="adam_malysz"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Hasło</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              onChange={handleChange}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
