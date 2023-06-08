import React from "react";
import "../styles/TaskBoard.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function TaskBoard() {
  return (
    <Container fluid className="main-container">
      <Row>
        <Col
          className="side-bar"
          xs={2}
          sm={2}
          md={2}
          lg={2}
          xl={2}
          xxl={2}
          variant="dark"
          expand="lg"
        >
          <Navbar>
            <Container>
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="Your Boards"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Container>
          </Navbar>
        </Col>
        <Col
          className="background-image"
          xs={10}
          sm={10}
          md={10}
          lg={10}
          xl={10}
          xxl={10}
        ></Col>
      </Row>
    </Container>
  );
}
