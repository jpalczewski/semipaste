import React, {useEffect, useState} from "react";
import { Wrapper } from "../../styles/Components.style";
import {Col, Container as BC, Row} from "react-bootstrap";
import {Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import {OverviewScreen} from "./author/OverviewScreen";
import {useNavigate} from "react-router-dom";
import {useLazyLoadQuery} from "react-relay";
import {userQuery} from "../../Query/Users/__generated__/userQuery.graphql";
import {user as getUserQuery} from "../../Query/Users/user";

export const AdminScreen = () => {
    const [prop, setProp] = useState("");

    useEffect(() => {
        setProp(JSON.parse(localStorage.getItem("username")!));
    });
    const user = useLazyLoadQuery<userQuery>(getUserQuery, {
        username: prop,
    });

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Wrapper style={{textAlign: "left"}}>
                <div className="p-3">
                    <BC className="bg-white" style={{height: "75vh"}}>
                        <Row>
                            <Col lg={4} style={{borderRight: "1px solid #eee", height: "100vh"}}>
                                <Flex direction="column" align="center">
                                    <Box
                                        width={"100%"}
                                        height={"30vh"}
                                        className="border-1"
                                    >
                                        AVATAR
                                    </Box>
                                    <Box className="px-5 py-3">
                                        <Box>{user.allUsers?.edges[0]?.node?.username}</Box>
                                    </Box>
                                </Flex>
                            </Col>
                            <Col>
                                <Tabs className="pt-4">
                                    <TabList>
                                        <Tab>Overview</Tab>
                                        <Tab
                                            onClick={() => navigate(`/pastes/?author=${user.allUsers?.edges?.[0]?.node?.username}`)}>Pastes</Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <OverviewScreen
                                                username={user.allUsers?.edges[0]?.node?.username}
                                                firstName={user.allUsers?.edges[0]?.node?.firstName}
                                                lastName={user.allUsers?.edges[0]?.node?.lastName}
                                                description={user.allUsers?.edges[0]?.node?.description}
                                            />
                                        </TabPanel>
                                        <TabPanel>
                                            {/*<AuthorPasteScreen/>*/}
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </Col>
                        </Row>
                    </BC>
                </div>
            </Wrapper>
        </Wrapper>
    );
};
