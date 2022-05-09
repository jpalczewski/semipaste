import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {commitMutation} from "react-relay";
import {passwordRecoveryMutation} from "../../Query/Users/__generated__/passwordRecoveryMutation.graphql";
import relayEnvironment from "../../RelayEnvironment";
import {passwordRecovery} from "../../Query/Users/passwordRecovery";
import {useNavigate} from "react-router-dom";

export const PasswordRecovery = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        // console.log("Test")
        navigate('/verify', {state: {id: 0, type: "recovery"}})
        // commitMutation<passwordRecoveryMutation>(relayEnvironment, {
        //    mutation: passwordRecovery,
        //     variables: {email: input},
        //     onCompleted: response => {
        //        if (response.sendNewPasswordToken?.ok!) {
        //            navigate("/verify", {state: {id: 0, type: "recovery"}});
        //        }
        //     },
        //     onError: error => {
        //
        //     }
        // });
    }

    return (
        <div className="Contener">
            <Form.Group className="mb-3">
                <Form.Label className="my-5">E-mail</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="test@test.pl"
                    value={input || ""}
                    onChange={(e) => {setInput(e.target.value)}}
                />
        </Form.Group>
        <Button className="my-5" onClick={() => handleSubmit()}>
            Send E-Mail
        </Button>
        </div>
    );
}