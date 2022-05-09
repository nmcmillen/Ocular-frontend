import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useGlobalState } from "../context/GlobalState";
import request from "./services/api.request";

export default function EditAvatar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, dispatch] = useGlobalState();
  const [avatar, setAvatar] = useState({
    avatar: "null",
  });

  // able to check 'avatar' state in the console. working when adding avatar info 5/4 at 9pm
  // console.log("what is avatar", avatar);

  // handles the updates to create avatar modal from the text form and image/file upload
  const handleChange = (key, value) => {
    setAvatar({
      ...avatar,
      [key]: value,
    });
  };

  let handleUpdateAvatar = async (e) => {
    e.preventDefault();
    const newAvatar = new FormData();
    newAvatar.append("avatar", avatar.avatar);
    // request comes from api.request.js
    let resp = await request({
      url: `api/users/${state.currentUser.user_id}/`,
      method: "PATCH",
      data: newAvatar,
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
        Update avatar
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="avatar">
              <Form.Label>Upload Images</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                placeholder=""
                onChange={(e) => handleChange("avatar", e.target.files[0])}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" onClick={handleUpdateAvatar}>
            Update Avatar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
