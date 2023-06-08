import React from "react";
import "../styles/CreateTask.css";

export default function Create() {
  return (
    <div className="Create-board">
      <h1>Create Board</h1>
      <div>
        <img className="create-image"></img>
      </div>
      <label>Board Title</label>
      <input placeholder="Enter title..."></input>
      <p>Title is Required</p>
      <button>Create</button>
    </div>
  );
}
