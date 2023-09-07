import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createUser } from "../utils/API.jsx";

import "../styles/Login.css";

export default function SignupForm() {
  // Set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Set state for form validation
  const [validated, setValidated] = useState(false);

  // Set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [showGoodAlert, setShowGoodAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
        // Reset the validation state when submitting the form
        setValidated(false);
    // Check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true); // Mark the form as validated
      return; // Exit early if the form is not valid
    } else {
      try {
        const response = await createUser(userFormData);

        if (response.ok) {
          window.location.replace("/login");
          setShowGoodAlert(true);
          // Clear user data fields after successful submission
          setUserFormData({
            username: "",
            email: "",
            password: "",

          });
        } else {
          throw new Error('User creation failed');
        }
      } catch (err) {
        setShowAlert(true);
        console.error(err);
      }
    }

    setValidated(true);
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form
        className="form-page"
        noValidate
        validated={validated}
        onSubmit={handleFormSubmit}
      >
        {/* Show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
          className="alert"
        >
          Something went wrong with your signup!
        </Alert>
        {/* Show alert if server response is good */}
        <Alert
          dismissible
          onClose={() => setShowGoodAlert(false)}
          show={showGoodAlert}
          variant="success"
          className="success-alert"
        >
          You've successfully signed up!
        </Alert>
        <div className="form-group">
          {/* ... (input fields and validation) */}
          {/* Username */}
          <Form.Group>
            <Form.Label htmlFor="username">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your username"
              name="username"
              onChange={handleInputChange}
              value={userFormData.username}
     
            />
            <Form.Control.Feedback type="invalid">
              Username is required!
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your email address"
              name="email"
              onChange={handleInputChange}
              value={userFormData.email}
    
            />
            <Form.Control.Feedback type="invalid">
              Email is required!
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password */}
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              name="password"
              onChange={handleInputChange}
              value={userFormData.password}
           
            />
            <Form.Control.Feedback type="invalid">
              Password is required!
            </Form.Control.Feedback>
          </Form.Group>

          {/* Submit Button */}
          <Button
            className="login-button"
            disabled={
              !(
                userFormData.username &&
                userFormData.email &&
                userFormData.password
              )
            }
            type="submit"
            variant="success"
          >
            Submit
          </Button>
          <br />
          <small>
            Have an account? <Link to="/login">Login Here</Link>{" "}
          </small>
        </div>
      </Form>
    </>
  );
}
