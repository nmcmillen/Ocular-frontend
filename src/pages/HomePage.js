import React from "react";
import "./HomePage.css";
import HomeNavbar from "../components/HomeNavbar";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import PostLayout from '../components/PostLayout';

export default function HomePage() {
  let navigate = useNavigate();

  return (
    <>
      <HomeNavbar />
      <div className="hero-image" id="hero-image">
        <div className="hero-text">
          <h1>WELCOME TO OCULAR</h1>
          <p>Find photos and people from around the world</p>
          <Button variant="danger" onClick={() => navigate("/feed")}>
            Find More
          </Button>
        </div>
      </div>
    </>
  );
}
