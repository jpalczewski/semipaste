import {Button, Container, Row} from "react-bootstrap";
import {PastesTable} from "./table/PastesTable";

export const DashboardPastesScreen = () => {
    return (
      <Container style={{marginTop: "25px"}}>
          <Row>
              <h1>Pastes</h1>
          </Row>
          <Row>
              <Button variant="outline-primary" className="w-25">Add</Button>
          </Row>
          <Row>
              <PastesTable />
          </Row>
      </Container>
    );
}
