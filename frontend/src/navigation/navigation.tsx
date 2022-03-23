import React, { useState } from "react";
import {
  NavigationWrapper,
  Container,
  RightContainer,
  NavInnerCont,
  NavExtendedCont,
  NavLinkCont,
  NavbarLink,
  OpenLinksButton,
  NavbarLinkExt,
  LogoImg,
} from "../styles/NavigationWrapper.style";
import Logo from "../assets/obraz.png";

const Navigation = () => {
  const [extNavbar, setExtNavbar] = useState(false);

  return (
    <NavigationWrapper>
      <NavInnerCont>
        <Container>
          <NavLinkCont>
            <NavbarLink to="/">Pastebin</NavbarLink>
            <NavbarLink to="/create">Utwórz</NavbarLink>
            <NavbarLink to="/current">Aktualne</NavbarLink>
            <NavbarLink to="/popular">Popularne</NavbarLink>
            <NavbarLink to="/about">O Pastebin.pl</NavbarLink>
            <OpenLinksButton
              onClick={() => {
                setExtNavbar(!extNavbar);
              }}
            >
              {extNavbar ? <>&#10005;</> : <>&#8801;</>}
            </OpenLinksButton>
          </NavLinkCont>
        </Container>

        <NavbarLink to="/user">
          <RightContainer>
            <LogoImg src={Logo} />
          </RightContainer>
        </NavbarLink>
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
