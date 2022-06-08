import React, { useState, useEffect } from "react";
import {
  NavigationWrapper,
  Container,
  LeftContainer,
  NavInnerCont,
  NavLinkCont,
  OpenLinksButton,
  LogoImg,
  NavLink,
  RightContainer,
} from "../styles/NavigationWrapper.style";
import SemiPaste from "../assets/semipaste.png";
import {NavDropdown, Container as BC } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  Img,
  Button,
  Box,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
} from "@chakra-ui/react";
import {useMediaQuery} from "@chakra-ui/react";
import {MobileBar} from "./mobile/MobileBar";
import {commitMutation, useLazyLoadQuery} from "react-relay";
import RelayEnvironment from "../RelayEnvironment";
import {isSuperUserQuery} from "../Query/Users/__generated__/isSuperUserQuery.graphql";
import {isSuperUser} from "../Query/Users/isSuperUser";

const Navigation = () => {
  const [isMobile] = useMediaQuery('(min-width: 992px)');
  const [token, setToken] = useState();
  const [prop, setProp] = useState("");

  useEffect(() => {
    const fetch = async () => {
      setToken(JSON.parse(localStorage.getItem("token")!));
      setProp(JSON.parse(localStorage.getItem("username")!));
    };
    fetch().catch(console.error);
  }, []);

  let isSuper = false;
  const result = useLazyLoadQuery<isSuperUserQuery>(isSuperUser, {username: prop});
  isSuper = result.allUsers?.edges[0]?.node?.isSuperuser!;

  const myAccount = () => {
    if (prop == "a") {
      navigate("user/admin");
    } else {
      navigate("user/user");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/create");
    window.location.reload();
  };

  const navigate = useNavigate();
  return (
      <>
        {!isMobile ?
            <MobileBar
                token={token}
                username={prop}
                logout={logOut}
                account={myAccount}/>
            : <Container className="shadow-sm p-3" style={{backgroundColor: "#313C40"}}>
              <BC>
                <Flex align="center">
                  <Img
                      _hover={{
                        cursor: "pointer"
                      }}
                      boxSize={35}
                      src={SemiPaste}
                      alt="Semi Paste logo"
                      onClick={() => navigate("")}
                  />
                  <Box
                      _hover={{
                        cursor: "pointer"
                      }}
                      className="text-white"
                      style={{fontSize: 30, marginLeft: 30}}
                      onClick={() => navigate("")}
                  >SemiPaste</Box>
                  <Spacer/>
                  <Box>
                    <NavLink to="" activeStyle>
                      Create
                    </NavLink>
                    <NavLink to="/pastes" activeStyle>
                      Pastes
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                      About
                    </NavLink>

                    {/*<OpenLinksButton>*/}
                    {/*  {token ? <>&#10005;</> : <>&#8801;</>}*/}
                    {/*</OpenLinksButton>*/}
                  </Box>
                  <Box style={{marginLeft: 50}}>
                    {token ? (
                        <>
                          <Menu>
                            <MenuButton as={Button} bg="teal" color="white">
                              {prop}
                            </MenuButton>
                            <MenuList>
                              <MenuItem onClick={() => myAccount()}>Account</MenuItem>
                              <MenuDivider/>
                              <MenuItem onClick={() => navigate("user/settings")}>Settings</MenuItem>
                              {isSuper &&
                              <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
                              }
                              <MenuItem>My Pastes</MenuItem>
                              <MenuItem onClick={logOut}>Logout</MenuItem>
                            </MenuList>
                          </Menu>
                        </>
                    ) : (
                        <>
                          <Button colorScheme='teal'
                                  type="submit"
                                  style={{marginRight: 10}}
                                  onClick={() => navigate("/join")}
                          >
                            Sing In
                          </Button>
                        </>
                    )}
                  </Box>
                </Flex>
              </BC>
            </Container>}
      </>
  );
};

export default Navigation;
