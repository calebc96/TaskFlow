import React, { useState, useEffect } from "react";
import "../styles/TaskBoard.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BiArrowToRight, BiFontSize } from "react-icons/bi";
import CreatedBoards from "../components/CreatedBoards";
import Tasks from "../components/CreatedTasks";

export default function TaskBoard() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="board-background">
      <div className="main-view">
        <div className="view-allboards" onClick={handleShow}>
          <BiArrowToRight
            style={{ fontSize: "20px", color: "grey" }}
            href="/Login"
          />
        </div>
        <div className="created-tasks">
          <Tasks />
        </div>
        <button className="created-taskbutton">+ Add Another Task</button>
      </div>
      <Offcanvas className="off-canvas" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton className="close-button">
          <Offcanvas.Title>Boards</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CreatedBoards />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
