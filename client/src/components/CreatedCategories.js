import React, { useEffect, useState } from "react";
import "../styles/CreatedTasks.css";
import { CreateNewCategory } from "./CreateNewCategory";
import { CreateNewTask } from "./CreateNewTask";
import ViewTasks from "./ViewTasks";

export default function CreatedTasks({ boardId }) {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [taskid, setTaskId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loadTasks();
  }, [boardId]);

  const loadTasks = async () => {
    try {
      const response = await fetch(`/api/boards/${boardId}`);
      const data = await response.json();
      console.log(data.board.categories);
      setCategories(data.board.categories);
      // Handle the retrieved data as needed
    } catch (err) {
      console.error(err);
    }
  };

  const handleTaskCreated = () => {
    loadTasks(); // Fetch the updated list of tasks when a new task is created
    handleClose();
  };

  return (
    <div className="created-tasks">
      <div>
        <ul className="created-categories">
          {categories.map((task) => (
            <>
              <li
                className="categories"
                key={categories._id}
                onClick={() => {
                  handleShow();
                  setTaskId(categories._id);
                }}
              >
                <p>{task.name}</p>
                <CreateNewTask />
              </li>
            </>
          ))}
        </ul>

        <CreateNewCategory
          show={show}
          boardId={boardId}
          onTaskCreated={handleTaskCreated}
          handleClose={handleClose} // Pass handleClose as a prop
        />
      </div>

      {taskid && <ViewTasks taskid={taskid} />}
    </div>
  );
}
