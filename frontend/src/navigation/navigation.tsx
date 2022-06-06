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
  const [prop, setProp] = useState("");
  useEffect(() => {
    const fetch = async () => {
      setToken(JSON.parse(localStorage.getItem("token")!));
      setProp(JSON.parse(localStorage.getItem("username")!));
    };
    fetch().catch(console.error);
  }, []);

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
            <OpenLinksButton>
              {token ? <>&#10005;</> : <>&#8801;</>}
            </OpenLinksButton>
          </NavLinkCont>
        </Container>
        <RightContainer>
          {token ? (
            <>
              <NavDropdown title="USERNAME">
                <NavDropdown.Item onClick={() => myAccount()}>
                  Moje Konto
                </NavDropdown.Item>
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
