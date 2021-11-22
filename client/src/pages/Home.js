import React from "react";
import { Grid } from "semantic-ui-react";
import { useQuery, gql } from "@apollo/client";
import PostCard from "../components/PostCard";

const FETCH_POSTS_QUERY = gql`
  query GetPosts {
    getPosts {
      id
      body
      username
      likeCount
      likes {
        id
        username
      }
      commentCount
      comments {
        id
        username
        body
      }
    }
  }
`;

const Home = () => {
  const {
    loading,
    error,
    data,
  } = useQuery(FETCH_POSTS_QUERY);
  const posts = data?.getPosts

  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h3>Recent Posts</h3>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id} style={{marginBottom: 20}}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
