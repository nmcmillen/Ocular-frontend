import React from "react";
import {
  Button,
  Container,
  Col,
  Image,
  Navbar,
  NavDropdown,
  Nav,
  Row,
} from "react-bootstrap";
import CreatePost from "./CreatePost";
import logo from "./images/ocular-logo.png";
import LoginModal from "./LoginModal";
import SearchForm from "./SearchForm";
import SignupModal from "./SignupModal";
import { Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import "./HomeNavbar.css";

export default function HomeNavbar() {
  const [state, dispatch] = useGlobalState();
  // let user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);

  let navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");
    window.location.reload(true);
  }

  const UserAvatar = (
    <Image
      src={state.person?.avatar}
      alt="User profile image"
      roundedCircle
      style={{ width: "30px" }}
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
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
            {/* <Navbar.Collapse
              className="justify-content-end"
              id="responsive-navbar-nav"
            > */}
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
                {/* <CreatePost /> */}
                <NavDropdown
                  align="end"
                  title={UserAvatar}
                  id="basic-nav-dropdown"
                  style={{ border: "none" }}
                >
                  <NavDropdown.Item onClick={() => navigate("/profile")}>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/feed")}>
                    Feed
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <CreatePost />
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Col>
            )}
            {/* </Navbar.Collapse> */}
          </Nav>
        </Col>
      </Container>
    </Navbar>
  );
}
