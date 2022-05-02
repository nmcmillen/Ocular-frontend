import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import AuthService from "././services/auth.service";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from ".././context/GlobalState";
import jwtDecode from "jwt-decode";

export default function LoginModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();

  const [state, dispatch] = useGlobalState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(username, password).then(async (resp) => {
      let data = jwtDecode(resp.access);
      await dispatch({
        currentUserToken: resp.access,
        currentUser: data,
      });
      // navigate("/profile"); josh OG link
      navigate("/feed");
    });
  };

  return (
    <>
      <Button className="text-white" variant="" onClick={handleShow}>
        Login
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login to Ocular</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="user.ocular"
                // id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                // onSubmit={handleLogin}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                // id="pass"
                name="password"
                minLength="8"
                onChange={(e) => setPassword(e.target.value)}
                // onSubmit={handleLogin}
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
          <Button type="submit" variant="primary" onClick={handleLogin}>
            {" "}
            {/*{[handleClose, handleLogin]}*/}
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
