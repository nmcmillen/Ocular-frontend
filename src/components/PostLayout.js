import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import "./PostLayout.css";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { getPostData, getReactionData } from "../Data";
import request from "../components/services/api.request";

export default function PostLayout() {
  const [state, dispatch] = useGlobalState();
  const [posts, setPosts] = useState([]);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    getPostData().then((data) => {
      setPosts(data);
    });
    getReactionData().then((data) => {
      setReactions(data);
    });
  }, []);

  // check if signed in user has already liked the post (pulling correctly if user signed in)
  // let reactionID = reactions.filter(
  //   (reaction) =>
  //     reaction.user === state.currentUser?.user_id);

  // let reactionID = reactions.find(
  //   (reaction) =>
  //     reaction.user === state.currentUser?.user_id && reaction.post === post.id
  // );

  // console.log('reactionsmaybe', reactionID)
  // let reactionID = reactions.find((reaction) => reaction.user === state.currentUser?.user_id &&
  //     reaction.follower === userID[0])

  let handleLike = async (postID) => {
    // console.log('post', postID)
    const newLike = new FormData();
    newLike.append("user", state.currentUser.user_id);
    newLike.append("post", postID);
    let resp = await request({
      url: `api/postreactions/`,
      method: "POST",
      data: newLike,
    }).then((resp) => {
      console.log(resp);
    });
    // window.location.reload(false);
    // this.forceUpdate()
  };

  // ### UNFOLLOW ###
  // let handleUnlike = async () => {
  //   let resp = await request({
  //     url: `api/followers/${relationshipID}/`,
  //     method: "DELETE",
  //   }).then((resp) => {
  //     console.log(resp);
  //   });
  //   window.location.reload(false);
  // };



  return (
    <>
      <div>
        {posts.map((post) => (
          <Card key={post.id} className="mx-auto mt-4" id="post">
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
            <Card.Img variant="top" src={post.photos[0].images} />
            <Card.Body className="p-0 m-2">
              <Card.Text className="m-0">
                {/* gets the number of likes on specific post */}
                {
                  reactions.filter((likes) => likes.post === post.id).length
                }{" "}
                likes
              </Card.Text>

              {/* if like relationship exist or not, display correct button */}
              {reactions.find(
                (reaction) =>
                  reaction.user === state.currentUser?.user_id &&
                  reaction.post === post.id
              ) ? (
                <Button>Unlike</Button>
              ) : (
                <Button onClick={() => handleLike(post.id)}>Like</Button>
              )}

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



// {reactions.find(
//   (reaction) =>
//     reaction.user === state.currentUser?.user_id &&
//     reaction.post === post.id) && <button>unlike</button>}