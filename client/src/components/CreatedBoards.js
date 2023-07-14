import React, { useEffect, useState } from "react";
import "../styles/CreatedBoard.css";
import { findMe } from "../utils/API";

export default function Boards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      //fetches the loggedin user's data
      const response = await findMe();
      //parses the response body to json
      const user = await response.json();
      console.log(user);
      //sets the state of the user's data
      setBoards(user.user.boards);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="col-md-8">
      <ul>
        {boards.map((board) => (
          <li className="board-list" key={board._id}>
            {board.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
