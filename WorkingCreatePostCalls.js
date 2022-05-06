  // ### THIS WORKS TO CREATE POSTS USING FETCH ###
  let handleCreatePost = (e)  => {
    e.preventDefault()
    const newPost = new FormData();
    newPost.append("created_by", post.created_by);
    newPost.append("description", post.description);
    newPost.append("image", post.image, post.image.name);
    fetch('https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/api/posts/', { 
      method: 'post',
      body: newPost,
      headers: {
          // 'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + user.access
          // 'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res);
      });
  }

// ### THIS WORKS TO CREATE POST USING AXIOS WITH 0.27.2 UPDATE ###
  let handleCreatePost = async (e)  => {
    e.preventDefault()
    const newPost = new FormData();
    newPost.append("created_by", post.created_by);
    newPost.append("description", post.description);
    newPost.append("image", post.image, post.image.name);
    console.log('newpost test', newPost)
    await axios({
      url: 'https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/api/posts/',
      method: 'POST',
      data: newPost,
      headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + user.access
          // 'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        console.log(res);
      });
  }