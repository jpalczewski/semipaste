import { Table } from "react-bootstrap";
import { EditUser } from "./CRUD/EditUser";
import { DeleteUser } from "./CRUD/DeleteUser";

import { allUsers } from "../../Query/allUsers";
import { allUsersQuery } from "../../__generated__/allUsersQuery.graphql";
import { useLazyLoadQuery } from "react-relay";

export const UserList = (props: any) => {
  const data2 = useLazyLoadQuery<allUsersQuery>(allUsers, {});

  return (
    <div className="container">
      <h4 className="text-center p-2">Lista użytkowników</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nazwa użytkownika</th>
            <th scope="col">Email</th>
            <th scope="col">Data dołączenia</th>
            <th scope="col">Imie</th>
            <th scope="col">Nazwsiko</th>
            <th scope="col">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {data2.allUsers?.edges == null ? (
            <p>drzewo</p>
          ) : (
            data2.allUsers.edges.map((element: any, i) => (
              <tr className="align-middle">
                <td>{data2.allUsers?.edges[i]?.node?.id}</td>
                <td>{data2.allUsers?.edges[i]?.node?.username}</td>
                <td>{data2.allUsers?.edges[i]?.node?.email}</td>
                <td>{data2.allUsers?.edges[i]?.node?.dateJoined}</td>
                <td>{data2.allUsers?.edges[i]?.node?.firstName}</td>
                <td>{data2.allUsers?.edges[i]?.node?.lastName}</td>
                <td>
                  <EditUser
                    id={data2.allUsers?.edges[i]?.node?.id}
                    email={data2.allUsers?.edges[i]?.node?.email}
                    username={data2.allUsers?.edges[i]?.node?.username}
                    firnstname={data2.allUsers?.edges[i]?.node?.firstName}
                    lstname={data2.allUsers?.edges[i]?.node?.lastName}
                  />
                  <br />
                  <DeleteUser id={data2.allUsers?.edges[i]?.node?.id} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};
