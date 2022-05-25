import {Button, Container, Row} from "react-bootstrap";
import {UsersTable} from "./table/UsersTable";

export const DashboardUsersScreen = () => {
    return (
      <Container style={{marginTop: "25px"}}>
          <Row>
              <h1>Users</h1>
          </Row>
          <Row>
              <Button variant="outline-primary" className="w-25">Add</Button>
          </Row>
          <Row>
              <UsersTable />
          </Row>
      </Container>
    );
}
