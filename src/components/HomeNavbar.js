import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import CreatePost from "./CreatePost";
import logo from "./images/ocular-logo.png";
import LoginModal from "./LoginModal";
import SearchForm from "./SearchForm";
import SignupModal from "./SignupModal";

export default function HomeNavbar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Ocular
          </Navbar.Brand>
          <SearchForm />
          <Nav className="d-flex">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              {/* MENU LINKS */}
                <CreatePost />
                <LoginModal />
                <SignupModal />
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
