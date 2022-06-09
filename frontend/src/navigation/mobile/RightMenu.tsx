import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {
    Box, Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    StackDivider, useDisclosure,
    VStack
} from "@chakra-ui/react";
import React from "react";
import {faArrowAltCircleLeft} from "@fortawesome/free-regular-svg-icons";
import {useNavigate} from "react-router-dom";

export const RightMenu = (props: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    return (
        <>
            <Box as={Button} variant={"solid"} bg="teal" fontSize={24}>
                <small onClick={onOpen}>{props.username}</small>
            </Box>
            <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay/>
                <DrawerContent style={{fontSize: 24}}>
                    <DrawerHeader borderBottomWidth='3px'>
                        <VStack align="left">
                            <Box fontSize={20}>{props.username}</Box>
                        </VStack>
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack
                            divider={<StackDivider borderColor='gray.200'/>}
                            spacing={2}
                            align='stretch'>
                            <Box h='40px' onClick={() => {
                                onClose();
                                props.account();
                            }}
                                 _hover={{
                                     color: "#777",
                                     cursor: "pointer"
                                 }}>
                                Account
                                <FontAwesomeIcon
                                    className="mx-3"
                                    icon={solid("user")}
                                    onClick={onOpen}
                                    size="sm"
                                />
                            </Box>

                            {props.isSuper &&
                                <Box h='40px' onClick={() => {
                                    onClose();
                                    navigate("/dashboard")
                                }}
                                     _hover={{
                                         color: "#777",
                                         cursor: "pointer"
                                     }}>
                                    Dashboard
                                    <FontAwesomeIcon
                                        className="mx-3"
                                        icon={solid("table")}
                                        onClick={onOpen}
                                        size="sm"
                                    />
                                </Box>
                            }

                            <Box h='40px' onClick={() => {
                                onClose();
                                navigate("/user/pastes")
                            }}
                                 _hover={{
                                     color: "#777",
                                     cursor: "pointer"
                                 }}>
                                My Pastes
                                <FontAwesomeIcon
                                    className="mx-3"
                                    icon={solid("table")}
                                    onClick={onOpen}
                                    size="sm"
                                />
                            </Box>

                            {/*<Box h='40px' onClick={() => {*/}
                            {/*    onClose();*/}
                            {/*    navigate("user/settings")*/}
                            {/*}}*/}
                            {/*     _hover={{*/}
                            {/*         color: "#777",*/}
                            {/*         cursor: "pointer"*/}
                            {/*     }}>*/}
                            {/*    Settings*/}
                            {/*    <FontAwesomeIcon*/}
                            {/*        className="mx-3"*/}
                            {/*        icon={solid("gear")}*/}
                            {/*        onClick={onOpen}*/}
                            {/*        size="sm"*/}
                            {/*    />*/}
                            {/*</Box>*/}
                            <Box h='40px' onClick={() => {
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
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
