import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useGlobalState } from "../context/GlobalState";
import request from "./services/api.request";

export default function EditProfile() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, dispatch] = useGlobalState();
  const [updateProfile, setUpdateProfile] = useState({
    first_name: state.person.first_name,
    last_name: state.person.last_name,
    username: state.person.username,
    bio: state.person.bio,
  });

  // able to check 'post' state in the console. working when adding post info 5/4 at 9pm
  console.log("what is updateProfile", updateProfile);

  // handles the updates to create post modal from the text form and image/file upload
  const handleChange = (key, value) => {
    setUpdateProfile({
      ...updateProfile,
      [key]: value,
    });
  };

  let handleUpdateProfile = async (e) => {
    e.preventDefault();
    const newUpdateProfile = new FormData();
    newUpdateProfile.append("first_name", updateProfile.first_name);
    newUpdateProfile.append("last_name", updateProfile.last_name);
    newUpdateProfile.append("username", updateProfile.username);
    newUpdateProfile.append("bio", updateProfile.bio);
    // request comes from api.request.js
    let resp = await request({
      url: `api/users/${state.currentUser.user_id}/`,
      method: "PATCH",
      data: newUpdateProfile,
      // headers: { "Content-Type": "multipart/form-data" },
    }).then((resp) => {
      console.log(resp);
    });
    window.location.reload(false);
  };

  return (
    <>
      <Button
        className="text-white shadow-none"
        variant="primary"
        onClick={handleShow}
      >
        Update Profile
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="first_name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                // rows={3}
                defaultValue={state.person.first_name}
                // placeholder="Say something about your post"
                maxLength="255"
                onChange={(e) => handleChange("first_name", e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="last_name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                // rows={3}
                defaultValue={state.person.last_name}
                // placeholder="Say something about your post"
                maxLength="255"
                onChange={(e) => handleChange("last_name", e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                // rows={3}
                defaultValue={state.person.username}
                // placeholder="Say something about your post"
                maxLength="255"
                onChange={(e) => handleChange("username", e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                // rows={3}
                defaultValue={state.person.bio}
                // placeholder="Say something about your post"
                maxLength="255"
                onChange={(e) => handleChange("bio", e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" onClick={handleUpdateProfile}>
            Update Profile
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
