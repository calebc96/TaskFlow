import React, { useEffect, useState } from "react";
import "../styles/CreatedTasks.css";
import { findMe } from "../utils/API";

// import { Login } from "../pages/Login";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await findMe();
      const user = await response.json();
      console.log(user.user.boards[0].tasks);
      setTasks(user.user.boards[0].tasks);
    }
    fetchTasks();
  }, []);

  return (
    <div className="col-md-8">
      <ul>
        {tasks.map((task) => (
          <li className="task-border" key={task._id}>
            <p>{task.title}</p>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
