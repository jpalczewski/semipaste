import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

export const NavigationWrapper = styled.nav`
  display: flex;
  width: 100%;
  background-color: white;
  flex-direction: column;
  text-align: center;
`;

export const Container = styled.div`
  display: flex;
  flex: 55%;
  align-items: center;
  padding-left: 5%;
`;

export const LeftContainer = styled.div`
  display: flex;
  flex: 30%;
`;

export const RightContainer = styled.div`
  display: flex;
  justify-content: right;
  padding: 5px;
  flex: 15%;
`;

export const NavInnerCont = styled.div`
  width: 100%;
  display: flex;
  box-shadow: 0 4px 2px -2px lightgrey;
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

export const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  margin: 10px;

  &.active {
    font-weight: bold;
    border-bottom-style: solid;
    border-color: rgba(58, 158, 230, 1);
  }

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

export const LogoImg = styled.img`
  padding: 10px;
  margin-left: 20px;
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
