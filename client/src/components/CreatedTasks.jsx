import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiX } from "react-icons/bi";

export default function CreatedTasks({ taskid }) {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getTasks();
  };

  useEffect(() => {
    // Fetch tasks when taskid changes
    getTasks();
  }, [taskid]);

  const getTasks = async () => {
    try {
      const response = await fetch(`/api/categories/${taskid}`);
      const data = await response.json();
      setTasks(data.tasks); // Assuming that the response contains an array of tasks
      console.log(data.tasks);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {tasks.length > 0 && (
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Tasks for this Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul>
                {tasks.map((task) => (
                  <li key={task._id}>{task.title}</li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  );
}
