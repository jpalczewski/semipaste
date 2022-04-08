import React, { useState } from "react";
import { FormWrapper } from "../../styles/Components.style";
import {Form, Button, Row, Col} from "react-bootstrap";
import RelayEnvironment from "../../RelayEnvironment";
import {commitMutation, useLazyLoadQuery} from "react-relay";
import { addPasteBin } from "../../Query/PasteBins/addPasteBin";
import { addPasteBinMutation } from "../../Query/PasteBins/__generated__/addPasteBinMutation.graphql";
import CodeMirror from "react-codemirror";
import {allLanguagesQuery} from "../../Query/SyntaxHighlight/__generated__/allLanguagesQuery.graphql";
import {Languages} from "../../Query/SyntaxHighlight/allLanguages";
import {highlightPreview} from "../../Query/SyntaxHighlight/highlightPreview";
import {highlightPreviewMutation} from "../../Query/SyntaxHighlight/__generated__/highlightPreviewMutation.graphql";
import '../../styles/PasteHighlight.css'

require("codemirror/lib/codemirror.css");

export const PasteBinForm = () => {
  const [preview, setPreview] = useState(true);
  const [syntax, setSyntax] = useState<string>("");
  const [inputs, setInputs] = useState({
    text: "",
    title: "",
    language: "Plain Text",
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

  const handleLanguage = (event: string) => {
    setInputs({
      ...inputs,
      language: event
    });
  };

  const handleSubmit = (event: any) => {
    console.log(event);
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

  const handlePreview = () => {
    if (inputs.text) {
      setPreview(!preview);
      if (preview) {
        commitMutation<highlightPreviewMutation>(RelayEnvironment, {
          mutation: highlightPreview,
          variables: {code: inputs.text, lang: inputs.language},
          onCompleted: response => {setSyntax(response.highlightPreview?.highlight!)},
          onError: error => {setSyntax("Error")}
        });
      } else {
        setSyntax("");
      }
    }
  }

  const languages = useLazyLoadQuery<allLanguagesQuery>(Languages, {}).allLanguages;

  return (
    <FormWrapper>
      <Form>
        <Row className="mb-3">
          {!preview &&
              <>
                <h4>Preview</h4>
              <pre dangerouslySetInnerHTML={{__html: syntax}}></pre>
              </>
          }
        </Row>
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
            <Form.Select aria-label="Default select example" onChange={(event) => handleLanguage(event.target.value)}>
              {languages?.map((language, i) => {
                      return <option key={i} value={language!}>
                        {language}
                      </option>
              })}
            </Form.Select>
          </Col>
          <Col style={{ textAlign: "right", flex: "15%" }}>
            <Button variant="primary">WYCZYŚĆ</Button>
          </Col>
          <Col
            style={{
              textAlign: "right",
            }}
          >
            <Button variant="info" onClick={()=>handlePreview()}>
              PREVIEW
            </Button>
          </Col>
          <Col
            style={{
              textAlign: "right",
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
