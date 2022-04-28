import React, { useEffect, useState } from "react";
import "./PostLayout.css";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { getData } from "../Data";

export default function PostLayout() {
  const [ posts, setPosts ] = useState([]);

  useEffect (() => {
    getData()
    .then((data) => {
      setPosts(data)
      console.log('postlayout.js', Date.now(), data)
      // console.log(data[3].description)
    })
  }, [])

  // if (posts.length > 0) { 
  //   console.log(posts[2].description)
  //   }

  // let username = "username.user";
  // let postdesc = "Some quick example text to build on the card title and make up the bulk of the card's content.";

  // let created_on = posts.created_date

  // const formatDate = (created_on) => {
  //   const options = { year: "numeric", month: "long", day: "numeric" }
  //   return new Date(created_on).toLocaleDateString(undefined, options)
  // }

  return (
    <>
    <div>
      {posts.map(post => 
      <Card className="mx-auto mt-4" id="post">
        <Row className="p-0 m-2 post-header">
          <Col className="p-0" xs={7}>
            <Image
              className="avatar ml-1"
              roundedCircle
              src={post.created_by.avatar}
            />
            <strong>{post.created_by.username}</strong>
          </Col>
          <Col
            className="timestamp text-muted p-0"
            xs={{span: 4, offset: 1 }}
          >
            <Card.Text>{post.created_date}</Card.Text>
          </Col>
        </Row>
        <Card.Img
          variant="top"
          src={post.photos[0].images}
          // src="https://images.unsplash.com/photo-1533418264835-9871c7c2dbf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFjZWNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
        <Card.Body className="p-0 m-2">
          <Card.Text className="m-0">{post.number_of_likes} likes</Card.Text>
          <Card.Text>
            <strong>{post.created_by.username}</strong> {post.description}
          </Card.Text>
        </Card.Body>
      </Card>)}
      </div>
    </>
  );
}
