import React from "react";
import "../styles/CreateTask.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Create() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="create-board">
      <Button variant="success" onClick={handleShow}>
        Create Board
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Board</Modal.Title>
        </Modal.Header>
        <img className="board-image"></img>
        <label>Background</label>
        <div className="image-selection">
          <img className="board-images"></img>
          <img className="board-images"></img>
          <img className="board-images"></img>
          <img className="board-images"></img>
          <img className="board-images"></img>
        </div>
        <label>Board Title</label>
        <input></input>
        <label className="required-title">Board Title is required</label>
        <Modal.Footer>
          <Button
            variant="success"
            className="createboard-button"
            onClick={handleClose}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
