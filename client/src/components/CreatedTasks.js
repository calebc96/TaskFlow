import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { BiX } from "react-icons/bi";

export default function CreatedTasks({ taskid }) {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getTasks();
  }, [taskid]);

  const getTasks = async () => {
    try {
      const response = await fetch(`/api/tasks/${taskid}`);
      const data = await response.json();
      console.log(data.task.title);
      setTasks(data.task.title);
      // Handle the retrieved data as needed
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {tasks && (
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                <p>{tasks}</p>
              </Modal.Title>
            </Modal.Header>
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
