import React from "react";
import { useState, useEffect } from "react";
import { getUserData } from "../Data";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import "./SearchForm.css";

export default function SearchForm() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState("");

  function handleSubmit() {
    // e.preventDefault();
    // alert("form submitted");
    setSearch("");
  }

  // useEffect only runs if 'search'has 2 or more characters
  useEffect(() => {
    if (search.length > 1) {
      getUserData(search).then((data) => {
        setUsers(data);
      });
    }
  }, [search]);
  // [search] allows the useEffect to keep an eye on "search" each time it is changed
  // and will update the return data when search is updated

  console.log("users", users);
  console.log("search", search);

  return (
    <>
      <div className="search-box">
        <form onSubmit={handleSubmit}>
          <input
            className="search-input"
            required
            minLength="1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for people or photos"
          />
          {/* <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button> */}
        </form>
        {users.length !== 0 && (
          <div className="dataResult">
            {users.map((user) => {
              return (
                <div key={user.id} className="user-search">
                  <Link
                    to={`/userprofile/${user.username}`}
                    onClick={handleSubmit}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <Row className="p-2">
                      <Col className="">
                        <Image
                          className="avatar ml-1"
                          roundedCircle
                          src={user.avatar}
                        />
                        <strong>{user.username}</strong>
                      </Col>
                    </Row>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
