import React, { useEffect, useState } from "react";
import "./PostLayout.css";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { getPostData } from "./src/Data";

export default function PostLayout() {
  const [ posts, setPosts ] = useState([]);

  useEffect (() => {
    getPostData()
    .then((data) => {
      setPosts(data)
      console.log('postlayout.js', data)
      console.log(data[3].description)
    })
  }, [])

  console.log('what', posts)

  let username = "username.user";
  let postdesc = "Some quick example text to build on the card title and make up the bulk of the card's content.";

  return (
    <>
      <Card className="mx-auto mt-4" id="post">
        <Row className="p-0 m-2 post-header">
          <Col className="p-0" xs={7}>
            <Image
              className="avatar ml-1"
              roundedCircle
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            />
            <strong>{username}</strong>
          </Col>
          <Col
            className="timestamp text-muted p-0"
            xs={{span: 4, offset: 1 }}
          >
            <Card.Text>April 19</Card.Text>
          </Col>
        </Row>
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1533418264835-9871c7c2dbf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFjZWNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
        <Card.Body className="p-0 m-2">
          <Card.Text>
            <strong>{username}</strong> {workplz}
          </Card.Text>
        </Card.Body>
      </Card>

      {/* LAYOUT CARD DON'T TOUCH */}
      <Card className="mx-auto mt-4" id="post">
        <Row className="p-0 m-2 post-header">
          <Col className="p-0" xs={7}>
            <Image
              className="avatar ml-1"
              roundedCircle
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            />
            <strong>{username}</strong>
          </Col>
          <Col
            className="timestamp text-muted p-0"
            xs={{span: 4, offset: 1 }}
          >
            <Card.Text>April 19</Card.Text>
          </Col>
        </Row>
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1533418264835-9871c7c2dbf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFjZWNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
        <Card.Body className="p-0 m-2">
          <Card.Text>
            <strong>{username}</strong> {postdesc}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
