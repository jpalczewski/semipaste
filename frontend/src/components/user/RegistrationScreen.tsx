import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { validPassword } from "../../Regex/Regex";
import "../../styles/LoginScreen.css";
import {commitMutation} from "react-relay";
import {addUserMutation} from "../../Query/Users/__generated__/addUserMutation.graphql";
import relayEnvironment from "../../RelayEnvironment";
import {addUser} from "../../Query/Users/addUser";

const validate = (form: any) => {
  if (!form.username) return "login jest wymagany";
  if (form.username.length < 2) return "login jest za krótki (minimum 2 znaki)";

  if (!validPassword.test(form.password))
    return "Hasło powinno się składać minimum z 9 znaków, dużych i małych liter oraz naków specjalnych";
  return null;
};

export const RegistrationScreen = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.currentTarget;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const errorMsg = validate(inputs);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    commitMutation<addUserMutation>(relayEnvironment, {
      mutation: addUser,
      variables: inputs,
      onCompleted: response => {
        if (response.addUser?.ok!) {
          navigate('/verify', {state: {id: response.addUser?.id, type: "registration"}})
        }
      },
      onError: error => {
         console.log(error);
      }
    });
  };

  return (
    <div className="Contener">
      <p>REGISTRATION</p>
      <Form>
        {error && <Form.Text className="text-danger">{error}</Form.Text>}
        <Form.Group className="mb-3">
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="test@test.pl"
            value={inputs.email || ""}
            onChange={handleChange}
          />
          {/*<Form.Text className="text-muted">*/}
          {/*  We'll never share your email with anyone else.*/}
          {/*</Form.Text>*/}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="test"
            value={inputs.username || ""}
            onChange={handleChange}
          />
          {/*<Form.Text className="text-muted">Minimum dwa znaki</Form.Text>*/}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="firstName"
            value={inputs.firstName || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="lastName"
            value={inputs.lastName || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="********"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="********"
            value={inputs.confirmPassword || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => handleSubmit(e)}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};
