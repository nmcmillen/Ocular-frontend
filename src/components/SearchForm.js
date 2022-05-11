import React from "react";
import { useState, useEffect } from "react";
import { getFollowerData, getPostData, getUserData } from "../Data";
import "./SearchForm.css";

export default function SearchForm() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    alert("form submitted");
    setSearch("");
  }

  useEffect(() => {
    getUserData(search).then((data) => {
      setUsers(data);
    });
  }, [search]);
  // [search] allows the useEffect to keep an eye on "search" each time it is changed
  // and will update the return data when search is updated

  console.log('users', users)
  console.log('search', search)

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        className="search-input"
        required
        minLength="1"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for people or photos"
      />
      <button>
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
      </button>
    </form>
    </>
  );
}