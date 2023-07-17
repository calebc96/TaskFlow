import React, { useState, useEffect } from "react";
import "../styles/TaskBoard.css";
import Button from "react-bootstrap/Button";
import CreatedBoards from "../components/CreatedBoards";
import Tasks from "../components/CreatedTasks";

export default function TaskBoard() {
  const [show, setShow] = useState(false);
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState([]);

  useEffect(() => {
    loadTasks();
  }, [boardId]);

  const loadTasks = async () => {
    try {
      const response = await fetch(`/api/boards/${boardId}`);
      const data = await response.json();
      console.log(data);
      setBoards(data.boards);
      console.log(setBoards);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="board-background">
      <div className="main-view">
        <CreatedBoards />
        <div className="created-tasks">
          <Tasks />
        </div>
        <button className="created-taskbutton">+ Add Another Task</button>
      </div>
    </div>
  );
}
