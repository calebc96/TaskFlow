import React, { useState, useEffect } from "react";
import "../styles/TaskBoard.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Created from "./CreatedTask";

export default function TaskBoard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="board-background">
      <div className="view-allboards" onClick={handleShow}>
        <Created />
        <FontAwesomeIcon icon="fa-solid fa-check-square" />
      </div>
      <Offcanvas className="off-canvas" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton className="close-button">
          <Offcanvas.Title>Boards</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body></Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
