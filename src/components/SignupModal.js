import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AuthService from "././services/auth.service";
import { useNavigate } from "react-router-dom";

export default function SignupModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();

  // Josh example below
  const [user, setUser] = useState({
    username: "",
    password: "",
    passwordConf: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value,
    });
  };

  // look at defensive programming here
  const handleRegister = (e) => {
    e.preventDefault();
    AuthService.register(user);
    handleClose()
    alert('Account created successfully. Please Login')
    localStorage.clear(); //look to make this work and direct to users profile on succesful account creation
    // navigate('/profile') //need to navigate to profile but having issue with signup
  };

  return (
    <>
      <Button className="text-white" variant="" onClick={handleShow}>
        Signup
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create an Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                // maybe "text"
                name="email"
                onChange={(e) => handleChange("email", e.target.value)}
                required
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                placeholder="John"
                onChange={(e) => handleChange("firstName", e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                placeholder="Doe"
                onChange={(e) => handleChange("lastName", e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => handleChange("username", e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="pass">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                minLength="8"
                onChange={(e) => handleChange("password", e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passConf">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                minLength="8"
                onChange={(e) => handleChange("passwordConf", e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            value="Register"
            variant="primary"
            onClick={handleRegister}
            disabled={(
              user.password &&
              user.password.length >= 8 &&
              user.password === user.passwordConf &&
              user.firstName &&
              user.lastName &&
              user.email
            ) ? false : true}
          >
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
