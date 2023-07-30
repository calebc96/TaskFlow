import React, { useEffect, useState } from "react";
import "../styles/CreatedTasks.css";
import { createTasks } from "../utils/API";
import { BiX, BiPlus } from "react-icons/bi";

export const CreateNewTask = ({ boardId, onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [showInputFields, setShowInputFields] = useState(false); // State to track if button is clicked

  const handleCreateTask = async () => {
    handleCloseInputFields();
    try {
      await createTasks({
        title: title,
        board_id: boardId,
      });
      onTaskCreated(); // Call the onTaskCreated handler passed from the parent component
    } catch (error) {
      // Board creation error handling here
      console.log(error);
    }
  };

  const handleShowInputFields = () => {
    setShowInputFields(true); // Set the state to true when the button is clicked
  };

  const handleCloseInputFields = () => {
    setShowInputFields(false); // Set the state back to false to hide the input fields
  };

  return (
    <>
      {/* Show the button and the input fields only if showInputFields is true */}
      {showInputFields ? (
        <>
          <div className="Create-New">
            <label>
              <input
                className="input-task"
                placeholder="Enter a title for this task..."
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <button
              variant="success"
              onClick={handleCreateTask}
              className="Add-Task btn btn-primary"
            >
              Add task
            </button>
            <button
              variant="danger"
              onClick={handleCloseInputFields}
              className="close-out"
            >
              <BiX className="x-out" />
            </button>
          </div>
        </>
      ) : (
        // If showInputFields is false, show only the "Create New Task" button
        <button
          variant="success"
          onClick={handleShowInputFields} // Call the handler to show input fields when the button is clicked
          className="created-taskbutton"
        >
          <BiPlus /> Add a task
        </button>
      )}
    </>
  );
};
