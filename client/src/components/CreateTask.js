import React, { useState } from "react";
import "../styles/CreateTask.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Create() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleImageClick = (imageIndex) => {
    setSelectedImage(imageIndex);
  };
  const boardValues = [
    {
      class: "one",
      value: 1,
    },
    {
      class: "two",
      value: 2,
    },
    {
      class: "three",
      value: 3,
    },
    {
      class: "four",
      value: 4,
    },
    {
      class: "five",
      value: 5,
    },
  ];
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
          {boardValues.map((data) => (
            <img
              className={`board-images-${data.class} ${
                selectedImage === `${data.value}` ? "selected" : ""
              }`}
              onClick={() => handleImageClick(`${data.class}`)}
            />
          ))}
        </div>

        <label>Board Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <label>
          <small>Board title is required.</small>
        </label>
        <Modal.Footer>
          <Button
            variant="success"
            className="createboard-button"
            // onClick={handleCreateBoard}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// const handleCreateBoard = async () => {
//   try {
//     const response = await fetch("/boards", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title,
//         description,
//         backgroundImage: selectedImage,
//       }),
//     });

//     if (response.ok) {
//       // Board created successfully
//       handleClose();
//     } else {
//       // Handle error case
//       console.error("Failed to create board:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Failed to create board:", error);
//   }
// };
