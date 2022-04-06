import React, { useState } from "react";
import { FormWrapper } from "../../styles/Components.style";
import { Form, Button, Row, Col } from "react-bootstrap";
import RelayEnvironment from "../../RelayEnvironment";
import { commitMutation } from "react-relay";
import { addPasteBin } from "../../Query/PasteBins/addPasteBin";
import { addPasteBinMutation } from "../../Query/PasteBins/__generated__/addPasteBinMutation.graphql";
import CodeMirror from "react-codemirror";

require("codemirror/lib/codemirror.css");

export const PasteBinForm = () => {
  const [inputs, setInputs] = useState({
    text: "",
    title: "",
    exposure: false,
  });
  const handleText = (event: any) => {
    setInputs({
      ...inputs,
      text: event,
    });
  };

  const handleChange = (event: string) => {
    setInputs({
      ...inputs,
      title: event,
    });
  };
  const handleSwitch = (event: boolean) => {
    setInputs({
      ...inputs,
      exposure: event,
    });
  };

  const handleSubmit = (event: any) => {
    commitMutation<addPasteBinMutation>(RelayEnvironment, {
      mutation: addPasteBin,
      variables: event,
      onCompleted: (response) => {
        console.log("ok", response);
        window.location.reload();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <FormWrapper>
      <Form>
        <Row className="mb-3">
          <Col style={{ textAlign: "right", flex: "25%" }}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Tytuł"
                onChange={(event) => handleChange(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col style={{ textAlign: "right", flex: "25%" }}>
            <Form.Select aria-label="Default select example">
              <option>Highlight</option>
              <option value="1">Zwykły tekst</option>
              <option value="2">CSS</option>
              <option value="3">JavaScript</option>
              <option value="4">HTML5</option>
              <option value="5">Python</option>
              <option value="6">PHP</option>
              <option value="7">Ruby</option>
              <option value="8">Bash</option>
              <option value="9">C</option>
              <option value="10">C++</option>
              <option value="11">SQL</option>
              <option value="12">XML</option>
            </Form.Select>
          </Col>
          <Col style={{ textAlign: "right", flex: "35%" }}>
            <Button variant="primary">WYCZYŚĆ</Button>
          </Col>
          <Col
            style={{
              textAlign: "right",
              flex: "5%",
            }}
          >
            <Button variant="success" onClick={() => handleSubmit(inputs)}>
              ZAPISZ
            </Button>
          </Col>
        </Row>
        <Form.Group style={{ marginBottom: 10 }}>
          <CodeMirror
            name="text"
            onChange={handleText}
            options={{ lineNumbers: true, mode: "javascript" }}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col>
            <Form.Group
              className="mb-3"
              style={{ marginBottom: 10, width: "50%" }}
            >
              <Form.Control type="file" size="sm" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Widoczność"
                onChange={(event) => handleSwitch(event.target.checked)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </FormWrapper>
  );
};
