import React, { useEffect, useState } from "react";
import "../styles/CreatedTasks.css";
import { createTasks } from "../utils/API";

export const CreateNewTask = ({ boardId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescripton] = useState("");

  const handleCreateTask = async () => {
    try {
      await createTasks({
        title: title,
        description: description,
        board_id: boardId,
      });
    } catch (error) {
      // Board creation error handling here
      console.log(error);
    }
  };

  return (
    <>
      <label>
        Add title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Add description
        <input
          value={description}
          onChange={(e) => setDescripton(e.target.value)}
        />
      </label>
      {/* Show this button and only show the above once this is clicked*/}
      <button
        variant="success"
        onClick={handleCreateTask}
        className="created-taskbutton"
      >
        + Create New Task
      </button>
    </>
  );
};
