import React, { useEffect, useState } from "react";
import HomeNavbar from "../components/HomeNavbar";
import { useGlobalState } from "../context/GlobalState";
import {
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Row,
} from "react-bootstrap";
import {
  getFollowerData,
  getPostData,
  getUserData,
  getReactionData,
} from "../Data";
import "./MyProfile.css";
import request from "../components/services/api.request";
import EditAvatar from "../components/EditAvatar";
import EditProfile from "../components/EditProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

export default function MyProfile() {
  const [state, dispatch] = useGlobalState();
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState([]);
  const [follow, setFollow] = useState([]);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    getUserData().then((data) => {
      setProfile(data.filter((user) => user.id === state.currentUser.user_id));
    });
    getFollowerData().then((data) => {
      setFollow(data);
    });
    getReactionData().then((data) => {
      setReactions(data);
    });
  }, []);

  useEffect(() => {
    getPostData().then((data) => {
      setPosts(data);
    });
  }, []);

  // ### Displays the current page user's profile info ###
  let userProfile = profile.filter(
    (displayProfile) => displayProfile.id === state.currentUser.user_id
  );

  // unsure how/if to use this in place of above 'userProfile'
  // let userProfile = state.currentUser.user_id

  // ### Displays the current page user's posts ###
  let userPosts = posts.filter(
    (displayPosts) => displayPosts.created_by.id === state.currentUser.user_id
  );

  // ### Displays the current page user's people they are following ###
  let userFollowing = follow.filter(
    (displayFollowing) => displayFollowing.user === state.currentUser.user_id
  );

  // ### Displays the current page user's followers ###
  let userFollowers = follow.filter(
    (displayFollowers) =>
      displayFollowers.follower === state.currentUser.user_id
  );

  let handleDeletePost = async (id) => {
    console.log("define clicked post", id);
    await request({
      url: `api/posts/${id}`,
      method: "DELETE",
    }).then((resp) => {
      console.log(resp);
    });
    window.location.reload(false);
  };

  // ### LIKE A POST ###
  let handleLike = async (postID) => {
    const newLike = new FormData();
    newLike.append("user", state.currentUser.user_id);
    newLike.append("post", postID);
    await request({
      url: `api/postreactions/`,
      method: "POST",
      data: newLike,
    }).then((resp) => {
      console.log(resp);
    });
    getReactionData().then((data) => {
      setReactions(data);
    });
  };

  return (
    <>
      <HomeNavbar />
      {userProfile.map((user) => (
        <Container
          key={user.id}
          fluid
          className="profile-page text-center mt-3"
        >
          <Image className="profile-avatar" roundedCircle src={user.avatar} />
          <Row>
            <h4>
              {user.first_name} {user.last_name}
            </h4>
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
          <Row className="m-0 mt-1">
            <Col>
              <EditProfile />
              <EditAvatar />
            </Col>
          </Row>
        </Container>
      ))}

      {/* https://www.freecodecamp.org/news/build-a-search-filter-using-react-and-react-hooks/
      <Card.Group itemsPerRow={3} style={{ marginTop: 20 }}> */}

      {/* User's posts */}
      <div>
        {/* <Row xs={1} md={2} className="g-4"> */}
        {userPosts.map((post) => (
          <Card key={post.id} className="mx-auto my-2" id="post">
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
                    {/* if like relationship exist or not, display correct button */}
                    {/* Ternary if user exists to display buttons or not */}
                    {state.currentUser ? (
                      <>
                        {/* Ternary if follow relationship exists or not to display follow/unfollow button */}
                        {reactions.find(
                          (reaction) =>
                            reaction.user === state.currentUser?.user_id &&
                            reaction.post === post.id
                        ) ? (
                          <button className="unlike-button">
                            <FontAwesomeIcon icon={faHeart} />
                          </button>
                        ) : (
                          <button
                            className="like-button"
                            onClick={() => handleLike(post.id)}
                          >
                            <FontAwesomeIcon icon={farHeart} />
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        <button className="like-button">
                          <FontAwesomeIcon icon={farHeart} />
                        </button>
                      </>
                    )}
                    {reactions.filter((likes) => likes.post === post.id).length}{" "}
                    likes
                  </Card.Text>
                </Col>
                <Col className="d-flex justify-content-end">
                  <DropdownButton
                    className="delete-button"
                    // id="dropdown-button-drop"
                    size="sm"
                    drop='up'
                    variant=""
                    title={<FontAwesomeIcon icon={faEllipsis}/>}
                  >
                    <Dropdown.Item onClick={() => handleDeletePost(post.id)}>
                    Delete Post
                    </Dropdown.Item>
                  </DropdownButton>
                </Col>
              </Row>

              <Card.Text>
                <strong>{post.created_by.username}</strong>{" "}
                {post.description.slice(2, -2)}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
        {/* </Row> */}
      </div>
    </>
  );
}
