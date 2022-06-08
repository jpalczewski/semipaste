import {
    Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel,
    Box, Button, Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    StackDivider, useDisclosure,
    VStack
} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {faArrowAltCircleLeft, faArrowAltCircleRight} from "@fortawesome/free-regular-svg-icons";
import React from "react";
import {useNavigate} from "react-router-dom";

export const LeftMenu = (props: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate();

    return (
        <>
            <FontAwesomeIcon
                className="mx-3"
                icon={solid("bars")}
                onClick={onOpen}
                size="lg"
            />
            <h1 className="mx-3">SemiPaste</h1>
            <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay/>
                <DrawerContent style={{fontSize: 24}}>
                    <DrawerHeader borderBottomWidth='3px'>
                        <VStack align="left">
                            <Box fontSize={32}>SemiPaste</Box>
                            {props.token && <Box fontSize={20}>{props.username}</Box>}
                        </VStack>
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack
                            divider={<StackDivider borderColor='gray.200'/>}
                            spacing={4}
                            align='stretch'>
                            <Box h='40px' onClick={() => {
                                onClose();
                                navigate("")
                            }}
                                 _hover={{
                                     color: "#777",
                                     cursor: "pointer"
                                 }}>
                                Create
                                <FontAwesomeIcon
                                    className="mx-3"
                                    icon={solid("plus")}
                                    onClick={onOpen}
                                    size="sm"
                                />
                            </Box>
                            <Box h='40px' onClick={() => {
                                onClose();
                                navigate("/pastes")
                            }}
                                 _hover={{
                                     color: "#777",
                                     cursor: "pointer"
                                 }}>
                                Pastes
                                <FontAwesomeIcon
                                    className="mx-3"
                                    icon={solid("table")}
                                    onClick={onOpen}
                                    size="sm"
                                />
                            </Box>

                            <Box h='40px' onClick={() => {
                                onClose();
                                navigate("/about")
                            }}
                                 _hover={{
                                     color: "#777",
                                     cursor: "pointer"
                                 }}>
                                About
                                <FontAwesomeIcon
                                    className="mx-3"
                                    icon={solid("question")}
                                    onClick={onOpen}
                                    size="sm"
                                />
                            </Box>
                            {props.token
                                ? <Box h='40px' onClick={() => {
                                    onClose();
                                    props.logout();
                                }}
                                       _hover={{
                                           color: "#777",
                                           cursor: "pointer"
                                       }}
                                >
                                    Logout
                                    <FontAwesomeIcon
                                        className="mx-3"
                                        icon={faArrowAltCircleLeft}
                                        onClick={onOpen}
                                        size="sm"
                                    />
                                </Box>
                                : <Box h='40px' onClick={() => {
                                    onClose();
                                    navigate("/join")
                                }}
                                       _hover={{
                                           color: "#777",
                                           cursor: "pointer"
                                       }}
                                >
                                    Login
                                    <FontAwesomeIcon
                                        className="mx-3"
                                        icon={faArrowAltCircleRight}
                                        onClick={onOpen}
                                        size="sm"
                                    />
                                </Box>
                            }
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer></>
    );
}
