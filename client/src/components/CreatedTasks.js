import React, { useEffect, useState } from "react";
import "../styles/CreatedTasks.css";
import { CreateNewTask } from "../components/CreateNewTask";
import ViewTasks from "../components/ViewTasks";

export default function CreatedTasks({ boardId }) {
  const [tasks, setTasks] = useState([]);
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
      console.log(data.board.category.tasks);
      setTasks(data.board.category.tasks);
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
    <>
      <div className="created-tasks">
        <div className="col-md-8">
          <ul>
            {tasks.map((task) => (
              <li
                className="task-border"
                key={task._id}
                onClick={() => {
                  handleShow();
                  setTaskId(task._id);
                }}
              >
                <p>{task.title}</p>
              </li>
            ))}
          </ul>
          <CreateNewTask
            show={show}
            boardId={boardId}
            onTaskCreated={handleTaskCreated}
            handleClose={handleClose} // Pass handleClose as a prop
          />
        </div>
        {taskid && <ViewTasks taskid={taskid} />}
      </div>
    </>
  );
}
