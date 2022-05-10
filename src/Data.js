import axios from 'axios';

// ***This link may change***
let apiLink = 'https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/'
// let apiLink = 'https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/api/posts/'

// ### GET POSTS DATA ONLY ###
export async function getPostData() {
    let response = await axios.get(apiLink + 'api/posts/')
    // console.log('postdata.js', response.data)
    return response.data;
}

// ### GET USER DATA ONLY ###
export async function getUserData() {
    let response = await axios.get(apiLink + 'api/users/')
    // console.log('userdata.js', response.data)
    return response.data;
}

export async function getFollowerData() {
    let response = await axios.get(apiLink + 'api/followers/')
    // console.log('follower data.js', response.data)
    return response.data;
}