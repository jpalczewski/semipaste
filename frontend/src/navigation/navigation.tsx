import React, { useState } from "react";
import {
  NavigationWrapper,
  Container,
  LeftContainer,
  NavInnerCont,
  NavExtendedCont,
  NavLinkCont,
  OpenLinksButton,
  NavbarLinkExt,
  LogoImg,
  NavLink,
  RightContainer,
} from "../styles/NavigationWrapper.style";
import Logo from "../assets/semipaste_logo.png";
import { Button } from "react-bootstrap";

const Navigation = () => {
  const [extNavbar, setExtNavbar] = useState(false);

  return (
    <NavigationWrapper>
      <NavInnerCont>
        <LeftContainer>
          <LogoImg src={Logo} />
        </LeftContainer>
        <Container>
          <NavLinkCont>
            <NavLink to="/" activeStyle>
              Pastebin
            </NavLink>
            <NavLink to="/create" activeStyle>
              Utwórz
            </NavLink>
            <NavLink to="/current" activeStyle>
              Aktualne
            </NavLink>
            <NavLink to="/popular" activeStyle>
              Popularne
            </NavLink>
            <NavLink to="/about" activeStyle>
              O Pastebin.pl
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
          <Button variant="primary" type="submit" style={{ marginRight: 10 }}>
            zaloguj
          </Button>
          <Button variant="primary" type="submit">
            zarejestruj
          </Button>
        </RightContainer>
      </NavInnerCont>
      {extNavbar && (
        <NavExtendedCont>
          <NavbarLinkExt to="/">Pastebin</NavbarLinkExt>
          <NavbarLinkExt to="/create">Utwórz</NavbarLinkExt>
          <NavbarLinkExt to="/current">Aktualne</NavbarLinkExt>
          <NavbarLinkExt to="/popular">Popularne</NavbarLinkExt>
          <NavbarLinkExt to="/about">O Pastebin.pl</NavbarLinkExt>
        </NavExtendedCont>
      )}
    </NavigationWrapper>
  );
};

export default Navigation;
