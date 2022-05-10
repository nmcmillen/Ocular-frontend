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
import { getFollowerData, getPostData, getUserData } from "../Data";
import "./UserProfile.css";
// import request from "../components/services/api.request";

export default function UserProfile() {
  const [state, dispatch] = useGlobalState();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState([]);
  const [follow, setFollow] = useState([])

  let { username } = useParams();

  // useEffect(() => {
  //   getUserData().then((data) => {
  //     setProfile(data);
  //   });
  // }, []);
  
  // useEffect(() => {
  //   getFollowerData().then((data) => {
  //     setFollowers(data);
  //   });
  // }, []);
  
  useEffect(() => {
    getPostData().then((data) => {
      setPosts(data);
    });
    getUserData().then((data) => {
      setProfile(data);
    });
    getFollowerData().then((data) => {
      setFollow(data);
      // setFollow(data.filter((user) => user.id === user.id));
    });
  }, []);


  // Gets user id of current page by getting the username from profile and then the user id from that
  let userID = profile.filter((getid) => getid.username === username).map((give) => give.id)

  // ### Displays the current page user's posts ###
  let userPosts = posts.filter(
    (displayPosts) => displayPosts.created_by.username === username
  );

  // ### Displays the current page user's profile info ###
  let userProfile = profile.filter(
    (displayProfile) => displayProfile.username === username
  );

  // ### Displays the current page user's people they are following ###
  let userFollowing = follow.filter(
    (displayFollowing) => displayFollowing.user === userID[0]
  );

  // ### Displays the current page user's followers ###
  let userFollowers = follow.filter(
    (displayFollowers) => displayFollowers.follower === userID[0]
  );

  // console.log('users id', userID)
  // console.log('follower info', followers)
  // console.log('userfollowing', userFollowing.length)
  // console.log('userfollowers', userFollowers.length)

  return (
    <>
      <HomeNavbar />
      <div>
        {userProfile.map((user) => (
          <Container fluid className="profile-page text-center mt-3">
            <Image className="profile-avatar" roundedCircle src={user.avatar} />
            <Row>
              <Col>
                <Button>Follow</Button>
              </Col>
            </Row>
            <Row>
              <h3>
                {user.first_name} {user.last_name}
              </h3>
            </Row>
            <Row>
              <h6>{user.bio}</h6>
            </Row>
            <Row>
              <Col>
                {userPosts.length} <br />
                Posts
              </Col>
              <Col>
                {userFollowers.length} <br />
                Followers
              </Col>
              <Col>
                {userFollowing.length} <br />
                Following
              </Col>
            </Row>
          </Container>
        ))}
      </div>

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
            <Card.Img variant="top" src={post.photos[0].images} />
            <Card.Body className="p-0 m-2">
              <Row className="align-items-center">
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
