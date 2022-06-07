import React, {useEffect, useState} from "react";
// import {Form, Modal, ModalHeader, Row, Col, ModalBody, ModalFooter} from "react-bootstrap";
import {Row, Col, Form} from "react-bootstrap";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent, ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from "@chakra-ui/react";
import {useDisclosure} from "@chakra-ui/react";
import {commitMutation} from "react-relay";
import RelayEnvironment from "../../RelayEnvironment";
import { highlightPasteBinMutation } from "../../Query/SyntaxHighlight/__generated__/highlightPasteBinMutation.graphql";
import { highlightPasteBin } from "../../Query/SyntaxHighlight/highlightPasteBin";
import 'bootstrap/dist/css/bootstrap.min.css';
require("codemirror/lib/codemirror.css");

export const PasteBinPreviewScreen = (props: any) => {
  const [show, setShow] = useState(false);
  const [syntax, setSyntax] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure()

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
        {/*<Button colorScheme="blue" onClick={() => setShow(!show)}>Preview</Button>*/}
        <Button colorScheme="blue" onClick={onOpen}>Preview</Button>
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>{props.title}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
              <Form>
                <Form.Group as={Col} style={{marginBottom: 10, width: "100%"}}>
                    <Form.Label>Language</Form.Label>
                    <Form.Control disabled type="text" placeholder={props.language}/>
                  </Form.Group>
                <>
                  {
                    props.language !== "Plain Text"
                        ? <><Row>
                          <Form.Group style={{marginBottom: 25, marginTop: 25}}>
                            <Form.Label>Highlighted Code</Form.Label>
                            <pre dangerouslySetInnerHTML={{__html: syntax}}></pre>
                          </Form.Group>
                        </Row>
                          <Row>
                          </Row></>
                        : <Row>
                          <Form.Group style={{marginBottom: 25, marginTop: 25}}>
                            <Form.Label>Text</Form.Label>
                            <pre>{props.text}</pre>
                          </Form.Group>
                        </Row>
                  }
                </>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/*<Modal show={show} size="lg" onHide={() => setShow(false)}>*/}
        {/*  <ModalHeader>*/}
        {/*    <Modal.Title>{props.title}</Modal.Title>*/}
        {/*  </ModalHeader>*/}
        {/*    <ModalBody>*/}
        {/*    <Form>*/}
        {/*      <Row>*/}
        {/*          <Form.Group as={Col} style={{ marginBottom: 10, width: "100%" }}>*/}
        {/*            <Form.Label>Title</Form.Label>*/}
        {/*            <Form.Control disabled type="text" placeholder={props.title} />*/}
        {/*          </Form.Group>*/}
        {/*          <Form.Group as={Col} style={{ marginBottom: 10, width: "100%" }}>*/}
        {/*            <Form.Label>Language</Form.Label>*/}
        {/*            <Form.Control disabled type="text" placeholder={props.language} />*/}
        {/*          </Form.Group>*/}
        {/*      </Row>*/}
        {/*      <>*/}
        {/*      {*/}
        {/*        props.language !== "Plain Text"*/}
        {/*            ? <><Row>*/}
        {/*                <Form.Group style={{ marginBottom: 25, marginTop: 25 }}>*/}
        {/*                <Form.Label>Highlighted Code</Form.Label>*/}
        {/*                  <pre dangerouslySetInnerHTML={{__html: syntax}}></pre>*/}
        {/*                </Form.Group>*/}
        {/*              </Row>*/}
        {/*            <Row>*/}
        {/*          </Row></>*/}
        {/*          : <Row>*/}
        {/*                <Form.Group style={{ marginBottom: 25, marginTop: 25 }}>*/}
        {/*                <Form.Label>Text</Form.Label>*/}
        {/*                  <pre>{props.text}</pre>*/}
        {/*                </Form.Group>*/}
        {/*          </Row>*/}
        {/*      }*/}
        {/*          </>*/}
        {/*    </Form>*/}
        {/*    </ModalBody>*/}
        {/*    <ModalFooter>*/}
        {/*        <p>Likes: {props.likes}</p>*/}
        {/*        <p>Dislikes: {props.dislikes}</p>*/}
        {/*    </ModalFooter>*/}
        {/*</Modal>*/}
      </>
  );
};
