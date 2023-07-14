import React from "react";
import "../styles/Header.css";
import { BiSolidUserCircle } from "react-icons/bi";
import Create from "./Board";
import { Link } from "react-router-dom";

export default function Navigation() {
  const session = sessionStorage.getItem("session");
  console.log(session);
  return (
    <>
      <div className="nav-header">
        {session ? (
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
          {session ? (
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
