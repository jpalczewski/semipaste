import React from "react";
import { Header, Wrapper } from "../../styles/Components.style";
import { UserList } from "./UserList";

export const UserScreen = () => {
  return (
    <Wrapper>
      <Header className="header">
        <p>STRONA O USERACH</p>
      </Header>
      <UserList />
    </Wrapper>
  );
};
