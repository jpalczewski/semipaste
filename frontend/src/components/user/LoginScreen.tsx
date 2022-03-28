import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validPassword } from "../../Regex/Regex";
import "../../styles/LoginScreen.css";
import { RegistrationScreen } from "./RegistrationScreen";

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
    event.preventDefault();
    const errorMsg = validate(inputs);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    navigate("/user");
  };

  return (
    <div className="Contener">
      <p>Logowanie</p>
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

      {/* {vis && <RegistrationScreen />}
      <p>
        {!vis ? "Nie posiadasz konta?" : "Posiadasz już konto?"}
        <Button variant="success" onClick={() => setVis(!vis)}>
          {!vis ? "Zarejestruj się" : "Zaloguj się"}
        </Button>
      </p> */}
    </div>
  );
};
