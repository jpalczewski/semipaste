import React, {useEffect, useState} from "react";
import {Form, Button, Modal, ModalHeader, Row, Col, ModalBody, ModalFooter} from "react-bootstrap";
import {commitMutation} from "react-relay";
import RelayEnvironment from "../../RelayEnvironment";
import { highlightPasteBinMutation } from "../../Query/SyntaxHighlight/__generated__/highlightPasteBinMutation.graphql";
import { highlightPasteBin } from "../../Query/SyntaxHighlight/highlightPasteBin";
import 'bootstrap/dist/css/bootstrap.min.css';
import {isPasteBinRatedMutation} from "../../Query/Rating/__generated__/isPasteBinRatedMutation.graphql";
import {isPasteBinRated} from "../../Query/Rating/isPasteBinRated";
import {ratePasteBinMutation} from "../../Query/Rating/__generated__/ratePasteBinMutation.graphql";
import {ratePasteBin} from "../../Query/Rating/ratePasteBin";
require("codemirror/lib/codemirror.css");


export const PasteBinScreen = (props: any) => {
  const [show, setShow] = useState(false);
  const [syntax, setSyntax] = useState<string>("");
  const [isRated, setIsRated] = useState<boolean>(false);
  const [rate, setRate] = useState<boolean>(false);
  const [likes, setLikes] = useState(props.likes);
  const [dislikes, setDislikes] = useState(props.dislikes);

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

  commitMutation<isPasteBinRatedMutation>(RelayEnvironment, {
     mutation: isPasteBinRated,
     variables: { paste: props.id },
     onCompleted: (response) => {
        setIsRated(response.isPasteBinRated?.isRated!);
        setRate(response.isPasteBinRated?.rate!);
     },
  });
  }, []);

  const refreshRated = () => {
      commitMutation<isPasteBinRatedMutation>(RelayEnvironment, {
        mutation: isPasteBinRated,
        variables: { paste: props.id },
        onCompleted: (response) => {
            setIsRated(response.isPasteBinRated?.isRated!);
            setRate(response.isPasteBinRated?.rate!);
            if (isPasteBinRated) {
                setLikes(response.isPasteBinRated?.likes);
                setDislikes(response.isPasteBinRated?.dislikes);
            }
        },
    });
  };

  const ratePaste = (value: any) => {
      commitMutation<ratePasteBinMutation>(RelayEnvironment, {
         mutation: ratePasteBin,
         variables: {paste: props.id, liked: value},
         onCompleted: (response) => {
             if (response.ratePasteBin?.ok!) {
                 refreshRated()
             }
         }
      });
  }

  const handleRate = (event: any) => {
      let value = event.target.value === "like";
      if (isRated) {
          if (value === rate) {
              ratePaste(null);
          } else {
              ratePaste(value);
          }
      } else {
          ratePaste(value);
      }
  };

  return (
    <>
      <Button onClick={() => setShow(!show)}>Przeglądaj</Button>
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
              <p>Likes: {likes}</p>
              <p>Dislikes: {dislikes}</p>
              {isRated
                  ? rate &&
                  <><Button variant="primary" value="like" onClick={handleRate}>
                      Like
                  </Button>
                  <Button variant="outline-primary" value="dislike" onClick={handleRate}>
                      Dislike
                  </Button></>
                  :
                  <Button variant="outline-primary" value="like" onClick={handleRate}>
                      Like
                  </Button>
              }
              {isRated
                  ? !rate &&
                  <><Button variant="outline-primary" value="like" onClick={handleRate}>
                      Like
                  </Button>
                  <Button variant="primary" value="dislike" onClick={handleRate}>
                      Dislike
                  </Button></>
                  :
                  <Button variant="outline-primary" value="dislike" onClick={handleRate}>
                      Dislike
                  </Button>
              }
          </ModalFooter>
      </Modal>
    </>
  );
};
