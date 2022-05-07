import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import { useGlobalState } from "../context/GlobalState";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Row,
} from "react-bootstrap";
import { getData } from "../Data";
import "./UserProfile.css";
import request from "../components/services/api.request";

export default function UserProfile() {
  const [state, dispatch] = useGlobalState();
  const [posts, setPosts] = useState([]);

  let { username } = useParams();

  useEffect(() => {
    getData().then((data) => {
      setPosts(data);
    });
  }, []);

  let userPosts = posts.filter(
    (displayPosts) => displayPosts.created_by.username === username
  );

  console.log('feed me', userPosts)

  return (
    <>
      <HomeNavbar />
      <Container fluid className="profile-page text-center mt-3">
        <Image
          className="profile-avatar"
          roundedCircle
          src={state.person.avatar}
        />
        <Row>
          <Col>
            <Button>Follow</Button>
          </Col>
        </Row>
        <Row>
          <h3>
            {state.person.first_name} {state.person.last_name}
          </h3>
        </Row>
        <Row>
          <h6>{state.person.bio}</h6>
        </Row>
        <Row>
          <Col>
            553 <br />
            Posts
          </Col>
          <Col>
            1,269 <br />
            Followers
          </Col>
          <Col>
            306 <br />
            Following
          </Col>
        </Row>
      </Container>

      {/* https://www.freecodecamp.org/news/build-a-search-filter-using-react-and-react-hooks/
      <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}> */}

      {/* User's posts */}
      <div>
        {/* <Row xs={1} md={2} className="g-4"> */}
        {userPosts.map((post) => (
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
                xs={{ span: 4, offset: 1 }}
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
              <Row className ="align-items-center">
                <Col>
                  {" "}
                  <Card.Text className="m-0">
                    {post.number_of_likes} likes
                  </Card.Text>
                </Col>
              </Row>

              <Card.Text>
                <strong>{post.created_by.username}</strong> {post.description}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        {/* </Row> */}
      </div>
    </>
  );
}
