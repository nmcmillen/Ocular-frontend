import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useGlobalState } from "../context/GlobalState";
import axios from "axios";
import request from "./services/api.request";
// import Userfront from '@userfront/react';

export default function CreatePost() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state, dispatch] = useGlobalState();

  // set the post state to empty information with current user
  // const [post, setPost] = useState({
  //   created_by: state.currentUser.user_id,
  //   description: "",
  //   image: "",
  // });
  // const [image, setImage] = useState()
  const [post, setPost] = useState({
    created_by: state.currentUser.user_id,
    description: "",
    image: ""
  });

  // able to check 'post' state in the console. working when adding post info 5/4 at 9pm
  console.log(post);
  // console.log(image);
  // console.log(JSON.stringify(post))
  // console.log('create post user test', state.currentUser.user_id)

  const handleChange = (key, value) => {
    setPost({
      ...post,
      [key]: value,
    });
  };

  // const handleImage = (key, value) => {
  //   setImage({
  //     ...image,
  //     [key]: value,
  //   });
  // };

  // const handleCreatePost = async (e) => {
  //   e.preventDefault();
  //   let newPost = new FormData();
  //   newPost.append("created_by", post.created_by);
  //   newPost.append("description", post.description);
  //   // newPost.append("image", post.image);
  //   let resp = await request({
  //     url: "api/posts/",
  //     method: "POST",
  //     // data: newPost,
  //     body: newPost,
  //     headers: { "Content-Type": "multipart/form-data"}
  //   });
  //   console.log(resp)
  // };

  const handleCreatePost = async () => {
    console.log('test', post, image)
    let newPost = new FormData();
    newPost.append("created_by", post.created_by);
    newPost.append("description", post.description);
    newPost.append("image", post.image);
    // newPost.append("image", image); working

    console.log("posty", newPost)

    let res = await request({
      url: 'api/posts/',
      method: 'POST',
      body: newPost,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    console.log("post again", newPost)
    // fetch('https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/api/posts/', {
    //   method: 'POST',
    //   body: newPost
    // })
    console.log('test res', res)
    .then( res => console.log(res))
    .catch( error => console.log(error))
  }


  
  // ##THIS SENDS DATA BUT GETS 401 ERROR ##
  // const handleCreatePost = async () => {
  //   let resp = await request({
  //     url: 'api/posts/',
  //     method: 'POST',
  //     data: post, image
  //   })
  //   console.log(resp)
  // };

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



    // let token =
    //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxNzY0MzU4LCJpYXQiOjE2NTE3NjA3NTgsImp0aSI6IjEzMDU4MjQ1ZGVjMTRmOTQ5NjdhNjc1NDY3ZDBkMWE3IiwidXNlcl9pZCI6Mn0.QyX-fwRjuP9PLvHOJEpDmt0GYtgmwzcWG3glb9oDLdg";

    // fetch(
    //   "https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/api/posts/",
    //   {
    //     method: "POST",
    //     body: post, //tried to stringify 'post' info but still doesn't work 
    //     headers: {
    //       "Content-Type": "application/json", //without this in it gets a 415 error related to media/content type
    //       // 'Content-Type': 'multipart/form-data',
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // )
    //   .then((response) => response.json)
    //   .then((result) => {
    //     console.log("Success:", result);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });






  // create the function to set the post
  // const handleCreatePost = async (e) => {
  //   // e.preventDefault();
  //   console.log('create post button pushed')
  //   // do I need to add a post method in authservice???
  //   let options = {
  //     url: '/api/posts/',
  //     method: 'POST'

  //   }
  // }

  // const handleCreatePost = () => {
  //   axios({
  //     method: "POST",
  //     url: "https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/api/posts/",
  //     headers: {

  //       Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxNzU3Mjg2LCJpYXQiOjE2NTE3NTM2ODYsImp0aSI6IjE0ZTczZTU5YTJmMzRlZDM4ZWNkOTFkOWUwNjY0NTE1IiwidXNlcl9pZCI6Mn0.QqNj_tGQsq4t2eu64LIpyZOM9I0SfcWRCVP665qBGeg"
  //     },
  //     post
  //   })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  // console.log(state.currentUser.access)
  // console.log(Userfront.accessToken())
  // console.log('get user token', JSON.parse(localStorage.getItem('user'))['access_token'])