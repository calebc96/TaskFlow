import React, { useEffect, useState } from "react";
import "../styles/CreatedTasks.css";
import { CreateNewTask } from "../components/CreateNewTask";

export default function CreatedTasks({ boardId }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, [boardId]);

  const loadTasks = async () => {
    try {
      const response = await fetch(`/api/boards/${boardId}`);
      const data = await response.json();
      console.log(data.board.tasks);
      setTasks(data.board.tasks);
      // Handle the retrieved data as needed
    } catch (err) {
      console.error(err);
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
        <CreateNewTask boardId={boardId} />
      </div>
    </div>
  );
}
