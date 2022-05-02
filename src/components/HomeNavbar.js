import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import CreatePost from "./CreatePost";
import logo from "./images/ocular-logo.png";
import LoginModal from "./LoginModal";
import SearchForm from "./SearchForm";
import SignupModal from "./SignupModal";
import { Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";

// Maybe need a Link Container bootstrap???

export default function HomeNavbar() {
  const [state, dispatch] = useGlobalState();

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Ocular
            </Navbar.Brand>
          </Link>
          <SearchForm />
          <Nav className="d-flex">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* MENU LINKS */}
              <Link
                to="/feed"
                style={{ color: "white", textDecoration: "none" }}
              >
                Feed
              </Link>
              {!state.currentUser && (
                <>
                  <LoginModal />
                  <SignupModal />
                </>
              )}
              {state.currentUser && (
                <>
                  <CreatePost />
                  <Link
                    to="/profile"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <p>Hello {state.currentUser.user_id}</p>
                  </Link>
                </>
              )}
              {/* <CreatePost /> */}
              {/* <LoginModal />
              <SignupModal /> */}
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
