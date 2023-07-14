import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { getMe } from "../utils/API";
import "../styles/Login.css";

const UserInformation = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const response = await getMe();

      const user = await response.json();
      console.log(user);
      setUserData({ username: user.username, email: user.email });
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  //   const handleFormSubmit = async (event) => {
  //     event.preventDefault();

  //     const form = event.currentTarget;
  //     if (form.checkValidity() === false) {
  //       event.preventDefault();
  //       event.stopPropagation();
  //     }

  //     try {
  //       const response = await updateUser(userData);
  //       if (!response.ok) {
  //         throw new Error("something went wrong!");
  //       }
  //       setSuccessMessage("Password updated successfully!");
  //       setShowAlert(true);
  //     } catch (err) {
  //       console.error(err);
  //       setShowAlert(true);
  //     }

  //     setUserData({
  //       ...userData,
  //       password: "",
  //     });
  //     setValidated(false);
  //   };

  const handleLogout = () => {
    sessionStorage.removeItem("session");
    window.location.replace("/login");
  };

  return (
    <>
      <Alert
        dismissible
        onClose={() => setShowAlert(false)}
        show={showAlert}
        variant={successMessage ? "success" : "danger"}
        className="alert"
      >
        {successMessage || "Something went wrong!"}
      </Alert>
      <div className="user-info">
        <Form className="form-page" noValidate validated={validated}>
          <div className="form-group">
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={userData.username}
                readOnly
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                readOnly
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                name="password"
                onChange={handleInputChange}
                value={userData.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a new password.
              </Form.Control.Feedback>
            </Form.Group>

            <Button className="login-button" type="submit" variant="primary">
              Change Password
            </Button>
            <Button
              className="login-button"
              variant="danger"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UserInformation;
