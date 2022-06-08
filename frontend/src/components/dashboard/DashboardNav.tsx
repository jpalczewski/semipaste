import React from "react";
import {Nav} from "react-bootstrap";
import {Box, Flex} from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import {useNavigate} from "react-router-dom";

export const DashboardNav: React.FC = () => {
    const navigate = useNavigate();
    return (
            <Flex align="center" className="bg-dark text-white" style={{height: "100vh"}} direction="column">
                <Box
                    onClick={() => navigate("/dashboard")}
                    display="flex"
                    h={"15%"}
                    alignItems='center'
                    justifyContent="center"
                    className="border border-secondary w-100"
                    flexDirection="column"
                >
                    <Box className="mx-auto">
                        <FontAwesomeIcon style={{marginRight: "1vh"}} icon={solid("house")}/>
                    </Box>
                    <Nav.Link href="/dashboard" className="text-white mx-auto">HOME</Nav.Link>
                </Box>

                <Box
                    onClick={() => navigate("/dashboard/users")}
                    display="flex"
                    h={"15%"}
                    alignItems='center'
                    justifyContent="center"
                    className="border border-secondary w-100"
                    flexDirection="column"
                >
                    <Box className="mx-auto">
                        <FontAwesomeIcon style={{marginRight: "1vh"}} icon={solid("user")}/>
                    </Box>
                    <Nav.Link href="/dashboard/users" className="text-white">Users</Nav.Link>
                </Box>

                <Box
                    onClick={() => navigate("/dashboard/pastes")}
                    display="flex"
                    h={"15%"}
                    alignItems='center'
                    justifyContent="center"
                    className="border border-secondary w-100"
                    flexDirection="column"
                >
                    <Box className="mx-auto">
                        <FontAwesomeIcon style={{marginRight: "1vh"}} icon={solid("file")}/>
                    </Box>
                    <Nav.Link href="/dashboard/pastes" className="text-white">Pastes</Nav.Link>
                </Box>
            </Flex>
    )
        // <Nav style={{height: "100vh"}} className="d-flex flex-column bg-dark">
        // < Nav.Link href="/dashboard" className="text-white">Home</Nav.Link>
        //   <Nav.Link href="/dashboard/users" className="text-white">Users</Nav.Link>
        //   <Nav.Link href="/dashboard/pastes" className="text-white">Pastes</Nav.Link>
      // </Nav>
    // );
};
