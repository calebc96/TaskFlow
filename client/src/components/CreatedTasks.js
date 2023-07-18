import React, { useEffect, useState } from "react";
import "../styles/CreatedTasks.css";
import { findMe } from "../utils/API";
import { createTasks } from "../utils/API";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      const response = await findMe();
      const user = await response.json();
      console.log(user.user.boards[0].tasks);
      setTasks(user.user.boards[0].tasks);
    }
    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
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

      await createTasks({
        title: title,
      });

      // // Task creation success logic here
      // handleClose();
    } catch (error) {
      // Task creation error handling here
      console.log(error);
    }
  };

  return (
    <div className="created-tasks">
      <div className="col-md-8">
        <ul>
          {tasks.map((task) => (
            <li className="task-border" key={task._id}>
              <p>{task.title}</p>
              {/* <p>{task.description}</p> */}
            </li>
          ))}
        </ul>
        <button
          variant="success"
          onClick={handleCreateTask}
          className="created-taskbutton"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          + Add Another Task
        </button>
      </div>
    </div>
  );
}
