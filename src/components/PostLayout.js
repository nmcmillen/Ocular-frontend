import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PostLayout.css";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { getPostData } from "../Data";

export default function PostLayout() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPostData().then((data) => {
      setPosts(data);
      // console.log("postlayout.js", Date.now(), data);
    });
  }, []);

  // if (posts.length > 0) {
  //   console.log(posts[2].description)
  //   }

  return (
    <>
      <div>
        {posts.map((post) => (
          <Card className="mx-auto mt-4" id="post">
            <Row className="p-0 m-2 post-header">
              <Col className="p-0" xs={7}>
                <Image
                  className="avatar ml-1"
                  roundedCircle
                  src={post.created_by.avatar}
                />
                <Link
                  to={`/userprofile/${post.created_by.username}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <strong>{post.created_by.username}</strong>
                </Link>
              </Col>
              <Col
                className="timestamp text-muted p-0"
                xs={{ span: 4, offset: 1 }}
              >
                <Card.Text>{post.created_date}</Card.Text>
              </Col>
            </Row>
            <Card.Img
              variant="top"
              src={post.photos[0].images}
            />
            <Card.Body className="p-0 m-2">
              <Card.Text className="m-0">
                {post.number_of_likes} likes
              </Card.Text>
              <Card.Text>
                <Link
                  to={`/userprofile/${post.created_by.username}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <strong>{post.created_by.username}</strong>
                </Link>{" "}
                {post.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}
