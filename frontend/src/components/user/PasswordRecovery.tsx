import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {commitMutation} from "react-relay";
import {passwordRecoveryMutation} from "../../Query/Users/__generated__/passwordRecoveryMutation.graphql";
import relayEnvironment from "../../RelayEnvironment";
import {passwordRecovery} from "../../Query/Users/passwordRecovery";
import {useNavigate} from "react-router-dom";
import {Wrapper} from "../../styles/Components.style";

export const PasswordRecovery = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (email === "") return;
        commitMutation<passwordRecoveryMutation>(relayEnvironment, {
           mutation: passwordRecovery,
            variables: {email: email},
            onCompleted: response => {
               if (response.sendNewPasswordToken?.ok!) {
                   navigate("/verify", {state: {email: email, type: "recovery"}});
               }
            },
            onError: error => {
                console.log(error);
                console.log("Error");
            }
        });
    }

    return (
        <Wrapper>
        <div className="Contener">
            <Form.Group className="mb-3">
                <Form.Label className="my-5">E-mail</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="test@test.pl"
                    value={email || ""}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
        </Form.Group>
        <Button className="my-5" onClick={() => handleSubmit()}>
            Send E-Mail
        </Button>
        </div></Wrapper>
    );
}
