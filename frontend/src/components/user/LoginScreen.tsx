import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validPassword } from "../../Regex/Regex";
import "../../styles/LoginScreen.css";

const validate = (form: any) => {
  if (!form.username) return "login jest wymagany";
  if (form.username.length < 2) return "login jest za krótki (minimum 2 znaki)";

  if (!validPassword.test(form.password))
    return "Hasło powinno się składać minimum z 9 znaków, dużych i małych liter oraz naków specjalnych";
  return null;
};

export const LoginScreen = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ username: "", password: "" });

  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = (event: any) => {
    const errorMsg = validate(inputs);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    navigate("/user");
  };

  return (
    <div className="Contener">
      <Form>
        {error && <Form.Text className="text-danger">{error}</Form.Text>}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="test"
            value={inputs.username || ""}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="********"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Zaloguj
        </Button>
      </Form>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>LOGOwANIE</Modal.Title>
        </Modal.Header>
        {error != "" && <p className="form-control">{error}</p>}
        <Modal.Body onSubmit={handleSubmit}>
          <div>
            <label>
              wprowadź login:
              <input
                className="form-control"
                type="text"
                name="username"
                placeholder="test"
                value={inputs.username || ""}
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
      </Modal> */}
    </div>
  );
};
