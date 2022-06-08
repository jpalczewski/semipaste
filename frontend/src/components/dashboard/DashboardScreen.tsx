import React from 'react';
import {Outlet} from "react-router-dom";
import {DashboardNav} from "./DashboardNav";
import {Col, Container, Row} from "react-bootstrap";

export const Dashboard: React.FC = () => {



    return (
        <Container fluid style={{height: "100vh"}}
         className="mx-0 px-0"
        >
            <Row>
                <Col md={2} className="mx-0 px-0">
                    <DashboardNav />
                </Col>
                <Col md={10} className="mx-0 px-0">
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};
