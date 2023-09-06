import React, {  useState } from "react";
import "../styles/CreatedTasks.css";
import { createCategory } from "../utils/API";
import { BiX, BiPlus } from "react-icons/bi";

export const CreateNewCategory = ({ boardId, onCategoryCreated }) => {
  const [list, setlist] = useState("");
  const [showInputFields, setShowInputFields] = useState(false); // State to track if button is clicked

  const handleCreateCategory = async () => {
    handleCloseInputFields();
    try {
      // Call the API to create a new Category with the input field values
      await createCategory({
        name: list,
        board_id: boardId,
      });
      onCategoryCreated(); // Call the onTaskCreated handler passed from the parent component
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
          <div className="Create-New-Category">
            <label>
              <input
                className="Input-Category"
                placeholder="Enter list title..."
                onChange={(e) => setlist(e.target.value)}
                required
              />
            </label>
            <button
              variant="success"
              onClick={handleCreateCategory}
              className="Add-Category btn btn-primary"
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
