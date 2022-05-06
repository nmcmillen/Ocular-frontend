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