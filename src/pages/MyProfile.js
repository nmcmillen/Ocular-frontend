import React from "react";
import HomeNavbar from "../components/HomeNavbar";
import { useGlobalState } from "../context/GlobalState";

export default function MyProfile() {
  const [state, dispatch] = useGlobalState();

  return (
    <>
      <HomeNavbar />
      <div>
        <h1>{state.person.first_name}</h1>
        <h1>{state.person.username}</h1>
      </div>
    </>
  );
}
