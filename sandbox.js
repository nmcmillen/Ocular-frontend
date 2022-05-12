return (
  <div className="search">
    <div className="searchInputs">
      <input
        type="text"
        placeholder={placeholder}
        value={wordEntered}
        onChange={handleFilter}
      />
      <div className="searchIcon">
        {filteredData.length === 0 ? (
          <SearchIcon />
        ) : (
          <CloseIcon id="clearBtn" onClick={clearInput} />
        )}
      </div>
    </div>
    {filteredData.length != 0 && (
      <div className="dataResult">
        {filteredData.slice(0, 15).map((value, key) => {
          return (
            <a className="dataItem" href={value.link} target="_blank">
              <p>{value.title} </p>
            </a>
          );
        })}
      </div>
    )}
  </div>
);
}












// GAVE A 200 ACCEPTED STATUS BUT DIDN'T CREATE A POST. NOTHING IN BODY
let handleCreatePost = (e)  => {
  e.preventDefault()
  const newPost = new FormData();
  newPost.append("created_by", post.created_by);
  newPost.append("description", post.description);
  newPost.append("image", post.image);
  fetch('https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/api/posts/', newPost, { 
    method: 'POST',
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


// FORM DATA SEEMS TO WORK BUT STILL GETTING ERRORS
let handleCreatePost = (e)  => {
  e.preventDefault()
  const newPost = new FormData();
  newPost.append("created_by", post.created_by);
  newPost.append("description", post.description);
  newPost.append("image", post.image);
  await axios.post('https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us44.gitpod.io/api/posts/', newPost, {  
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

// let needle = haystack.find((relationship) => conditions) --> found object (needle.property)

// Not Working
  // if (state.currentUser) {
  //   let relationshipID = follow
  //     .filter(
  //       (relationship) =>
  //         relationship.user === state.currentUser.user_id &&
  //         relationship.follower === userID[0]
  //     )
  //     .map((follow) => follow.id);
  // }


// Working
  // let relationshipID = follow
  //   .filter(
  //     (relationship) =>
  //       relationship.user === state.currentUser?.user_id &&
  //       relationship.follower === userID[0]
  //   )
  //   .map((follow) => follow.id);


// Working way to show correct follow/unfollow buttons using conditional rendering &&
{/* <Col>
{state.currentUser?.user_id === userID[0] &&
  navigate("/profile")}
{!relationshipID && (
  <Button onClick={handleFollow}>Follow</Button>
)}
{relationshipID && (
  <Button onClick={handleUnfollow}>Unfollow</Button>
)}
</Col> */}

  {/* Ternary to show follow/unfollow depending on if relationshipID exists */}
  // <Col>
  //   {state.currentUser?.user_id === userID[0] &&
  //     navigate("/profile")}
  //   {relationshipID ? (
  //     <Button onClick={handleUnfollow}>Unfollow</Button>
  //   ) : (
  //     <Button onClick={handleFollow}>Follow</Button>
  //   )}
  // </Col>


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






// ***FULLY FUNCTIONAL POST CARD DO NOT CHANGE ***
<>
<Card className="mx-auto mt-4" id="post">
  <Row className="p-0 m-2 post-header">
    <Col className="p-0" xs={7}>
      <Image
        className="avatar ml-1"
        roundedCircle
        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
      />
      <strong>{username}</strong>
    </Col>
    <Col
      className="timestamp text-muted p-0"
      xs={{span: 4, offset: 1 }}
    >
      <Card.Text>April 19</Card.Text>
    </Col>
  </Row>
  <Card.Img
    variant="top"
    src="https://images.unsplash.com/photo-1533418264835-9871c7c2dbf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFjZWNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  />
  <Card.Body className="p-0 m-2">
    <Card.Text>
      <strong>{username}</strong> {postdesc}
    </Card.Text>
  </Card.Body>
</Card>
</>



  // apiURL ='https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us42.gitpod.io/api/posts/';

  // const getRepo = () => {
  //   axios.get('https://8000-nmcmillen-ocularbackend-sm1tv8tjiev.ws-us42.gitpod.io/api/posts/')
  //   .then((response) => {
  //     console.log('new', response);
  //     const myRepo = response.data;
  //     setRepo(myRepo);
  //   });
  // };

  // useEffect(() => getRepo(), []);

  // console.log('test', repo)

  // return (
  //   <Paper>
  //     {repo.map((repos) -> (
  //       <List key={repos.id}>
  //         <ListItem alignItems="flex-start">
  //           <ListItemAvatar>
  //             <ListItemAvatar
  //             src=[repos.]
  //           </ListItemAvatar>
  //         </ListItem>
  //       </List>
  //     ))}
  //   </Paper>
  // )

      {/* LAYOUT CARD DON'T TOUCH */}
      <Card className="mx-auto mt-4" id="post">
        <Row className="p-0 m-2 post-header">
          <Col className="p-0" xs={7}>
            <Image
              className="avatar ml-1"
              roundedCircle
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            />
            <strong>{username}</strong>
          </Col>
          <Col
            className="timestamp text-muted p-0"
            xs={{span: 4, offset: 1 }}
          >
            <Card.Text>April 19</Card.Text>
          </Col>
        </Row>
        <Card.Img
          variant="top"
          src="https://images.unsplash.com/photo-1533418264835-9871c7c2dbf0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFjZWNhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        />
        <Card.Body className="p-0 m-2">
          <Card.Text>
            <strong>{username}</strong> {postdesc}
          </Card.Text>
        </Card.Body>
      </Card>



return (
  <>
  <div>
    {posts.map(post => <h1>{post.description}</h1>)}
    </div>
  </>