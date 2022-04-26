import React, { useState } from "react";
import {Form, Button, Modal, ModalHeader, Row, Col} from "react-bootstrap";
import { commitMutation } from "react-relay";
import RelayEnvironment from "../../RelayEnvironment";
import { highlightPasteBinMutation } from "../../Query/SyntaxHighlight/__generated__/highlightPasteBinMutation.graphql";
import { highlightPasteBin } from "../../Query/SyntaxHighlight/highlightPasteBin";

require("codemirror/lib/codemirror.css");


export const PasteBinScreen = (props: any) => {
  const [show, setShow] = useState(false);
  const [syntax, setSyntax] = useState<string>("");

  commitMutation<highlightPasteBinMutation>(RelayEnvironment, {
    mutation: highlightPasteBin,
    variables: { id: props.id },
    onCompleted: (response) => {
      setSyntax(response.highlightPasteBin?.highlight!)
    },
    onError: (error) => {
      setSyntax("Error")
    },
  });

  return (
    <>
      <Button onClick={() => setShow(!show)}>Przeglądaj</Button>
      <Modal show={show} size="lg" onHide={() => setShow(false)}>
        <ModalHeader>
          <Modal.Title>{props.title}</Modal.Title>
        </ModalHeader>
        <div style={{ margin: 20 }}>
          <Form>
            <Row>
                <Form.Group as={Col} style={{ marginBottom: 10, width: "100%" }}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control disabled type="text" placeholder={props.title} />
                </Form.Group>
                <Form.Group as={Col} style={{ marginBottom: 10, width: "100%" }}>
                  <Form.Label>Language</Form.Label>
                  <Form.Control disabled type="text" placeholder={props.language} />
                </Form.Group>
            </Row>
            <hr />
            <>
            {
              props.language != "Plain Text"
                  ? <><Row>
                      <Form.Group style={{ marginBottom: 25, marginTop: 25 }}>
                      <Form.Label>Highlighted Code</Form.Label>
                        <pre dangerouslySetInnerHTML={{__html: syntax}}></pre>
                      </Form.Group>
                    </Row>
                  <Row>
                      <Form.Group style={{ marginBottom: 25, marginTop: 25 }}>
                      <Form.Label>Raw Code</Form.Label>
                        <pre>{props.text}</pre>
                      </Form.Group>
                </Row></>
                : <Row>
                      <Form.Group style={{ marginBottom: 25, marginTop: 25 }}>
                      <Form.Label>Text</Form.Label>
                        <pre>{props.text}</pre>
                      </Form.Group>
                </Row>
            }
                </>
          </Form>
        </div>
      </Modal>
    </>
  );
};
