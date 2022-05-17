import {Container, Row} from "react-bootstrap";
import {PastesTable} from "./tables/Pastes/PastesTable";

export const DashboardPastesScreen = () => {
    return (
      <Container style={{marginTop: "25px"}}>
          <Row>
              <h1>Pastes</h1>
          </Row>
          <Row>
              <PastesTable />
          </Row>
      </Container>
    );
}
