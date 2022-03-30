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
  const [inputs, setInputs] = useState({});
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
    event.preventDefault();
    console.log("inputs =>", inputs);

    commitMutation<addPasteBinMutation>(RelayEnvironment, {
      mutation: addPasteBin,
      variables: event,
      onCompleted: (response) => {
        console.log("ok", response);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <FormWrapper>
      <Form>
        <Form.Group style={{ marginBottom: 10, width: "25%" }}>
          <Form.Label>Tytuł</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tytuł"
            onChange={(event) => handleChange(event.target.value)}
          />
          <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group style={{ marginBottom: 10 }}>
          <Form.Label>Tekst wklejki</Form.Label>
          <CodeMirror
            name="text"
            onChange={handleText}
            options={{ lineNumbers: true, mode: "javascript" }}
          />

          {/* <Form.Control
            as="textarea"
            rows={5}
            placeholder="The default text that goes there"
            onChange={handleChange}
          >
            <pre></pre>
          </Form.Control> */}
          <Form.Text></Form.Text>
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
        <Button
          type="submit"
          variant="success"
          onClick={() => handleSubmit(inputs)}
        >
          TEST
        </Button>
      </Form>
    </FormWrapper>
  );
};
