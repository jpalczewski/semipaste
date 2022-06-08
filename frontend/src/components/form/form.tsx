import React, { useState } from "react";
import { FormWrapper } from "../../styles/Components.style";
import {Form, Button, Row, Col, Alert, ButtonGroup} from "react-bootstrap";
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

import {
  ButtonGroup as ChakraButtonGroup,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button as ChakraButton, Box,
  Switch, FormControl, FormLabel,
    SimpleGrid,
} from "@chakra-ui/react";
import RelayFileEnv from "../../RelayFileEnv";
import {addAttachmentMutation} from "../../Query/Attachment/__generated__/addAttachmentMutation.graphql";
import {addAttachment} from "../../Query/Attachment/addAttachment";

export const PasteBinForm = (props: any) => {
  const [preview, setPreview] = useState(true);
  const [syntax, setSyntax] = useState<string>("");
  const [inputs, setInputs] = useState({
    text: "",
    title: "",
    language: "Plain Text",
    visible: true,
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
    if (inputs.title === "") {
      props.setResult("The title of your paste is empty!");
      return;
    }
    if (inputs.text === "") {
      props.setResult("The text of your paste is empty!");
      return;
    }
    // console.log(inputs);

    commitMutation<addPasteBinMutation>(RelayEnvironment, {
      mutation: addPasteBin,
      variables: event,
      onCompleted: (response) => {
        if (response.addPasteBin?.ok) {
          props.setResult("Saved!");
          window.location.reload();
        }
        else {
          props.setResult("An error occurred!");
        }
      },
      onError: (error) => {
        props.setResult("An error occurred!");
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

  const handleSendFile = (e: any) => {
      const uploadables = { file: e.target.files[0] as File }
      const token = "83e284067dbfc49cdfd288e614bf4dca";
      commitMutation<addAttachmentMutation>(RelayEnvironment, {
        mutation: addAttachment,
        variables: {token: token},
        uploadables: uploadables,
        onCompleted: response => {
          console.log("Response: ", response);
        },
        onError: error => {
          console.log("Error: ", error);
        }
      });
  }

  return (
    <FormWrapper>
      <Row>
        <Col lg={9}>
            <Form>
        <Row className="mb-3">
          <Col style={{ textAlign: "right", flex: "25%" }}>
            <Form.Group className="h-100">
              <Form.Control
                  className="h-100"
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
        </Row>
        <Form.Group style={{ marginBottom: 10 }}>
          <AceEditor
            name="text"
            theme="dawn"
            fontSize={16}
            value={inputs.text}
            width={"100%"}
            onChange={handleText}
            />
        </Form.Group>

        <Row className="mb-3">
          <div className="d-flex justify-content-between">
            <div>

            {/*  FILE  */}
            <Form.Group
              className="mb-3 w-100"
              style={{ marginBottom: 10, width: "50%" }}>
              <Form.Control type="file" size="sm" onChange={handleSendFile} />
            </Form.Group>

          </div>

          <div>
            <ChakraButtonGroup spacing={10}>
              <ChakraButton colorScheme="twitter" onClick={handleClear}>
              CLEAR
            </ChakraButton>
            <ChakraButton colorScheme="linkedin" onClick={()=>handlePreview()}>
              HIGHLIGHT
            </ChakraButton>
            <ChakraButton colorScheme="teal" onClick={() => handleSubmit(inputs)}>
              SAVE
            </ChakraButton>
            </ChakraButtonGroup>
          </div>
          </div>
        </Row>

        <Row className="mb-3">
          { (!preview && inputs.language != "Plain Text")
              ? <><pre dangerouslySetInnerHTML={{__html: syntax}}></pre></>
              : <><pre>{syntax}</pre></>
          }
        </Row>
      </Form>
        </Col>

        {/*// second part*/}
        <Col>
          <Accordion allowMultiple allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign="left">
                    <span style={{fontSize: 24}}>Settings</span>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormControl className="py-3">
                  <FormLabel htmlFor="visible" >Public</FormLabel>
                  <Switch id="visible" defaultChecked={true} onChange={e => {
                    handleSwitch(e.target.checked);
                  }} />
                </FormControl>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign="left">
                    <span style={{fontSize: 24}}>Photos</span>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <p>Images</p>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex='1' textAlign="left">
                    <span style={{fontSize: 24}}>Tags</span>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <p>Tags</p>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Col>
      </Row>
    </FormWrapper>
  );
};
