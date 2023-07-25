import React, { useEffect, useState } from "react";
import "../styles/CreatedBoard.css";
import "../styles/CreateTask.css";
import "../styles/TaskBoard.css";
import { findMe } from "../utils/API";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BiArrowToRight, BiX } from "react-icons/bi";
import CreatedTasks from "../components/CreatedTasks";

export default function Boards() {
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState(null);
  const [show, setShow] = useState(false);
  const [mainBoard, setMainBoard] = useState([{}]);

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    loadBoards();
  }, [boardId]);

  const loadBoards = async () => {
    try {
      const response = await fetch(`/api/boards/${boardId}`);
      const data = await response.json();
      console.log(data.board.backgroundImage);
      console.log(`board-image-${data.board.backgroundImage}`);
      setMainBoard(data.board.backgroundImage);
      // Handle the retrieved data as needed
    } catch (err) {
      console.error(err);
    }
  };

  const loadUserData = async () => {
    try {
      //fetches the loggedin user's data
      const response = await findMe();
      //parses the response body to json
      const user = await response.json();
      console.log(user);
      //sets the state of the user's data
      setBoards(user.user.boards);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBoardClick = (id) => {
    setBoardId(id);
    console.log(id);
    handleClose(); // Close the Offcanvas
  };

  const handleDeleteBoard = async (boardId) => {
    try {
      const response = await fetch(`/api/boards/${boardId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data); // Assuming the response is an object with a 'task' property containing the 'title' field
      // Handle the retrieved data as needed
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`board-background-${mainBoard}`}>
      <div className="main-view">
        <div className="view-allboards" onClick={handleShow}>
          <BiArrowToRight
            style={{ fontSize: "20px", color: "grey" }}
            href="/Login"
          />
        </div>
        <Offcanvas className="off-canvas" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton className="close-button">
            <Offcanvas.Title>Boards</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="col-md-8">
              <ul>
                {boards.map((board) => (
                  <div className="created-board-list">
                    <li
                      className="board-list"
                      key={board._id}
                      onClick={() => handleBoardClick(board._id)}
                    >
                      {board.title}
                    </li>
                    <BiX
                      className="delete-board"
                      onClick={() => handleDeleteBoard(board._id)}
                    />
                  </div>
                ))}
              </ul>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <CreatedTasks boardId={boardId} />
      </div>
    </div>
  );
}
