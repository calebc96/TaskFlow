import React, { useEffect, useState } from "react";
import "../styles/CreatedTask.css";

export default function Created() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    async function fetchBoards() {
      const response = await fetch("api/boards");
      const resData = await response.json();
      console.log(resData);
      setBoards(resData);
    }
    fetchBoards();
  }, []);

  return (
    <div className="col-md-8">
      <ul className="list-group">
        {boards.map((board) => (
          <li key={board._id}>{board.title}</li>
        ))}
      </ul>
    </div>
  );
}
