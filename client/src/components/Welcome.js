import React from "react";
import "../styles/Header.css";
import { BiSolidUserCircle } from "react-icons/bi";
import Create from "./CreateTask";
import TaskBoard from "./TaskBoard";

export default function Navigation() {
  return (
    <>
      <div className="nav-header">
        <h1>TaskFlow</h1>
        <Create />
        <div className="nav-user">
          <BiSolidUserCircle />
        </div>
      </div>
      <TaskBoard />
    </>
  );
}
