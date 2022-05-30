import React, { useState } from "react";
import { FormWrapper } from "../../styles/Components.style";
import { Form, Button, Row, Col } from "react-bootstrap";
import RelayEnvironment from "../../RelayEnvironment";
import { commitMutation, useLazyLoadQuery } from "react-relay";
import { addPasteBin } from "../../Query/PasteBins/addPasteBin";
import { addPasteBinMutation } from "../../Query/PasteBins/__generated__/addPasteBinMutation.graphql";
import { allLanguagesQuery } from "../../Query/SyntaxHighlight/__generated__/allLanguagesQuery.graphql";
import { Languages } from "../../Query/SyntaxHighlight/allLanguages";
import { highlightPreview } from "../../Query/SyntaxHighlight/highlightPreview";
import { highlightPreviewMutation } from "../../Query/SyntaxHighlight/__generated__/highlightPreviewMutation.graphql";
import '../../styles/PasteHighlight.css'
import Select from "react-select";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-dawn";

export const PasteBinForm = () => {
  const [preview, setPreview] = useState(true);
  const [syntax, setSyntax] = useState<string>("");
  const [inputs, setInputs] = useState({
    text: "",
    title: "",
    language: "Plain Text",
    visible: false,
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
      visible: event,
    });
  };

  const handleLanguage = (event: string) => {
    if (event == null || event == undefined) {
      setInputs({
      ...inputs,
      language: "Plain Text",
    });
    }
    else {
      setInputs({
      ...inputs,
      language: event,
    });
    }
  };

  const handleSubmit = (event: any) => {
    if (inputs.text === "" || inputs.text === "") return;
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
          onCompleted: response => {
            setSyntax(response.highlightPreview?.highlight!)
          },
          onError: error => {
            setSyntax("Error")
          },
        });
      } else {
        setSyntax("");
      }
    }
  };

  const handleClear = () => {
    setInputs({
      text: "",
      title: "",
      language: "Plain Text",
      visible: false,
    });
  };

  const languages = useLazyLoadQuery<allLanguagesQuery>( Languages, {} ).allLanguages;
  const languages_options = languages?.map(
      language => {
        return {value: language, label: language}
      }
  );

  return (
    <FormWrapper>
      <Form>
        <Row className="mb-3">
          <Col style={{ textAlign: "right", flex: "25%" }}>
            <Form.Group>
              <Form.Control
                type="text"
                value={inputs.title}
                placeholder="Tytuł"
                onChange={(event) => handleChange(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col style={{ textAlign: "right", flex: "25%" }}>
            <Select
                onChange={(event) => handleLanguage(event?.value!)}
                defaultValue={languages_options![0]}
                isClearable={true}
                options={languages_options}
            />
            {/*<Form.Select aria-label="Default select example" onChange={(event) => handleLanguage(event.target.value)}>*/}
            {/*  {languages?.map((language, i) => {*/}
            {/*          return <option key={i} value={ language! }>{ language }</option>*/}
            {/*  })}*/}
            {/*</Form.Select>*/}
          </Col>
          <Col style={{ textAlign: "right", flex: "15%" }}>
            <Button variant="primary" onClick={handleClear}>
              CLEAR
            </Button>
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
              SAVE
            </Button>
          </Col>
        </Row>
        <Form.Group style={{ marginBottom: 10 }}>
          <AceEditor
            name="text"
            theme="dawn"
            fontSize={30}
            value={inputs.text}
            width={"100%"}
            onChange={handleText}
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
                checked={inputs.visible}
                label="Widoczność"
                onChange={(event) => handleSwitch(event.target.checked)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          { (!preview && inputs.language != "Plain Text")
              ? <><pre dangerouslySetInnerHTML={{__html: syntax}}></pre></>
              : <><pre>{syntax}</pre></>
          }
        </Row>
      </Form>
    </FormWrapper>
  );
};
