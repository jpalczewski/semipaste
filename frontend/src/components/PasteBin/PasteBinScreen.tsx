import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
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
        <div style={{ margin: 20 }}>
          <Form>
            <Form.Group style={{ marginBottom: 10, width: "25%" }}>
              <Form.Label>Tytuł</Form.Label>
              <Form.Control disabled type="text" placeholder={props.title} />
            </Form.Group>
            <Form.Group style={{ marginBottom: 10, width: "25%" }}>
              <Form.Label>Language</Form.Label>
              <Form.Control disabled type="text" placeholder={props.language} />
            </Form.Group>
            <Form.Group style={{ marginBottom: 25, marginTop: 25 }}>
              <Form.Label>Tekst wklejki</Form.Label>
              <pre dangerouslySetInnerHTML={{ __html: syntax }}></pre>
            </Form.Group>
          </Form>
        </div>
      </Modal>
    </>
  );
};
