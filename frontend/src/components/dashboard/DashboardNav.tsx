import React from "react";
import {Nav} from "react-bootstrap";

export const DashboardNav: React.FC = () => {
    return (
      <Nav style={{height: "100vh"}} className="d-flex flex-column bg-dark">
          <Nav.Link href="/dashboard" className="text-white">Home</Nav.Link>
          <Nav.Link href="/dashboard" className="text-white">Users</Nav.Link>
          <Nav.Link href="/dashboard/pastes" className="text-white">Pastes</Nav.Link>
      </Nav>
    );
};
