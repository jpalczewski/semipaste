import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { commitMutation } from "relay-runtime";
import { login } from "../../Query/Login/login";
import { loginMutation } from "../../Query/Login/__generated__/loginMutation.graphql";
import { validPassword } from "../../Regex/Regex";
import RelayEnvironment from "../../RelayEnvironment";
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
    // const errorMsg = validate(inputs);
    // if (errorMsg) {
    //   setError(errorMsg);
    //   return;
    // }
    console.log("inputs -> ", inputs);
    console.log("event -> ", event);
    commitMutation<loginMutation>(RelayEnvironment, {
      mutation: login,
      variables: event,
      onCompleted: (response) => {
        console.log("ok", response);
        console.log("message", response.tokenAuth);
        {
          //response.tokenAuth != null && navigate("/user");
        }

        navigate("/user");
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div className="Contener">
      <p>Logowanie</p>
      <Form onSubmit={() => handleSubmit(inputs)}>
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
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(inputs);
          }}
        >
          Zaloguj
        </Button>
      </Form>
    </div>
  );
};
