import React, { useState } from "react";
import { FormWrapper } from "../../styles/Components.style";
import { Form, Button, Row, Col } from "react-bootstrap";
import RelayEnvironment from "../../RelayEnvironment";
import { commitMutation } from "react-relay";
import { addPasteBin } from "../../Query/PasteBins/addPasteBin";
import { addPasteBinMutation } from "../../Query/PasteBins/__generated__/addPasteBinMutation.graphql";

export const PasteBinForm = () => {
  const [inputs, setInputs] = useState({});
  const [isExposure, setIsExposure] = useState<boolean>();

  const handleChange = (event: any) => {
    const { name, value } = event.currentTarget;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log("Change-inputs =>", inputs);
  };
  const handleSwitch = (event: any) => {
    if (event == "on") setIsExposure(true);
    else setIsExposure(false);
    handleChange(isExposure);
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
            onChange={handleChange}
          />
          <Form.Text></Form.Text>
        </Form.Group>
        <Form.Group style={{ marginBottom: 10 }}>
          <Form.Label>Tekst wklejki</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="The default text that goes there"
            onChange={handleChange}
          />
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
                type="switch"
                label="Widoczność"
                onChange={handleSwitch}
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
