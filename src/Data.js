import axios from 'axios';

// ***This link may change***
let apiLink = 'https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us42.gitpod.io/api/posts/'

export async function getData() {
    let response = await axios.get(apiLink)
    console.log('data.js', response.data)
    return response.data;
}