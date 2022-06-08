import {useNavigate, useParams} from "react-router-dom";
import {useLazyLoadQuery} from "react-relay";
import {getUserQuery} from "../../../Query/Users/__generated__/getUserQuery.graphql";
import {getUser} from "../../../Query/Users/getUser";
import {Col, Container as BC, Row} from "react-bootstrap";
import {Wrapper} from "../../../styles/Components.style";
import {UserReportScreen} from "../UserReportScreen";
import {Box, Button, Center, Flex, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react";
import React from "react";
import {OverviewScreen} from "./OverviewScreen";

export const AuthorScreen = () => {
    const {id} = useParams();
    const user = useLazyLoadQuery<getUserQuery>(getUser, {id: id!});
    const navigate = useNavigate();

    return (
        <Wrapper style={{textAlign: "left"}}>
            <div className="p-3">
                <BC className="bg-white" style={{height: "75vh"}}>
                    <Row>
                        <div className="px-4 py-4">
                            <Button colorScheme="teal" onClick={() => navigate(-1)}>Go back</Button>
                        </div>
                    </Row>
                    <hr/>
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
                                <Box>
                                    <UserReportScreen
                                        id={user.allUsers?.edges?.[0]?.node?.id}
                                        username={user.allUsers?.edges?.[0]?.node?.username}
                                    />
                                </Box>
                            </Flex>
                        </Col>
                        <Col>
                            <Tabs className="pt-4">
                                <TabList>
                                    <Tab>Overview</Tab>
                                    <Tab onClick={() => navigate(`/pastes/?author=${user.allUsers?.edges?.[0]?.node?.username}`)}>Pastes</Tab>
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
    );
}
