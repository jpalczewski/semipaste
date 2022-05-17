import {Container, Row} from "react-bootstrap";
import {UsersTable} from "./tables/Users/UsersTable";

export const DashboardUsersScreen = () => {
    return (
      <Container style={{marginTop: "25px"}}>
          <Row>
              <h1>Users</h1>
          </Row>
          <Row>
              <UsersTable />
          </Row>
      </Container>
    );
}
