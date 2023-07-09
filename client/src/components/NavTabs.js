import React from "react";
import "../styles/Header.css";
import { BiSolidUserCircle } from "react-icons/bi";
import Create from "./CreateTask";
import TaskBoard from "../pages/TaskBoard";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <>
      <div className="nav-header">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>TaskFlow</h1>
        </Link>
        <Create />
        <div className="nav-user">
          <Link to="/login">
            {" "}
            <BiSolidUserCircle />
          </Link>
        </div>
      </div>
    </>
  );
}
