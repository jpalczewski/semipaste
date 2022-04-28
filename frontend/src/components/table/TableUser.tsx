import React, { useEffect, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { userQuery } from "../../Query/Users/__generated__/userQuery.graphql";
import { user } from "../../Query/Users/user";

export const TableUser = () => {
  const [prop, setProp] = useState("");
  useEffect(() => {
    setProp(JSON.parse(localStorage.getItem("username")!));
  });
  const data = useLazyLoadQuery<userQuery>(user, {
    username: prop,
  });

  return (
    <>
      <p>Strona główna usera</p>
      <p>Id: {data.allUsers?.edges[0]?.node?.id}</p>
      <p>Username: {data.allUsers?.edges[0]?.node?.username}</p>
      <p>FirstName: {data.allUsers?.edges[0]?.node?.firstName}</p>
      <p>LastName: {data.allUsers?.edges[0]?.node?.lastName}</p>
      <p>email: {data.allUsers?.edges[0]?.node?.email}</p>
      <p>Desc: {data.allUsers?.edges[0]?.node?.description}</p>
      <p>
        Date Joined: {data.allUsers?.edges[0]?.node?.dateJoined.slice(0, 10)}
      </p>
      <p>Is Super?: {data.allUsers?.edges[0]?.node?.isSuperuser}</p>
    </>
  );
};
