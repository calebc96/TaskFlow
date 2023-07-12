import React from "react";
import "../styles/Header.css";
import { BiSolidUserCircle } from "react-icons/bi";
import Create from "./Board";
import TaskBoard from "../pages/TaskBoard";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

export default function Navigation() {
  return (
    <>
      <div className="nav-header">
        {Auth.loggedIn() ? (
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1>TaskFlow</h1>
          </Link>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <h1>TaskFlow</h1>
          </Link>
        )}

        <Create />
        <div className="nav-user">
          {Auth.loggedIn() ? (
            <Link to="/user-information">
              <BiSolidUserCircle />
            </Link>
          ) : (
            <Link to="/login">
              <BiSolidUserCircle />
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
