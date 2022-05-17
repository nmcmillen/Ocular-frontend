import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import "./PostLayout.css";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Image,
  Row,
  ToggleButton,
} from "react-bootstrap";
import { getPostData, getReactionData, getFollowerData } from "../Data";
import request from "../components/services/api.request";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

export default function PostLayout() {
  const [state, dispatch] = useGlobalState();
  const [posts, setPosts] = useState([]);
  const [reactions, setReactions] = useState([]);

  const [follow, setFollow] = useState([]);
  // const [followingPosts, setFollowingPosts] = useState([]);

  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "All Posts", value: "1" },
    { name: "Following", value: "2" },
  ];

  useEffect(() => {
    getFollowerData().then((data) => {
      setFollow(
        data.filter(
          (displayFollowing) =>
            displayFollowing.user === state.currentUser.user_id
        )
      );
    });
  }, []);

  useEffect(() => {
    getPostData().then((data) => {
      setPosts(data);
    });
  }, []);

  // Pulls reaction data. When like is made, watches and rerenders.
  useEffect(() => {
    getReactionData().then((data) => {
      setReactions(data);
    });
  }, []);

  // ### Filters to find current signed in user's following users and their ID
  let followingUsers = follow.map((fans) => fans.follower);

  // ### Filters existing posts to return only the posts that the current signed in user follows
  let followingPosts = posts.filter((posts) =>
    followingUsers.includes(posts.created_by.id)
  );

  // console.log("fposts", followingPosts);

  // ### If a user is signed in, set Feed to show posts from followed users. If not, show all posts.
  var showPosts;
  if (radioValue === "1") {
    showPosts = posts;
  } else {
    showPosts = followingPosts;
  }

  console.log("showpost", showPosts);

  // ### Not sure why this won't filter the specific followed user posts.
  // useEffect(() => {
  //   getPostData().then((data) => {
  //     setFollowingPosts(data.filter(
  //       (posts) => followOnly.includes(posts.created_by.id)));
  //   });
  // }, []);

  let handleLike = async (postID) => {
    const newLike = new FormData();
    newLike.append("user", state.currentUser.user_id);
    newLike.append("post", postID);
    await request({
      url: `api/postreactions/`,
      method: "POST",
      data: newLike,
    }).then((resp) => {
      getReactionData().then((data) => {
        setReactions(data);
      });
      console.log(resp);
    });
    // window.location.reload(false);
  };

  // ### UNFOLLOW ###
  // let handleUnlike = async () => {
  //   let resp = await request({
  //     url: `api/postreactions/${relationshipID}/`,
  //     method: "DELETE",
  //   }).then((resp) => {
  //     console.log(resp);
  //   });
  //   window.location.reload(false);
  // };

  // const [checked, setChecked] = useState(false);

  console.log(radioValue);

  return (
    <>
      {state.currentUser && (
        <div className="radio-buttons">
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                size="sm"
                variant={idx % 2 ? "outline-dark" : "outline-dark"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      )}

      <div>
        {showPosts.map((post) => (
          <Card key={post.id} className="mx-auto my-2" id="post">
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
              onDoubleClick={() => handleLike(post.id)}
            />
            <Card.Body className="p-0 m-2">
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
                {/* gets the number of likes on specific post */}
                {
                  reactions.filter((likes) => likes.post === post.id).length
                }{" "}
                likes
              </Card.Text>

              <Card.Text>
                <Link
                  to={`/userprofile/${post.created_by.username}`}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <strong>{post.created_by.username}</strong>
                </Link>{" "}
                {post.description.slice(2, -2)}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}
