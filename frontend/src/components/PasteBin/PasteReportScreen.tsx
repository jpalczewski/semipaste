import {Button, Form, Modal, Alert} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {commitMutation} from "react-relay";
import {reportPasteMutation} from "../../Query/Report/__generated__/reportPasteMutation.graphql";
import RelayEnvironment from "../../RelayEnvironment";
import {reportPaste} from "../../Query/Report/reportPaste";

export const PasteReportScreen = (props: any) => {

    const [show, setShow] = useState(false);
    const [reason, setReason] = useState("");
    const [result, setResult] = useState("");

    const handleSubmit = () => {
        if (reason !== "") {
            commitMutation<reportPasteMutation>(RelayEnvironment, {
            mutation: reportPaste,
            variables: {pid: props.pid, reason: reason},
            onCompleted: response => {
                if (response.reportPaste?.ok!) {
                    setResult("Paste Reported!");
                    const timer = setTimeout(() => {
                        setResult("");
                        setReason("");
                        setShow(!show);
                    }, 500);
                    return () => clearTimeout(timer);
                }
                else {
                    setResult("Something went wrong.");
                }
            },
            onError: error => {
                setResult("En error occurred: " + error);
            }
        });
        }
        else {
            setResult("Please, write the reason");
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setResult("");
        }, 1500);
        return () => clearTimeout(timer);
    }, [result]);

    return (
        <>
            <div className="d-flex justify-content-end">
                <Button variant="danger" onClick={() => setShow(!show)}>Report</Button>
            </div>
            <Modal show={show} onHide={() => {
                setShow(!show);
                setReason("");
            }} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Report the paste: {props.title}</Modal.Title>
                </Modal.Header>
                {
                    result !== "" &&
                    <div>
                        <Alert variant="primary">
                            <Alert.Heading>
                                {result}
                            </Alert.Heading>
                        </Alert>
                    </div>
                }
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Reason</Form.Label>
                        <textarea className="form-control" rows={7} value={reason} onChange={event => {
                            setReason(event.target.value);
                        }} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        setShow(!show);
                        setReason("");
                    }}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleSubmit}>
                        Report
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
