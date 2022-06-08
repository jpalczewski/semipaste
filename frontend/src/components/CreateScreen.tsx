import React, {useEffect, useState} from "react";
import { AllFooter, Wrapper } from "../styles/Components.style";
import { PasteBinForm } from "./form/form";
import {Alert, Col, Container, Row} from "react-bootstrap";
import {Box} from "@chakra-ui/react";

export const Create = () => {
    const [result, setResult] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setResult("");
        }, 1500);
        return () => clearTimeout(timer);
    }, [result]);

    return (
        <Wrapper>
            <Box className="py-4">
                <Container className="bg-white">
                    {result &&
                        <Alert variant="primary" style={{width: "50vh", margin: "auto"}}>
                            <Alert.Heading>
                                {result}
                            </Alert.Heading>
                        </Alert>
                    }
                    <PasteBinForm setResult={setResult}/>
                </Container>
            </Box>
        </Wrapper>
    );
};
