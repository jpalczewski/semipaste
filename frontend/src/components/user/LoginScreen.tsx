import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const LoginScreen = () => {
  const [state, setState] = useState<UserLog>();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ login: "", password: "" });
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event: any) => {
    console.log(inputs);
    setState({ isActive: true });
    console.log(state?.isActive);

    setInputs({ login: "", password: "" });
    handleClose();
    navigate("/user");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        ZALOGUJ
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>LOGOwANIE</Modal.Title>
        </Modal.Header>
        <Modal.Body onSubmit={handleSubmit}>
          <div>
            <label>
              wprowadź login:
              <input
                className="form-control"
                type="text"
                name="login"
                placeholder="test"
                value={inputs.login || ""}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              wprowadź hasło:
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="********"
                value={inputs.password || ""}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Zaloguj
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
