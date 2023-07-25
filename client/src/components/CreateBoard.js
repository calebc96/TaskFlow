import React, { useState } from "react";
import "../styles/CreateTask.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createBoard, findMe } from "../utils/API";

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
  const handleCreateBoard = async () => {
    try {
      const response = await findMe();
      const user = await response.json();
      const userId = user.user._id;

      // Check if userId exists
      if (!userId) {
        // Handle the case where userId is not available
        console.log("User ID not found in session");
        return;
      }

      await createBoard({
        title: title,
        backgroundImage: selectedImage,
        user_id: userId,
      });

      // Board creation success logic here
      handleClose();
    } catch (error) {
      // Board creation error handling here
      console.log(error);
    }
  };

  return (
    <div className="create-board">
      <Button variant="success" onClick={handleShow}>
        Create Board
      </Button>
      {/*  
        <Button variant="success" to="/login">
          Create Board
        </Button> */}

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
        <input onChange={(e) => setTitle(e.target.value)}></input>
        <label>
          <small>Board title is required.</small>
        </label>
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
