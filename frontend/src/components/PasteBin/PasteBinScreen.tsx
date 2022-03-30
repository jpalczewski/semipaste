import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import CodeMirror from "react-codemirror";

require("codemirror/lib/codemirror.css");

export const PasteBinScreen = (props: any) => {
  const [show, setShow] = useState(false);

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
            <Form.Group style={{ marginBottom: 10 }}>
              <Form.Label>Tekst wklejki</Form.Label>
              <CodeMirror
                name="text"
                value={props.text}
                options={{ mode: "javascript" }}
              />
            </Form.Group>
          </Form>
        </div>
      </Modal>
    </>
  );
};
