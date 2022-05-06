import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useGlobalState } from "../context/GlobalState";
import axios from "axios";
// import request from "./services/api.request";
// import authHeader from '../auth.headers'
// import Userfront from '@userfront/react';

export default function CreatePost() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [state, dispatch] = useGlobalState();
  const [post, setPost] = useState({
    created_by: state.currentUser.user_id,
    description: "",
    image: null
  });

  // able to check 'post' state in the console. working when adding post info 5/4 at 9pm
  console.log('what is post', post);

  const handleChange = (key, value) => {
    setPost({
      ...post,
      [key]: value,
    });
  };

  // const handleCreatePost = async (e) => {
  //   e.preventDefault();
  //   let newPost = new FormData();
  //   newPost.append("created_by", post.created_by);
  //   newPost.append("description", post.description);
  //   newPost.append("image", post.image);
  //   let resp = await request({
  //     url: "api/posts/",
  //     method: "POST",
  //     // data: newPost,
  //     body: newPost,
  //     headers: { "Content-Type": "multipart/form-data"}
  //   });
  //   console.log(resp)
  // };

  // const handleCreatePost = async (e) => {
  //   e.preventDefault();
  //   console.log('create post 1', post)
  //   let newPost = new FormData();
  //   newPost.append("created_by", post.created_by);
  //   newPost.append("description", post.description);
  //   newPost.append("image", post.image);
  //   // newPost.append("image", image); working

  //   console.log("posty", newPost)

  //   let res = await request({
  //     url: 'api/posts/',
  //     method: 'POST',
  //     body: newPost,
  //     headers: { 'Content-Type': 'multipart/form-data' }
  //   })
  //   console.log("post again", newPost)
  //   // fetch('https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/api/posts/', {
  //   //   method: 'POST',
  //   //   body: newPost
  //   // })
  //   console.log('test res', res)
  //   .then( res => console.log(res))
  //   .catch( error => console.log(error))
  // }
  
  // ##THIS SENDS DATA BUT GETS 401 ERROR ##
  // const handleCreatePost = async () => {
  //   let resp = await request({
  //     url: 'api/posts/',
  //     method: 'POST',
  //     data: post
  //   })
  //   console.log(resp)
  // };

  const user = JSON.parse(localStorage.getItem('user'))

  // ### AXIOS CALL TO CREATE FORM DATA AND SEND TO BACKEND. WORKING. ###
  let handleCreatePost = async (e) => {
    e.preventDefault();
    const newPost = new FormData();
    newPost.append("created_by", post.created_by);
    newPost.append("description", post.description);
    newPost.append("image", post.image);
    await axios
      .post(
        "https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/api/posts/",
        newPost,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + user.access,
            // 'Authorization': `Bearer ${token}`
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
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
                // handles the image upload using files instead of value. working in console 5/4 9:15pm
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