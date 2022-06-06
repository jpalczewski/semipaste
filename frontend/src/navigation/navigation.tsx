import React, { useState } from "react";
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
import Logo from "../assets/semipaste_logo.png";
import Logo2 from "../assets/photo.png";
import { Button, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [extNavbar, setExtNavbar] = useState(false);
  const navigate = useNavigate();
  return (
    <NavigationWrapper>
      <NavInnerCont>
        <LeftContainer>
          <LogoImg src={Logo} />
        </LeftContainer>
        <Container>
          <NavLinkCont>
            <NavLink to="" activeStyle>
              Create
            </NavLink>
            <NavLink to="/pastes" activeStyle>
              Pastes
            </NavLink>
            <NavLink to="/about" activeStyle>
              About
            </NavLink>
            <OpenLinksButton
              onClick={() => {
                setExtNavbar(!extNavbar);
              }}
            >
              {extNavbar ? <>&#10005;</> : <>&#8801;</>}
            </OpenLinksButton>
          </NavLinkCont>
        </Container>
        <RightContainer>
          {extNavbar ? (
            <>
              <NavDropdown title="USERNAME">
                <NavDropdown.Item href="#action3">Ustawienia</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  My Pastes
                </NavDropdown.Item>
                <NavDropdown.Item
                  href="#action5"
                  onClick={() => setExtNavbar(!extNavbar)}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
              <img src={Logo2}></img>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                type="submit"
                style={{ marginRight: 10 }}
                onClick={() => navigate("/home")}
              >
                Sing In
              </Button>
            </>
          )}
        </RightContainer>
      </NavInnerCont>
    </NavigationWrapper>
  );
};

export default Navigation;
