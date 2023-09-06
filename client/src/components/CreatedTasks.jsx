import React, { useEffect, useState } from "react";

export default function CreatedTasks({ categoryid }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (categoryid) {
      getTasks();
    }
  }, [categoryid]);

  const getTasks = async () => {
    try {
      const response = await fetch(`/api/categories/${categoryid}`);
      const data = await response.json();
      console.log(data.category)
      setTasks(data.tasks || []); // Ensure tasks is an array or set it to an empty array
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>{category.task.title}</li>
          ))}
        </ul>
      ) : (
        <p>No tasks found for this category.</p>
      )}
    </div>
  );
}

