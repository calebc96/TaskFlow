import React, { useState } from "react";
import "../styles/CreateTask.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Create() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateBoard = async () => {
    try {
      const response = await fetch("/boards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          backgroundImage: selectedImage,
        }),
      });

      if (response.ok) {
        // Board created successfully
        handleClose();
      } else {
        // Handle error case
        console.error("Failed to create board:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to create board:", error);
    }
  };

  const handleImageClick = (imageIndex) => {
    setSelectedImage(imageIndex);
  };

  return (
    <div className="create-board">
      <Button variant="success" onClick={handleShow}>
        Create Board
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Board</Modal.Title>
        </Modal.Header>
        <img className={`board-image-default board-image-${selectedImage}`} />
        <label>Choose Background</label>
        <div className="image-selection">
          <img
            className={`board-images-one ${
              selectedImage === 1 ? "selected" : ""
            }`}
            onClick={() => handleImageClick("one")}
          />
          <img
            src="image-2.jpg"
            className={`board-images-two ${
              selectedImage === 2 ? "selected" : ""
            }`}
            onClick={() => handleImageClick("two")}
          />
          <img
            src="image-3.jpg"
            className={`board-images-three ${
              selectedImage === 3 ? "selected" : ""
            }`}
            onClick={() => handleImageClick("three")}
          />
          <img
            src="image-4.jpg"
            className={`board-images-four ${
              selectedImage === 4 ? "selected" : ""
            }`}
            onClick={() => handleImageClick("four")}
          />
          <img
            src="image-5.jpg"
            className={`board-images-five ${
              selectedImage === 5 ? "selected" : ""
            }`}
            onClick={() => handleImageClick("five")}
          />
        </div>
        <label>Board Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <label>Board title is required.</label>
        <Modal.Footer>
          <Button
            variant="success"
            className="createboard-button"
            onClick={handleCreateBoard}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
