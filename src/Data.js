import axios from "axios";

// ***This link may change***
let apiLink = process.env.REACT_APP_OCULAR_API_URL
// "https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/";
// let apiLink = 'https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/api/posts/'

// ### GET POSTS DATA ONLY ###
export async function getPostData() {
  let response = await axios.get(apiLink + "api/posts/");
  // console.log('postdata.js', response.data)
  return response.data;
}

// ### GET USER DATA ONLY ###
// if checks if 'search' exists being passed in from "SearchForm"
export async function getUserData(search) {
  if (search) {
    let response = await axios.get(apiLink + `api/users/?search=${search}`);
    return response.data;
  } else {
    let response = await axios.get(apiLink + "api/users/");
    return response.data;
  }
  // console.log('userdata.js', response.data)
}

export async function getFollowerData() {
  let response = await axios.get(apiLink + "api/followers/");
  // console.log('follower data.js', response.data)
  return response.data;
}

// export async function getUserData(search) {
//     let response = await axios.get(apiLink + 'api/users/')
//     // let response = await axios.get(apiLink + `api/users/?search=${search}`)
//     // console.log('userdata.js', response.data)
//     return response.data;
