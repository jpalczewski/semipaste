import {commitMutation, useLazyLoadQuery} from "react-relay";
import {getPasteBinQuery} from "../../../Query/PasteBins/__generated__/getPasteBinQuery.graphql";
import {getPasteBin} from "../../../Query/PasteBins/getPasteBin";
import {useParams} from "react-router-dom";
import {Wrapper} from "../../../styles/Components.style";
import {Container, Form, Row} from "react-bootstrap";
import {Button, Flex, FormControl, FormLabel, Input, Switch} from "@chakra-ui/react";
import React, {useState} from "react";
import {editPasteBinMutation} from "../../../Query/PasteBins/__generated__/editPasteBinMutation.graphql";
import RelayEnvironment from "../../../RelayEnvironment";
import {editPasteBin} from "../../../Query/PasteBins/editPasteBin";
import AceEditor from "react-ace";
import {allLanguagesQuery} from "../../../Query/SyntaxHighlight/__generated__/allLanguagesQuery.graphql";
import {Languages} from "../../../Query/SyntaxHighlight/allLanguages";
import Select from "react-select";

export const UserEditPasteScreen = () => {
    const {id} = useParams();
    const paste = useLazyLoadQuery<getPasteBinQuery>(getPasteBin, {id: id!})

    const [inputs, setInputs] = useState(
        {
            id: id!,
            title: paste.activePasteBin?.edges[0]?.node?.title!,
            text: paste.activePasteBin?.edges[0]?.node?.text!,
            language: paste.activePasteBin?.edges[0]?.node?.language!,
            visible: paste.activePasteBin?.edges[0]?.node?.visible!,
            // expireAfter: paste.activePasteBin?.edges[0]?.node?.expireAfter!
        }
    )

    const handleEdit = () => {
        commitMutation<editPasteBinMutation>(RelayEnvironment, {
            mutation: editPasteBin,
            variables: inputs,
            onCompleted: response => {
                if (response.editPaste?.ok) {
                    console.log("Edited");
                }
                console.log("Response: ", response);
            },
            onError: error => {
                console.log("Error", error);
            }
        })
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
    //
    // const handleExpiry = (event: string) => {
    //     setInputs({
    //         ...inputs,
    //         expireAfter: event
    //     });
    // };

    const languages = useLazyLoadQuery<allLanguagesQuery>( Languages, {} ).allLanguages;
    const languages_options = languages?.map(
        language => {
            return {value: language, label: language}
        }
    );

    return (
        <Wrapper>
            <div className="py-4">
                <Container>
                    <Flex align="center" justify="center" direction="column">
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Form.Control
                                    className="h-100"
                                    type="text"
                                    value={inputs.title}
                                    placeholder="Tytuł"
                                    onChange={(event) => handleChange(event.target.value)}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Language</FormLabel>
                                <Select
                                    onChange={(event) => handleLanguage(event?.value!)}
                                    defaultValue={languages_options}
                                    isClearable={true}
                                    options={languages_options}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Text</FormLabel>
                                <AceEditor
                                    name="text"
                                    fontSize={22}
                                    value={inputs.text}
                                    width={"100%"}
                                    onChange={handleText}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="visible">Public</FormLabel>
                                <Switch id="visible" defaultChecked={inputs.visible} onChange={e => {
                                    handleSwitch(e.target.checked);
                                }}/>
                            </FormControl>
                        {/*<Row>*/}
                        {/*    <FormControl>*/}
                        {/*        <FormLabel htmlFor="expireAfter">Expire After</FormLabel>*/}
                        {/*        <Form.Select*/}
                        {/*            name="expireAfter"*/}
                        {/*            id="expireAfter"*/}
                        {/*            onChange={e => handleExpiry(e.target.value)}*/}
                        {/*        >*/}
                        {/*            <option value="NEVER">Never</option>*/}
                        {/*            <option value="YEAR">1 Year</option>*/}
                        {/*            <option value="MONTH">1 Month</option>*/}
                        {/*            <option value="WEEK">1 Week</option>*/}
                        {/*            <option value="DAY">1 Day</option>*/}
                        {/*            <option value="HOUR">1 Hour</option>*/}
                        {/*        </Form.Select>*/}
                        {/*    </FormControl>*/}
                        {/*</Row>*/}
                        <Button colorScheme="teal" onClick={handleEdit}>Save</Button>
                    </Flex>
                </Container>
            </div>
        </Wrapper>
    );
}