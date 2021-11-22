import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

const Login = (props) => {
  const context = useContext(AuthContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserFunc, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, {data: {login: userData}}) {
      context.login(userData);
      props.history.push("/");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserFunc() {
    loginUser();
  }

  return (
    <div className="form-container">
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
      <Form onSubmit={onSubmit} noValidate loading={loading}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
          onChange={onChange}
          type="password"
          error={errors.password ? true : false}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
