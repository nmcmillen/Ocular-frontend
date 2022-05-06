import React from 'react';
import HomeNavbar from '../components/HomeNavbar';
import PostLayout from '../components/PostLayout';

export default function HomeSignedIn() {
    return (
      <div>
        <HomeNavbar />
        <PostLayout/>
      </div>
    );
  }