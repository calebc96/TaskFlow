import React, { useEffect, useState } from "react";
import "../styles/CreatedTasks.css";
import { CreateNewCategory } from "./CreateNewCategory";
import { CreateNewTask } from "./CreateNewTask";
import CreatedTasks from "./CreatedTasks";


export default function CreatedCategories({ boardId }) {
  const [categoryIds, setCategoryIds] = useState({});
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [categoryid, setcategoryid] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    loadCategories();
  }, [boardId]);

  const loadCategories = async () => {
    try {
      const response = await fetch(`/api/boards/${boardId}`);
      const data = await response.json();
      console.log(data.board.categories);
      setCategories(data.board.categories);
      setTasks(data.board.categories.tasks);
      // Handle the retrieved data as needed
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategoryCreated = () => {
    loadCategories(); // Fetch the updated list of tasks when a new task is created
    handleClose();
  };

  return (
    <div className="created-tasks">
      <div>
        <ul className="created-categories">
          {categories.map((category) => (
            <li
              className="categories"
              key={category._id} // Use category._id instead of categories._id
              onClick={() => {
                handleShow();
                setCategoryIds({
                  ...categoryIds,
                  [category._id]: category._id,
                });
              }}
            >
              <p>{category.name}</p>
              <CreateNewTask categoryid={categoryIds[category._id]} />{" "}
              {/* Pass the categoryid for each category */}
            </li>
          ))}
        </ul>

        <CreateNewCategory
          show={show}
          boardId={boardId}
          onCategoryCreated={handleCategoryCreated}
          handleClose={handleClose} // Pass handleClose as a prop
        />
      </div>
        
      {categoryid && <CreateNewTask categoryid={categoryid} />}
      {categoryid && <CreatedTasks categoryid={categoryid} />}
    </div>
  );
}
