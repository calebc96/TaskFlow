import React, { useEffect, useState } from "react";
import "../styles/TaskBoard.css";
import CreatedBoards from "../components/CreatedBoards";
import Tasks from "../components/CreatedTasks";

export default function TaskBoard({ boardId }) {
  useEffect(() => {
    loadTasks();
  }, [boardId]);

  const loadTasks = async () => {
    try {
      const response = await fetch(`/api/boards/${boardId}`);
      const data = await response.json();
      console.log(data);
      // Handle the retrieved data as needed
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="board-background">
      <div className="main-view">
        <CreatedBoards />
        <Tasks />
      </div>
    </div>
  );
}
