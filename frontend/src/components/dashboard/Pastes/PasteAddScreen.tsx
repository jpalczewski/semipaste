import {Flex, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {Form, Row, Col} from "react-bootstrap";
import Select from "react-select";
import React from "react";
import {useLazyLoadQuery} from "react-relay";
import {allLanguagesQuery} from "../../../Query/SyntaxHighlight/__generated__/allLanguagesQuery.graphql";
import {Languages} from "../../../Query/SyntaxHighlight/allLanguages";
import AceEditor from "react-ace";

export const PasteAddScreen = () => {
    const languages = useLazyLoadQuery<allLanguagesQuery>( Languages, {} ).allLanguages;
    const languages_options = languages?.map(
        language => {
            return {value: language, label: language}
        }
    );

    return (
        <Flex className="p-5">
            <Form>
                <Row>
                    <Col>
                        <FormControl>
                            <FormLabel htmlFor="title">Title</FormLabel>
                            <Input type="text" id="title"/>
                        </FormControl>
                    </Col>
                    <Col>
                        <FormControl>
                            <FormLabel htmlFor="language">Language</FormLabel>
                            <Select
                                // onChange={(event) => handleLanguage(event?.value!)}
                                defaultValue={languages_options![0]}
                                isClearable={true}
                                options={languages_options}
                            />
                        </FormControl>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <AceEditor
                    name="text"
                    fontSize={22}
                    // value={inputs.text}
                    width={"100%"}
                    // onChange={handleText}
                    />
                </Row>
            </Form>
        </Flex>
    );
}
