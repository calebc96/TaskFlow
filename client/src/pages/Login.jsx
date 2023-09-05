import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { loginUser } from "../utils/API.jsx"
import "../styles/Login.css";

export default function UserLogin() {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(userFormData);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.message}`);
      }

      // Set session in sessionStorage
      sessionStorage.setItem("session", true);
      window.location.replace("/");
      const { user } = await response.json();
      console.log(user);
    } catch (err) {
      console.error("Login Error:", err.message); // Log the error message
      setShowAlert(true);
    }

    setUserFormData({ email: "", password: "" });
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit} className="form-page">
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
          className="alert"
        >
          Something went wrong with your login credentials!
        </Alert>
        <div className="form-group">
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your email"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              Email is required!
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
              required
            />
            <Form.Control.Feedback type="invalid">
              Password is required!
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={!(userFormData.email && userFormData.password)}
            type="submit"
            variant="success"
            className="login-button"
          >
            Submit
          </Button>
          <br />
          <small>
            Don't have an account? <Link to="/signup">Signup Here</Link>{" "}
          </small>
        </div>
      </Form>
    </>
  );
}
