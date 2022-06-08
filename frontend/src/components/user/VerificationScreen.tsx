import {Alert, Container, Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {commitMutation} from "react-relay";
import RelayEnvironment from "../../RelayEnvironment";
import {setNewPasswordMutation} from "../../Query/Users/__generated__/setNewPasswordMutation.graphql";
import {setNewPassword} from "../../Query/Users/setNewPassword";
import {useNavigate} from "react-router-dom";
import {Wrapper} from "../../styles/Components.style";
import {verifyNewUserMutation} from "../../Query/Users/__generated__/verifyNewUserMutation.graphql";
import {verifyNewUser} from "../../Query/Users/verifyNewUser";
import {Flex, Box, Button} from "@chakra-ui/react";

interface Props {
    email: string,
    type: string,
    id: number
}

export const VerificationScreen: React.FC = () => {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    // using useState => inf loop ????
    let email: any = undefined;
    let id: any = undefined;
    let type = "";
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const location = useLocation();
    if (location.state !== null) {
        const state = location.state as Props;
        email = state.email;
        type = state.type;
        id = state.id;
    }

    const generateInputs = () => {
        switch(type) {
            case "recovery": {
                return (

                    <><Form.Group className="mb-3">
                        <Form.Label className="my-5">Verification Code</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="code"
                            value={code || ""}
                            onChange={(e) => {
                                setCode(e.target.value)
                            }}
                        />
                    </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="my-5">Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="*****"
                                value={password || ""}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="my-5">Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder="*****"
                                value={confirmPassword || ""}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value)
                                }}
                            />
                        </Form.Group>

                        <Button colorScheme="blue" className="my-5" onClick={() => handleRecover()}>
                            Change Password
                        </Button></>);
            }
            case "registration": {
                return (<>
                <Form.Group className="mb-3">
                    <Form.Label className="my-5">Verification Code</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="test@test.pl"
                        value={code || ""}
                        onChange={(e) => {setCode(e.target.value)}}
                    />
                </Form.Group>
                <Button colorScheme="blue" className="my-5" onClick={() => handleRegister()}>
                    Verify
                </Button></>)
            }
        }
    }

    const handleRecover = () => {
        commitMutation<setNewPasswordMutation>(RelayEnvironment, {
            mutation: setNewPassword,
            variables: {email: email, code: code, newPassword: password, confirmNewPassword: confirmPassword},
            onCompleted: response => {
                if (response.setNewPassword?.ok!) {
                    setStatus(true);
                }
                setError(true);
                setErrorMessage(response.setNewPassword?.response!);
            },
            onError: error => {
                setError(true);
                setErrorMessage(error.message);
            }
        });
    }

    const handleRegister = () => {
        commitMutation<verifyNewUserMutation>(RelayEnvironment, {
            mutation: verifyNewUser,
            variables: {id: id, code: code},
            onCompleted: response => {
                if (response.verifyNewUser?.ok!) {
                    setStatus(true);
                }
                setError(true);
                setErrorMessage(response.verifyNewUser?.response!);
            },
            onError: error => {
                setError(true);
                setErrorMessage(error.message);
            }
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [error]);

    return (
        <Wrapper>
            <Box className="py-4">
                <Container className="bg-white py-5">
                    {error &&
                        <Alert variant="primary" style={{width: "50vh", margin: "auto"}}>
                            <Alert.Heading>
                                {errorMessage}
                            </Alert.Heading>
                        </Alert>
                    }
                    <Flex align="center" justify="center" direction="column">
                        {(email === undefined && id === undefined) ? <><p>Nope</p></> :
                            <>
                                {!status ? <>
                                        {generateInputs()}
                                    </>
                                    :
                                    <>
                                        <p>It worked!</p>
                                        <Button colorScheme="blue" onClick={() => navigate('/join')}>
                                            Go Back
                                        </Button>
                                    </>
                                }
                            </>}
                    </Flex>
                </Container>
            </Box>
        </Wrapper>
    );
}
