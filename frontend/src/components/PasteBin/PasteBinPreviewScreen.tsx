import React, {useEffect, useState} from "react";
import {Form, Button, Modal, ModalHeader, Row, Col, ModalBody, ModalFooter} from "react-bootstrap";
import {commitMutation} from "react-relay";
import RelayEnvironment from "../../RelayEnvironment";
import { highlightPasteBinMutation } from "../../Query/SyntaxHighlight/__generated__/highlightPasteBinMutation.graphql";
import { highlightPasteBin } from "../../Query/SyntaxHighlight/highlightPasteBin";
import 'bootstrap/dist/css/bootstrap.min.css';
require("codemirror/lib/codemirror.css");


export const PasteBinPreviewScreen = (props: any) => {
  const [show, setShow] = useState(false);
  const [syntax, setSyntax] = useState<string>("");

  useEffect(() => {
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
  }, []);

  return (
    <>
      <Button onClick={() => setShow(!show)}>Preview</Button>
      <Modal show={show} size="lg" onHide={() => setShow(false)}>
        <ModalHeader>
          <Modal.Title>{props.title}</Modal.Title>
        </ModalHeader>
          <ModalBody>
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
            <>
            {
              props.language !== "Plain Text"
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
          </ModalBody>
          <ModalFooter>
              <p>Likes: {props.likes}</p>
              <p>Dislikes: {props.dislikes}</p>
          </ModalFooter>
      </Modal>
    </>
  );
};
