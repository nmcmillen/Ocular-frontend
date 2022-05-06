import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useGlobalState } from "../context/GlobalState";
import request from "./services/api.request";

export default function CreatePost() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, dispatch] = useGlobalState();
  const [post, setPost] = useState({
    created_by: state.currentUser.user_id,
    description: "",
    image: null,
  });

  // able to check 'post' state in the console. working when adding post info 5/4 at 9pm
  console.log("what is post", post);

  // handles the updates to create post modal from the text form and image/file upload
  const handleChange = (key, value) => {
    setPost({
      ...post,
      [key]: value,
    });
  };

  let handleCreatePost = async (e) => {
    e.preventDefault();
    const newPost = new FormData();
    newPost.append("created_by", post.created_by);
    newPost.append("description", post.description);
    newPost.append("image", post.image);
    // request comes from api.request.js
    let resp = await request({
      url: "api/posts/",
      method: "POST",
      data: newPost,
      // headers: { "Content-Type": "multipart/form-data" },
    }).then((resp) => {
      console.log(resp);
    });
    window.location.reload(false);
  };

  return (
    <>
      <Button className="text-white" variant="" onClick={handleShow}>
        Create Post
      </Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Post Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Say something about your post"
                maxLength="255"
                onChange={(e) => handleChange("description", e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Upload Images</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                placeholder=""
                onChange={(e) => handleChange("image", e.target.files[0])}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" onClick={handleCreatePost}>
            Create Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
