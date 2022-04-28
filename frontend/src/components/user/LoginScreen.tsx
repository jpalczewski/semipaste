import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { commitMutation } from "relay-runtime";
import { login } from "../../Query/Login/login";
import { loginMutation } from "../../Query/Login/__generated__/loginMutation.graphql";
import { validPassword } from "../../Regex/Regex";
import RelayEnvironment from "../../RelayEnvironment";
import "../../styles/LoginScreen.css";
import imag from "../../assets/alert_login.jpeg";

// const validate = (form: any) => {
//   if (!form.username) return "login jest wymagany";
//   if (form.username.length < 2) return "login jest za krótki (minimum 2 znaki)";

//   if (!validPassword.test(form.password))
//     return "Hasło powinno się składać minimum z 9 znaków, dużych i małych liter oraz naków specjalnych";
//   return null;
// };

export const LoginScreen = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [error, setError] = useState(false);
  const handleChange = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const myAccount = (prop: any) => {
    if (prop == "a") {
      navigate("user/admin");
    } else {
      navigate("user/user");
    }
  };

  const handleSubmit = async (event: any) => {
    const name = inputs.username;
    localStorage.setItem("username", JSON.stringify(inputs.username));
    event.preventDefault();
    commitMutation<loginMutation>(RelayEnvironment, {
      mutation: login,
      variables: inputs,
      onCompleted: (response) => {
        if (response.tokenAuth?.token != undefined) {
          localStorage.setItem(
            "token",
            JSON.stringify(response.tokenAuth?.token)
          );
          setError(false);
          myAccount(inputs.username);
          // navigate("/user/user");
          console.log("name", name);

          window.location.reload();
        } else {
          setError(true);
        }
      },
      onError: (error) => {
        event.preventDefault();
        console.error(error);
      },
    });
  };

  return (
    <div className="Contener">
      <p>Logowanie</p>
      {error && (
        <Alert variant="danger" onClose={() => setError(!error)} dismissible>
          <img src={imag} style={{ borderRadius: 20 }} />
          <br />
          coś się... coś się popsuło i nie było mnie słychać dlatego podaj dane
          do logowania jeszcze raz
        </Alert>
      )}
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
          onClick={(inputs) => {
            handleSubmit(inputs);
          }}
        >
          Zaloguj
        </Button>
      </Form>
    </div>
  );
};
