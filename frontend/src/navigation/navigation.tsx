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
import Logo from "../assets/semipaste_logo.png";
import Logo2 from "../assets/photo.png";
import { Button, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [token, setToken] = useState();
  useEffect(() => {
    const fetch = async () => {
      setToken(JSON.parse(localStorage.getItem("token")!));
    };
    fetch().catch(console.error);
  }, []);
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/create");
    window.location.reload();
  };
  const navigate = useNavigate();
  return (
    <NavigationWrapper>
      <NavInnerCont>
        <LeftContainer>
          <LogoImg src={Logo} />
        </LeftContainer>
        <Container>
          <NavLinkCont>
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
            <OpenLinksButton>
              {token ? <>&#10005;</> : <>&#8801;</>}
            </OpenLinksButton>
          </NavLinkCont>
        </Container>
        <RightContainer>
          {token ? (
            <>
              <NavDropdown title="USERNAME">
                <NavDropdown.Item onClick={() => navigate("user/settings")}>
                  Ustawienia
                </NavDropdown.Item>
                <NavDropdown.Item>Moje wklejki</NavDropdown.Item>
                <NavDropdown.Item onClick={logOut}>Wyloguj</NavDropdown.Item>
              </NavDropdown>
              <img src={Logo2}></img>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                type="submit"
                style={{ marginRight: 10 }}
                onClick={() => navigate("")}
              >
                zaloguj
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={() => navigate("")}
              >
                zarejestruj
              </Button>
            </>
          )}
        </RightContainer>
      </NavInnerCont>
    </NavigationWrapper>
  );
};

export default Navigation;
