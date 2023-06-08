import React from "react";
import "../styles/TaskBoard.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function TaskBoard() {
  return (
    <Container fluid className="p-0 m-0 ">
      <Row>
        <Col
          className="bg-dark side-bar"
          xs={2}
          sm={2}
          md={2}
          lg={2}
          xl={2}
          xxl={2}
        >
          Your Boards
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
