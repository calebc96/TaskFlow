import React, { useEffect, useState } from "react";
import "../styles/CreatedTasks.css";
// import { Login } from "../pages/Login";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch(`api/users`);
      const resData = await response.json();
      console.log(resData);
      setTasks(resData);
    }
    fetchTasks();
  }, []);

  return (
    <div className="col-md-8">
      {/* <ul>
        {tasks.map((task) => (
          <li className="task-border" key={task._id}>
            {task.title}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
