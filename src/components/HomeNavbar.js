import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Col,
  Image,
  Navbar,
  Nav,
} from "react-bootstrap";
import logo from "./images/ocular-logo.png";
import LoginModal from "./LoginModal";
import SearchForm from "./SearchForm";
import SignupModal from "./SignupModal";
import { Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import { getUserData } from "../Data";
import { useNavigate } from "react-router-dom";
import "./HomeNavbar.css";
import CreatePost from "./CreatePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function HomeNavbar() {
  const [state, dispatch] = useGlobalState();
  const [profile, setProfile] = useState([]);
  // let user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  useEffect(() => {
    getUserData().then((data) => {
      setProfile(data.find((user) => user.id === state.currentUser.user_id));
    });
  }, []);

  let navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");
    window.location.reload(true);
  }

  const UserAvatar = (
    <Image
      src={profile?.avatar}
      alt="User profile image"
      className="nav-icon nav-avatar"
      roundedCircle
      style={{ width: "30px", height: "30px" }}
    />
  );

  const Feed = (
    <Button
      className="text-white"
      style={{ padding: "5px" }}
      variant=""
      onClick={() => navigate("/feed")}
    >
      Feed
    </Button>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Col className="d-flex justify-content-center">
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>
              <img
                alt=""
                src={logo}
                style={{ marginRight: "5px" }}
                width="30"
                height="30"
                className="d-inline-block"
              />{" "}
              <strong>OCULAR</strong>
            </Navbar.Brand>
          </Link>
        </Col>
        <Col className="d-flex justify-content-center">
          <SearchForm />
        </Col>
        <Col className=" mx-auto">
          <Nav className="d-flex">
            {/* MENU LINKS */}
            {!state.currentUser && (
              <Col className="d-flex justify-content-center">
                {Feed}
                <LoginModal />
                <SignupModal />
              </Col>
            )}
            {state.currentUser && (
              <Col className="d-flex justify-content-center">
                                <Button
                  className="text-white shadow-none mx-2 p-0"
                  variant=""
                  title="View Feed"
                  onClick={() => navigate("/feed")}
                >
                  <FontAwesomeIcon
                    className="nav-icon"
                    icon={faList}
                  />
                </Button>
                <CreatePost />
                <Button
                  className="text-white shadow-none mx-2 p-0"
                  variant=""
                  title="Logout"
                  onClick={logout}
                >
                  <FontAwesomeIcon
                    className="nav-icon"
                    icon={faRightFromBracket}
                  />
                </Button>
                <Button
                  className="shadow-none mx-2 p-0"
                  variant=""
                  title="My Profile"
                  onClick={() => navigate("/profile")}
                >
                  {UserAvatar}
                </Button>
              </Col>
            )}
            {/* </Navbar.Collapse> */}
          </Nav>
        </Col>
      </Container>
    </Navbar>
  );
}
