import React, { useEffect, useState } from "react";
import "../styles/CreatedTasks.css";
import { createCategory } from "../utils/API";
import { BiX, BiPlus } from "react-icons/bi";

export const CreateNewCategory = ({ boardId, onTaskCreated }) => {
  const [list, setlist] = useState("");
  const [showInputFields, setShowInputFields] = useState(false); // State to track if button is clicked

  const handleCreateTask = async () => {
    handleCloseInputFields();
    try {
      await createCategory({
        name: list,
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
                placeholder="Enter list title..."
                onChange={(e) => setlist(e.target.value)}
                required
              />
            </label>
            <button
              variant="success"
              onClick={handleCreateTask}
              className="Add-Task btn btn-primary"
            >
              Add List
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
          className="created-list"
        >
          <BiPlus /> Add another List
        </button>
      )}
    </>
  );
};
