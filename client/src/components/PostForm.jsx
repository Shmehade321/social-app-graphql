import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($body: String!) {
    createPost(body: $body) {
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

const PostForm = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });
      values.body = "";
    },
    onError(error) {
      setErrorMessage(error.graphQLErrors[0].message);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      {errorMessage && (
        <div className="ui error message">
          <ul className="list">
            <li>{errorMessage}</li>
          </ul>
        </div>
      )}
      <Form onSubmit={onSubmit} style={{marginBottom: 20}}>
        <h2>Create a Post:</h2>
        <Form.Input
          placeholder="Write your post..."
          name="body"
          onChange={onChange}
          value={values.body}
          error={errorMessage ? true : false}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default PostForm;
