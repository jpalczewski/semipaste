import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavigationWrapper = styled.nav`
  display: flex;
  width: 100%;
  font-size: 24px;
  background-color: black;
  flex-direction: column;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  flex: 70%;
  align-items: center;
  padding-left: 5%;
`;

export const NavInnerCont = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

export const NavExtendedCont = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: right;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavLinkCont = styled.div`
  display: flex;
`;

export const NavbarLink = styled(Link)`
  color: white;
  font-size: 24px;
  text-decoration: none;
  margin: 10px;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExt = styled(Link)`
  color: white;
  font-size: 24px;
  text-decoration: none;
  margin: 10px;
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  color: white;
  border: none;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;
