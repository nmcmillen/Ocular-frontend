import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import { useGlobalState } from "../context/GlobalState";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./MyProfile.css";

export default function MyProfile() {
  const [state, dispatch] = useGlobalState();

  return (
    <>
      <HomeNavbar />
      <Container fluid className="profile-page text-center mt-3">
        <Image className="profile-avatar" roundedCircle src={state.person.avatar} />
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
          553 <br/>
          Posts</Col>
          <Col>
          1,269 <br/>
          Followers</Col>
          <Col>
          306 <br/>
          Following</Col>
        </Row>
      </Container>
    </>
  );
}
