import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useGlobalState } from "../context/GlobalState";

export default function CreatePost() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, dispatch] = useGlobalState();

  // set the post state to empty information with current user
  const [post, setPost] = useState ({
    created_by: state.currentUser.user_id,
    description: '',
    image: '',
  });

  // able to check 'post' state in the console. working when adding post info 5/4 at 9pm
  console.log(post)
  // console.log('create post user test', state.currentUser.user_id)

  const handleChange = (key, value) => {
    setPost({
      ...post,
      [key]: value,
    });
  };

// create the function to set the post
  const handleCreatePost = async (e) => {
    // e.preventDefault();
    // do I need to add a post method in authservice???
    let options = {
      url: '/api/posts/',
      method: 'POST'

    }


  }

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
                placeholder='Say something about your post'
                maxLength='255'
                onChange={(e) => handleChange('description', e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Upload Images</Form.Label>
              <Form.Control 
              type="file"
              accept="image/*"
              placeholder="" 
              // handles the image upload using files instead of value. working in console 5/4 9:15pm
              onChange={(e) => handleChange('image', e.target.files[0])}
              autoFocus />
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