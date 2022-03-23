import { CreateUser } from "./CRUD/CreateUser";
import { Table } from "react-bootstrap";
import { userData } from "../../dummy_data/userData";
import { EditUser } from "./CRUD/EditUser";
import { DeleteUser } from "./CRUD/DeleteUser";
import fetchGraphQL from "../../fetchGraphQL";
import { allUsers } from "../../Query/allUsers";
import { useEffect, useState } from "react";

export const UserList = () => {
  const [use, setUse] = useState();

  useEffect(() => {
    fetchGraphQL(allUsers)
      .then((response) => {
        setUse(response);
        console.log(use);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <CreateUser />

      <h4 className="text-center p-2">Lista użytkowników</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nazwa użytkownika</th>
            <th scope="col">Email</th>
            <th scope="col">Data dołączenia</th>
            <th scope="col">Data ostatniego logowania</th>
            <th scope="col">Aktywny</th>
            <th scope="col">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((element: any) => (
            <tr className="align-middle">
              <td>{element.id}</td>
              <td>{element.username}</td>
              <td>{element.email}</td>
              <td>{element.joinDate}</td>
              <td>{element.lstLoggin}</td>
              <td>{element.isActive ? "Tak" : "Nie"}</td>
              <td>
                <EditUser
                  id={element.id}
                  email={element.email}
                  username={element.username}
                />
                <DeleteUser
                  isVisible={true}
                  id={element.id}
                  email={element.email}
                  username={element.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
