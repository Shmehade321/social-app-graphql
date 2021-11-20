import React from "react";
import { useQuery, gql } from "@apollo/client";

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
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);
  if (data) {
    console.log(data);
  }
  return <div></div>;
};

export default Home;
