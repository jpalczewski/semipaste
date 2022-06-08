import React, {useRef, useState} from "react";
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
import {AddIcon} from "@chakra-ui/icons";

import {
  ButtonGroup as ChakraButtonGroup,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button as ChakraButton, Box,
  Switch, FormControl, FormLabel,
  CloseButton,
} from "@chakra-ui/react";
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
    expireAfter: "DAY",
  });

  const inputFile = useRef<HTMLInputElement | null>(null);
  const [photoArray, setPhotoArray] = useState<Array<File>>([]);
  const inputAttachment = useRef<HTMLInputElement | null>(null);

  const appendAttachment = (e: any) => {
    setPhotoArray([...photoArray, e.target.files[0] as File]);
    // photoArray.push(e.target.files[0] as File);
  }

  const removeAttachment = (index: number) => {
    photoArray.splice(index, 1);
    setPhotoArray([...photoArray])
  }

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

  const handleExpiry = (event: string) => {
    setInputs({
      ...inputs,
      expireAfter: event
    });
  }

  const handleSubmit = (event: any) => {
    if (inputs.title === "") {
      props.setResult("The title of your paste is empty!");
      return;
    }
    if (inputs.text === "") {
      props.setResult("The text of your paste is empty!");
      return;
    }

    commitMutation<addPasteBinMutation>(RelayEnvironment, {
      mutation: addPasteBin,
      variables: event,
      onCompleted: (response) => {
        if (response.addPasteBin?.ok) {
          props.setResult("Saved!");
          addAttachmentToPaste(response.addPasteBin?.attachmentToken!);
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

  const addAttachmentToPaste = (token: string) => {
    if (photoArray.length === 0) return;
    photoArray.map((file, index) => {
      commitMutation<addAttachmentMutation>(RelayEnvironment, {
        mutation: addAttachment,
        variables: {token: token},
        uploadables: {file},
        onCompleted: response => {console.log("Response: ", response)},
        onError: error => {console.log("Error: ", error)}
      });
    });
  }

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


  const languages = useLazyLoadQuery<allLanguagesQuery>( Languages, {} ).allLanguages;
  const languages_options = languages?.map(
      language => {
        return {value: language, label: language}
      }
  );

   const handleClear = () => {
    setInputs({
      text: "",
      title: "",
      language: "Plain Text",
      visible: true,
      expireAfter: "DAY",
    });
  };

  return (
      <FormWrapper>
        <Row>
          <Col lg={8}>
            <Form>
              <Row className="mb-3">
                <Col style={{textAlign: "right", flex: "25%"}}>
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
                <Col style={{textAlign: "right", flex: "25%"}}>
                  <Select
                      onChange={(event) => handleLanguage(event?.value!)}
                      defaultValue={languages_options![0]}
                      isClearable={true}
                      options={languages_options}
                  />
                </Col>
              </Row>
              <Form.Group style={{marginBottom: 10}}>
                <AceEditor
                    name="text"
                    fontSize={22}
                    value={inputs.text}
                    width={"100%"}
                    onChange={handleText}
                />
              </Form.Group>

              <Row className="mb-3">
                <div className="d-flex justify-content-between">
                  <div>
                  </div>

                  <div>
                    <ChakraButtonGroup spacing={10}>
                      <ChakraButton colorScheme="twitter" onClick={handleClear}>
                        CLEAR
                      </ChakraButton>
                      <ChakraButton colorScheme="linkedin" onClick={() => handlePreview()}>
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
                {(!preview && inputs.language != "Plain Text")
                    ? <>
                      <pre dangerouslySetInnerHTML={{__html: syntax}}></pre>
                    </>
                    : <>
                      <pre>{syntax}</pre>
                    </>
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
                    <AccordionIcon/>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <FormControl>
                    <FormLabel htmlFor="expireAfter">Expire After</FormLabel>
                    <Form.Select
                        name="expireAfter"
                        id="expireAfter"
                        onChange={e => handleExpiry(e.target.value)}
                    >
                      <option value="NEVER">Never</option>
                      <option value="YEAR">1 Year</option>
                      <option value="MONTH">1 Month</option>
                      <option value="WEEK">1 Week</option>
                      <option value="DAY">1 Day</option>
                      <option value="HOUR">1 Hour</option>
                    </Form.Select>
                  </FormControl>
                  <FormControl className="py-3">
                    <FormLabel htmlFor="visible">Public</FormLabel>
                    <Switch id="visible" defaultChecked={true} onChange={e => {
                      handleSwitch(e.target.checked);
                    }}/>
                  </FormControl>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign="left">
                      <span style={{fontSize: 24}}>Photos</span>
                    </Box>
                    <AccordionIcon/>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {/*<p>Images</p>*/}
                  {photoArray.map((file, i) => {
                    return (
                        <Row>
                          <Col>
                            <Box key={`${file.name}-${i}`}>
                              {file.name}
                            </Box>
                          </Col>
                          <Col>
                            <Box>
                              <CloseButton size="sm" onClick={() => removeAttachment(i)}/>
                            </Box>
                          </Col>
                        </Row>
                    );
                  })}
                  <Row>
                    <Form.Group>
                      {/*<Button onClick={() => console.log(photoArray)}>*/}
                      {/*  Attachments*/}
                      {/*</Button>*/}
                      <Button onClick={() => inputAttachment.current?.click()}>
                        <AddIcon w={6} h={6}/>
                      </Button>
                      <Form.Control
                          onChange={appendAttachment}
                          style={{display: "none"}}
                          ref={inputAttachment}
                          type="file"/>
                    </Form.Group>
                  </Row>
                </AccordionPanel>
              </AccordionItem>
              {/*<AccordionItem>*/}
              {/*  <h2>*/}
              {/*    <AccordionButton>*/}
              {/*      <Box flex='1' textAlign="left">*/}
              {/*        <span style={{fontSize: 24}}>Tags</span>*/}
              {/*      </Box>*/}
              {/*      <AccordionIcon/>*/}
              {/*    </AccordionButton>*/}
              {/*  </h2>*/}
              {/*  /!*<AccordionPanel pb={4}>*!/*/}
              {/*  /!*  <p>Tags</p>*!/*/}
              {/*  /!*</AccordionPanel>*!/*/}
              {/*</AccordionItem>*/}
            </Accordion>
          </Col>
        </Row>
      </FormWrapper>
  );
};
