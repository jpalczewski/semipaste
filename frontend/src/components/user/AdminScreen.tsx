import React from "react";
import { Wrapper } from "../../styles/Components.style";
import { TableUser } from "../table/TableUser";
import { UserList } from "./UserList";
export const AdminScreen = () => {
  return (
    <Wrapper>
      <TableUser />
      <UserList />
    </Wrapper>
  );
};
