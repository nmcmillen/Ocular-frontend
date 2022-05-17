import React from "react";
import { useState, useEffect } from "react";
import { getUserData } from "../Data";
import { Link } from "react-router-dom";
import { Col, Image, Row } from "react-bootstrap";
import "./SearchForm.css";

export default function SearchForm() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState("");

  function handleSubmit() {
    // alert("form submitted");
    setSearch("");
    setUsers("");
  }

  // useEffect only runs if 'search'has 2 or more characters
  useEffect(() => {
    if (search.length > 1) {
      getUserData(search).then((data) => {
        setUsers(data);
      });
    }
    if (search.length < 1) {
      setUsers("")
    }
  }, [search]);
  // [search] allows the useEffect to keep an eye on "search" each time it is changed
  // and will update the return data when search is updated

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
            placeholder="Search for people"
          />
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
